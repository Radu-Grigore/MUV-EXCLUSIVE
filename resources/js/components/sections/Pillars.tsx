import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { pillars } from '@/lib/site';
import { gsap } from '@/lib/scroll';
import { Icon } from '../Icon';

const themes = [
    { bg: '#2a201a', fg: '#f7f1ea', muted: 'rgba(247,241,234,0.65)', accent: '#e6cfa6' },
    { bg: '#d9c4aa', fg: '#2a201a', muted: 'rgba(42,32,26,0.7)', accent: '#6f5238' },
    { bg: '#fbf7f2', fg: '#2a201a', muted: 'rgba(42,32,26,0.65)', accent: '#8b6c4f' },
    { bg: '#8b6c4f', fg: '#f7f1ea', muted: 'rgba(247,241,234,0.75)', accent: '#f1dfbf' },
];

/** Sticky stacking cards: each pillar slides over the previous one, which recedes. */
export function Pillars() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                const cards = gsap.utils.toArray<HTMLElement>('[data-pillar-card]');
                cards.forEach((card, i) => {
                    const next = cards[i + 1];
                    if (next) {
                        gsap.to(card, {
                            scale: 0.9 - (cards.length - i) * 0.01,
                            ease: 'none',
                            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
                        });
                        gsap.to(card.querySelector('[data-shade]'), {
                            opacity: 0.45,
                            ease: 'none',
                            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
                        });
                    }
                    gsap.from(card.querySelector('[data-pillar-word]'), {
                        yPercent: 100,
                        duration: 1.3,
                        ease: 'expo.out',
                        scrollTrigger: { trigger: card, start: 'top 75%' },
                    });
                });
            });
        },
        { scope: root },
    );

    return (
        <section ref={root} className="relative px-2 pb-24 sm:px-3 sm:pb-32" aria-labelledby="pillars-title">
            <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-3 pt-8 pb-12 sm:flex-row sm:items-end sm:px-5 lg:px-9">
                <h2 id="pillars-title" data-split className="font-display text-5xl leading-none font-light sm:text-7xl">
                    Filozofia <em className="text-bronze">MUV</em>
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-cocoa">Patru cuvinte care ne definesc. Tot ce facem la MUV pornește de aici.</p>
            </div>

            <ol className="relative">
                {pillars.map((p, i) => {
                    const t = themes[i % themes.length];
                    return (
                        <li
                            key={p.word}
                            data-pillar-card
                            className="sticky mb-4 origin-top overflow-hidden rounded-[1.75rem] will-change-transform sm:rounded-[2.5rem]"
                            style={{ top: `calc(76px + ${i * 14}px)`, background: t.bg, color: t.fg }}
                        >
                            <span data-shade className="pointer-events-none absolute inset-0 z-10 bg-ink opacity-0" />
                            <div className="relative flex min-h-[70svh] flex-col justify-between gap-10 p-6 sm:p-10 lg:min-h-[74svh] lg:p-14">
                                <div className="flex items-start justify-between">
                                    <span className="eyebrow" style={{ color: t.accent }}>
                                        0{i + 1} / 0{pillars.length}
                                    </span>
                                    <span className="grid h-14 w-14 place-items-center rounded-full border" style={{ borderColor: `${t.accent}66`, color: t.accent }}>
                                        <Icon name={p.icon} className="h-6 w-6" />
                                    </span>
                                </div>

                                <div className="grid items-end gap-8 lg:grid-cols-12">
                                    <span className="line-mask lg:col-span-8">
                                        <span data-pillar-word className="block font-display text-[26vw] leading-[0.8] font-light tracking-[-0.02em] sm:text-[20vw] lg:text-[13vw] 2xl:text-[12rem]">
                                            {p.word}
                                        </span>
                                    </span>
                                    <div className="lg:col-span-4 lg:pb-4">
                                        <h3 className="text-[0.72rem] font-semibold tracking-[0.24em] uppercase" style={{ color: t.accent }}>
                                            {p.title}
                                        </h3>
                                        <p className="mt-3 max-w-sm text-base leading-relaxed" style={{ color: t.muted }}>
                                            {p.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ol>
        </section>
    );
}
