import fs from 'node:fs';
import path from 'node:path';
import { PNG } from 'pngjs';

const root = process.cwd();

const configs = {
  cheongyeon: { x: 314, y: 142, skin: [255, 198, 207], accent: [125, 211, 252], blush: [244, 114, 182] },
  baekwoo: { x: 306, y: 137, skin: [255, 202, 184], accent: [231, 200, 115], blush: [244, 114, 182] },
  jihyeok: { x: 295, y: 150, skin: [255, 194, 196], accent: [196, 181, 253], blush: [244, 114, 182] },
  seonyul: { x: 315, y: 160, skin: [255, 190, 220], accent: [216, 180, 254], blush: [251, 113, 133] },
  hwashin: { x: 316, y: 146, skin: [255, 176, 170], accent: [251, 113, 133], blush: [248, 113, 113] },
};

const variants = {
  empathy: { base: 'smile', blush: 0.2, eyeGlow: 0.2, mouth: 'soft', tilt: 1 },
  happy: { base: 'smile', blush: 0.26, eyeGlow: 0.3, mouth: 'smile', sparkles: true, tilt: -1 },
  shy: { base: 'smile', blush: 0.44, eyeGlow: 0.16, mouth: 'small', shyLines: true, tilt: 2 },
  focused: { base: 'serious', eyeGlow: 0.34, focusLines: true, mouth: 'firm', tilt: 0 },
  shocked: { base: 'action', blush: 0.12, eyeGlow: 0.42, mouth: 'open', shockMark: true, tilt: -2 },
};

function readPng(file) {
  return PNG.sync.read(fs.readFileSync(file));
}

function writePng(file, png) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, PNG.sync.write(png));
}

function blendPixel(png, x, y, color, alpha) {
  if (x < 0 || y < 0 || x >= png.width || y >= png.height) return;
  const index = (Math.round(y) * png.width + Math.round(x)) * 4;
  const existingAlpha = png.data[index + 3] / 255;
  if (existingAlpha <= 0) return;
  const a = alpha * existingAlpha;
  for (let channel = 0; channel < 3; channel += 1) {
    png.data[index + channel] = Math.round(png.data[index + channel] * (1 - a) + color[channel] * a);
  }
}

function ellipse(png, cx, cy, rx, ry, color, alpha) {
  const left = Math.floor(cx - rx);
  const right = Math.ceil(cx + rx);
  const top = Math.floor(cy - ry);
  const bottom = Math.ceil(cy + ry);
  for (let y = top; y <= bottom; y += 1) {
    for (let x = left; x <= right; x += 1) {
      const dx = (x - cx) / rx;
      const dy = (y - cy) / ry;
      const d = dx * dx + dy * dy;
      if (d <= 1) blendPixel(png, x, y, color, alpha * (1 - d) ** 0.7);
    }
  }
}

function line(png, x1, y1, x2, y2, color, alpha, width = 1) {
  const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));
  for (let i = 0; i <= steps; i += 1) {
    const t = steps === 0 ? 0 : i / steps;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;
    ellipse(png, x, y, width, width, color, alpha);
  }
}

function sparkle(png, x, y, color, alpha) {
  line(png, x - 7, y, x + 7, y, color, alpha, 0.8);
  line(png, x, y - 7, x, y + 7, color, alpha, 0.8);
  ellipse(png, x, y, 2.5, 2.5, [255, 255, 255], alpha * 0.7);
}

function applyExpression(png, config, variant) {
  const { x, y, blush, accent, skin } = config;
  if (variant.blush) {
    ellipse(png, x - 37, y + 43, 23, 10, blush, variant.blush);
    ellipse(png, x + 35, y + 43, 23, 10, blush, variant.blush);
  }

  if (variant.eyeGlow) {
    ellipse(png, x - 21, y + 8, 9, 3, [255, 255, 255], variant.eyeGlow * 0.7);
    ellipse(png, x + 20, y + 8, 9, 3, [255, 255, 255], variant.eyeGlow * 0.7);
    line(png, x - 31, y + 11, x - 12, y + 8, accent, variant.eyeGlow, 0.8);
    line(png, x + 10, y + 8, x + 30, y + 11, accent, variant.eyeGlow, 0.8);
  }

  if (variant.mouth === 'smile') {
    line(png, x - 13, y + 58, x - 4, y + 63, [120, 48, 62], 0.34, 1);
    line(png, x - 4, y + 63, x + 12, y + 57, [120, 48, 62], 0.34, 1);
    ellipse(png, x, y + 61, 10, 3, skin, 0.18);
  } else if (variant.mouth === 'small') {
    ellipse(png, x, y + 58, 7, 2.4, [120, 48, 62], 0.22);
  } else if (variant.mouth === 'firm') {
    line(png, x - 12, y + 58, x + 12, y + 57, [70, 32, 42], 0.3, 0.8);
  } else if (variant.mouth === 'open') {
    ellipse(png, x + 1, y + 59, 6, 8, [62, 24, 38], 0.42);
    ellipse(png, x + 1, y + 55, 4, 2, [255, 190, 196], 0.2);
  } else if (variant.mouth === 'soft') {
    line(png, x - 9, y + 58, x + 9, y + 58, [120, 48, 62], 0.18, 0.7);
  }

  if (variant.shyLines) {
    for (const side of [-1, 1]) {
      line(png, x + side * 36, y + 33, x + side * 52, y + 40, blush, 0.22, 0.8);
      line(png, x + side * 35, y + 41, x + side * 51, y + 48, blush, 0.18, 0.8);
    }
  }

  if (variant.focusLines) {
    line(png, x - 43, y - 5, x - 12, y + 3, accent, 0.18, 0.7);
    line(png, x + 12, y + 3, x + 43, y - 5, accent, 0.18, 0.7);
    ellipse(png, x, y + 18, 52, 2, accent, 0.08);
  }

  if (variant.sparkles) {
    sparkle(png, x - 66, y + 4, accent, 0.28);
    sparkle(png, x + 62, y + 26, accent, 0.22);
  }

  if (variant.shockMark) {
    line(png, x + 48, y - 22, x + 56, y - 8, accent, 0.3, 1);
    line(png, x + 62, y - 24, x + 58, y - 7, accent, 0.24, 1);
    sparkle(png, x + 64, y - 30, accent, 0.26);
  }
}

for (const [character, config] of Object.entries(configs)) {
  for (const [name, variant] of Object.entries(variants)) {
    const source = path.join(root, 'public', 'characters', character, `${variant.base}.png`);
    const out = path.join(root, 'public', 'characters', character, `${name}.png`);
    const png = readPng(source);
    applyExpression(png, config, variant);
    writePng(out, png);
    console.log(`${character}/${name}.png`);
  }
}
