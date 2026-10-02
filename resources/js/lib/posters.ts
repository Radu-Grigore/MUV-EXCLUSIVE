// Class posters are optional files in resources/images/clase, named after the class id
// (step.jpg, khai-bo.png, tabata.webp, pilates.jpg, functional…). Vite only bundles the
// ones that exist, so a missing poster never triggers a request.
const files = import.meta.glob<string>('../../images/clase/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

// The .webp files are small placeholders cut from the campaign collage; an original
// .jpg/.jpeg/.png with the same name takes precedence over them.
const byId: Record<string, string> = {};
for (const [path, url] of Object.entries(files).sort(([a], [b]) => Number(a.endsWith('.webp')) - Number(b.endsWith('.webp')))) {
    const id = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    byId[id] ??= url;
}

export function posterFor(classId: string): string | undefined {
    return byId[classId];
}

// Lighter WebP copies of each poster (same picture, 480, 640 and 800 px wide) for phones and
// small frames; the browser picks the smallest one that is still sharp. Regenerate them
// when a poster changes (see the guide).
const sized = import.meta.glob<string>('../../images/clase/web/*.webp', { eager: true, query: '?url', import: 'default' });

/** `srcset` for a poster: the WebP copies plus the original at its full width. */
export function posterSrcSet(classId: string, fullWidth = 1060): string | undefined {
    const full = byId[classId];
    if (!full) return undefined;
    const parts = [480, 640, 800].flatMap((w) => {
        const url = sized[`../../images/clase/web/${classId}-${w}.webp`];
        return url ? [`${url} ${w}w`] : [];
    });
    return [...parts, `${full} ${fullWidth}w`].join(', ');
}
