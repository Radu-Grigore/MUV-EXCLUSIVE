import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin);

let lenis: Lenis | null = null;

/**
 * The site's animations are part of the brand, so they run even when the phone asks for
 * reduced motion (many Android phones switch that on automatically in battery saver).
 */
export function prefersReducedMotion() {
    return false;
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

    // Phones and tablets keep native scrolling, which is already smooth there.
    if (lenis || window.matchMedia('(pointer: coarse)').matches) return;

    lenis = new Lenis({
        lerp: 0.09,
        allowNestedScroll: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

}

/** Height of the fixed header; every section lands with its top edge right below it. */
const HEADER_HEIGHT = 72;

let navigating = false;

/** True while (and right after) a menu link scrolls the page, so the header stays visible. */
export function isNavigating() {
    return navigating;
}

/** Every section lands with its top edge right under the header (the hero at the very top). */
function targetY(el: HTMLElement) {
    return Math.max(0, el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT);
}

export function scrollToTarget(target: string | HTMLElement | number) {
    const el = typeof target === 'number' ? null : typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
    if (typeof target !== 'number' && !el) return;
    const resolve = () => (el ? (el.id === 'top' ? 0 : targetY(el)) : (target as number));

    navigating = true;
    // Lazy content can shift the page while scrolling; land once more on the recomputed spot.
    const settle = () => {
        const y = resolve();
        if (Math.abs(window.scrollY - y) > 1) {
            if (lenis) lenis.scrollTo(y, { immediate: true, force: true });
            else window.scrollTo({ top: y, behavior: 'auto' });
        }
        // Keep the header pinned a moment longer so the settling scroll events can't hide it.
        window.setTimeout(() => (navigating = false), 400);
    };

    if (lenis) {
        lenis.scrollTo(resolve(), { duration: 1.2, force: true, onComplete: settle });
    } else {
        const smooth = !prefersReducedMotion();
        window.scrollTo({ top: resolve(), behavior: smooth ? 'smooth' : 'auto' });
        if (!smooth) return settle();
        let timer = 0;
        const onScrollEnd = () => {
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                window.removeEventListener('scroll', onScrollEnd);
                settle();
            }, 140);
        };
        window.addEventListener('scroll', onScrollEnd, { passive: true });
        onScrollEnd();
    }
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
