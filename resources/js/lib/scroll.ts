import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

export const HEADER_OFFSET = -72;

export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth wheel scrolling (Lenis) driven by the GSAP ticker so ScrollTrigger stays in sync.
 * Touch devices keep native scrolling, which is smoother and cheaper on phones.
 */
export function initSmoothScroll() {
    if (lenis || prefersReducedMotion()) return;

    lenis = new Lenis({
        lerp: 0.09,
        anchors: { offset: HEADER_OFFSET },
        allowNestedScroll: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

export function scrollToTarget(target: string | HTMLElement | number) {
    if (lenis) {
        lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : HEADER_OFFSET });
        return;
    }
    if (typeof target === 'number') {
        window.scrollTo({ top: target });
        return;
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView();
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

export { gsap, ScrollTrigger };
