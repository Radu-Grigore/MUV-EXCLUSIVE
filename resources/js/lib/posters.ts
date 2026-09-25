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
