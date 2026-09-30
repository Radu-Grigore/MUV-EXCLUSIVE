import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import { useEffect, useRef, useState } from 'react';
import { appStoreForDevice, asset, site, smartgym } from '@/lib/site';
import { gsap, ScrollTrigger, whenNear } from '@/lib/scroll';
import { openAndroidApp } from '../BookingLink';
import { Icon } from '../Icon';

const steps = [
    <>
        Descarcă aplicația <strong className="font-semibold text-espresso">SmartGym</strong> din App Store sau Google Play.
    </>,
    <>Creează-ți un cont cu datele tale. Durează mai puțin de un minut.</>,
    <>
        Introdu codul sălii: <strong className="font-semibold text-bronze">{smartgym.gymCode}</strong>, ca să te conectezi la sala noastră.
    </>,
    <>Alege clasa și ora preferată și confirmă rezervarea.</>,
];

/** How to book a class: the SmartGym app, the gym code and the store links. */
export function Booking() {
    const root = useRef<HTMLElement>(null);
    const [code, setCode] = useState(0);
    const [copied, setCopied] = useState(false);

    useGSAP(
        (_, contextSafe) =>
            // Prepared once the section is about a screen away, so it costs nothing at start-up.
            whenNear(root.current, contextSafe!(() => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                gsap.from('[data-step]', {
                    x: -40,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-steps]', start: 'top 85%', once: true },
                });
                gsap.from('[data-app-card]', {
                    y: 70,
                    autoAlpha: 0,
                    duration: 1.3,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-app-card]', start: 'top 90%', once: true },
                });
                // The gym code counts up to 3490 when the card comes into view.
                ScrollTrigger.create({ trigger: '[data-app-card]', start: 'top 80%', once: true, onEnter: () => setCode(Number(smartgym.gymCode)) });
            });
        })),
        { scope: root },
    );

    useEffect(() => {
        if (!copied) return;
        const id = setTimeout(() => setCopied(false), 2000);
        return () => clearTimeout(id);
    }, [copied]);

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(smartgym.gymCode);
            setCopied(true);
        } catch {
            /* clipboard unavailable: the code stays visible anyway */
        }
    }

    // On Android the Google Play button first tries to open the installed app.
    const android = appStoreForDevice() === smartgym.googlePlay;
    const stores = [
        { href: smartgym.appStore, icon: 'apple' as const, small: 'Descarcă din', label: 'App Store' },
        { href: smartgym.googlePlay, icon: 'googleplay' as const, small: 'Disponibil pe', label: 'Google Play' },
    ];

    return (
        <section
            ref={root}
            id="rezervari"
            data-snap
            className="phone-screen relative overflow-hidden bg-cream py-6 text-espresso sm:py-24 lg:flex lg:min-h-[calc(100svh-72px)] lg:flex-col lg:justify-center lg:py-12"
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(50% 60% at 85% 50%, rgba(230,207,166,0.55) 0%, transparent 70%)' }}
            />

            <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-4 px-5 sm:gap-12 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
                <div className="lg:col-span-6">
                    <p className="eyebrow flex items-center gap-3 text-bronze">
                        <span className="h-px w-8 bg-gold" /> Rezervări
                    </p>
                    <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] tiny:text-[1.65rem] sm:mt-5 sm:text-7xl low:text-6xl">
                        Rezervă-ți clasa <em className="text-bronze">din aplicație</em>
                    </h2>
                    <p className="mt-2 max-w-xl text-[0.8rem] leading-snug text-cocoa short:hidden sm:mt-6 sm:text-base sm:leading-relaxed low:mt-4">
                        <span className="hidden sm:inline">Pentru a-ți face viața mai ușoară, rezervările </span>
                        <span className="sm:hidden">Rezervările </span>
                        la clase se fac simplu și rapid prin aplicația SmartGym. Îți alegi ora care ți se potrivește, direct de pe telefon
                        <span className="hidden sm:inline">, oricând și de oriunde</span>.
                    </p>

                    <p className="eyebrow mt-3 text-[0.6rem] text-bronze tiny:hidden sm:mt-10 low:mt-6">Cum te înscrii</p>
                    <ol data-steps className="mt-2 grid gap-1.5 tiny:mt-3 tiny:gap-1 sm:mt-4 sm:gap-3">
                        {steps.map((text, i) => (
                            <li key={i} data-step className="flex items-start gap-3 sm:gap-4">
                                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-espresso font-display text-sm leading-none text-gold-soft sm:h-9 sm:w-9 sm:text-lg">
                                    {i + 1}
                                </span>
                                <span className="pt-0.5 text-[0.8rem] leading-snug text-cocoa sm:pt-1.5 sm:text-base">{text}</span>
                            </li>
                        ))}
                    </ol>
                    <p data-step className="mt-2 flex items-start gap-3 text-[0.8rem] leading-snug sm:mt-5 sm:gap-4 sm:text-base">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold text-ink sm:h-9 sm:w-9">
                            <Icon name="check" className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="pt-0.5 sm:pt-1.5">
                            <strong className="font-semibold">Gata!</strong> Locul tău este rezervat și te așteptăm la antrenament.
                        </span>
                    </p>
                </div>

                <div className="lg:col-span-6">
                    <div
                        data-app-card
                        className="relative overflow-hidden rounded-[1.4rem] bg-espresso p-3.5 text-cream shadow-[0_50px_90px_-45px_rgba(42,32,26,0.8)] sm:rounded-[2rem] sm:p-10"
                    >
                        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />

                        <div className="relative flex items-center justify-between gap-4 sm:items-start">
                            <div>
                                <p className="eyebrow text-[0.6rem] text-gold-soft sm:text-[0.7rem]">Codul sălii în SmartGym</p>
                                <div className="mt-1 flex items-center gap-3 sm:mt-3">
                                    <NumberFlow
                                        value={code}
                                        format={{ useGrouping: false, minimumIntegerDigits: 4 }}
                                        className="font-display text-[2.6rem] leading-none text-gold-soft tabular-nums sm:text-8xl"
                                        aria-label={`Codul sălii: ${smartgym.gymCode}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={copyCode}
                                        aria-label="Copiază codul sălii"
                                        className="inline-flex items-center gap-1.5 rounded-full border border-cream/20 px-3 py-2 text-[0.58rem] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-gold hover:text-gold-soft"
                                    >
                                        <Icon name={copied ? 'check' : 'copy'} className="h-3.5 w-3.5" />
                                        {copied ? 'Copiat' : 'Copiază'}
                                    </button>
                                </div>
                            </div>
                            <figure className="hidden shrink-0 text-center sm:block">
                                <img
                                    src={asset('/images/smartgym-qr.svg')}
                                    alt="Cod QR pentru descărcarea aplicației SmartGym"
                                    width={144}
                                    loading="lazy"
                                    height={144}
                                    className="h-28 w-28 rounded-xl bg-white p-1 lg:h-36 lg:w-36"
                                />
                                <figcaption className="mt-2 text-[0.58rem] tracking-[0.2em] text-cream/55 uppercase">Scanează cu telefonul</figcaption>
                            </figure>
                        </div>

                        <div className="relative mt-3 grid grid-cols-2 gap-2 sm:mt-8 sm:gap-3">
                            {stores.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    onClick={android && s.href === smartgym.googlePlay ? openAndroidApp : undefined}
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-center gap-2.5 rounded-xl bg-cream px-3 py-2 text-espresso sm:rounded-2xl transition-colors hover:bg-gold-soft sm:justify-start sm:gap-3 sm:px-5 sm:py-3.5"
                                >
                                    <Icon name={s.icon} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                                    <span className="leading-none">
                                        <span className="block text-[0.55rem] tracking-[0.12em] text-cocoa uppercase">{s.small}</span>
                                        <span className="mt-1 block text-[0.95rem] font-semibold sm:text-lg">{s.label}</span>
                                    </span>
                                </a>
                            ))}
                        </div>

                        <p className="relative mt-3 border-t border-cream/10 pt-2.5 text-[0.74rem] leading-snug text-cream/70 sm:mt-8 sm:pt-6 sm:text-sm sm:leading-relaxed">
                            Ai nevoie de ajutor cu înscrierea? Ne găsești pe{' '}
                            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold-soft underline underline-offset-4">
                                WhatsApp
                            </a>{' '}
                            și ne poți contacta oricând.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
