import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import { useRef, useState } from 'react';
import { plans, site, type Plan } from '@/lib/site';
import { gsap, ScrollTrigger } from '@/lib/scroll';
import { Icon } from '../Icon';

/** Membership prices: four cards, the Kids Corner plan highlighted. */
export function Pricing() {
    const root = useRef<HTMLElement>(null);
    const [shown, setShown] = useState(false);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                gsap.from('[data-plan]', {
                    y: 60,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-plans]', start: 'top 88%', once: true },
                });
                // Prices count up from zero as the cards arrive.
                ScrollTrigger.create({ trigger: '[data-plans]', start: 'top 80%', once: true, onEnter: () => setShown(true) });
            });
        },
        { scope: root },
    );

    return (
        <section
            ref={root}
            id="abonamente"
            data-snap
            className="phone-screen relative overflow-hidden bg-sand py-6 text-espresso sm:py-24 lg:flex lg:min-h-[calc(100svh-72px)] lg:flex-col lg:justify-center lg:py-12"
        >
            <div className="relative mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12">
                <div className="px-1 text-center sm:px-0">
                    <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                        <span className="h-px w-8 bg-gold" /> Abonamente <span className="h-px w-8 bg-gold" />
                    </p>
                    <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] sm:mt-4 sm:text-6xl lg:text-7xl low:text-6xl">
                        Alege abonamentul <em className="text-bronze">potrivit ție</em>
                    </h2>
                </div>

                <ul data-plans className="mx-auto mt-5 grid max-w-6xl grid-cols-2 gap-2.5 short:mt-4 sm:mt-12 low:mt-8 sm:gap-4 lg:grid-cols-4 lg:gap-5">
                    {plans.map((p) => (
                        <PlanCard key={p.id} plan={p} shown={shown} />
                    ))}
                </ul>

                <p className="mt-4 text-center text-[0.8rem] text-cocoa short:mt-3 sm:mt-10 sm:text-sm low:mt-6">
                    Ai întrebări despre abonamente?{' '}
                    <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-bronze underline-offset-4 hover:underline">
                        <Icon name="whatsapp" className="h-4 w-4" /> Scrie-ne pe WhatsApp
                    </a>
                </p>
            </div>
        </section>
    );
}

function PlanCard({ plan, shown }: { plan: Plan; shown: boolean }) {
    const dark = plan.featured;

    return (
        <li
            data-plan
            className={`relative flex flex-col rounded-[1.25rem] p-3.5 short:p-3 sm:rounded-[1.75rem] sm:p-7 low:p-5 ${
                dark
                    ? 'bg-espresso text-cream shadow-[0_40px_80px_-40px_rgba(42,32,26,0.9)]'
                    : 'border border-bronze/15 bg-cream/80 shadow-[0_30px_60px_-45px_rgba(139,108,79,0.7)]'
            }`}
        >
            {dark && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-gold px-2.5 py-1 text-[0.5rem] font-semibold tracking-[0.18em] text-ink uppercase sm:-top-3 sm:right-6 sm:px-3 sm:text-[0.58rem]">
                    Recomandat
                </span>
            )}
            <p className={`text-[0.55rem] font-medium tracking-[0.2em] uppercase sm:text-[0.62rem] sm:tracking-[0.26em] ${dark ? 'text-gold-soft' : 'text-bronze'}`}>
                {plan.tagline}
            </p>
            <h3 className="mt-1.5 font-display text-[1.35rem] leading-[1.05] sm:mt-3 sm:text-[2rem]">{plan.name}</h3>

            <div className={`mt-2.5 space-y-1.5 border-t pt-2.5 short:mt-2 short:space-y-1 short:pt-2 sm:mt-6 low:mt-4 low:pt-4 sm:space-y-3 sm:pt-5 ${dark ? 'border-cream/15' : 'border-espresso/10'}`}>
                {plan.prices.map((price) => (
                    <div key={price.period} className="flex items-baseline justify-between gap-2">
                        <span className="flex items-baseline gap-1">
                            <NumberFlow
                                value={shown ? price.amount : 0}
                                className={`font-display text-[1.9rem] leading-none tabular-nums short:text-[1.6rem] sm:text-5xl low:text-4xl ${dark ? 'text-gold-soft' : ''}`}
                            />
                            <span className={`text-[0.7rem] font-medium sm:text-sm ${dark ? 'text-cream/70' : 'text-cocoa'}`}>lei</span>
                        </span>
                        <span className={`text-[0.58rem] tracking-[0.14em] uppercase sm:text-[0.66rem] ${dark ? 'text-cream/60' : 'text-cocoa/70'}`}>/ {price.period}</span>
                    </div>
                ))}
            </div>

            <ul className={`mt-6 hidden space-y-2.5 low:mt-4 low:space-y-1.5 text-sm sm:block ${dark ? 'text-cream/75' : 'text-cocoa'}`}>
                {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                        <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-gold' : 'text-bronze'}`} strokeWidth={2} />
                        {perk}
                    </li>
                ))}
            </ul>

            {plan.note && (
                <p className={`mt-2 text-[0.62rem] leading-snug italic sm:mt-auto sm:pt-5 sm:text-xs ${dark ? 'text-cream/60' : 'text-cocoa/80'}`}>*{plan.note}</p>
            )}
        </li>
    );
}
