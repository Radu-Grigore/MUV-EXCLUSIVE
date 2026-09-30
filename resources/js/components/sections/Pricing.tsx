import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import { useRef, useState } from 'react';
import { extraPlans, memberships, site, type Membership } from '@/lib/site';
import { gsap, ScrollTrigger } from '@/lib/scroll';
import { Icon } from '../Icon';

type Term = 'month' | 'quarter';

function whatsappFor(text: string) {
    return `${site.whatsapp}?text=${encodeURIComponent(`Bună! Aș dori ${text} la MUV Exclusive.`)}`;
}

/** Memberships: a 1 month / 3 months switch drives the two Unlimited cards; Day Pass and Personal Training sit beside them. */
export function Pricing() {
    const root = useRef<HTMLElement>(null);
    const [term, setTerm] = useState<Term>('month');
    const [shown, setShown] = useState(false);
    const maxSaving = Math.max(...memberships.map((m) => m.month * 3 - m.quarter));

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                gsap.from('[data-plan]', {
                    y: 70,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-plans]', start: 'top 88%', once: true },
                });
                gsap.from('[data-extra]', {
                    y: 40,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-extras]', start: 'top 95%', once: true },
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
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(45% 55% at 72% 50%, rgba(255,248,236,0.9) 0%, transparent 70%)' }}
            />

            <div className="relative mx-auto grid w-full max-w-[1440px] gap-4 px-4 short:gap-3 sm:gap-8 sm:px-8 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-8 lg:px-12">
                {/* Heading + term switch */}
                <div className="px-1 text-center sm:px-0 lg:col-span-4 lg:text-left">
                    <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                        <span className="h-px w-8 bg-gold" /> Abonamente <span className="h-px w-8 bg-gold lg:hidden" />
                    </p>
                    <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] sm:mt-4 sm:text-6xl lg:text-7xl low:text-6xl lower:text-5xl">
                        Alege abonamentul <em className="text-bronze">potrivit ție</em>
                    </h2>
                    <p className="mt-5 hidden max-w-sm leading-relaxed text-cocoa lg:block low:mt-4 lower:hidden">
                        Un singur abonament, toate clasele de grup. Alege durata care ți se potrivește — la 3 luni plătești mai puțin.
                    </p>

                    <div
                        role="radiogroup"
                        aria-label="Durata abonamentului"
                        className="relative mt-4 inline-grid grid-cols-2 rounded-full border border-bronze/20 bg-cream p-1 short:mt-3 sm:mt-8 low:mt-6 lower:mt-5"
                    >
                        <span
                            aria-hidden="true"
                            className={`absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-espresso shadow-[0_10px_20px_-10px_rgba(42,32,26,0.8)] transition-transform duration-500 ease-out-expo ${
                                term === 'quarter' ? 'translate-x-full' : ''
                            }`}
                        />
                        {(
                            [
                                ['month', '1 lună'],
                                ['quarter', '3 luni'],
                            ] as [Term, string][]
                        ).map(([value, label]) => (
                            <button
                                key={value}
                                type="button"
                                role="radio"
                                aria-checked={term === value}
                                onClick={() => setTerm(value)}
                                className={`relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-2.5 whitespace-nowrap text-[0.66rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 sm:px-8 sm:py-3 ${
                                    term === value ? 'text-cream' : 'text-cocoa hover:text-espresso'
                                }`}
                            >
                                {label}
                                {value === 'quarter' && (
                                    <span
                                        className={`rounded-full px-1.5 py-0.5 text-[0.52rem] tracking-[0.08em] normal-case transition-colors ${
                                            term === value ? 'bg-gold text-ink' : 'bg-gold/25 text-bronze'
                                        }`}
                                    >
                                        <span className="hidden sm:inline">până la </span>-{maxSaving} lei
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Unlimited memberships */}
                <ul data-plans className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:col-span-8 lg:row-span-2 lg:self-center">
                    {memberships.map((m) => (
                        <MembershipCard key={m.id} m={m} term={term} shown={shown} />
                    ))}
                </ul>

                {/* Day Pass + Personal Training */}
                <div data-extras className="grid grid-cols-2 gap-2.5 sm:gap-5 lg:col-span-4 lg:grid-cols-1 lg:content-end lg:gap-3">
                    {extraPlans.map((x) => (
                        <a
                            key={x.id}
                            data-extra
                            href={whatsappFor(`detalii despre ${x.name}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col rounded-[1.25rem] border border-bronze/15 bg-cream/80 p-3 transition-colors hover:border-bronze/40 hover:bg-cream sm:rounded-[1.5rem] sm:p-5 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-x-4 low:p-5 lower:p-4"
                        >
                            <span className="min-w-0">
                                <span className="block text-[0.55rem] font-medium tracking-[0.2em] text-bronze uppercase sm:text-[0.62rem]">{x.tagline}</span>
                                <span className="mt-1 block font-display text-[1.3rem] leading-none sm:text-3xl">{x.name}</span>
                            </span>
                            <span className="mt-2 flex items-baseline gap-1 lg:mt-0">
                                <NumberFlow value={shown ? x.price : 0} className="font-display text-[2.3rem] leading-none tabular-nums short:text-[2rem] sm:text-5xl low:text-[2.75rem]" />
                                <span className="text-xs font-medium text-cocoa sm:text-sm">lei</span>
                                <span className="ml-1 text-[0.55rem] tracking-[0.14em] text-cocoa/70 uppercase sm:text-[0.62rem]">/ {x.period}</span>
                            </span>
                            {x.note && <span className="mt-1.5 block text-[0.6rem] leading-snug text-cocoa/80 italic sm:text-xs lg:mt-2 lg:basis-full">* {x.note}</span>}
                        </a>
                    ))}
                </div>
            </div>

            <p className="relative mt-4 px-4 text-center text-[0.78rem] text-cocoa short:mt-3 tiny:hidden sm:mt-10 sm:text-sm lg:hidden">
                Ai întrebări despre abonamente?{' '}
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-bronze underline underline-offset-4">
                    Scrie-ne pe WhatsApp
                </a>
            </p>
        </section>
    );
}

function MembershipCard({ m, term, shown }: { m: Membership; term: Term; shown: boolean }) {
    const dark = m.featured;
    const price = term === 'quarter' ? m.quarter : m.month;
    const saving = m.month * 3 - m.quarter;
    const perMonth = Math.round(m.quarter / 3);

    return (
        <li
            data-plan
            className={`relative flex flex-col rounded-[1.4rem] p-3.5 short:p-3 sm:rounded-[2rem] sm:p-8 low:p-7 lower:p-5 ${
                dark
                    ? 'bg-espresso text-cream shadow-[0_50px_90px_-40px_rgba(42,32,26,0.95)]'
                    : 'border border-bronze/15 bg-cream shadow-[0_40px_80px_-50px_rgba(139,108,79,0.8)]'
            }`}
        >
            {dark && (
                <>
                    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
                        <span className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gold/25 blur-3xl" />
                    </span>
                    <span className="absolute -top-2.5 right-3 rounded-full bg-gold px-2.5 py-1 text-[0.5rem] font-semibold tracking-[0.18em] text-ink uppercase sm:-top-3 sm:right-8 sm:px-3.5 sm:text-[0.6rem]">
                        Recomandat
                    </span>
                </>
            )}

            <p className={`relative text-[0.55rem] font-medium tracking-[0.2em] uppercase sm:text-[0.66rem] sm:tracking-[0.26em] ${dark ? 'text-gold-soft' : 'text-bronze'}`}>
                {m.tagline}
            </p>
            <h3 className="relative mt-1 font-display text-[1.3rem] leading-[1.02] sm:mt-2 sm:text-4xl low:text-[2.2rem] lower:text-[1.8rem]">{m.name}</h3>

            <div className="relative mt-auto pt-3 sm:mt-0 sm:pt-6 low:pt-4">
                <div className="flex items-baseline gap-1.5">
                    <NumberFlow
                        value={shown ? price : 0}
                        className={`font-display text-[3.1rem] leading-[0.85] tracking-[-0.02em] tabular-nums short:text-[2.6rem] sm:text-[7rem] low:text-[6rem] lower:text-[4.75rem] ${dark ? 'text-gold-soft' : ''}`}
                    />
                    <span className={`text-sm font-medium sm:text-xl ${dark ? 'text-cream/80' : 'text-cocoa'}`}>lei</span>
                </div>
                <p className={`mt-1.5 text-[0.58rem] tracking-[0.16em] uppercase sm:mt-2 sm:text-[0.7rem] ${dark ? 'text-cream/60' : 'text-cocoa/70'}`}>
                    {term === 'quarter' ? '/ 3 luni' : '/ lună'}
                </p>
                <p className={`mt-2 text-[0.66rem] leading-snug sm:mt-3 sm:text-sm ${dark ? 'text-cream/75' : 'text-cocoa'}`}>
                    {term === 'quarter' ? (
                        <>
                            <span className={`mr-1.5 inline-block rounded-full px-2 py-0.5 text-[0.58rem] font-semibold sm:text-xs ${dark ? 'bg-gold text-ink' : 'bg-espresso text-cream'}`}>
                                -{saving} lei
                            </span>
                            <span className="whitespace-nowrap">≈ {perMonth} lei / lună</span>
                        </>
                    ) : (
                        <>
                            sau <strong className="font-semibold">{m.quarter} lei</strong> pentru 3 luni
                        </>
                    )}
                </p>
            </div>

            <ul className={`relative mt-6 hidden space-y-2.5 border-t pt-6 text-sm sm:block low:mt-5 low:space-y-2 low:pt-5 lower:mt-3 lower:space-y-1 lower:pt-3 lower:text-[0.8rem] ${dark ? 'border-cream/15 text-cream/80' : 'border-espresso/10 text-cocoa'}`}>
                {m.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-2.5">
                        <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-gold' : 'text-bronze'}`} strokeWidth={2} />
                        {perk}
                    </li>
                ))}
            </ul>

            {/* Keeps the button at the bottom when the card is taller than its content. */}
            <span className="hidden flex-1 sm:block" />

            <a
                href={whatsappFor(`abonamentul ${m.name} (${term === 'quarter' ? '3 luni' : '1 lună'}, ${price} lei)`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative mt-7 hidden items-center justify-between rounded-full py-2 pr-2 pl-6 text-[0.64rem] font-semibold tracking-[0.2em] uppercase transition-colors sm:flex low:mt-6 lower:mt-4 ${
                    dark ? 'bg-gold text-ink hover:bg-gold-soft' : 'bg-espresso text-cream hover:bg-bronze'
                }`}
            >
                Vreau {m.name}
                <span
                    className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg] ${
                        dark ? 'bg-ink text-gold-soft' : 'bg-cream text-espresso'
                    }`}
                >
                    <Icon name="arrow" className="h-4 w-4" />
                </span>
            </a>
        </li>
    );
}
