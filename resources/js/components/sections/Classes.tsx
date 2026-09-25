import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { classes, site, type FitnessClass } from '@/lib/site';
import { posterFor } from '@/lib/posters';
import { gsap, lockScroll } from '@/lib/scroll';
import { Icon } from '../Icon';
import { NotchCard } from '../NotchCard';

const SECTION_BG = '#ece1d4'; // bg-sand, painted into the card notches

// Motion is only needed once a class is opened, so the dialog is split into its own chunk.
const ClassDialogHost = lazy(() => import('./ClassDialog'));

export function Classes() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const bar = useRef<HTMLSpanElement>(null);
    const [active, setActive] = useState<FitnessClass | null>(null);
    const [dialogUsed, setDialogUsed] = useState(false);

    // Desktop: pin the section and translate the track horizontally with the scroll.
    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
                const el = track.current!;
                const distance = () => el.scrollWidth - el.clientWidth;
                gsap.to(el, {
                    x: () => -distance(),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '[data-classes-pin]',
                        start: 'top top',
                        end: () => `+=${distance()}`,
                        pin: true,
                        scrub: 0.8,
                        invalidateOnRefresh: true,
                        onUpdate: (self) => bar.current && (bar.current.style.transform = `scaleX(${self.progress})`),
                    },
                });
            });
        },
        { scope: root },
    );

    // Mobile: progress bar follows the native horizontal swipe.
    useEffect(() => {
        const el = track.current;
        if (!el) return;
        const onScroll = () => {
            if (window.innerWidth >= 1024) return;
            const max = el.scrollWidth - el.clientWidth;
            if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? el.scrollLeft / max : 0})`;
        };
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
        <section ref={root} id="clase" className="relative bg-sand text-espresso">
            <div data-classes-pin className="relative flex flex-col justify-center overflow-hidden py-24 lg:h-svh lg:min-h-[680px] lg:py-0">
                <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-12">
                    <div>
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Clasele noastre · 07
                        </p>
                        <h2 data-split className="mt-5 font-display text-5xl leading-[0.95] font-light sm:text-6xl lg:text-7xl">
                            Găsește mișcarea
                            <br />
                            <em className="text-bronze">care ți se potrivește</em>
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-cocoa">
                        Șapte experiențe, un singur scop: să te simți puternică, liberă și bine în pielea ta.
                        <span className="mt-2 block font-medium text-bronze lg:hidden">Glisează pentru toate clasele →</span>
                    </p>
                </div>

                <ul
                    ref={track}
                    className="no-scrollbar relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:px-8 lg:mt-14 lg:snap-none lg:gap-6 lg:overflow-visible lg:px-12"
                >
                    {classes.map((c, i) => (
                        <li key={c.id} className="w-[76vw] max-w-[340px] shrink-0 snap-center sm:snap-start lg:w-auto lg:max-w-none">
                            <ClassCard
                                c={c}
                                index={i}
                                onOpen={() => {
                                    setDialogUsed(true);
                                    setActive(c);
                                }}
                            />
                        </li>
                    ))}
                    <li className="w-[76vw] max-w-[340px] shrink-0 snap-center sm:snap-start lg:w-auto lg:max-w-none">
                        <NotchCard
                            notchColor={SECTION_BG}
                            className="flex aspect-[2/3] flex-col bg-espresso p-7 text-cream lg:h-[min(62svh,540px)]"
                            badge={
                                <a
                                    href={site.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Rezervă-ți locul pe WhatsApp"
                                    className="grid h-full w-full place-items-center bg-gold text-ink transition-colors hover:bg-gold-soft"
                                >
                                    <Icon name="arrow-up-right" className="h-5 w-5" />
                                </a>
                            }
                            badgeClassName="pointer-events-auto"
                        >
                            <p className="eyebrow flex items-center gap-2 text-gold-soft">
                                <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Locuri limitate
                            </p>
                            <p className="mt-5 font-script text-6xl leading-[0.9] text-gold-soft">More than a workout</p>
                            <p className="mt-auto max-w-[15rem] text-sm leading-relaxed text-cream/70">
                                Grupe mici, instructori dedicați și un program gândit pentru ritmul tău. Rezervă-ți locul de pe acum.
                            </p>
                        </NotchCard>
                    </li>
                </ul>

                <div className="relative mx-auto mt-10 w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                    <div className="h-px w-full bg-espresso/10">
                        <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-bronze" />
                    </div>
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

function ClassCard({ c, index, onOpen }: { c: FitnessClass; index: number; onOpen: () => void }) {
    const poster = posterFor(c.id);
    const badge = (
        <span className="grid h-full w-full place-items-center text-espresso" style={{ background: poster ? '#f7f1ea' : `${c.accent}55` }}>
            {String(index + 1).padStart(2, '0')}
        </span>
    );
    const shared = {
        as: 'button' as const,
        onClick: onOpen,
        ariaLabel: `${c.name} — vezi detalii`,
        cursor: 'Detalii',
        notchColor: SECTION_BG,
        badge,
    };

    // With a poster, the card is the poster itself, shown whole in its portrait format.
    if (poster) {
        return (
            <NotchCard
                {...shared}
                className="aspect-[2/3] overflow-hidden bg-espresso shadow-[0_30px_60px_-40px_rgba(42,32,26,0.7)] transition-transform duration-700 ease-out-expo hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze lg:h-[min(62svh,540px)]"
            >
                <img
                    src={poster}
                    alt={`Afiș ${c.name} — MUV Exclusive`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
                />
            </NotchCard>
        );
    }

    return (
        <NotchCard
            {...shared}
            className="flex aspect-[2/3] flex-col bg-white/85 p-7 shadow-[0_30px_60px_-45px_rgba(42,32,26,0.55)] transition-[background-color,transform] duration-700 ease-out-expo hover:-translate-y-1.5 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze lg:h-[min(62svh,540px)]"
        >
            <p className="eyebrow flex items-center gap-2 text-[0.62rem] text-cocoa">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: c.accent }} />
                {c.keywords.slice(0, 2).join(' · ')}
            </p>
            <h3 className="mt-4 font-display text-[2.5rem] leading-[0.95] font-medium">{c.name}</h3>
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-cocoa/80">{c.description}</p>

            <span className="mt-auto flex items-end justify-between pr-20">
                <span className="transition-transform duration-700 ease-out-expo group-hover:-rotate-6 group-hover:scale-110" style={{ color: c.accent }}>
                    <Icon name={c.icon} className="h-20 w-20" strokeWidth={0.8} />
                </span>
            </span>
        </NotchCard>
    );
}
