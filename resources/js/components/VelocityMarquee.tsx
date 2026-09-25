import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/scroll';

const words = ['Move', 'Feel', 'Balance', 'Belong', 'Women only', 'A better you'];

/**
 * Endless text band whose speed and direction follow the scroll: it speeds up and
 * skews with scroll velocity and reverses when you scroll back up.
 */
export function VelocityMarquee({ className = '' }: { className?: string }) {
    const root = useRef<HTMLDivElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                let x = 0;
                let direction = 1;
                let boost = 0;
                let visible = false;
                const setX = gsap.quickSetter(track.current, 'xPercent');
                const skew = gsap.quickTo(track.current, 'skewX', { duration: 0.5, ease: 'power3' });

                const st = ScrollTrigger.create({
                    trigger: root.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    onToggle: (self) => (visible = self.isActive),
                    onUpdate: (self) => {
                        const v = self.getVelocity();
                        direction = self.direction;
                        boost = Math.min(Math.abs(v) / 300, 6);
                        skew(gsap.utils.clamp(-8, 8, v / -300));
                    },
                });

                const tick = (_t: number, dt: number) => {
                    if (!visible) return;
                    boost *= 0.94;
                    x -= (0.012 + boost * 0.02) * direction * (dt / 16.7);
                    x = gsap.utils.wrap(-50, 0, x);
                    setX(x);
                };
                gsap.ticker.add(tick);
                return () => {
                    gsap.ticker.remove(tick);
                    st.kill();
                };
            });
        },
        { scope: root },
    );

    const row = [...words, ...words];

    return (
        <div ref={root} className={`overflow-hidden py-6 sm:py-10 ${className}`} aria-hidden="true">
            <div ref={track} className="flex w-max items-center will-change-transform">
                {[...row, ...row].map((w, i) => (
                    <span key={i} className="flex items-center">
                        <span
                            className={`px-6 font-display text-[15vw] leading-none font-light whitespace-nowrap sm:px-10 sm:text-[9vw] ${
                                i % 2 ? 'text-transparent [-webkit-text-stroke:1px_var(--color-bronze)]' : 'text-espresso'
                            }`}
                        >
                            {w}
                        </span>
                        <svg viewBox="0 0 24 24" className="h-[5vw] w-[5vw] shrink-0 text-gold sm:h-[3vw] sm:w-[3vw]">
                            <path fill="currentColor" d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
                        </svg>
                    </span>
                ))}
            </div>
        </div>
    );
}
