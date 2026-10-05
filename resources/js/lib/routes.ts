/**
 * The site has one main page plus the legal pages. On Laravel every page has its own URL
 * (the server tells the app which one via data-page); the static build uses hash routes (#/termeni-si-conditii).
 */
const STATIC = import.meta.env.VITE_STATIC === 'true';

function mount(): HTMLElement | null {
    return typeof document === 'undefined' ? null : document.getElementById('app');
}

const base = STATIC ? '' : (mount()?.dataset.base ?? '').replace(/\/$/, '');

export function currentPage(): string {
    if (STATIC) return window.location.hash.startsWith('#/') ? window.location.hash.slice(2) || 'home' : 'home';
    return mount()?.dataset.page || 'home';
}

export function isStaticBuild() {
    return STATIC;
}

/** Link to a legal page. */
export function pageHref(slug: string): string {
    return STATIC ? `#/${slug}` : `${base}/${slug}`;
}

/** Link to the main page, optionally to one of its sections ("#clase"). */
export function homeHref(anchor = ''): string {
    return STATIC ? anchor || '#/' : `${base}/${anchor}`;
}

/** The legal pages' addresses (their texts live in lib/legal.ts and load only on those pages). */
export const legalSlugs = ['termeni-si-conditii', 'politica-de-confidentialitate', 'politica-de-cookies', 'politica-de-anulare-si-rambursare'];

/** Content pages (lib/pages.ts), loaded the same way. */
export const infoSlugs = ['clase-de-pilates', 'date-de-identificare'];
