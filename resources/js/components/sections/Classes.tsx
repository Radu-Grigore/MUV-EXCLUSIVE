import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { classes, site, type FitnessClass } from '@/lib/site';
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
        <section ref={root} id="clase" className="relative bg-ink text-cream">
            <div data-classes-pin className="relative flex flex-col justify-center overflow-hidden py-24 lg:h-svh lg:min-h-[680px] lg:py-0">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ background: 'radial-gradient(50% 60% at 15% 10%, rgba(199,160,106,0.18) 0%, transparent 70%)' }}
                />
                <div className="relative mx-auto flex w-full max-w-[1440px] flex-col justify-between gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-12">
                    <div>
                        <p className="eyebrow flex items-center gap-3 text-gold">
                            <span className="h-px w-8 bg-gold" /> Clasele noastre · 07
                        </p>
                        <h2 className="mt-5 font-display text-5xl leading-[0.95] font-light sm:text-6xl lg:text-7xl">
                            Găsește mișcarea
                            <br />
                            <em className="text-gold-soft">care ți se potrivește</em>
                        </h2>
                    </div>
                    <p className="max-w-sm text-sm leading-relaxed text-cream/60">
                        Șapte experiențe, un singur scop: să te simți puternică, liberă și bine în pielea ta.
                        <span className="mt-2 block text-gold-soft/80 lg:hidden">Glisează pentru toate clasele →</span>
                    </p>
                </div>

                <ul
                    ref={track}
                    className="no-scrollbar relative mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-5 pb-2 sm:px-8 lg:mt-14 lg:snap-none lg:gap-6 lg:overflow-visible lg:px-12"
                >
                    {classes.map((c, i) => (
                        <li key={c.id} className="w-[78vw] max-w-[340px] shrink-0 snap-center sm:snap-start lg:w-[25vw] lg:max-w-[380px]">
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
                    <li className="w-[78vw] max-w-[340px] shrink-0 snap-center sm:snap-start lg:w-[25vw] lg:max-w-[380px]">
                        <div className="flex h-[440px] flex-col justify-between rounded-[1.75rem] border border-gold/30 bg-gradient-to-br from-gold/25 via-gold/5 to-transparent p-7 lg:h-[min(56svh,500px)]">
                            <p className="font-script text-6xl leading-[0.9] text-gold-soft">More than a workout</p>
                            <div>
                                <p className="text-sm leading-relaxed text-cream/70">Grupe mici, instructori dedicați și un program gândit pentru ritmul tău.</p>
                                <a
                                    href={site.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group mt-6 inline-flex items-center gap-2 rounded-full bg-cream py-3 pr-3 pl-6 text-[0.64rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-colors hover:bg-gold-soft"
                                >
                                    Rezervă-ți locul
                                    <span className="grid h-7 w-7 place-items-center rounded-full bg-espresso text-cream transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                                        <Icon name="arrow" className="h-3.5 w-3.5" />
                                    </span>
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>

                <div className="relative mx-auto mt-10 w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                    <div className="h-px w-full bg-cream/10">
                        <span ref={bar} className="block h-px w-full origin-left scale-x-0 bg-gold" />
                    </div>
                </div>
            </div>

            {dialogUsed && (
                <Suspense fallback={null}>
                    <ClassDialogHost active={active} onClose={() => setActive(null)} />
                </Suspense>
            )}
        </section>
    );
}

function ClassCard({ c, index, onOpen }: { c: FitnessClass; index: number; onOpen: () => void }) {
    return (
        <button
            type="button"
            onClick={onOpen}
            className="group relative flex h-[440px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 p-7 text-left transition-[border-color,transform] duration-700 ease-out-expo hover:-translate-y-2 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold lg:h-[min(56svh,500px)]"
            style={{
                background: `radial-gradient(90% 60% at 50% 38%, ${c.accent}40 0%, transparent 70%), linear-gradient(180deg, #221a15 0%, #16110e 100%)`,
            }}
        >
            <span className="absolute inset-x-8 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
            <div className="flex items-start justify-between">
                <span className="font-display text-2xl text-cream/40">0{index + 1}</span>
                <span
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80 transition-all duration-500 ease-out-expo group-hover:rotate-90 group-hover:border-transparent group-hover:bg-cream group-hover:text-espresso"
                >
                    <Icon name="plus" className="h-4 w-4" />
                </span>
            </div>

            <div className="relative flex flex-1 items-center justify-center">
                <span className="absolute h-40 w-40 rounded-full opacity-40 transition-transform duration-700 ease-out-expo group-hover:scale-125" style={{ background: `radial-gradient(circle, ${c.accent}66 0%, transparent 70%)` }} />
                <span style={{ color: c.accent }} className="relative transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
                    <Icon name={c.icon} className="h-24 w-24" strokeWidth={0.9} />
                </span>
            </div>

            <div>
                <h3 className="font-display text-[2.1rem] leading-none font-medium">{c.name}</h3>
                <p className="mt-3 text-[0.6rem] tracking-[0.24em] uppercase" style={{ color: c.accent }}>
                    {c.keywords.join(' · ')}
                </p>
            </div>
        </button>
    );
}
