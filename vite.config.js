import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { google } from 'laravel-vite-plugin/fonts';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const subsets = ['latin', 'latin-ext'];

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
            fonts: [
                google('Montserrat', { alias: 'montserrat', weights: [300, 400, 500, 600, 700], subsets }),
                google('Cormorant Garamond', {
                    alias: 'cormorant',
                    weights: [300, 400, 500, 600],
                    styles: ['normal', 'italic'],
                    subsets,
                    preload: false,
                }),
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
