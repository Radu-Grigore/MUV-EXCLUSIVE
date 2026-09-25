import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { pillars } from '@/lib/site';
import { gsap } from '@/lib/scroll';
import { Icon } from '../Icon';

export function Pillars() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.utils.toArray<HTMLElement>('[data-pillar]').forEach((row) => {
                    const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 85%' } });
                    tl.from(row.querySelector('[data-line]'), { scaleX: 0, duration: 1.4, ease: 'expo.out' })
                        .from(row.querySelector('[data-pillar-word]'), { yPercent: 100, duration: 1.2, ease: 'expo.out' }, 0.1)
                        .from(row.querySelectorAll('[data-pillar-fade]'), { autoAlpha: 0, y: 16, stagger: 0.08, duration: 1 }, 0.3);
                });
            });
        },
        { scope: root },
    );

    return (
        <section ref={root} className="bg-sand/60 py-24 sm:py-32" aria-labelledby="pillars-title">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <h2 id="pillars-title" className="font-display text-5xl leading-none font-light sm:text-6xl">
                        Filozofia <em className="text-bronze">MUV</em>
                    </h2>
                    <p className="max-w-sm text-sm leading-relaxed text-cocoa">
                        Patru cuvinte care ne definesc. Tot ce facem la MUV pornește de aici.
                    </p>
                </div>

                <ol className="mt-14">
                    {pillars.map((p, i) => (
                        <li key={p.word} data-pillar className="group relative grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-3 py-7 sm:py-9 lg:grid-cols-12">
                            <span data-line className="absolute inset-x-0 top-0 h-px origin-left bg-bronze/25" />
                            <span data-pillar-fade className="text-xs tracking-[0.2em] text-bronze lg:col-span-1">
                                0{i + 1}
                            </span>
                            <span className="line-mask lg:col-span-6">
                                <span data-pillar-word className="block">
                                    <span className="block font-display text-[17vw] leading-[0.85] font-light text-espresso transition-[color,translate] duration-700 ease-out-expo group-hover:translate-x-4 group-hover:text-bronze group-hover:italic sm:text-8xl lg:text-[8.5rem]">
                                        {p.word}
                                    </span>
                                </span>
                            </span>
                            <div className="col-span-2 flex items-start gap-5 lg:col-span-5">
                                <span
                                    data-pillar-fade
                                    className="mt-1 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-bronze/30 text-bronze transition-colors duration-500 group-hover:border-espresso group-hover:bg-espresso group-hover:text-gold-soft"
                                >
                                    <Icon name={p.icon} className="h-5 w-5" />
                                </span>
                                <div data-pillar-fade>
                                    <h3 className="text-[0.72rem] font-semibold tracking-[0.22em] uppercase">{p.title}</h3>
                                    <p className="mt-2 max-w-md text-sm leading-relaxed text-cocoa">{p.text}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
}
