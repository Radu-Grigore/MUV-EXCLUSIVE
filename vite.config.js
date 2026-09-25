import { existsSync } from 'node:fs';
import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { google, local } from 'laravel-vite-plugin/fonts';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const subsets = ['latin', 'latin-ext'];

// Satoshi (fontshare.com) cannot be fetched at build time, so it is self-hosted: drop
// Satoshi-Variable.woff2 (and optionally Satoshi-VariableItalic.woff2) into resources/fonts/satoshi.
// Until then the site falls back to DM Sans.
const satoshiDir = 'resources/fonts/satoshi';
const satoshi = existsSync(`${satoshiDir}/Satoshi-Variable.woff2`)
    ? [
          local('Satoshi', {
              alias: 'satoshi',
              variants: [
                  { src: `${satoshiDir}/Satoshi-Variable.woff2`, weight: '300 900', style: 'normal' },
                  ...(existsSync(`${satoshiDir}/Satoshi-VariableItalic.woff2`)
                      ? [{ src: `${satoshiDir}/Satoshi-VariableItalic.woff2`, weight: '300 900', style: 'italic' }]
                      : []),
              ],
          }),
      ]
    : [];

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                ...satoshi,
                google('DM Sans', { alias: 'dmsans', weights: [300, 400, 500, 600, 700], subsets, preload: satoshi.length === 0 }),
                google('Instrument Serif', { alias: 'instrument', weights: [400], styles: ['normal', 'italic'], subsets }),
                google('Allura', { alias: 'allura', subsets, preload: false }),
            ],
        }),
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
