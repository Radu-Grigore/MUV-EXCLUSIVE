import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useRef, useState } from 'react';
import { asset, classes, site, type GalleryItem } from '@/lib/site';
import { gsap, hasFinePointer } from '@/lib/scroll';
import { Icon } from '../Icon';

const Lightbox = lazy(() => import('./Lightbox'));

const poster: GalleryItem = {
    src: asset('/images/classes-poster.webp'),
    title: 'Clasele MUV',
    caption: 'Toate clasele MUV Exclusive',
    width: 750,
    height: 750,
};

/** "Clasele MUV" showcase: the all-classes poster in a glowing, tilting frame next to the class list. */
export function Gallery() {
    const root = useRef<HTMLElement>(null);
    const frame = useRef<HTMLButtonElement>(null);
    const [zoomed, setZoomed] = useState(false);
    const [lightboxUsed, setLightboxUsed] = useState(false);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                gsap.from('[data-showcase-poster]', {
                    y: 80,
                    scale: 0.92,
                    autoAlpha: 0,
                    duration: 1.4,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
                });
                gsap.from('[data-showcase-row]', {
                    x: 40,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.08,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-showcase-list]', start: 'top 85%', once: true },
                });

                if (hasFinePointer() && frame.current) {
                    const el = frame.current;
                    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3' });
                    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3' });
                    const move = (e: PointerEvent) => {
                        const r = el.getBoundingClientRect();
                        ry(((e.clientX - r.left) / r.width - 0.5) * 10);
                        rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
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

    return (
        <section ref={root} id="galerie" data-snap className="relative overflow-hidden bg-espresso py-20 text-cream sm:py-24 lg:flex lg:min-h-[calc(100svh-72px)] lg:flex-col lg:justify-center lg:py-12">
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(45% 55% at 28% 50%, rgba(199,160,106,0.28) 0%, transparent 70%)' }}
            />

            <div className="relative mx-auto grid w-full max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
                <div data-showcase-poster className="[perspective:1200px] lg:col-span-6">
                    <button
                        ref={frame}
                        type="button"
                        data-cursor="Mărește"
                        onClick={() => {
                            setLightboxUsed(true);
                            setZoomed(true);
                        }}
                        aria-label="Vezi afișul Clasele MUV mărit"
                        className="group relative block w-full overflow-hidden rounded-[2rem] border border-gold/30 bg-ink p-2 shadow-[0_0_80px_-10px_rgba(199,160,106,0.45),0_50px_90px_-40px_rgba(0,0,0,0.8)] [transform-style:preserve-3d]"
                    >
                        <img
                            src={poster.src}
                            alt="Afiș cu clasele MUV Exclusive: Khai Bo, Step Aerobic, Pilates, Tabata și altele"
                            width={poster.width}
                            height={poster.height}
                            loading="lazy"
                            decoding="async"
                            className="block aspect-square w-full rounded-[1.6rem] object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]"
                        />
                    </button>
                </div>

                <div className="lg:col-span-6">
                    <p className="eyebrow flex items-center gap-3 text-gold">
                        <span className="h-px w-8 bg-gold" /> Pregătim ceva frumos
                    </p>
                    <h2 data-split className="mt-5 font-display text-5xl leading-[0.95] sm:text-7xl">
                        Clasele <em className="text-gold-soft">MUV</em>
                    </h2>
                    <p className="mt-6 max-w-md leading-relaxed text-cream/70">
                        Energie, forță, echilibru și ritm — fiecare clasă are povestea ei. Alege-o pe cea care ți se potrivește azi.
                    </p>

                    <ul data-showcase-list className="mt-10 border-t border-cream/10">
                        {classes.map((c, i) => (
                            <li key={c.id} data-showcase-row>
                                <a
                                    href="#clase"
                                    className="group flex items-center gap-5 border-b border-cream/10 py-4 transition-colors hover:text-gold-soft"
                                >
                                    <span className="w-6 text-[0.62rem] tracking-[0.2em] text-cream/40">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: c.accent }} />
                                    <span className="flex-1 font-display text-3xl leading-none">{c.name}</span>
                                    <span className="hidden text-[0.6rem] tracking-[0.2em] text-cream/45 uppercase sm:block">{c.keywords[0]}</span>
                                    <Icon name="arrow-up-right" className="h-4 w-4 opacity-40 transition-all duration-500 group-hover:rotate-45 group-hover:opacity-100" />
                                </a>
                            </li>
                        ))}
                    </ul>

                    <a
                        href={site.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group mt-10 inline-flex items-center gap-3 rounded-full border border-cream/20 py-2 pr-2 pl-5 text-[0.64rem] font-semibold tracking-[0.22em] uppercase transition-colors hover:border-cream"
                    >
                        <Icon name="instagram" className="h-4 w-4" /> {site.instagramHandle}
                        <span className="grid h-8 w-8 place-items-center rounded-full bg-cream text-espresso transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                            <Icon name="arrow-up-right" className="h-4 w-4" />
                        </span>
                    </a>
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
