import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const roots = ['public/characters', 'public/backgrounds'];

function listPngFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listPngFiles(fullPath);
    return entry.isFile() && entry.name.endsWith('.png') ? [fullPath] : [];
  });
}

function targetBounds(file) {
  if (file.includes('/backgrounds/')) return { maxWidth: 1280, maxHeight: 720 };
  return { maxWidth: 900, maxHeight: 1200 };
}

function clampSize(width, height, bounds) {
  const ratio = Math.min(1, bounds.maxWidth / width, bounds.maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
}

function sampleBilinear(source, x, y) {
  const x0 = Math.max(0, Math.floor(x));
  const y0 = Math.max(0, Math.floor(y));
  const x1 = Math.min(source.width - 1, x0 + 1);
  const y1 = Math.min(source.height - 1, y0 + 1);
  const wx = x - x0;
  const wy = y - y0;
  const pixels = [
    { x: x0, y: y0, weight: (1 - wx) * (1 - wy) },
    { x: x1, y: y0, weight: wx * (1 - wy) },
    { x: x0, y: y1, weight: (1 - wx) * wy },
    { x: x1, y: y1, weight: wx * wy },
  ];
  const out = [0, 0, 0, 0];
  for (const pixel of pixels) {
    const index = (pixel.y * source.width + pixel.x) * 4;
    out[0] += source.data[index] * pixel.weight;
    out[1] += source.data[index + 1] * pixel.weight;
    out[2] += source.data[index + 2] * pixel.weight;
    out[3] += source.data[index + 3] * pixel.weight;
  }
  return out.map((value) => Math.max(0, Math.min(255, Math.round(value))));
}

function resizePng(source, width, height) {
  if (source.width === width && source.height === height) return source;
  const resized = new PNG({ width, height });
  const xRatio = source.width / width;
  const yRatio = source.height / height;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const sourceX = (x + 0.5) * xRatio - 0.5;
      const sourceY = (y + 0.5) * yRatio - 0.5;
      const [r, g, b, a] = sampleBilinear(source, sourceX, sourceY);
      const index = (y * width + x) * 4;
      resized.data[index] = r;
      resized.data[index + 1] = g;
      resized.data[index + 2] = b;
      resized.data[index + 3] = a;
    }
  }
  return resized;
}

function optimizeFile(file) {
  const before = fs.statSync(file).size;
  const source = PNG.sync.read(fs.readFileSync(file));
  const nextSize = clampSize(source.width, source.height, targetBounds(file));
  const output = resizePng(source, nextSize.width, nextSize.height);
  const buffer = PNG.sync.write(output, {
    colorType: 6,
    inputColorType: 6,
    zlib: { level: 9 },
  });
  if (buffer.length < before) fs.writeFileSync(file, buffer);
  return {
    file,
    before,
    after: Math.min(before, buffer.length),
    width: source.width,
    height: source.height,
    nextWidth: nextSize.width,
    nextHeight: nextSize.height,
  };
}

const results = roots.flatMap((root) => listPngFiles(root)).map(optimizeFile);
const before = results.reduce((sum, item) => sum + item.before, 0);
const after = results.reduce((sum, item) => sum + item.after, 0);
console.log(`Optimized ${results.length} PNG files`);
console.log(`Before: ${(before / 1024 / 1024).toFixed(2)} MB`);
console.log(`After: ${(after / 1024 / 1024).toFixed(2)} MB`);
console.log(`Saved: ${((before - after) / 1024 / 1024).toFixed(2)} MB`);
for (const item of results.filter((result) => result.before !== result.after).slice(0, 12)) {
  console.log(`${item.file}: ${item.width}x${item.height} -> ${item.nextWidth}x${item.nextHeight}, ${Math.round(item.before / 1024)}KB -> ${Math.round(item.after / 1024)}KB`);
}
