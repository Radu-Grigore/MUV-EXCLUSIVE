import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { site } from '@/lib/site';
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
            mm.add('(prefers-reduced-motion: no-preference)', () => {
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
        <section ref={root} id="deschidere" data-scroll-edge className="relative overflow-hidden bg-ink py-20 text-cream sm:py-24">
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
            <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
                <p className="eyebrow text-gold">Deschidere oficială</p>
                <h2 data-date className="mt-6 font-display text-[17vw] leading-none font-light whitespace-nowrap sm:text-8xl lg:text-9xl">
                    01<span className="text-gold">.</span>11<span className="text-gold">.</span>2026
                </h2>
                <p className="mt-4 font-script text-5xl text-gold-soft sm:text-6xl">Te așteptăm!</p>

                <div className="mx-auto mt-12 max-w-2xl">
                    <Countdown />
                </div>

                <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-cream/65">
                    Locurile în grupe sunt limitate. Scrie-ne acum și îți păstrăm un loc la primele clase — plus o surpriză pentru membrele fondatoare.
                </p>
                <a
                    href={site.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gold py-3 pr-3 pl-7 text-[0.66rem] font-semibold tracking-[0.22em] text-ink uppercase transition-colors hover:bg-gold-soft"
                >
                    Vreau să fiu printre primele
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-gold-soft transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                        <Icon name="arrow" className="h-4 w-4" />
                    </span>
                </a>
            </div>
        </section>
    );
}
