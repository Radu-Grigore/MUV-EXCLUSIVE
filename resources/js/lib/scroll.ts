import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';

// SplitText and DrawSVG are only used below the first screen; they are registered with those sections (lib/gsap-extra).
gsap.registerPlugin(ScrollTrigger);
// On phones the address bar slides in and out while scrolling; that is not a real resize, so don't re-measure for it.
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis: Lenis | null = null;
let lenisLoading = false;

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
        // "#/..." links are page routes in the static build, not sections.
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]:not([href^="#/"])');
        const hash = a?.getAttribute('href');
        if (!hash || hash === '#') return;
        e.preventDefault();
        scrollToTarget(hash);
    });

    // Phones and tablets keep native scrolling, which is already smooth there.
    // Computers load it on the side, so it never holds up the first paint.
    if (lenis || lenisLoading || window.matchMedia('(pointer: coarse)').matches) return;
    lenisLoading = true;
    import('lenis').then(({ default: LenisClass }) => {
        lenis = new LenisClass({
            lerp: 0.09,
            allowNestedScroll: true,
        });
        // The intro or an open panel may already have locked the page.
        if (document.documentElement.style.overflow === 'hidden') lenis.stop();
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis?.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    });

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

/**
 * Runs an animation set-up once `el` is about a screen away from the viewport (and its clean-up on unmount).
 * Sections below the fold then cost nothing at start-up; by the time they scroll in, their animations are ready.
 */
export function whenNear(el: Element | null | undefined, setup: () => void | (() => void), margin = '150% 0px'): () => void {
    if (!el) return () => {};
    let cleanup: void | (() => void);
    let idle = 0;
    let timer = 0;
    let done = false;
    const run = () => {
        if (done) return;
        done = true;
        cleanup = setup();
    };
    const io = new IntersectionObserver(
        (entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            io.disconnect();
            // In a quiet moment between frames (at the latest 300 ms later), so it never lands mid-scroll.
            if (typeof window.requestIdleCallback === 'function') idle = window.requestIdleCallback(run, { timeout: 300 });
            else timer = Number(setTimeout(run, 50));
            // A visitor who jumps straight to it gets it at once.
            if (entries.some((e) => e.intersectionRatio > 0 && e.boundingClientRect.top < window.innerHeight && e.boundingClientRect.bottom > 0)) run();
        },
        { rootMargin: margin },
    );
    io.observe(el);
    return () => {
        io.disconnect();
        if (idle) window.cancelIdleCallback(idle);
        clearTimeout(timer);
        if (typeof cleanup === 'function') cleanup();
    };
}

export function hasFinePointer() {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

// The hero intro waits for the preloader curtain to lift.
let finishIntro: () => void = () => {};
export const introDone = new Promise<void>((resolve) => (finishIntro = resolve));
export { finishIntro };

export { gsap, ScrollTrigger };
