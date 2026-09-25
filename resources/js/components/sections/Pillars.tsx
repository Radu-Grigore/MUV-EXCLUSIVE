import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { pillars } from '@/lib/site';
import { gsap } from '@/lib/scroll';
import { Icon } from '../Icon';

const themes = [
    { bg: '#2a201a', fg: '#f7f1ea', muted: 'rgba(247,241,234,0.7)', accent: '#e6cfa6' },
    { bg: '#d9c4aa', fg: '#2a201a', muted: 'rgba(42,32,26,0.72)', accent: '#6f5238' },
    { bg: '#fbf7f2', fg: '#2a201a', muted: 'rgba(42,32,26,0.68)', accent: '#8b6c4f' },
    { bg: '#8b6c4f', fg: '#f7f1ea', muted: 'rgba(247,241,234,0.8)', accent: '#f1dfbf' },
];

/**
 * Four compact pillar panels. On desktop they sit in one row and the active panel
 * widens to reveal its text; on smaller screens they are plain cards with everything visible.
 */
export function Pillars() {
    const root = useRef<HTMLElement>(null);
    const [active, setActive] = useState(0);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.from('[data-pillar]', {
                    y: 60,
                    autoAlpha: 0,
                    duration: 1.1,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-pillars]', start: 'top 85%', once: true },
                });
            });
        },
        { scope: root },
    );

    return (
        <section ref={root} className="py-20 sm:py-28" aria-labelledby="pillars-title">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <h2 id="pillars-title" data-split className="font-display text-5xl leading-none sm:text-6xl">
                        Filozofia <em className="text-bronze">MUV</em>
                    </h2>
                    <p className="max-w-sm text-sm leading-relaxed text-cocoa">Patru cuvinte care ne definesc. Tot ce facem la MUV pornește de aici.</p>
                </div>

                <ol data-pillars className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:h-[440px] lg:gap-3">
                    {pillars.map((p, i) => {
                        const t = themes[i % themes.length];
                        const isActive = active === i;
                        return (
                            <li
                                key={p.word}
                                data-pillar
                                tabIndex={0}
                                onMouseEnter={() => setActive(i)}
                                onFocus={() => setActive(i)}
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] p-6 outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-7 lg:min-w-0 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-expo ${
                                    isActive ? 'lg:flex-[2.4]' : 'lg:flex-1'
                                }`}
                                style={{ background: t.bg, color: t.fg }}
                            >
                                <div className="flex items-start justify-between">
                                    <span className="eyebrow" style={{ color: t.accent }}>
                                        0{i + 1}
                                    </span>
                                    <span
                                        className="grid h-11 w-11 place-items-center rounded-full border transition-transform duration-700 ease-out-expo group-hover:rotate-12"
                                        style={{ borderColor: `${t.accent}66`, color: t.accent }}
                                    >
                                        <Icon name={p.icon} className="h-5 w-5" />
                                    </span>
                                </div>

                                <div className="mt-10 lg:mt-0">
                                    <h3 className="font-display text-6xl leading-[0.9] whitespace-nowrap sm:text-7xl">{p.word}</h3>
                                    <div
                                        className={`lg:grid lg:transition-[grid-template-rows,opacity] lg:duration-700 lg:ease-out-expo ${
                                            isActive ? 'lg:grid-rows-[1fr] lg:opacity-100' : 'lg:grid-rows-[0fr] lg:opacity-0'
                                        }`}
                                    >
                                        <div className="lg:min-w-[18rem] lg:overflow-hidden">
                                            <p className="mt-5 text-[0.68rem] font-semibold tracking-[0.22em] uppercase" style={{ color: t.accent }}>
                                                {p.title}
                                            </p>
                                            <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed" style={{ color: t.muted }}>
                                                {p.text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </section>
    );
}
