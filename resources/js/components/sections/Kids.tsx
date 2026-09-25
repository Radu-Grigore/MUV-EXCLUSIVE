import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { kidsFeatures } from '@/lib/site';
import { gsap, hasFinePointer } from '@/lib/scroll';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

const colors = ['#6f7f4d', '#e0a93b', '#3f6fa3', '#c86b6b'];

/** High-resolution Kids Corner poster; the section falls back to feature cards until it exists. */
const POSTER = '/images/kids-corner.png';

// Playful shapes floating around the poster.
const doodles = [
    { d: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z', color: '#e0a93b', className: 'top-[6%] -left-6 h-12 w-12 sm:-left-10' },
    { d: 'M12 21s-7.5-4.6-9-9.4C2 8.3 4.2 5.5 7.2 5.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3 0 5.2 2.8 4.2 6.1-1.5 4.8-9 9.4-9 9.4Z', color: '#c86b6b', className: 'top-[42%] -right-5 h-10 w-10 sm:-right-9' },
    { d: 'M6 18a4 4 0 0 1 0-8 5.5 5.5 0 0 1 10.6-1.6A4 4 0 1 1 18 18Z', color: '#5b8fc7', className: '-bottom-6 left-[12%] h-14 w-14' },
    { d: 'M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z', color: '#6f7f4d', className: '-top-5 right-[18%] h-8 w-8' },
];

export function Kids() {
    const root = useRef<HTMLElement>(null);
    const card = useRef<HTMLDivElement>(null);
    const [hasPoster, setHasPoster] = useState(true);

    useGSAP(
        () => {
            if (!hasPoster) return;
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
                gsap.fromTo(
                    '[data-kids-card]',
                    { yPercent: 8, rotate: 4 },
                    { yPercent: -6, rotate: -1.5, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } },
                );
                gsap.to('[data-kids-bg]', {
                    scale: 1.25,
                    ease: 'none',
                    scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
                });
                gsap.utils.toArray<HTMLElement>('[data-doodle]').forEach((el, i) => {
                    gsap.to(el, { y: i % 2 ? 14 : -14, rotate: i % 2 ? -12 : 12, duration: 2.4 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
                });

                // Desktop: the poster tilts toward the pointer.
                if (hasFinePointer() && card.current) {
                    const el = card.current;
                    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' });
                    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' });
                    const move = (e: PointerEvent) => {
                        const r = el.getBoundingClientRect();
                        ry(((e.clientX - r.left) / r.width - 0.5) * 14);
                        rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
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
        { scope: root, dependencies: [hasPoster] },
    );

    return (
        <section ref={root} id="kids" data-scroll-offset="-84" className="px-3 py-3 sm:px-5 sm:py-5">
            <div
                className="relative isolate overflow-hidden rounded-[2rem] px-5 py-20 sm:rounded-[3rem] sm:px-10 sm:py-28 lg:px-16"
                style={{
                    background:
                        'radial-gradient(40% 50% at 0% 0%, rgba(124,143,90,0.35) 0%, transparent 70%), radial-gradient(35% 45% at 100% 100%, rgba(233,185,73,0.35) 0%, transparent 70%), radial-gradient(30% 40% at 80% 10%, rgba(91,143,199,0.22) 0%, transparent 70%), #f4efe2',
                }}
            >
                {hasPoster && (
                    <>
                        {/* The room from the poster, softened into a colour wash */}
                        <img
                            data-kids-bg
                            src={POSTER}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 -z-10 h-full w-full scale-110 object-cover object-[50%_62%] opacity-50 blur-xl"
                        />
                        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#f4efe2] via-[#f4efe2]/85 to-[#f4efe2]/30" />
                    </>
                )}

                <div className="relative mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-2 lg:gap-20">
                    <Reveal>
                        <span className="inline-block -rotate-3 rounded-xl bg-[#6f7f4d] px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-lg">
                            New
                        </span>
                        <h2 data-split className="mt-6 font-display text-6xl leading-[0.95] sm:text-7xl">
                            Kids Corner
                            <em className="mt-2 block text-4xl text-bronze sm:text-5xl">la MUV Exclusive</em>
                        </h2>
                        <p className="mt-7 max-w-lg leading-relaxed text-cocoa">
                            Pentru mai mult timp pentru tine. În timp ce tu te antrenezi, cei mici se joacă într-un colț amenajat special pentru ei — cu
                            jucării, cărți, desene animate și multă voie bună.
                        </p>
                        <p className="mt-6 font-script text-5xl text-[#6f7f4d]">Un loc special pentru cei mici!</p>

                        {hasPoster && (
                            <ul className="mt-8 flex flex-wrap gap-2">
                                {kidsFeatures.map((f, i) => (
                                    <li key={f.title} className="flex items-center gap-2 rounded-full bg-white/80 py-1.5 pr-4 pl-1.5 text-sm text-espresso shadow-sm">
                                        <span className="grid h-7 w-7 place-items-center rounded-full text-white" style={{ background: colors[i % colors.length] }}>
                                            <Icon name={f.icon} className="h-3.5 w-3.5" />
                                        </span>
                                        {f.title}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Reveal>

                    {hasPoster ? (
                        <div className="relative mx-auto w-full max-w-[460px] [perspective:1200px]">
                            {doodles.map((s, i) => (
                                <svg key={i} data-doodle viewBox="0 0 24 24" aria-hidden="true" className={`absolute z-10 drop-shadow-md ${s.className}`}>
                                    <path d={s.d} fill={s.color} />
                                </svg>
                            ))}
                            <div data-kids-card data-cursor="Kids" className="will-change-transform">
                                <div ref={card} className="overflow-hidden rounded-[2rem] bg-white p-2 shadow-[0_50px_90px_-40px_rgba(42,32,26,0.6)] [transform-style:preserve-3d]">
                                    <img
                                        src={POSTER}
                                        alt="Kids Corner la MUV Exclusive: spațiu amenajat pentru cei mici, jucării și cărți, desene animate, confort pentru toată familia"
                                        loading="lazy"
                                        decoding="async"
                                        onError={() => setHasPoster(false)}
                                        className="block aspect-[1145/1374] w-full rounded-[1.6rem] object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
                            {kidsFeatures.map((f, i) => (
                                <Reveal as="li" key={f.title} delay={i * 90}>
                                    <div className="group flex h-full flex-col justify-between gap-8 rounded-[1.75rem] bg-white/75 p-5 shadow-[0_24px_50px_-35px_rgba(42,32,26,0.5)] transition-transform duration-700 ease-out-expo hover:-translate-y-1.5 sm:p-7">
                                        <span
                                            className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-700 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110"
                                            style={{ background: colors[i % colors.length] }}
                                        >
                                            <Icon name={f.icon} className="h-7 w-7" />
                                        </span>
                                        <p className="text-sm leading-snug font-medium text-espresso sm:text-base">{f.title}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
}
