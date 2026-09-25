import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

let lenis: Lenis | null = null;

/** Header height (72px) plus breathing room. */
const CONTENT_TOP = 104;

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth wheel scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Touch devices keep native scrolling, which is smoother and cheaper on phones.
 */
export function initSmoothScroll() {
    // In-page links (#despre, #clase…) all go through scrollToTarget so they land consistently.
    document.addEventListener('click', (e) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        const hash = a?.getAttribute('href');
        if (!hash || hash === '#') return;
        e.preventDefault();
        scrollToTarget(hash);
    });

    if (lenis || prefersReducedMotion()) return;

    lenis = new Lenis({
        lerp: 0.09,
        allowNestedScroll: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

/**
 * Where a section should land: its first content sits CONTENT_TOP px below the viewport top,
 * whatever padding the section has. `data-scroll-offset` overrides this for special layouts.
 */
function targetY(el: HTMLElement) {
    const top = el.getBoundingClientRect().top + window.scrollY;
    const custom = el.dataset.scrollOffset;
    if (custom !== undefined) return top + Number(custom);
    const padding = parseFloat(getComputedStyle(el).paddingTop) || 0;
    return top + Math.max(0, padding - CONTENT_TOP);
}

export function scrollToTarget(target: string | HTMLElement | number) {
    let y: number;
    if (typeof target === 'number') {
        y = target;
    } else {
        const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
        if (!el) return;
        y = el.id === 'top' ? 0 : targetY(el);
    }
    if (lenis) lenis.scrollTo(y, { duration: 1.4 });
    else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

export function lockScroll(locked: boolean) {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
    if (locked) lenis?.stop();
    else lenis?.start();
}

export function onScroll(callback: (y: number, direction: number) => void) {
    let last = window.scrollY;
    const handler = () => {
        const y = window.scrollY;
        callback(y, Math.sign(y - last));
        last = y;
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
}

export function hasFinePointer() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

// The hero intro waits for the preloader curtain to lift.
let finishIntro: () => void = () => {};
export const introDone = new Promise<void>((resolve) => (finishIntro = resolve));
export { finishIntro };

export { gsap, ScrollTrigger, SplitText };
