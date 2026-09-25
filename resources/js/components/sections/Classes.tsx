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
            className="phone-screen relative bg-sand py-6 text-espresso sm:py-24 lg:flex lg:h-[calc(100svh-72px)] lg:min-h-[560px] lg:flex-col lg:py-10"
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
                    Apasă pe o clasă pentru detalii.
                </p>
            </div>

            <ul
                ref={track}
                className="mx-auto mt-5 grid max-w-[1440px] grid-cols-[repeat(2,auto)] justify-center gap-x-3 gap-y-4 px-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 sm:px-8 lg:mt-8 lg:flex lg:min-h-0 lg:w-full lg:flex-1 lg:items-center lg:justify-center lg:px-12 lg:pb-0 lg:[container-type:size]"
            >
                {classes.map((c) => (
                    <li key={c.id} data-poster-item className="w-[min(calc((100vw_-_2.75rem)_/_2),calc((100svh_-_23.5rem)_*_0.3594))] min-w-0 sm:w-auto lg:w-[min(calc((100cqh_-_4rem)_*_0.7187),calc((100cqw_-_10.5rem)_/_4))] lg:max-w-none">
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
