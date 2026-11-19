// Generates crisp PNG favicons, Apple/Android touch icons, and multi-size favicon.ico from public/favicon.svg.
// Run from /client: node scripts/generate-favicons.mjs
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const svg = readFileSync(join(publicDir, 'favicon.svg'), 'utf8');

// Square SVG without rounded corners for iOS (iOS applies its own squircle mask)
const iosSvg = svg.replace('rx="14"', 'rx="0"').replace('rx="12.5"', 'rx="0"');

const renderPng = (sourceSvg, size) =>
  sharp(Buffer.from(sourceSvg), { density: 384 })
    .resize(size, size)
    .png({ compressionLevel: 9 })
    .toBuffer();

// Build a standard ICO container embedding PNG images (supported by all modern browsers & Windows)
function buildIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(count, 4);

  const entries = [];
  let offset = 6 + count * 16;
  for (const { size, buf } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size === 256 ? 0 : size, 0); // width
    entry.writeUInt8(size === 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += buf.length;
  }

  return Buffer.concat([header, ...entries, ...pngBuffers.map((p) => p.buf)]);
}

const sizes = [
  ['favicon-16x16.png', svg, 16],
  ['favicon-32x32.png', svg, 32],
  ['apple-touch-icon.png', iosSvg, 180],
  ['android-chrome-192x192.png', svg, 192],
  ['android-chrome-512x512.png', svg, 512],
];

for (const [name, src, size] of sizes) {
  const buf = await renderPng(src, size);
  writeFileSync(join(publicDir, name), buf);
  console.log(`Generated ${name} (${size}x${size}, ${buf.length} bytes)`);
}

const icoFrames = await Promise.all(
  [16, 32, 48].map(async (size) => ({ size, buf: await renderPng(svg, size) }))
);
const ico = buildIco(icoFrames);
writeFileSync(join(publicDir, 'favicon.ico'), ico);
console.log(`Generated favicon.ico (16/32/48, ${ico.length} bytes)`);
