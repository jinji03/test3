import fs from 'node:fs';
import { PNG } from 'pngjs';

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  console.error('Usage: node scripts/remove-chroma-key.mjs <input> <output>');
  process.exit(1);
}

const source = PNG.sync.read(fs.readFileSync(input));
const out = new PNG({ width: source.width, height: source.height });

for (let y = 0; y < source.height; y += 1) {
  for (let x = 0; x < source.width; x += 1) {
    const idx = (source.width * y + x) << 2;
    const r = source.data[idx];
    const g = source.data[idx + 1];
    const b = source.data[idx + 2];
    const isGreen = g > 145 && g > r * 1.45 && g > b * 1.45;
    const edgeGreen = g > 105 && g > r * 1.18 && g > b * 1.18;

    out.data[idx] = r;
    out.data[idx + 1] = g;
    out.data[idx + 2] = b;
    out.data[idx + 3] = isGreen ? 0 : edgeGreen ? 76 : 255;

    if (edgeGreen) {
      out.data[idx] = Math.max(r - 22, 0);
      out.data[idx + 1] = Math.max(g - 95, 0);
      out.data[idx + 2] = Math.max(b - 22, 0);
    }
  }
}

fs.mkdirSync(new URL('.', `file://${output}`).pathname, { recursive: true });
fs.writeFileSync(output, PNG.sync.write(out));
