// Generates optimized web images from assets-src/ into public/.
// Run: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "assets-src";
const OUT = "public/images";
await mkdir(OUT, { recursive: true });

// 1. Background-removed hero cutout, cropped tight to the subject.
const cutout = sharp(`${SRC}/arif-cutout.png`).extract({ left: 100, top: 230, width: 480, height: 978 });
await cutout.clone().resize({ height: 1000 }).webp({ quality: 86, alphaQuality: 90 }).toFile(`${OUT}/arif-hassan-cutout.webp`);

// 2. Original on-location photo (store in Patna), lightly graded.
await sharp(`${SRC}/arif-original.png`)
  .modulate({ saturation: 1.06, brightness: 1.02 })
  .resize({ width: 720 })
  .webp({ quality: 80 })
  .toFile(`${OUT}/arif-hassan-on-location.webp`);

// 3. Square avatar (face crop).
const avatar = sharp(`${SRC}/arif-original.png`).extract({ left: 262, top: 236, width: 310, height: 310 });
await avatar.clone().resize(400, 400).webp({ quality: 85 }).toFile(`${OUT}/arif-hassan-avatar.webp`);
await avatar.clone().resize(180, 180).png().toFile("app/apple-icon.png");

// 4. Open Graph / social share image (1200x630).
const person = await sharp(`${SRC}/arif-cutout.png`)
  .extract({ left: 100, top: 230, width: 480, height: 978 })
  .resize({ height: 600 })
  .png()
  .toBuffer();
const bg = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="0%" cy="0%" r="80%"><stop offset="0" stop-color="#6d28d9" stop-opacity=".75"/><stop offset="1" stop-color="#07070c" stop-opacity="0"/></radialGradient>
    <radialGradient id="b" cx="100%" cy="100%" r="70%"><stop offset="0" stop-color="#0891b2" stop-opacity=".6"/><stop offset="1" stop-color="#07070c" stop-opacity="0"/></radialGradient>
    <linearGradient id="t" x1="0" x2="1"><stop offset="0" stop-color="#c4b5fd"/><stop offset="1" stop-color="#67e8f9"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="#07070c"/>
  <rect width="1200" height="630" fill="url(#a)"/>
  <rect width="1200" height="630" fill="url(#b)"/>
  <circle cx="930" cy="330" r="250" fill="none" stroke="url(#t)" stroke-width="3" opacity=".5"/>
  <text x="70" y="120" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700" fill="#67e8f9" letter-spacing="4">VIRAL VLOG ROUNDERZ</text>
  <text x="70" y="215" font-family="Segoe UI, Arial, sans-serif" font-size="78" font-weight="800" fill="#ffffff">Arif Hassan</text>
  <text x="70" y="275" font-family="Segoe UI, Arial, sans-serif" font-size="30" fill="#c9c9d9">Creator · Patna, Bihar · Pan-India</text>
  <text x="70" y="400" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="800" fill="url(#t)">375K+ followers</text>
  <text x="70" y="470" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="700" fill="#ffffff">14M+ lifetime views</text>
  <text x="70" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#a9a9bc">Tech · Pre-owned auto · Wholesale markets · Pets</text>
</svg>`);
await sharp(bg)
  .composite([{ input: person, left: 1200 - 330 - 70, top: 630 - 600 }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile("public/og.jpg");

console.log("images built");
