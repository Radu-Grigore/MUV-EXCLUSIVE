// Class posters are optional files in resources/images/clase, named after the class id
// (step.jpg, khai-bo.png, tabata.webp, pilates.jpg, functional…). Vite only bundles the
// ones that exist, so a missing poster never triggers a request.
const files = import.meta.glob<string>('../../images/clase/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });

const byId = Object.fromEntries(
    Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.[^.]+$/, ''), url]),
);

export function posterFor(classId: string): string | undefined {
    return byId[classId];
}
