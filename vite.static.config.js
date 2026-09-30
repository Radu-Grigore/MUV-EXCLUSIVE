import { cpSync, existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Static build (npm run build:static → dist/): plain HTML/CSS/JS that works from any subfolder,
// e.g. https://example.com/p/<code>/preview/. The JS and CSS are inlined into index.html as a
// classic script, so it doesn't depend on module scripts, MIME types or CORS on the host.
const root = resolve(import.meta.dirname, 'resources/static');
const outDir = resolve(import.meta.dirname, 'dist');

function finishStaticSite() {
    return {
        name: 'muv-finish-static-site',
        closeBundle() {
            for (const item of ['images', 'favicon.svg', 'robots.txt']) {
                const from = resolve(import.meta.dirname, 'public', item);
                if (existsSync(from)) cpSync(from, resolve(outDir, item), { recursive: true });
            }

            const htmlPath = resolve(outDir, 'index.html');
            let html = readFileSync(htmlPath, 'utf8');

            html = html.replace(/\s*<link rel="stylesheet"[^>]*href="\.\/(assets\/[^"]+\.css)"[^>]*>/, (_, file) => {
                // woff2 fonts are embedded, so they also load where the page has no origin (sandboxed iframes).
                const css = readFileSync(resolve(outDir, file), 'utf8')
                    .replace(/url\(\.\/([^)]+\.woff2)\)/g, (_, font) => `url(data:font/woff2;base64,${readFileSync(resolve(outDir, 'assets', font)).toString('base64')})`)
                    .replaceAll('url(./', 'url(assets/');
                rmSync(resolve(outDir, file));
                return `\n    <style>${css.replaceAll('</style', '<\\/style')}</style>`;
            });

            let js = '';
            html = html.replace(/\s*<script[^>]*src="\.\/(assets\/[^"]+\.js)"[^>]*><\/script>/, (_, file) => {
                js = readFileSync(resolve(outDir, file), 'utf8');
                rmSync(resolve(outDir, file));
                return '';
            });
            // A function replacement, so `$&`-style sequences in the JS are left alone.
            html = html.replace('</body>', () => `    <script>${js.replaceAll('</script', '<\\/script')}</script>\n    </body>`);

            writeFileSync(htmlPath, html);
            for (const f of readdirSync(resolve(outDir, 'assets'))) if (f.endsWith('.woff2')) rmSync(resolve(outDir, 'assets', f));
        },
    };
}

export default defineConfig({
    root,
    base: './',
    publicDir: false,
    define: {
        'import.meta.env.VITE_PUBLIC_ROOT': JSON.stringify(''),
        'import.meta.env.VITE_STATIC': JSON.stringify('true'),
    },
    plugins: [react(), tailwindcss(), finishStaticSite()],
    resolve: {
        alias: { '@': resolve(import.meta.dirname, 'resources/js') },
    },
    experimental: {
        // Asset URLs in JS stay relative to index.html (the JS itself is inlined there).
        renderBuiltUrl(filename, { hostType }) {
            return hostType === 'js' ? { runtime: JSON.stringify(filename) } : { relative: true };
        },
    },
    build: {
        outDir,
        emptyOutDir: true,
        assetsDir: 'assets',
        modulePreload: false,
        cssCodeSplit: false,
        rollupOptions: {
            output: { format: 'iife', inlineDynamicImports: true },
        },
    },
});
