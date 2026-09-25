import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { asset, site } from '@/lib/site';
import { gsap, hasFinePointer, introDone, scrollToTarget } from '@/lib/scroll';
import { Icon } from '../Icon';
import { ShaderClouds } from '../ShaderClouds';

const CLOUDS: [string, string, string, string] = ['#d9c3a6', '#e9dac7', '#f3e7d6', '#fdf8f1'];

export function Hero() {
    const root = useRef<HTMLElement>(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out', duration: 1.4 } });
                intro
                    .from('[data-hero-cover]', { scaleY: 1, duration: 1.6, ease: 'expo.inOut' }, 0)
                    .from('[data-hero-img]', { scale: 1.35, duration: 2.2 }, 0.2)
                    .from('[data-hero-letter]', { yPercent: 105, stagger: 0.08 }, 0.35)
                    .from('[data-hero-fade]', { autoAlpha: 0, y: 24, stagger: 0.08, duration: 1.1 }, 0.7)
                    .from('[data-hero-badge]', { autoAlpha: 0, scale: 0.6, rotate: -60, duration: 1.4 }, 0.9);
                introDone.then(() => intro.play());

                // Desktop: the photo, badge and wordmark drift with the pointer for depth.
                if (hasFinePointer()) {
                    const layers = [
                        { el: '[data-hero-img]', depth: -18 },
                        { el: '[data-hero-badge]', depth: 26 },
                        { el: '[data-hero-letters]', depth: 12 },
                    ].map(({ el, depth }) => ({
                        depth,
                        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }),
                        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }),
                    }));
                    const onMove = (e: PointerEvent) => {
                        const nx = e.clientX / window.innerWidth - 0.5;
                        const ny = e.clientY / window.innerHeight - 0.5;
                        layers.forEach((l) => {
                            l.x(nx * l.depth);
                            l.y(ny * l.depth);
                        });
                    };
                    window.addEventListener('pointermove', onMove, { passive: true });
                    return () => window.removeEventListener('pointermove', onMove);
                }

                gsap.timeline({
                    scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
                })
                    .to('[data-hero-img]', { yPercent: 14, ease: 'none' }, 0)
                    .to('[data-hero-word]', { yPercent: -28, ease: 'none' }, 0)
                    .to('[data-hero-frame]', { yPercent: -8, ease: 'none' }, 0);
            });
        },
        { scope: root },
    );

    return (
        <section ref={root} id="top" data-snap className="relative min-h-[640px] p-2 sm:p-3 lg:min-h-[720px]" style={{ height: '100svh' }}>
            <div className="relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] pt-[64px] sm:rounded-[2.25rem]">
                <div
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                        background:
                            'radial-gradient(55% 60% at 78% 28%, rgba(255,246,228,0.95) 0%, transparent 70%), radial-gradient(60% 50% at 8% 95%, rgba(214,192,165,0.7) 0%, transparent 70%), linear-gradient(160deg, #efe3d3 0%, #e7d6c2 100%)',
                    }}
                />
                <div className="absolute inset-0 -z-10">
                    <ShaderClouds colors={CLOUDS} />
                </div>

                <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-5 sm:px-8 lg:px-12">
                    {/* Top row */}
                    <div className="relative z-20 flex items-start justify-between gap-4 pt-6 sm:gap-6 lg:pt-10">
                        <div className="min-w-0 max-w-[20rem]">
                            <p data-hero-fade className="eyebrow hidden items-center gap-3 text-bronze sm:flex">
                                <span className="h-px w-8 bg-gold" /> {site.city} · {site.openingLabel}
                            </p>
                            <p data-hero-fade className="eyebrow flex items-start gap-3 text-bronze sm:hidden">
                                <span className="mt-[0.45em] h-px w-6 bg-gold" />
                                <span className="leading-relaxed">
                                    Deschidere
                                    <br />
                                    {site.openingLabel}
                                </span>
                            </p>
                            <p data-hero-fade className="mt-5 hidden text-[0.95rem] leading-relaxed text-cocoa sm:block">
                                Studio boutique de fitness și wellness, creat exclusiv pentru femei. More than a workout — a better you.
                            </p>
                            <div data-hero-fade className="mt-6 hidden gap-3 sm:flex">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToTarget('#contact');
                                    }}
                                    data-magnetic
                                    className="group inline-flex items-center gap-2 rounded-full bg-espresso py-3.5 pr-3.5 pl-6 text-[0.66rem] font-semibold tracking-[0.22em] text-cream uppercase transition-colors hover:bg-bronze"
                                >
                                    Rezervă-ți locul
                                    <span className="grid h-7 w-7 place-items-center rounded-full bg-cream text-espresso transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                                        <Icon name="arrow" className="h-3.5 w-3.5" />
                                    </span>
                                </a>
                            </div>
                        </div>
                        <OpeningBadge pathId="badge-circle-phone" className="relative -mt-2 grid h-24 w-24 shrink-0 sm:hidden" />
                        <p data-hero-fade className="eyebrow hidden text-right leading-loose text-cocoa md:block">
                            Boutique
                            <br />
                            Fitness Studio
                            <br />
                            <span className="text-bronze">Women Only</span>
                        </p>
                    </div>

                    {/* Arch image */}
                    <div
                        data-hero-frame
                        className="absolute top-[22%] left-1/2 z-10 w-[58vw] max-w-[300px] -translate-x-1/2 sm:top-[16%] sm:max-w-[340px] lg:top-[12%] lg:right-[16%] lg:left-auto lg:w-[24vw] lg:max-w-[380px] lg:translate-x-0"
                    >
                        <div className="relative aspect-[38/62] overflow-hidden rounded-t-full rounded-b-[2rem] bg-sand shadow-[0_50px_90px_-45px_rgba(42,32,26,0.7)]">
                            <img
                                data-hero-img
                                src={asset('/images/athlete.webp')}
                                alt="Femeie antrenându-se în studioul MUV Exclusive"
                                width={760}
                                height={1500}
                                className="absolute inset-0 h-[115%] w-full object-cover object-top"
                                fetchPriority="high"
                                decoding="async"
                            />
                            <span data-hero-cover className="absolute inset-0 origin-top scale-y-0 bg-cream" />
                        </div>
                        <OpeningBadge pathId="badge-circle" className="absolute top-[14%] -left-16 z-20 hidden h-32 w-32 sm:grid lg:h-36 lg:w-36" />
                        <p
                            data-hero-fade
                            className="absolute -bottom-5 -right-16 hidden font-script text-6xl leading-none whitespace-nowrap text-bronze drop-shadow-[0_2px_10px_rgba(247,241,234,0.9)] sm:block"
                        >
                            a better you
                        </p>
                    </div>

                    {/* Giant wordmark */}
                    <div data-hero-word className="relative z-20 mt-auto pb-24 sm:pb-8 lg:pb-10">
                        <h1 className="flex flex-col">
                            <span className="sr-only">MUV Exclusive — Boutique Fitness Studio, Women Only, Ploiești</span>
                            <span aria-hidden="true" data-hero-letters className="flex font-display text-[39vw] leading-[0.74] font-medium tracking-[-0.03em] sm:text-[30vw] lg:text-[23vw] 2xl:text-[20rem]">
                                {'MUV'.split('').map((l, i) => (
                                    <span key={i} className="line-mask">
                                        <span data-hero-letter className="text-gold-gradient block">
                                            {l}
                                        </span>
                                    </span>
                                ))}
                            </span>
                            <span aria-hidden="true" data-hero-fade className="mt-3 flex items-center gap-4 pl-[1.2vw]">
                                <span className="text-[4vw] font-light tracking-[0.45em] text-espresso sm:text-[3vw] sm:tracking-[0.62em] lg:text-[1.9vw] 2xl:text-[1.6rem]">
                                    EXCLUSIVE
                                </span>
                                <span className="hidden h-px flex-1 bg-bronze/30 lg:block lg:max-w-[18vw]" />
                                <span className="ml-auto font-script text-[2rem] leading-none whitespace-nowrap text-bronze sm:hidden">a better you</span>
                            </span>
                        </h1>
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-3 sm:hidden">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTarget('#contact');
                            }}
                            className="flex-1 rounded-full bg-espresso py-4 text-center text-[0.66rem] font-semibold tracking-[0.22em] text-cream uppercase"
                        >
                            Rezervă-ți locul
                        </a>
                        <a
                            href="#clase"
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTarget('#clase');
                            }}
                            className="rounded-full border border-espresso/20 bg-cream/70 px-6 py-4 text-[0.66rem] font-semibold tracking-[0.22em] text-espresso uppercase"
                        >
                            Clase
                        </a>
                    </div>

                    <div data-hero-fade className="absolute right-12 bottom-10 z-20 hidden items-center gap-4 lg:flex">
                        <span className="eyebrow text-cocoa">Scroll</span>
                        <span className="relative h-14 w-px overflow-hidden bg-bronze/20">
                            <span className="absolute inset-0 animate-scroll-cue bg-bronze" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

/** Round badge with the opening date and a rotating "Deschidere oficială" ring. */
function OpeningBadge({ pathId, className }: { pathId: string; className: string }) {
    return (
        <div data-hero-badge className={`place-items-center rounded-full bg-cream text-espresso shadow-[0_20px_40px_-20px_rgba(42,32,26,0.6)] ${className}`}>
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-bronze" aria-hidden="true">
                <defs>
                    <path id={pathId} d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-current text-[7.2px] font-medium tracking-[0.22em] uppercase">
                    <textPath href={`#${pathId}`}>Deschidere oficială · Grand opening ·</textPath>
                </text>
            </svg>
            <span className="absolute inset-[22%] rounded-full border border-espresso/15" />
            <span className="relative text-center leading-none">
                <span className="block font-display text-[1.6rem] sm:text-[2rem] lg:text-[2.3rem]">01.11</span>
                <span className="mt-0.5 block text-[0.5rem] font-medium tracking-[0.3em] text-bronze">2026</span>
            </span>
        </div>
    );
}
