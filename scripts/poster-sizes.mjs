// Makes the lighter WebP copies of the class posters (resources/images/clase/web/<id>-480|640|800.webp).
// Runs at the start of every build (npm run build / build:static); a copy is only (re)made when its poster is newer, and copies of removed posters are deleted.
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const dir = 'resources/images/clase';
const out = join(dir, 'web');
const widths = [480, 640, 800];
mkdirSync(out, { recursive: true });

const posters = readdirSync(dir).filter((f) => /\.(jpe?g|png)$/i.test(f));
const ids = new Set(posters.map((f) => f.replace(/\.[^.]+$/, '')));

for (const file of posters) {
    const id = file.replace(/\.[^.]+$/, '');
    const src = join(dir, file);
    for (const w of widths) {
        const dest = join(out, `${id}-${w}.webp`);
        if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(src).mtimeMs) continue;
        await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
        console.log(`poster-sizes: ${dest}`);
    }
}
for (const f of readdirSync(out)) if (!ids.has(f.replace(/-\d+\.webp$/, ''))) rmSync(join(out, f));
