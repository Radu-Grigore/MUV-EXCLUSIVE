import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { openingDay, openingSchedule, site, smartgym } from '@/lib/site';
import { bookingLinkProps } from '../BookingLink';
import '@/lib/gsap-extra';
import { gsap, whenNear } from '@/lib/scroll';
import { Countdown } from '../Countdown';
import { Icon } from '../Icon';
import { ShaderClouds } from '../ShaderClouds';

const MIST: [string, string, string, string] = ['#120d0a', '#221912', '#4a3726', '#a8835a'];

export function Opening() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        (_, contextSafe) =>
            // Prepared once the section is about a screen away, so it costs nothing at start-up.
            whenNear(root.current, contextSafe!(() => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                gsap.fromTo(
                    '[data-date]',
                    { scale: 0.72, letterSpacing: '0.2em' },
                    {
                        scale: 1,
                        letterSpacing: '0.02em',
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top 90%', end: 'center 55%', scrub: true },
                    },
                );
                gsap.fromTo(
                    '[data-draw]',
                    { drawSVG: '50% 50%' },
                    {
                        drawSVG: '0% 100%',
                        ease: 'none',
                        stagger: 0.15,
                        scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'center 45%', scrub: true },
                    },
                );
                gsap.from('[data-day-card]', {
                    y: 60,
                    autoAlpha: 0,
                    duration: 1.3,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: root.current, start: 'top 60%', once: true },
                });
                gsap.from('[data-stat]', {
                    y: 30,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: root.current, start: 'top 55%', once: true },
                });
                gsap.fromTo(
                    '[data-ring]',
                    { scale: 0.6, opacity: 0 },
                    { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 80%', end: 'center center', scrub: true } },
                );
            });
        })),
        { scope: root },
    );

    return (
        <section ref={root} id="deschidere" data-snap className="phone-screen relative overflow-hidden bg-ink py-5 text-cream sm:flex sm:min-h-[calc(100svh-72px)] sm:flex-col sm:justify-center sm:py-24 low:py-10 lower:py-6">
            <div className="pointer-events-none absolute inset-0 opacity-70">
                <ShaderClouds colors={MIST} speed={0.7} />
            </div>
            <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-6 px-5 text-center short:gap-4 sm:gap-12 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
                {/* The date and the countdown */}
                <div className="relative isolate lg:col-span-7">
                    {/* The rings are centred on this column (the date and the countdown), whatever the screen width. */}
                    <div
                        data-ring
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[140vw] max-w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_120px_10px_rgba(199,160,106,0.22),inset_0_0_120px_10px_rgba(199,160,106,0.1)] sm:w-[44rem] lg:w-[46rem] low:w-[40rem]"
                    />
                    <svg
                        aria-hidden="true"
                        viewBox="0 0 600 600"
                        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 aspect-square w-[125vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 -rotate-90 sm:w-[40rem] lg:w-[42rem] low:w-[36rem]"
                    >
                        <circle data-draw cx="300" cy="300" r="290" fill="none" stroke="#c7a06a" strokeWidth="1.2" />
                        <circle data-draw cx="300" cy="300" r="262" fill="none" stroke="#c7a06a" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 8" />
                    </svg>
                    <p className="eyebrow text-gold">Deschidere oficială</p>
                    <h2
                        data-date
                        className="mt-4 font-display text-[17vw] leading-none font-light whitespace-nowrap short:mt-3 sm:mt-6 sm:text-8xl lg:text-[min(9rem,10vw)] low:text-[min(9rem,10vw,14svh)]"
                    >
                        01<span className="text-gold">.</span>11<span className="text-gold">.</span>2026
                    </h2>
                    <p className="mt-4 hidden font-script text-6xl text-gold-soft sm:block low:mt-3">Te așteptăm!</p>

                    <div className="mx-auto mt-4 max-w-2xl sm:mt-10 lg:max-w-[31rem] low:mt-8 low:max-w-[28rem]">
                        <Countdown />
                    </div>
                </div>

                {/* What happens on the day */}
                <div className="lg:col-span-5">
                    <div
                        data-day-card
                        className="relative mx-auto max-w-xl overflow-hidden rounded-[1.6rem] border border-gold/25 bg-[linear-gradient(160deg,rgba(42,32,26,0.72),rgba(22,17,14,0.62))] p-5 text-left short:p-4 sm:rounded-[2rem] sm:p-10 low:p-8 lower:p-6"
                    >
                        <p className="eyebrow text-[0.6rem] text-gold-soft sm:text-[0.7rem]">În ziua deschiderii</p>
                        <ul className="mt-3 grid grid-cols-3 gap-3 short:hidden sm:mt-5 lower:mt-3">
                            {openingDay.map((item) => (
                                <li key={item.label} data-stat>
                                    <span className="block font-display text-[2.1rem] leading-none text-gold-soft sm:text-5xl low:text-[2.6rem] lower:text-[2.2rem]">{item.value}</span>
                                    <span className="mt-1 block text-[0.56rem] leading-snug tracking-[0.1em] text-cream/75 uppercase sm:text-[0.66rem] sm:tracking-[0.14em]">{item.label}</span>
                                </li>
                            ))}
                        </ul>

                        {/* The day's timetable */}
                        <p className="eyebrow mt-4 text-[0.56rem] text-gold-soft/80 short:mt-3 sm:mt-7 sm:text-[0.62rem] low:mt-5 lower:mt-3">Programul zilei</p>
                        <ol className="mt-1.5 divide-y divide-gold/15 sm:mt-2">
                            {openingSchedule.map((c) => (
                                <li key={c.time} data-stat className="flex items-baseline gap-3 py-1.5 text-[0.78rem] short:py-1 sm:gap-4 sm:py-2.5 sm:text-[0.95rem] low:py-2 lower:py-1.5">
                                    <span className="w-[6.4rem] shrink-0 font-medium text-gold-soft tabular-nums sm:w-[7.6rem]">{c.time}</span>
                                    <span className="min-w-0 flex-1 truncate text-cream">{c.name}</span>
                                    <span className="shrink-0 text-cream/60">{c.by}</span>
                                </li>
                            ))}
                        </ol>

                        <p className="mt-3 border-t border-gold/15 pt-3 text-[0.78rem] leading-relaxed text-cream/70 short:hidden sm:mt-6 sm:pt-5 sm:text-sm low:mt-4 low:pt-4 lower:mt-3 lower:pt-3">
                            Rezervările se fac prin aplicația <span className="text-cream">SmartGym</span>, cu codul sălii{' '}
                            <span className="font-semibold text-gold-soft">{smartgym.gymCode}</span>.
                            <span className="hidden sm:inline lower:hidden"> Pentru informații suplimentare, ne poți contacta pe WhatsApp.</span>
                        </p>

                        <div className="mt-4 flex items-center gap-2.5 short:mt-3 sm:mt-8 sm:gap-3 low:mt-6 lower:mt-4">
                            <a
                                {...bookingLinkProps()}
                                data-magnetic
                                className="group inline-flex flex-1 items-center justify-between gap-3 rounded-full bg-gold py-2.5 pr-2.5 pl-5 text-[0.62rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-soft sm:py-3 sm:pr-3 sm:pl-7 sm:text-[0.66rem] sm:tracking-[0.22em]"
                            >
                                Rezervă în aplicație
                                <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-gold-soft transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                                    <Icon name="arrow" className="h-4 w-4" />
                                </span>
                            </a>
                            <a
                                href={site.whatsapp}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Informații pe WhatsApp"
                                className="grid h-[3.5rem] w-[3.5rem] shrink-0 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold hover:text-gold-soft sm:h-[3.75rem] sm:w-[3.75rem]"
                            >
                                <Icon name="whatsapp" className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
