import { cpSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Static build of the one-page site: `npm run build:static` → dist/ (index.html + assets/ + images/).
// Every URL is relative, so the folder works from any sub-path (e.g. /p/<cod>/preview/).
const root = resolve(import.meta.dirname, 'resources/static');
const outDir = resolve(import.meta.dirname, 'dist');

/** Copies only the public files the page uses (not index.php, .htaccess or the Laravel build). */
function copyPublicFiles() {
    return {
        name: 'muv-copy-public-files',
        closeBundle() {
            for (const item of ['images', 'favicon.ico', 'robots.txt']) {
                const from = resolve(import.meta.dirname, 'public', item);
                if (existsSync(from)) cpSync(from, resolve(outDir, item), { recursive: true });
            }
        },
    };
}

export default defineConfig({
    root,
    base: './',
    publicDir: false,
    define: {
        // site.ts: in the static build the JS lives in dist/assets/, one folder below the site root.
        'import.meta.env.VITE_PUBLIC_ROOT': JSON.stringify('../'),
    },
    plugins: [react(), tailwindcss(), copyPublicFiles()],
    resolve: {
        alias: {
            '@': resolve(import.meta.dirname, 'resources/js'),
        },
    },
    build: {
        outDir,
        emptyOutDir: true,
        assetsDir: 'assets',
    },
});
