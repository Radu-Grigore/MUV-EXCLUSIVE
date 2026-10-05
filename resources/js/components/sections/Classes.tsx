import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { classes, type FitnessClass, type GalleryItem } from '@/lib/site';
import { posterFor, posterSrcSet } from '@/lib/posters';
import { gsap, lockScroll, whenNear } from '@/lib/scroll';
import { bookingLinkProps } from '../BookingLink';
import { Icon } from '../Icon';

// Motion is only needed once a class or a poster is opened, so both overlays are split into their own chunks.
const ClassDialogHost = lazy(() => import('./ClassDialog'));
const Lightbox = lazy(() => import('./Lightbox'));

const pad = (n: number) => String(n).padStart(2, '0');

function posterItem(c: FitnessClass): GalleryItem | null {
    const src = posterFor(c.id);
    return src ? { src, title: `Afiș ${c.name} — MUV Exclusive`, caption: c.name, width: 1060, height: 1484 } : null;
}

/**
 * The classes. Desktop: one large poster next to its readable description, with the other posters as thumbnails.
 * Phone: a swipeable row of posters with the active class underneath. Tapping a poster opens it full screen.
 */
export function Classes() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const [index, setIndex] = useState(0);
    const [details, setDetails] = useState<FitnessClass | null>(null);
    const [dialogUsed, setDialogUsed] = useState(false);
    const [zoomed, setZoomed] = useState<GalleryItem | null>(null);
    const [zoomUsed, setZoomUsed] = useState(false);
    const c = classes[index];

    useGSAP(
        (_, contextSafe) =>
            // Prepared once the section is about a screen away, so it costs nothing at start-up.
            whenNear(root.current, contextSafe!(() => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                gsap.from('[data-classes-in]', {
                    y: 60,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
                });
            });
        })),
        { scope: root },
    );

    useEffect(() => {
        lockScroll(!!details);
        if (!details) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDetails(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [details]);

    /** Phone row: the poster closest to the middle is the active one. */
    function onTrackScroll() {
        const el = track.current;
        if (!el) return;
        const middle = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(el.children).forEach((child, i) => {
            const li = child as HTMLElement;
            const distance = Math.abs(li.offsetLeft + li.offsetWidth / 2 - middle);
            if (distance < bestDistance) {
                bestDistance = distance;
                best = i;
            }
        });
        setIndex(best);
    }

    function go(i: number) {
        const next = (i + classes.length) % classes.length;
        setIndex(next);
        const el = track.current;
        const li = el?.children[next] as HTMLElement | undefined;
        if (el && li && el.offsetParent !== null) el.scrollTo({ left: li.offsetLeft - (el.clientWidth - li.offsetWidth) / 2, behavior: 'smooth' });
    }

    function zoom(item: FitnessClass) {
        const poster = posterItem(item);
        if (!poster) return;
        setZoomUsed(true);
        setZoomed(poster);
    }

    function openDetails(item: FitnessClass) {
        setDialogUsed(true);
        setDetails(item);
    }

    return (
        <section
            ref={root}
            id="clase"
            data-snap
            className="phone-screen relative overflow-hidden bg-sand py-5 text-espresso sm:py-16 lg:flex lg:h-[calc(100svh-72px)] lg:min-h-[640px] lg:flex-col lg:py-10 low:py-8"
        >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col lg:min-h-0 lg:flex-1 lg:px-12">
                {/* Heading */}
                <div className="px-5 text-center sm:px-8 lg:flex lg:shrink-0 lg:items-end lg:justify-between lg:gap-10 lg:px-0 lg:text-left">
                    <div>
                        <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Clasele noastre <span className="h-px w-8 bg-gold lg:hidden" />
                        </p>
                        <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] sm:mt-4 sm:text-6xl lg:text-[clamp(2.75rem,6svh,4.25rem)]">
                            Găsește mișcarea <em className="text-bronze">care ți se potrivește</em>
                        </h2>
                    </div>
                    <p className="mt-2 text-[0.8rem] text-cocoa short:hidden sm:text-sm lg:mt-0 lg:max-w-xs lg:text-right">
                        <span className="lg:hidden">Glisează printre afișe și apasă pe unul ca să-l vezi mărit.</span>
                        <span className="hidden lg:inline">Alege o clasă din listă. Apasă pe afiș ca să-l vezi pe tot ecranul.</span>
                    </p>
                </div>

                {/* Phone + tablet: swipeable posters */}
                <div className="lg:hidden">
                    <ul
                        ref={track}
                        onScroll={onTrackScroll}
                        data-classes-in
                        className="no-scrollbar relative mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[calc(50vw_-_var(--card)_/_2)] py-2 items-center [--card:min(74vw,calc((100svh_-_22.5rem)_*_0.667))] short:mt-3 short:[--card:min(68vw,calc((100svh_-_20rem)_*_0.667))] sm:mt-10 sm:gap-5 sm:[--card:min(56vw,calc((100svh_-_22rem)_*_0.667))]"
                    >
                        {classes.map((item, i) => (
                            <li key={item.id} className="w-[var(--card)] shrink-0 snap-center">
                                <button
                                    type="button"
                                    onClick={() => (i === index ? zoom(item) : go(i))}
                                    aria-label={`Afișul ${item.name} — vezi-l mărit`}
                                    className={`relative block w-full overflow-hidden rounded-[1.1rem] bg-ink shadow-[0_24px_40px_-24px_rgba(42,32,26,0.8)] transition-[transform,opacity] duration-500 ease-out-expo ${
                                        i === index ? 'scale-100 opacity-100' : 'scale-[0.92] opacity-55'
                                    }`}
                                >
                                    <PosterImage c={item} sizes="(min-width: 640px) 56vw, 74vw" className="h-auto w-full" />
                                    {i === index && (
                                        <span className="absolute right-2.5 bottom-2.5 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-espresso shadow">
                                            <Icon name="zoom" className="h-4 w-4" />
                                        </span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div data-classes-in className="mx-auto mt-3 flex max-w-xl items-center gap-3 px-5 short:mt-2 sm:mt-6 sm:px-8">
                        <div key={c.id} className="min-w-0 flex-1 animate-fade-up">
                            <p className="text-[0.58rem] tracking-[0.2em] text-cocoa/70 uppercase">
                                {pad(index + 1)} / {pad(classes.length)}
                            </p>
                            <h3 className="mt-1 truncate font-display text-[1.9rem] leading-none short:text-[1.6rem]">{c.name}</h3>
                            <p className="mt-1 truncate text-[0.62rem] tracking-[0.16em] text-bronze uppercase">{c.keywords.join(' · ')}</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => openDetails(c)}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-espresso py-2 pr-2 pl-4 text-[0.6rem] font-semibold tracking-[0.2em] text-cream uppercase"
                        >
                            Detalii
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-cream text-espresso">
                                <Icon name="plus" className="h-3.5 w-3.5" />
                            </span>
                        </button>
                    </div>

                    <div className="mt-3 flex justify-center gap-1.5 short:mt-2" aria-hidden="true">
                        {classes.map((item, i) => (
                            <span key={item.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-bronze' : 'w-1.5 bg-espresso/20'}`} />
                        ))}
                    </div>
                </div>

                {/* Desktop: the active poster, large, next to its readable details */}
                <div className="mt-8 hidden min-h-0 flex-1 grid-cols-12 gap-12 lg:grid low:mt-6 xl:gap-16">
                    <div data-classes-in className="col-span-5 flex min-h-0 items-center justify-center">
                        <button
                            type="button"
                            data-cursor="Mărește"
                            onClick={() => zoom(c)}
                            aria-label={`Afișul ${c.name} — vezi-l pe tot ecranul`}
                            className="group relative h-full max-h-full overflow-hidden rounded-[1.6rem] bg-ink shadow-[0_50px_90px_-45px_rgba(42,32,26,0.85)]"
                        >
                            <PosterImage key={c.id} c={c} sizes="54vh" className="h-full w-auto max-w-full animate-poster-in object-contain" />
                            <span className="absolute right-4 bottom-4 inline-flex items-center gap-2 rounded-full bg-cream/90 px-4 py-2 text-[0.6rem] font-semibold tracking-[0.2em] text-espresso uppercase opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                                <Icon name="zoom" className="h-4 w-4" /> Mărește
                            </span>
                        </button>
                    </div>

                    <div data-classes-in className="col-span-7 flex min-h-0 flex-col">
                        <div key={c.id} className="flex flex-1 animate-fade-up flex-col justify-center">
                            <p className="eyebrow text-bronze">
                                Clasa {pad(index + 1)} / {pad(classes.length)}
                            </p>
                            <h3 className="mt-3 font-display text-[clamp(3rem,8svh,5.5rem)] leading-[0.95] low:mt-2">{c.name}</h3>
                            <ul className="mt-4 flex flex-wrap gap-2 low:mt-3">
                                {c.keywords.map((k) => (
                                    <li key={k} className="rounded-full border border-bronze/25 bg-cream/70 px-3.5 py-1.5 text-xs font-medium text-cocoa">
                                        {k}
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cocoa low:mt-4 low:text-base lower:line-clamp-3">{c.description}</p>
                            <ul className="mt-6 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-3 low:mt-4 low:gap-y-2">
                                {c.benefits.map((b) => (
                                    <li key={b} className="flex items-start gap-3 text-[0.95rem] low:text-sm">
                                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-espresso text-gold-soft">
                                            <Icon name="check" className="h-3.5 w-3.5" strokeWidth={2.2} />
                                        </span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex flex-wrap items-center gap-3 low:mt-5">
                                <a
                                    {...bookingLinkProps()}
                                    className="group inline-flex items-center gap-3 rounded-full bg-espresso py-2 pr-2 pl-6 text-[0.64rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                                >
                                    Rezervă în aplicație
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-espresso transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </span>
                                </a>
                                <button
                                    type="button"
                                    onClick={() => zoom(c)}
                                    className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-5 py-3.5 text-[0.64rem] font-semibold tracking-[0.2em] uppercase transition-colors hover:border-espresso"
                                >
                                    <Icon name="zoom" className="h-4 w-4" /> Vezi afișul mărit
                                </button>
                                <div className="ml-auto flex gap-2">
                                    {[
                                        { dir: -1, label: 'Clasa anterioară' },
                                        { dir: 1, label: 'Clasa următoare' },
                                    ].map(({ dir, label }) => (
                                        <button
                                            key={dir}
                                            type="button"
                                            onClick={() => go(index + dir)}
                                            aria-label={label}
                                            className="grid h-12 w-12 place-items-center rounded-full border border-espresso/15 transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
                                        >
                                            <Icon name="arrow" className={`h-4 w-4 ${dir < 0 ? 'rotate-180' : ''}`} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Every class as a thumbnail */}
                        <ul className="mt-6 grid shrink-0 gap-2.5 low:mt-4" style={{ gridTemplateColumns: `repeat(${classes.length}, minmax(0, 1fr))` }}>
                            {classes.map((item, i) => (
                                <li key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => go(i)}
                                        aria-label={item.name}
                                        aria-pressed={i === index}
                                        className={`group block w-full text-left transition-[transform,opacity] duration-500 ease-out-expo ${i === index ? '-translate-y-1.5' : 'opacity-60 hover:opacity-100'}`}
                                    >
                                        <span className={`block overflow-hidden rounded-lg bg-ink ring-offset-2 ring-offset-sand ${i === index ? 'ring-2 ring-bronze' : ''}`}>
                                            <PosterImage c={item} sizes="7vw" className="aspect-[1060/1484] w-full object-cover object-top" />
                                        </span>
                                        <span className="mt-1.5 block truncate text-[0.62rem] font-medium tracking-[0.08em] text-cocoa uppercase">{item.name}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {dialogUsed && (
                <Suspense fallback={null}>
                    <ClassDialogHost active={details} onClose={() => setDetails(null)} onChange={setDetails} />
                </Suspense>
            )}
            {zoomUsed && (
                <Suspense fallback={null}>
                    <Lightbox item={zoomed} onClose={() => setZoomed(null)} />
                </Suspense>
            )}
        </section>
    );
}

/** A class poster exactly as supplied (never cropped in the large views), or its name when there is no poster. */
function PosterImage({ c, className, sizes }: { c: FitnessClass; className: string; sizes: string }) {
    const src = posterFor(c.id);
    // No poster yet: a placeholder with the poster's shape, so every frame keeps the same size.
    if (!src) {
        const tiny = sizes === '7vw';
        return (
            <span
                role="img"
                aria-label={`${c.name} — MUV Exclusive`}
                className={`relative flex aspect-[1060/1484] flex-col justify-between overflow-hidden bg-[radial-gradient(80%_60%_at_70%_20%,#4a3726_0%,#16110e_70%)] p-[8%] text-left text-cream ${className}`}
            >
                <span className="grid aspect-square w-[22%] place-items-center rounded-full border border-gold/40 text-gold-soft">
                    <Icon name={c.icon} className="h-1/2 w-1/2" />
                </span>
                {!tiny && (
                    <span>
                        <span className="block font-display text-[2.2rem] leading-[0.9] text-cream sm:text-5xl">{c.name}</span>
                        <span className="mt-3 block font-script text-2xl leading-none text-gold-soft sm:text-3xl">{c.script ?? 'More than fitness'}</span>
                    </span>
                )}
            </span>
        );
    }
    return (
        <img
            src={src}
            srcSet={posterSrcSet(c.id)}
            sizes={sizes}
            alt={`Afiș ${c.name} — MUV Exclusive`}
            width={1060}
            height={1484}
            loading="lazy"
            decoding="async"
            className={`block ${className}`}
        />
    );
}
