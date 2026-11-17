// One-off helper: converts the gathering photos that are in /public to WebP.
// Run from /client:  node scripts/optimize-images.mjs
// Only photos whose gathering is known are converted. Everything else is left alone.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

// Summit 2025 at Nairobi Cinema (backdrop "The Unveiling" and venue are visible in these photos).
const summit2025 = ['YSS 2025.jpg', 'YSS 3.jpg', 'YSS 4.jpg', 'YSS 5.jpg', 'YSS 6.jpg', 'YSS 7.jpg', 'YSS 8.jpg', 'YSS 9.jpg', 'YSS 10.jpg'];
// Youth Spark Nexus gatherings. The edition of each photo is not recorded, so they are used at program level only.
const nexus = ['WHO WE ARE.jpg', 'Nexus.jpg', 'Nexus 2.jpg', 'Nexus 3.jpg', 'Nexus 6.jpg', 'Nexus 7.jpg', 'Nexus 8.jpg', 'Nexus 9.jpg', 'Nexus 10.jpg'];

const jobs = [
  ...summit2025.map((f, i) => [f, `gatherings/summit-2025/${String(i + 1).padStart(2, '0')}.webp`, 1600]),
  ...nexus.map((f, i) => [f, `gatherings/nexus/${String(i).padStart(2, '0')}.webp`, 1600]),
  ['fouders.jpg', 'gatherings/founders.webp', 1400],
];

for (const [src, out, width] of jobs) {
  const target = join(root, out);
  mkdirSync(dirname(target), { recursive: true });
  const info = await sharp(join(root, src)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(target);
  console.log(`${src} -> ${out} (${Math.round(info.size / 1024)} KB, ${info.width}x${info.height})`);
}
