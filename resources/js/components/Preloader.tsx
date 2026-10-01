import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { finishIntro, gsap, lockScroll, prefersReducedMotion } from '@/lib/scroll';

const SEEN_KEY = 'muv-intro-seen';

function alreadySeen() {
    try {
        return sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
        return false;
    }
}

/** Short brand intro (once per visit): counter to 100, then the curtain lifts. */
export function Preloader() {
    const [done, setDone] = useState(() => alreadySeen() || prefersReducedMotion());
    const root = useRef<HTMLDivElement>(null);
    const count = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            if (done) {
                finishIntro();
                return;
            }
            lockScroll(true);
            const counter = { v: 0 };
            // Wait briefly for the display font, but never let a slow font hold the page back.
            const fonts = Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 400))]);

            const tl = gsap.timeline({ paused: true });
            tl.from('[data-pre-letter]', { yPercent: 110, stagger: 0.05, duration: 0.6, ease: 'expo.out' })
                .from('[data-pre-letter-sub]', { autoAlpha: 0, y: 12, duration: 0.5, ease: 'expo.out' }, 0.2)
                .to('[data-pre-letter-sub]', { autoAlpha: 0, duration: 0.25 }, 0.72)
                .to(counter, {
                    v: 100,
                    duration: 0.7,
                    ease: 'power2.inOut',
                    onUpdate: () => count.current && (count.current.textContent = String(Math.round(counter.v)).padStart(3, '0')),
                }, 0)
                .to('[data-pre-bar]', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, 0)
                .to('[data-pre-letter]', { yPercent: -110, stagger: 0.04, duration: 0.45, ease: 'expo.in' }, 0.72)
                .to('[data-pre-meta]', { autoAlpha: 0, duration: 0.25 }, 0.72)
                .add(() => {
                    lockScroll(false);
                    finishIntro();
                }, 0.95)
                .to(root.current, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, 0.9)
                .to('[data-pre-curve]', { scaleY: 0, duration: 0.85, ease: 'expo.inOut' }, 0.9)
                .add(() => {
                    try {
                        sessionStorage.setItem(SEEN_KEY, '1');
                    } catch {
                        /* private mode */
                    }
                    setDone(true);
                });

            fonts.then(() => tl.play());
        },
        { scope: root, dependencies: [] },
    );

    if (done) return null;

    return (
        <div ref={root} className="fixed inset-0 z-[100] flex flex-col bg-espresso text-cream" aria-hidden="true">
            <div className="flex flex-1 items-center justify-center">
                <div className="flex flex-col items-center">
                <p className="flex font-display text-[28vw] leading-[0.8] font-medium tracking-[-0.03em] sm:text-[16vw]">
                    {'MUV'.split('').map((l, i) => (
                        <span key={i} className="line-mask">
                            <span data-pre-letter className="text-gold-gradient block">
                                {l}
                            </span>
                        </span>
                    ))}
                </p>
                <span data-pre-letter-sub className="mt-4 pl-[0.6em] text-[4.2vw] font-light tracking-[0.6em] text-gold-soft sm:text-[1.6vw]">EXCLUSIVE</span>
                </div>
            </div>
            <div data-pre-meta className="flex items-end justify-between px-5 pb-8 sm:px-12">
                <span className="eyebrow text-gold-soft">Women only fitness studio</span>
                <span ref={count} className="font-display text-5xl text-cream tabular-nums sm:text-7xl">
                    000
                </span>
            </div>
            <span data-pre-bar className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gold" />
            {/* Curved bottom edge while the curtain lifts */}
            <span data-pre-curve className="absolute inset-x-0 top-full h-[12vh] origin-top rounded-b-[50%] bg-espresso" />
        </div>
    );
}
