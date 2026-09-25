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
    const bar = useRef<HTMLSpanElement>(null);
    const [active, setActive] = useState<FitnessClass | null>(null);
    const [dialogUsed, setDialogUsed] = useState(false);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(prefers-reduced-motion: no-preference)', () => {
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

    // Phones: the progress bar follows the horizontal swipe.
    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const onScroll = () => {
            const max = el.scrollWidth - el.clientWidth;
            if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? el.scrollLeft / max : 1})`;
        };
        onScroll();
        el.addEventListener('scroll', onScroll, { passive: true });
        return () => el.removeEventListener('scroll', onScroll);
    }, []);

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
            data-scroll-edge
            className="relative bg-sand py-20 text-espresso sm:py-24 lg:flex lg:h-[calc(100svh-72px)] lg:min-h-[560px] lg:flex-col lg:py-10"
        >
            {/* Desktop: the section fills the screen under the header and the posters take whatever height is left. */}
            <div className="mx-auto max-w-[1440px] px-5 text-center sm:px-8 lg:shrink-0 lg:px-12">
                <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                    <span className="h-px w-8 bg-gold" /> Clasele noastre <span className="h-px w-8 bg-gold" />
                </p>
                <h2 data-split className="mt-4 font-display text-5xl leading-[0.95] sm:text-6xl lg:text-[clamp(2.75rem,6svh,4.5rem)]">
                    Găsește mișcarea <em className="text-bronze">care ți se potrivește</em>
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-cocoa">
                    Experiențe diferite, un singur scop: să te simți puternică, liberă și bine în pielea ta. Apasă pe o clasă pentru detalii.
                    <span className="mt-2 block font-medium text-bronze sm:hidden">Glisează pentru toate clasele →</span>
                </p>
            </div>

            <ul
                ref={track}
                className="no-scrollbar mx-auto mt-10 flex max-w-[1440px] snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-8 lg:mt-8 lg:flex lg:min-h-0 lg:w-full lg:flex-1 lg:items-start lg:justify-center lg:px-12 lg:pb-0 lg:[container-type:size]"
            >
                {classes.map((c) => (
                    <li key={c.id} data-poster-item className="w-[74vw] max-w-[340px] shrink-0 snap-center sm:w-auto sm:max-w-none lg:w-[min(calc((100cqh_-_4rem)_*_0.5588),calc((100cqw_-_10.5rem)_/_4))] lg:max-w-none">
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

            <div className="mx-auto mt-6 max-w-[1440px] px-5 sm:hidden">
                <div className="h-px w-full bg-espresso/10">
                    <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-bronze" />
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
            <span className="block aspect-[209/374] overflow-hidden rounded-[1.25rem] bg-espresso shadow-[0_24px_50px_-30px_rgba(42,32,26,0.7)] transition-[transform,box-shadow] duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:shadow-[0_40px_70px_-35px_rgba(42,32,26,0.8)] group-focus-visible:ring-2 group-focus-visible:ring-bronze">
                {poster ? (
                    <img src={poster} alt={`Afiș ${c.name} — MUV Exclusive`} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
                ) : (
                    <span className="flex h-full w-full items-end p-6 font-display text-4xl text-cream">{c.name}</span>
                )}
            </span>
            <span className="mt-3 flex shrink-0 items-center justify-between gap-3 px-1">
                <span className="min-w-0">
                    <span className="block truncate font-display text-2xl leading-none">{c.name}</span>
                    <span className="mt-1.5 block truncate text-[0.6rem] tracking-[0.2em] text-cocoa/70 uppercase">{c.keywords.join(' · ')}</span>
                </span>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-espresso/15 transition-colors duration-500 group-hover:border-espresso group-hover:bg-espresso group-hover:text-cream">
                    <Icon name="plus" className="h-4 w-4" />
                </span>
            </span>
        </button>
    );
}
