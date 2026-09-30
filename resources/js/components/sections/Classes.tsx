import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { classes, type FitnessClass } from '@/lib/site';
import { posterFor } from '@/lib/posters';
import { gsap, lockScroll } from '@/lib/scroll';
import { Icon } from '../Icon';

// Motion is only needed once a class is opened, so the dialog is split into its own chunk.
const ClassDialogHost = lazy(() => import('./ClassDialog'));

export function Classes() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const [active, setActive] = useState<FitnessClass | null>(null);
    const [dialogUsed, setDialogUsed] = useState(false);
    const bar = useRef<HTMLSpanElement>(null);

    function updateProgress() {
        const el = track.current;
        if (!el || !bar.current) return;
        const max = el.scrollWidth - el.clientWidth;
        const visible = el.clientWidth / el.scrollWidth;
        bar.current.style.transform = `scaleX(${max > 0 ? visible + (1 - visible) * (el.scrollLeft / max) : 1})`;
    }

    /** Moves the row by one poster (wrapping around at the ends). */
    function step(dir: number) {
        const el = track.current;
        const first = el?.querySelector('li');
        if (!el || !first) return;
        const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
        const max = el.scrollWidth - el.clientWidth;
        const next = el.scrollLeft + dir * (first.getBoundingClientRect().width + gap);
        el.scrollTo({ left: next > max + 4 ? 0 : next < -4 ? max : next, behavior: 'smooth' });
    }

    useEffect(() => {
        updateProgress();
        window.addEventListener('resize', updateProgress);
        return () => window.removeEventListener('resize', updateProgress);
    }, []);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('all', () => {
                // Animates the <li> wrappers; the cards themselves keep their CSS hover transition.
                gsap.from('[data-poster-item]', {
                    y: 60,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: track.current, start: 'top 85%', once: true },
                });
            });
        },
        { scope: root },
    );

    useEffect(() => {
        lockScroll(!!active);
        if (!active) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active]);

    return (
        <section
            ref={root}
            id="clase"
            data-snap
            className="phone-screen relative overflow-hidden bg-sand py-6 text-espresso sm:py-24 lg:flex lg:h-[calc(100svh-72px)] lg:min-h-[600px] lg:flex-col lg:py-10"
        >
            {/* Desktop: the section fills the screen under the header and the posters take whatever height is left. */}
            <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:shrink-0 lg:px-12">
                <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                    <span className="h-px w-8 bg-gold" /> Clasele noastre <span className="h-px w-8 bg-gold" />
                </p>
                <h2 data-split className="mt-3 font-display text-[2.1rem] leading-[0.95] sm:mt-4 sm:text-6xl lg:text-[clamp(2.75rem,6svh,4.5rem)]">
                    Găsește mișcarea <em className="text-bronze">care ți se potrivește</em>
                </h2>
                <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-cocoa sm:mt-4">
                    <span className="hidden sm:inline">Experiențe diferite, un singur scop: să te simți puternică, liberă și bine în pielea ta. </span>
                    <span className="sm:hidden">Glisează și apasă pe o clasă pentru detalii.</span>
                    <span className="hidden sm:inline">Apasă pe o clasă pentru detalii.</span>
                </p>
            </div>

            {/* Seven posters: a swipeable, snapping row. Desktop sizes the posters by the height left under the heading. */}
            <div className="mt-5 sm:mt-10 lg:mt-8 lg:min-h-0 lg:flex-1 lg:[container-type:size]">
                <ul
                    ref={track}
                    onScroll={updateProgress}
                    className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[max(1.25rem,calc(50vw_-_var(--card)_/_2))] pb-1 [--card:min(64vw,calc((100svh_-_24rem)_*_0.7143))] sm:gap-5 sm:px-8 sm:[--card:min(42vw,340px)] lg:h-full lg:scroll-px-12 lg:px-12 lg:[--card:min(calc((100cqh_-_4.5rem)_*_0.7143),calc((100cqw_-_10.5rem)_/_4.25))]"
                >
                    {classes.map((c) => (
                        <li key={c.id} data-poster-item className="w-[var(--card)] shrink-0 snap-center sm:snap-start">
                            <PosterCard
                                c={c}
                                onOpen={() => {
                                    setDialogUsed(true);
                                    setActive(c);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mx-auto mt-3 flex w-full max-w-[1440px] items-center gap-4 px-5 sm:mt-6 sm:px-8 sm:pr-24 lg:mt-5 lg:shrink-0 lg:pl-12">
                <span className="text-[0.62rem] tracking-[0.2em] text-cocoa/70 uppercase tabular-nums">
                    {String(classes.length).padStart(2, '0')} clase
                </span>
                <span className="relative h-px flex-1 overflow-hidden bg-espresso/10">
                    <span ref={bar} className="absolute inset-y-0 left-0 w-full origin-left bg-bronze" style={{ transform: 'scaleX(0.15)' }} />
                </span>
                <div className="flex gap-2">
                    {[
                        { dir: -1, label: 'Clasele anterioare' },
                        { dir: 1, label: 'Următoarele clase' },
                    ].map(({ dir, label }) => (
                        <button
                            key={dir}
                            type="button"
                            onClick={() => step(dir)}
                            aria-label={label}
                            className="grid h-10 w-10 place-items-center rounded-full border border-espresso/15 transition-colors hover:border-espresso hover:bg-espresso hover:text-cream sm:h-12 sm:w-12"
                        >
                            <Icon name="arrow" className={`h-4 w-4 ${dir < 0 ? 'rotate-180' : ''}`} />
                        </button>
                    ))}
                </div>
            </div>

            {dialogUsed && (
                <Suspense fallback={null}>
                    <ClassDialogHost active={active} onClose={() => setActive(null)} onChange={setActive} />
                </Suspense>
            )}
        </section>
    );
}

/** The class poster shown whole, in its own portrait format, with its name underneath. */
function PosterCard({ c, onOpen }: { c: FitnessClass; onOpen: () => void }) {
    const poster = posterFor(c.id);

    return (
        <button
            type="button"
            data-cursor="Detalii"
            onClick={onOpen}
            aria-label={`${c.name} — vezi detalii`}
            className="group flex w-full flex-col text-left focus-visible:outline-none"
        >
            <span className="block overflow-hidden rounded-2xl bg-espresso shadow sm:rounded-[1.25rem]-[0_24px_50px_-30px_rgba(42,32,26,0.7)] transition-[transform,box-shadow] duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:shadow-[0_40px_70px_-35px_rgba(42,32,26,0.8)] group-focus-visible:ring-2 group-focus-visible:ring-bronze">
                {poster ? (
                    <img src={poster} alt={`Afiș ${c.name} — MUV Exclusive`} loading="lazy" decoding="async" className="block aspect-[1063/1479] w-full object-cover" />
                ) : (
                    <span className="flex aspect-[1063/1479] w-full items-end p-6 font-display text-4xl text-cream">{c.name}</span>
                )}
            </span>
            <span className="mt-2.5 flex shrink-0 items-center justify-between gap-2 px-0.5 sm:mt-3 sm:gap-3 sm:px-1">
                <span className="min-w-0">
                    <span className="block truncate font-display text-xl leading-none max-[400px]:text-lg sm:text-2xl">{c.name}</span>
                    <span className="mt-1.5 hidden truncate text-[0.6rem] tracking-[0.2em] text-cocoa/70 uppercase sm:block">{c.keywords.join(' · ')}</span>
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-espresso/15 max-[400px]:hidden sm:h-10 sm:w-10 transition-colors duration-500 group-hover:border-espresso group-hover:bg-espresso group-hover:text-cream">
                    <Icon name="plus" className="h-4 w-4" />
                </span>
            </span>
        </button>
    );
}
