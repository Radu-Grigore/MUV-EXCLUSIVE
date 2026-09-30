import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { openingDay, site, smartgym } from '@/lib/site';
import { bookingLinkProps } from '../BookingLink';
import { gsap } from '@/lib/scroll';
import { Countdown } from '../Countdown';
import { Icon } from '../Icon';
import { ShaderClouds } from '../ShaderClouds';

const MIST: [string, string, string, string] = ['#120d0a', '#221912', '#4a3726', '#a8835a'];

export function Opening() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
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
        },
        { scope: root },
    );

    return (
        <section ref={root} id="deschidere" data-snap className="phone-screen relative overflow-hidden bg-ink py-8 text-cream short:py-5 sm:flex sm:min-h-[calc(100svh-72px)] sm:flex-col sm:justify-center sm:py-24 low:py-8">
            <div className="pointer-events-none absolute inset-0 opacity-70">
                <ShaderClouds colors={MIST} speed={0.7} />
            </div>
            <div
                data-ring
                className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[140vw] max-w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full sm:h-[calc(100%-1rem)] sm:w-auto sm:max-w-none shadow-[0_0_120px_10px_rgba(199,160,106,0.22),inset_0_0_120px_10px_rgba(199,160,106,0.1)] sm:w-[90vw]"
            />
            <svg
                aria-hidden="true"
                viewBox="0 0 600 600"
                className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[125vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 -rotate-90 sm:h-[calc(100%-3rem)] sm:max-h-[760px] sm:w-auto sm:max-w-none"
            >
                <circle data-draw cx="300" cy="300" r="290" fill="none" stroke="#c7a06a" strokeWidth="1.2" />
                <circle data-draw cx="300" cy="300" r="262" fill="none" stroke="#c7a06a" strokeOpacity="0.35" strokeWidth="0.8" strokeDasharray="2 8" />
            </svg>
            <div className="relative mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
                <p className="eyebrow text-gold">Deschidere oficială</p>
                <h2 data-date className="mt-4 font-display sm:mt-6 text-[17vw] leading-none font-light whitespace-nowrap sm:text-8xl lg:text-9xl low:text-[min(8rem,12svh)]">
                    01<span className="text-gold">.</span>11<span className="text-gold">.</span>2026
                </h2>
                <p className="mt-2 font-script text-4xl text-gold-soft sm:mt-4 sm:text-6xl low:mt-2 low:text-5xl">Te așteptăm!</p>

                <div className="mx-auto mt-6 max-w-2xl short:mt-4 sm:mt-12 low:mt-6">
                    <Countdown />
                </div>

                <p className="eyebrow mt-5 text-[0.6rem] text-gold-soft short:mt-3 sm:mt-10 sm:text-[0.7rem] low:mt-6">În ziua deschiderii</p>
                <ul className="mx-auto mt-2.5 grid max-w-2xl grid-cols-3 divide-x divide-gold/20 sm:mt-4">
                    {openingDay.map((item) => (
                        <li key={item.label} data-stat className="px-2">
                            <span className="block font-display text-[2.6rem] leading-none text-gold-soft short:text-[2.1rem] sm:text-6xl low:text-5xl">{item.value}</span>
                            <span className="mt-1.5 block text-[0.62rem] leading-snug tracking-[0.08em] text-cream/70 uppercase sm:text-[0.7rem] sm:tracking-[0.16em]">{item.label}</span>
                        </li>
                    ))}
                </ul>

                <p className="mx-auto mt-4 max-w-xl text-[0.8rem] leading-snug text-cream/65 short:mt-3 sm:mt-8 sm:text-sm sm:leading-relaxed low:mt-5">
                    Rezervările se fac tot prin aplicația <span className="text-cream">SmartGym</span> (codul sălii {smartgym.gymCode}). Pentru informații suplimentare, ne poți contacta pe WhatsApp.
                </p>
                <div className="mt-4 flex items-center justify-center gap-2.5 short:mt-3 sm:mt-8 sm:gap-3 low:mt-5">
                    <a
                        {...bookingLinkProps()}
                        data-magnetic
                        className="group inline-flex items-center gap-3 rounded-full bg-gold py-2.5 pr-2.5 pl-5 text-[0.62rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-soft sm:py-3 sm:pr-3 sm:pl-7 sm:text-[0.66rem] sm:tracking-[0.22em]"
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
                        className="inline-flex h-[3.5rem] items-center gap-2 rounded-full border border-cream/25 px-4 text-[0.62rem] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-gold hover:text-gold-soft sm:h-[3.75rem] sm:px-6"
                    >
                        <Icon name="whatsapp" className="h-5 w-5" />
                        <span className="hidden sm:inline">WhatsApp</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
