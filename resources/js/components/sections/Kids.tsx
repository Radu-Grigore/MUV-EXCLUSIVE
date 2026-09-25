import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useRef, useState } from 'react';
import { asset, kidsFeatures, type GalleryItem } from '@/lib/site';
import { gsap, hasFinePointer } from '@/lib/scroll';
import { Icon } from '../Icon';
import { KidsPlayground } from '../KidsPlayground';

const Lightbox = lazy(() => import('./Lightbox'));

const colors = ['#6f7f4d', '#e0a93b', '#3f6fa3', '#c86b6b'];

const poster: GalleryItem = {
    src: asset('/images/kids-corner.webp'),
    title: 'Kids Corner la MUV Exclusive',
    caption: 'Pentru mai mult timp pentru tine.',
    width: 1145,
    height: 1374,
};

export function Kids() {
    const root = useRef<HTMLElement>(null);
    const posterCard = useRef<HTMLButtonElement>(null);
    const [zoomed, setZoomed] = useState(false);
    const [lightboxUsed, setLightboxUsed] = useState(false);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                // The room opens up from a smaller rounded window as the section scrolls in.
                gsap.fromTo(
                    '[data-kids-frame]',
                    { clipPath: 'inset(7% 9% 7% 9% round 3rem)' },
                    {
                        clipPath: 'inset(0% 0% 0% 0% round 3rem)',
                        ease: 'none',
                        scrollTrigger: { trigger: root.current, start: 'top 95%', end: 'top 25%', scrub: true },
                    },
                );
                gsap.fromTo(
                    '[data-kids-room]',
                    { scale: 1.12 },
                    { scale: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
                );

                const enter = gsap.timeline({ scrollTrigger: { trigger: '[data-kids-card]', start: 'top 80%', once: true } });
                enter
                    .from('[data-kids-card]', { y: 60, autoAlpha: 0, duration: 1.1, ease: 'expo.out' })
                    .from('[data-kids-new]', { scale: 0, rotate: -40, duration: 0.8, ease: 'back.out(3)' }, 0.3)
                    .from('[data-kids-pill]', { scale: 0, autoAlpha: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(2.2)' }, 0.5)
                    .from('[data-kids-poster]', { y: 140, rotate: 22, autoAlpha: 0, duration: 1.3, ease: 'expo.out' }, 0.2);

                gsap.to('[data-kids-new]', { rotate: 4, duration: 1.2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2 });

                // Desktop: the poster tilts toward the pointer.
                if (hasFinePointer() && posterCard.current) {
                    const el = posterCard.current;
                    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' });
                    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' });
                    const move = (e: PointerEvent) => {
                        const r = el.getBoundingClientRect();
                        ry(((e.clientX - r.left) / r.width - 0.5) * 18);
                        rx(-((e.clientY - r.top) / r.height - 0.5) * 18);
                    };
                    const leave = () => {
                        rx(0);
                        ry(0);
                    };
                    el.addEventListener('pointermove', move);
                    el.addEventListener('pointerleave', leave);
                    return () => {
                        el.removeEventListener('pointermove', move);
                        el.removeEventListener('pointerleave', leave);
                    };
                }
            });
        },
        { scope: root },
    );

    const openPoster = () => {
        setLightboxUsed(true);
        setZoomed(true);
    };

    return (
        <section ref={root} id="kids" data-snap className="phone-screen px-3 py-3 sm:px-5 sm:py-5">
            <div data-kids-frame className="relative isolate mx-auto flex w-full max-w-[1600px] flex-1 flex-col overflow-hidden rounded-[1.75rem] bg-[#f4efe2] sm:block sm:flex-none sm:rounded-[3rem] lg:min-h-[calc(100svh-112px)]">
                {/* The room */}
                <div className="absolute inset-0 -z-10 overflow-hidden sm:inset-x-0 sm:top-0 sm:bottom-auto sm:h-[440px] lg:inset-0 lg:h-auto">
                    <img
                        data-kids-room
                        src={asset('/images/kids-room.webp')}
                        alt="Kids Corner la MUV Exclusive: fotolii puf colorate, măsuțe, televizor cu desene animate, cărți și jucării"
                        width={2290}
                        height={1400}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover object-[50%_60%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-40% to-[#f4efe2]/90 sm:via-transparent sm:to-[#f4efe2] lg:bg-gradient-to-r lg:from-[#f4efe2]/90 lg:via-[#f4efe2]/20 lg:to-transparent" />
                </div>

                <KidsPlayground />

                <div className="relative z-20 mx-auto flex w-full max-w-[1300px] flex-1 flex-col justify-end gap-10 px-3 pt-[28svh] pb-3 sm:flex-none sm:justify-start sm:px-10 sm:pt-[340px] sm:pb-10 lg:min-h-[calc(100svh-112px)] lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-16">
                    {/* Text card */}
                    <div data-kids-card className="rounded-[1.5rem] bg-white/90 p-5 shadow sm:rounded-[2rem] sm:bg-white/85 sm:p-10 sm:shadow-[0_40px_80px_-40px_rgba(42,32,26,0.55)] backdrop-blur-md sm:p-10 lg:max-w-[520px]">
                        <span
                            data-kids-new
                            className="inline-block -rotate-6 rounded-xl bg-[#6f7f4d] px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-lg"
                        >
                            New
                        </span>
                        <h2 data-split className="mt-3 font-display text-[2.6rem] leading-[0.95] sm:mt-5 sm:text-7xl">
                            Kids Corner
                            <em className="mt-1 block text-2xl text-bronze sm:text-5xl">la MUV Exclusive</em>
                        </h2>
                        <p className="mt-3 text-[0.92rem] leading-relaxed text-cocoa sm:mt-6 sm:text-base">
                            <span className="hidden sm:inline">Pentru mai mult timp pentru tine. </span>În timp ce tu te antrenezi, cei mici se joacă într-un colț
                            amenajat special pentru ei<span className="hidden sm:inline"> — cu jucării, cărți, desene animate și multă voie bună</span>.
                        </p>
                        <p className="mt-5 hidden font-script text-[2.6rem] leading-tight text-[#6f7f4d] sm:block">Un loc special pentru cei mici!</p>
                        <ul className="mt-4 grid grid-cols-2 gap-1.5 sm:mt-6 sm:flex sm:flex-wrap sm:gap-2">
                            {kidsFeatures.map((f, i) => (
                                <li
                                    key={f.title}
                                    data-kids-pill
                                    className="flex items-center gap-2 rounded-full bg-[#f4efe2] py-1 pr-2.5 pl-1 text-[0.7rem] leading-tight text-espresso sm:py-1.5 sm:pr-4 sm:pl-1.5 sm:text-[0.82rem]"
                                >
                                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white sm:h-7 sm:w-7" style={{ background: colors[i % colors.length] }}>
                                        <Icon name={f.icon} className="h-3.5 w-3.5" />
                                    </span>
                                    {f.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Poster */}
                    <div data-kids-poster className="hidden w-[290px] self-end [perspective:1000px] lg:mb-[-2rem] lg:block">
                        <button
                            ref={posterCard}
                            type="button"
                            onClick={openPoster}
                            data-cursor="Mărește"
                            aria-label="Vezi afișul Kids Corner mărit"
                            className="group relative block w-full rotate-[5deg] rounded-[1.6rem] bg-white p-2 shadow-[0_40px_70px_-30px_rgba(42,32,26,0.65)] transition-transform duration-500 ease-out-expo [transform-style:preserve-3d] hover:rotate-[2deg]"
                        >
                            <img
                                src={poster.src}
                                alt="Afișul Kids Corner la MUV Exclusive"
                                width={poster.width}
                                height={poster.height}
                                loading="lazy"
                                decoding="async"
                                className="block aspect-[1145/1374] w-full rounded-[1.2rem] object-cover"
                            />
                            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-espresso px-4 py-2 text-[0.6rem] font-semibold tracking-[0.2em] whitespace-nowrap text-cream uppercase shadow-lg">
                                Vezi afișul
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {lightboxUsed && (
                <Suspense fallback={null}>
                    <Lightbox item={zoomed ? poster : null} onClose={() => setZoomed(false)} />
                </Suspense>
            )}
        </section>
    );
}
