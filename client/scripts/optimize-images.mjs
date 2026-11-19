// Converts authentic gathering photos and posters in /public into optimized WebP files.
// Run from /client:  node scripts/optimize-images.mjs
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const summit2025 = ['YSS 2025.jpg', 'YSS 3.jpg', 'YSS 4.jpg', 'YSS 5.jpg', 'YSS 6.jpg', 'YSS 7.jpg', 'YSS 8.jpg', 'YSS 9.jpg', 'YSS 10.jpg'];
const nexus = ['WHO WE ARE.jpg', 'Nexus.jpg', 'Nexus 2.jpg', 'Nexus 3.jpg', 'Nexus 6.jpg', 'Nexus 7.jpg', 'Nexus 8.jpg', 'Nexus 9.jpg', 'Nexus 10.jpg'];

// Summit 2026: high-res unique files only (excludes the 206px thumbnail and the "(1)" duplicate).
const summit2026 = [
  'gatherings/summit -2026/653709883_122171335016741661_2915392284377139846_n.jpg', // packed Dennis White Hall (cover)
  'gatherings/summit -2026/652912625_122171334620741661_5923921851440654696_n.jpg', // Kevin & Daphne on stage
  'gatherings/summit -2026/653711288_122171332454741661_7398182652863018512_n.jpg', // Founders with PLO Lumumba
  'gatherings/summit -2026/654962611_122171334728741661_2598656832160841087_n.jpg', // PLO Lumumba at podium
  'gatherings/summit -2026/656006859_122171335010741661_5892873962655303804_n.jpg',
  'gatherings/summit -2026/653044494_122171334740741661_4130420333666457975_n.jpg',
  'gatherings/summit -2026/653069292_122171334962741661_8772201336213405124_n.jpg',
  'gatherings/summit -2026/652440728_17891910360429446_2014770191703956663_n.jpg',
  'gatherings/summit -2026/653844260_122171333234741661_8396133820334954623_n(2).jpg',
  'gatherings/summit -2026/654926711_122171332220741661_3949042446365224839_n.jpg',
].filter(Boolean);

// NXT Africa Forum 2026 at After40 Hotel: group shot first (cover), then room/speaker shots.
const nxt2026 = [
  'gatherings/Main NXT Africa Forum 2026/_MG_5923-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5902-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5697-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5693-Enhanced-NR-2.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5668-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5664-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5656-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5643-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5606-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/_MG_5598-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/IMG_5515-Enhanced-NR.jpg',
  'gatherings/Main NXT Africa Forum 2026/IMG_5504-Enhanced-NR.jpg',
];

const jobs = [
  ...summit2025.map((f, i) => [f, `gatherings/summit-2025/${String(i + 1).padStart(2, '0')}.webp`, 1600]),
  ['YSS 2025 Poster.jpg', 'gatherings/summit-2025/poster.webp', 1400],
  ...nexus.map((f, i) => [f, `gatherings/nexus/${String(i).padStart(2, '0')}.webp`, 1600]),
  ...summit2026.map((f, i) => [f, `gatherings/summit-2026/${String(i + 1).padStart(2, '0')}.webp`, 1600]),
  ['gatherings/summit -2026/WhatsApp Image 2026-03-01 at 17.09.45.jpeg', 'gatherings/summit-2026/poster.webp', 1400],
  ...nxt2026.map((f, i) => [f, `gatherings/nxt-2026/${String(i + 1).padStart(2, '0')}.webp`, 1600]),
  ['gatherings/Main NXT Africa Forum 2026/NXT AFRICA 26.jpg', 'gatherings/nxt-2026/poster.webp', 1400],
  ['fouders.jpg', 'gatherings/founders.webp', 1400],
];

for (const [src, out, width] of jobs) {
  const target = join(root, out);
  mkdirSync(dirname(target), { recursive: true });
  const info = await sharp(join(root, src)).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(target);
  console.log(`${src} -> ${out} (${Math.round(info.size / 1024)} KB, ${info.width}x${info.height})`);
}
