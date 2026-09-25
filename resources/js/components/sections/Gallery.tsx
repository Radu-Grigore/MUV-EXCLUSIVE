import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { gallery, site, type GalleryItem } from '@/lib/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

// Motion is only needed once an image is enlarged, so the lightbox is its own chunk.
const Lightbox = lazy(() => import('./Lightbox'));

const AUTOPLAY_MS = 6000;

export function Gallery() {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [zoomed, setZoomed] = useState<GalleryItem | null>(null);
    const [lightboxUsed, setLightboxUsed] = useState(false);
    const [inView, setInView] = useState(false);
    const section = useRef<HTMLElement>(null);
    const thumbs = useRef<HTMLUListElement>(null);
    const touchX = useRef<number | null>(null);

    const count = gallery.length;
    const go = (i: number) => setIndex(((i % count) + count) % count);
    const active = gallery[index];
    const playing = inView && !paused;

    // Autoplay only while the section is on screen.
    useEffect(() => {
        const el = section.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Keep the active thumbnail visible in the mobile strip.
    useEffect(() => {
        const strip = thumbs.current;
        const item = strip?.children[index] as HTMLElement | undefined;
        if (!strip || !item || window.innerWidth >= 1024) return;
        strip.scrollTo({ left: item.offsetLeft - strip.clientWidth / 2 + item.clientWidth / 2, behavior: 'smooth' });
    }, [index]);

    return (
        <section ref={section} id="galerie" className="py-24 sm:py-32" aria-roledescription="carusel" aria-label="Din lumea MUV">
            <Reveal className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 sm:flex-row sm:items-end sm:px-8 lg:px-12">
                <div>
                    <p className="eyebrow flex items-center gap-3 text-bronze">
                        <span className="h-px w-8 bg-gold" /> Pregătim ceva frumos
                    </p>
                    <h2 data-split className="mt-5 font-display text-5xl leading-none font-light sm:text-7xl">
                        Din lumea <em className="text-bronze">MUV</em>
                    </h2>
                </div>
                <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 self-start rounded-full border border-espresso/15 py-2 pr-2 pl-5 text-[0.64rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-colors hover:border-espresso sm:self-auto"
                >
                    <Icon name="instagram" className="h-4 w-4" /> {site.instagramHandle}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-espresso text-cream transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                        <Icon name="arrow-up-right" className="h-4 w-4" />
                    </span>
                </a>
            </Reveal>

            <Reveal
                delay={100}
                className="mx-auto mt-12 grid max-w-[1440px] grid-cols-1 gap-5 px-5 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:px-12"
            >
                {/* Stage */}
                <div
                    data-cursor="Mărește"
                    onClick={(e) => {
                        if ((e.target as HTMLElement).closest('button')) return;
                        setLightboxUsed(true);
                        setZoomed(active);
                    }}
                    className="relative overflow-hidden rounded-[2rem] bg-espresso lg:col-span-8"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                    onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                        if (touchX.current === null) return;
                        const dx = e.changedTouches[0].clientX - touchX.current;
                        if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
                        touchX.current = null;
                    }}
                >
                    <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:h-[min(72svh,640px)]">
                        {gallery.map((g, i) => (
                            <div
                                key={g.src}
                                aria-hidden={i !== index}
                                className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-out-expo ${
                                    i === index ? 'scale-100 opacity-100' : 'pointer-events-none scale-[1.04] opacity-0'
                                }`}
                            >
                                {/* Soft colour wash from the image itself fills the letterbox */}
                                <img src={g.src} onError={fallbackOnError(g)} alt="" width={g.width} height={g.height} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-2xl" />
                                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/30" />
                                <div className="absolute inset-0 flex items-center justify-center p-6 pb-28 sm:p-10 sm:pb-32">
                                    <img
                                        src={g.src}
                                        onError={fallbackOnError(g)}
                                        alt={g.title}
                                        width={g.width}
                                        height={g.height}
                                        loading={i === 0 ? 'eager' : 'lazy'}
                                        decoding="async"
                                        className="max-h-full max-w-full rounded-2xl object-contain shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Caption + controls */}
                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-cream sm:p-8">
                            <div className="min-w-0" aria-live="polite">
                                <p className="text-[0.62rem] tracking-[0.3em] text-gold-soft">
                                    {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                                </p>
                                <h3 key={active.title} className="mt-2 font-display text-[1.7rem] leading-none sm:text-4xl">
                                    {active.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 max-w-md text-sm text-cream/70">{active.caption}</p>
                            </div>
                            <div className="flex shrink-0 gap-2">
                                <button
                                    type="button"
                                    onClick={() => go(index - 1)}
                                    aria-label="Imaginea anterioară"
                                    className="grid h-11 w-11 place-items-center rounded-full border border-cream/25 text-cream backdrop-blur transition-colors hover:bg-cream hover:text-espresso"
                                >
                                    <Icon name="arrow" className="h-4 w-4 rotate-180" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => go(index + 1)}
                                    aria-label="Imaginea următoare"
                                    className="grid h-11 w-11 place-items-center rounded-full bg-cream text-espresso transition-colors hover:bg-gold-soft"
                                >
                                    <Icon name="arrow" className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        {/* Autoplay progress */}
                        <span className="absolute inset-x-0 top-0 h-[3px] bg-cream/10">
                            <span
                                key={index}
                                className="block h-full origin-left bg-gold motion-reduce:hidden"
                                style={{
                                    animation: `gallery-progress ${AUTOPLAY_MS}ms linear forwards`,
                                    animationPlayState: playing ? 'running' : 'paused',
                                }}
                                onAnimationEnd={() => go(index + 1)}
                            />
                        </span>
                    </div>
                </div>

                {/* Thumbnails */}
                <ul
                    ref={thumbs}
                    className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
                >
                    {gallery.map((g, i) => (
                        <li key={g.src} className="shrink-0 snap-center lg:shrink">
                            <button
                                type="button"
                                onClick={() => go(i)}
                                aria-label={`Arată: ${g.title}`}
                                aria-current={i === index}
                                className={`group flex w-full items-center gap-4 rounded-2xl text-left transition-colors duration-500 lg:p-2.5 ${
                                    i === index ? 'lg:bg-white/70' : 'lg:hover:bg-white/40'
                                }`}
                            >
                                <span
                                    className={`relative block h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-sand ring-2 ring-offset-2 ring-offset-cream transition-all duration-500 lg:h-16 lg:w-14 ${
                                        i === index ? 'ring-gold' : 'opacity-60 ring-transparent group-hover:opacity-100'
                                    }`}
                                >
                                    <img src={g.src} onError={fallbackOnError(g)} alt="" width={g.width} height={g.height} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                                </span>
                                <span className="hidden min-w-0 flex-1 lg:block">
                                    <span className="flex items-baseline gap-3">
                                        <span className="text-[0.6rem] tracking-[0.2em] text-bronze">{String(i + 1).padStart(2, '0')}</span>
                                        <span className={`font-display text-xl transition-colors ${i === index ? 'text-espresso' : 'text-cocoa/70'}`}>{g.title}</span>
                                    </span>
                                    <span className="mt-0.5 block truncate pl-8 text-xs text-cocoa/60">{g.caption}</span>
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            </Reveal>
            {lightboxUsed && (
                <Suspense fallback={null}>
                    <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
                </Suspense>
            )}
        </section>
    );
}

/** Swap to the fallback image once if the preferred (high-resolution) file is missing. */
export function fallbackOnError(g: GalleryItem) {
    return (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget;
        if (g.fallback && !img.dataset.fellBack) {
            img.dataset.fellBack = '1';
            img.src = g.fallback;
        }
    };
}
