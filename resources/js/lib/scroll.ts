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

    // Phones and tablets keep native scrolling, with CSS scroll-snap on the sections (see app.css).
    if (lenis || window.matchMedia('(pointer: coarse)').matches) return;

    lenis = new Lenis({
        lerp: 0.09,
        allowNestedScroll: true,
        virtualScroll: (data) => sectionLock.onWheel(data),
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis?.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('keydown', sectionLock.onKey);
}

/** Every section boundary the page can rest on (desktop), in page pixels. */
function sectionStops() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const stops = new Set<number>([0, Math.round(max)]);
    document.querySelectorAll<HTMLElement>('[data-snap]').forEach((section) => {
        const isHero = section.id === 'top';
        const start = isHero ? 0 : section.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        stops.add(Math.round(start));
        // Taller than the screen: also stop at its bottom edge so nothing is skipped.
        const overflow = section.offsetHeight - (window.innerHeight - (isHero ? 0 : HEADER_HEIGHT));
        if (overflow > window.innerHeight * 0.2) stops.add(Math.round(start + overflow));
    });
    return [...stops].filter((v) => v >= 0 && v <= max).sort((x, y) => x - y);
}

/**
 * Desktop section lock: one wheel/trackpad gesture moves exactly one section, which lands
 * right under the header. Input during the animation, and trackpad inertia right after it,
 * is swallowed so sections are never skipped.
 */
const sectionLock = (() => {
    let animating = false;
    let waitForPause = false;
    let lastInput = 0;
    let accumulated = 0;

    const go = (direction: number) => {
        if (!lenis) return;
        const current = lenis.animatedScroll;
        const stops = sectionStops();
        const target = direction > 0 ? stops.find((v) => v > current + 4) : [...stops].reverse().find((v) => v < current - 4);
        if (target === undefined) return;
        animating = true;
        lenis.scrollTo(target, {
            duration: 1.1,
            easing: (t) => 1 - Math.pow(1 - t, 4),
            lock: true,
            force: true,
            onComplete: () => {
                animating = false;
                waitForPause = true;
            },
        });
    };

    const onWheel = ({ deltaY, event }: { deltaY: number; event: WheelEvent | TouchEvent }) => {
        // Leave zoom, touch, paused scrolling (open dialogs) and scrollable panels to Lenis.
        if (!event.type.includes('wheel') || (event as WheelEvent).ctrlKey || lenis?.isStopped) return true;
        if (event.composedPath().some((n) => n instanceof HTMLElement && n.hasAttribute('data-lenis-prevent'))) return true;
        if (event.cancelable) event.preventDefault();

        const now = performance.now();
        const gap = now - lastInput;
        lastInput = now;
        if (animating) return false;
        if (waitForPause) {
            if (gap < 200) return false; // still the tail of the previous gesture
            waitForPause = false;
        }
        if (gap > 200) accumulated = 0;
        accumulated += deltaY;
        if (Math.abs(accumulated) < 25) return false;
        const direction = Math.sign(accumulated);
        accumulated = 0;
        go(direction);
        return false;
    };

    // Keyboard: arrows, Page Up/Down and space move one section too.
    const onKey = (e: KeyboardEvent) => {
        if (!lenis || lenis.isStopped || animating) return;
        const target = e.target as HTMLElement;
        if (target.closest('input, textarea, select, [contenteditable]')) return;
        const down = ['ArrowDown', 'PageDown', ' '].includes(e.key) && !e.shiftKey;
        const up = ['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey);
        if (!down && !up) return;
        e.preventDefault();
        go(down ? 1 : -1);
    };

    return { onWheel, onKey };
})();

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
