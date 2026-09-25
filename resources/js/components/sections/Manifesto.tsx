import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { asset } from '@/lib/site';
import { gsap } from '@/lib/scroll';

const text =
    'Un studio creat doar pentru femei. Un loc cald, intim și elegant, în care te miști în ritmul tău — fără presiune, fără priviri. Aici prinzi putere, îți găsești echilibrul și cunoști femei care te susțin.';

const highlight = new Set(['femei.', 'ritmul', 'tău', 'putere,', 'echilibrul']);

export function Manifesto() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.fromTo(
                    '[data-word]',
                    { opacity: 0.14 },
                    {
                        opacity: 1,
                        stagger: 0.1,
                        ease: 'none',
                        scrollTrigger: { trigger: '[data-words]', start: 'top 80%', end: 'bottom 55%', scrub: true },
                    },
                );
                gsap.to('[data-manifesto-img]', {
                    yPercent: -18,
                    ease: 'none',
                    scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
                });
            });
        },
        { scope: root },
    );

    return (
        <section ref={root} id="despre" className="relative overflow-hidden py-20 sm:py-24">
            <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
                <div className="lg:col-span-3">
                    <p className="eyebrow flex items-center gap-3 text-bronze">
                        <span className="h-px w-8 bg-gold" /> Despre MUV
                    </p>
                    <div data-manifesto-img className="relative mt-10 hidden aspect-square w-full max-w-[260px] lg:block">
                        <div className="absolute -inset-3 rounded-full border border-gold/40" />
                        <img
                            src={asset('/images/logo-sign.webp')}
                            alt="Sigla MUV Exclusive iluminată pe peretele studioului"
                            width={750}
                            height={750}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full rounded-full object-cover shadow-[0_30px_60px_-30px_rgba(139,108,79,0.7)]"
                        />
                    </div>
                </div>

                <div className="lg:col-span-9">
                    <p data-words className="font-display text-[2.1rem] leading-[1.12] font-light text-espresso sm:text-5xl lg:text-[4.2rem]">
                        {text.split(' ').map((w, i) => (
                            <span key={i} data-word className={highlight.has(w) ? 'text-bronze italic' : undefined}>
                                {w}{' '}
                            </span>
                        ))}
                    </p>

                    <div className="mt-14 flex items-center gap-6 lg:hidden">
                        <img
                            src={asset('/images/logo-sign.webp')}
                            alt=""
                            width={750}
                            height={750}
                            loading="lazy"
                            decoding="async"
                            className="h-24 w-24 rounded-full object-cover"
                        />
                        <p className="font-script text-4xl text-bronze">More than a workout</p>
                    </div>
                    <p className="mt-14 hidden font-script text-6xl text-bronze lg:block">More than a workout, a better you.</p>
                </div>
            </div>
        </section>
    );
}
