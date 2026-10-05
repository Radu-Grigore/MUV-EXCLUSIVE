import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { services, site, type Service } from '@/lib/site';
import { pageHref } from '@/lib/routes';
import { gsap, lockScroll, whenNear } from '@/lib/scroll';
import { Icon } from '../Icon';

// The full text opens in a panel; Motion is only loaded when someone opens one.
const ServiceDialog = lazy(() => import('./ServiceDialog'));

export function bookServiceHref(s: Service) {
    return `${site.whatsapp}?text=${encodeURIComponent(`Bună! Aș dori o programare pentru ${s.title.toLowerCase()} la MUV Exclusive.`)}`;
}

/** Complementary services (massage, nutrition): two cards on one screen, each opening to its full text. */
export function Services() {
    const root = useRef<HTMLElement>(null);
    const [active, setActive] = useState<Service | null>(null);
    const [used, setUsed] = useState(false);

    useGSAP(
        (_, contextSafe) =>
            // Prepared once the section is about a screen away, so it costs nothing at start-up.
            whenNear(root.current, contextSafe!(() => {
                gsap.from('[data-service]', {
                    y: 60,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-services]', start: 'top 88%', once: true },
                });
            })),
        { scope: root },
    );

    useEffect(() => {
        lockScroll(!!active);
        if (!active) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active]);

    function open(s: Service) {
        setUsed(true);
        setActive(s);
    }

    return (
        <section
            ref={root}
            id="servicii"
            data-snap
            className="phone-screen relative flex flex-col justify-center overflow-hidden bg-cream py-5 text-espresso short:py-4 sm:py-20 lg:min-h-[calc(100svh-72px)] lg:py-12 lower:py-6"
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(45% 55% at 25% 55%, rgba(230,207,166,0.4) 0%, transparent 70%)' }}
            />
            <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="text-center lg:flex lg:items-end lg:justify-between lg:gap-10 lg:text-left">
                    <div>
                        <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Servicii complementare <span className="h-px w-8 bg-gold lg:hidden" />
                        </p>
                        <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] sm:mt-4 sm:text-6xl lg:text-[clamp(2.75rem,6svh,4.25rem)]">
                            Dincolo de <em className="text-bronze">antrenament</em>
                        </h2>
                    </div>
                    <p className="mt-2 text-[0.8rem] text-cocoa short:hidden sm:text-sm lg:mt-0 lg:max-w-xs lg:text-right">
                        Recuperare și nutriție, ca să ai grijă de corpul tău și în afara clasei. Pe bază de programare.
                    </p>
                </div>

                <ul data-services className="mt-5 grid gap-3 short:mt-4 sm:mt-10 sm:gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-8 low:mt-6">
                    {services.map((s, i) => (
                        <li key={s.id} data-service>
                            <article
                                className={`relative flex h-full flex-col overflow-hidden rounded-[1.6rem] p-5 short:p-4 sm:rounded-[2rem] sm:p-10 lg:p-12 low:p-9 lower:p-7 ${
                                    i === 0 ? 'bg-espresso text-cream' : 'bg-white/80 text-espresso shadow-[0_30px_60px_-40px_rgba(42,32,26,0.6)]'
                                }`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full border sm:h-72 sm:w-72 ${i === 0 ? 'border-gold/20' : 'border-bronze/15'}`}
                                />
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full sm:h-14 sm:w-14 ${i === 0 ? 'bg-gold/15 text-gold-soft' : 'bg-gold-soft/50 text-bronze'}`}>
                                        <Icon name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-display text-[1.75rem] leading-none short:text-[1.5rem] sm:text-5xl">{s.title}</h3>
                                        <p className={`mt-1 text-[0.62rem] tracking-[0.16em] uppercase sm:mt-2 sm:text-xs ${i === 0 ? 'text-gold-soft' : 'text-bronze'}`}>{s.tagline}</p>
                                    </div>
                                    {/* Details: the service's own page, or the panel with its full text */}
                                    {(() => {
                                        const cls = `relative z-10 inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[0.58rem] font-semibold tracking-[0.18em] uppercase transition-colors sm:px-5 sm:py-3 sm:text-[0.64rem] ${
                                            i === 0 ? 'border-cream/25 hover:border-gold hover:text-gold-soft' : 'border-espresso/15 hover:border-espresso'
                                        }`;
                                        return s.page ? (
                                            <a href={pageHref(s.page)} className={cls}>
                                                Detalii <Icon name="arrow" className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <button type="button" onClick={() => open(s)} className={cls}>
                                                Detalii <Icon name="arrow" className="h-3 w-3" />
                                            </button>
                                        );
                                    })()}
                                </div>
                                <p className={`mt-6 hidden leading-relaxed sm:block lg:hidden xl:block lower:hidden sm:text-base lg:max-w-xl ${i === 0 ? 'text-cream/75' : 'text-cocoa'}`}>{s.lead}</p>
                                <p className={`mt-2 font-script text-[1.7rem] leading-tight short:hidden sm:mt-6 sm:text-4xl lower:mt-4 lower:text-3xl ${i === 0 ? 'text-gold-soft' : 'text-bronze'}`}>{s.motto}</p>
                                <div className="mt-auto pt-3 sm:pt-8 lower:pt-5">
                                    {s.prices ? (
                                        // Priced services show their price list here; booking is in the details.
                                        <ul className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${s.prices.length}, minmax(0, 1fr))` }} aria-label={`Prețuri ${s.title.toLowerCase()}`}>
                                            {s.prices.map((p) => (
                                                <li
                                                    key={p.label}
                                                    className={`flex flex-col justify-between rounded-2xl border px-2 py-2 text-center sm:px-3 sm:py-3 ${i === 0 ? 'border-gold/25 bg-cream/5' : 'border-espresso/10 bg-white/70'}`}
                                                >
                                                    <span className={`block text-[0.52rem] leading-tight font-medium tracking-[0.12em] uppercase sm:text-[0.6rem] ${i === 0 ? 'text-cream/70' : 'text-cocoa'}`}>
                                                        {p.label}
                                                        {p.detail && <span className="block normal-case tracking-normal opacity-80">{p.detail}</span>}
                                                    </span>
                                                    <span className={`mt-1 block font-display text-[1.45rem] leading-none sm:text-[2rem] ${i === 0 ? 'text-gold-soft' : 'text-espresso'}`}>
                                                        {p.price.toLocaleString('ro-RO')}
                                                        <span className="ml-0.5 font-sans text-[0.55rem] tracking-[0.1em] uppercase opacity-70 sm:text-[0.62rem]">lei</span>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <a
                                            href={bookServiceHref(s)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex w-full items-center justify-center gap-2 rounded-full py-3 text-[0.62rem] font-semibold tracking-[0.2em] uppercase transition-colors sm:py-4 sm:text-[0.66rem] ${
                                                i === 0 ? 'bg-gold text-ink hover:bg-gold-soft' : 'bg-espresso text-cream hover:bg-bronze'
                                            }`}
                                        >
                                            <Icon name="whatsapp" className="h-4 w-4" /> Programează-te
                                        </a>
                                    )}
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            </div>

            {used && (
                <Suspense fallback={null}>
                    <ServiceDialog active={active} onClose={() => setActive(null)} />
                </Suspense>
            )}
        </section>
    );
}
