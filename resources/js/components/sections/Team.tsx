import { useGSAP } from '@gsap/react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { asset, team, type TeamMember } from '@/lib/site';
import { gsap, lockScroll, whenNear } from '@/lib/scroll';
import { Icon } from '../Icon';

// The full story opens in a panel; Motion is only loaded when someone opens one.
const TeamDialog = lazy(() => import('./TeamDialog'));

/** The instructors: one screen with their photos, roles and classes; each opens to her full story. */
export function Team() {
    const root = useRef<HTMLElement>(null);
    const track = useRef<HTMLUListElement>(null);
    const [active, setActive] = useState<TeamMember | null>(null);
    const [used, setUsed] = useState(false);
    const [index, setIndex] = useState(0);

    useGSAP(
        (_, contextSafe) =>
            // Prepared once the section is about a screen away, so it costs nothing at start-up.
            whenNear(root.current, contextSafe!(() => {
                gsap.from('[data-member]', {
                    y: 70,
                    autoAlpha: 0,
                    duration: 1.2,
                    stagger: 0.12,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-members]', start: 'top 85%', once: true },
                });
            })),
        { scope: root },
    );

    useEffect(() => {
        lockScroll(!!active);
        if (!active) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [active]);

    function open(m: TeamMember) {
        setUsed(true);
        setActive(m);
    }

    /** Phone row: the card closest to the middle is the active one (for the dots). */
    function onTrackScroll() {
        const el = track.current;
        if (!el) return;
        const middle = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestDistance = Infinity;
        Array.from(el.children).forEach((child, i) => {
            const li = child as HTMLElement;
            const d = Math.abs(li.offsetLeft + li.offsetWidth / 2 - middle);
            if (d < bestDistance) {
                bestDistance = d;
                best = i;
            }
        });
        setIndex(best);
    }

    return (
        <section
            ref={root}
            id="echipa"
            data-snap
            className="phone-screen relative overflow-hidden bg-cream py-5 text-espresso sm:py-16 lg:flex lg:h-[calc(100svh-72px)] lg:min-h-[620px] lg:flex-col lg:py-10 low:py-8"
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(40% 50% at 50% 60%, rgba(230,207,166,0.45) 0%, transparent 70%)' }}
            />

            <div className="relative mx-auto flex w-full max-w-[1440px] flex-col lg:min-h-0 lg:flex-1 lg:px-12">
                <div className="px-5 text-center sm:px-8 lg:flex lg:shrink-0 lg:items-end lg:justify-between lg:gap-10 lg:px-0 lg:text-left">
                    <div>
                        <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Echipa <span className="h-px w-8 bg-gold lg:hidden" />
                        </p>
                        <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] sm:mt-4 sm:text-6xl lg:text-[clamp(2.75rem,6svh,4.25rem)]">
                            Instructoarele <em className="text-bronze">MUV Exclusive</em>
                        </h2>
                    </div>
                    <p className="mt-2 text-[0.8rem] text-cocoa short:hidden sm:text-sm lg:mt-0 lg:max-w-xs lg:text-right">
                        Patru instructoare, patru stiluri de mișcare. Apasă pe o instructoare ca să-i citești povestea.
                    </p>
                </div>

                {/* Phone: a swipeable row. Desktop: three cards side by side, sized by the height left on screen. */}
                <div className="mt-4 short:mt-3 sm:mt-10 lg:mt-8 lg:min-h-0 lg:flex-1 lg:[container-type:size] low:mt-6">
                    <ul
                        ref={track}
                        data-members
                        onScroll={onTrackScroll}
                        className="no-scrollbar relative flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[calc(50vw_-_var(--card)_/_2)] pb-1 [--card:min(76vw,calc((100svh_-_24rem)_*_0.8))] short:[--card:min(72vw,calc((100svh_-_21rem)_*_0.8))] sm:gap-6 sm:[--card:min(44vw,calc((100svh_-_24rem)_*_0.8))] lg:h-full lg:justify-center lg:gap-6 lg:overflow-visible lg:px-0 lg:[--card:min(calc((100cqw_-_4.5rem)_/_4),calc((100cqh_-_8.5rem)_*_0.8))] xl:gap-8 xl:[--card:min(calc((100cqw_-_6rem)_/_4),calc((100cqh_-_8.5rem)_*_0.8))]"
                    >
                        {team.map((m) => (
                            <li key={m.id} data-member className="w-[var(--card)] shrink-0 snap-center">
                                <MemberCard m={m} onOpen={() => open(m)} />
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 flex justify-center gap-1.5 lg:hidden" aria-hidden="true">
                        {team.map((m, i) => (
                            <span key={m.id} className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-bronze' : 'w-1.5 bg-espresso/20'}`} />
                        ))}
                    </div>
                </div>
            </div>

            {used && (
                <Suspense fallback={null}>
                    <TeamDialog active={active} onClose={() => setActive(null)} />
                </Suspense>
            )}
        </section>
    );
}

function MemberCard({ m, onOpen }: { m: TeamMember; onOpen: () => void }) {
    const photo = m.photos[0] as TeamMember['photos'][number] | undefined;

    return (
        <button type="button" data-cursor="Povestea" onClick={onOpen} className="group block w-full text-left">
            <span className="relative block overflow-hidden rounded-[1.4rem] bg-sand shadow-[0_30px_60px_-35px_rgba(42,32,26,0.7)] sm:rounded-[1.8rem]">
                {photo ? (
                    <img
                        src={asset(photo.card ?? photo.src)}
                        alt={`${m.name} — ${m.role}, MUV Exclusive`}
                        width={800}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                        className="block aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                        style={{ objectPosition: photo.position ?? '50% 20%' }}
                    />
                ) : (
                    <Avatar name={m.name} className="aspect-[4/5] w-full" />
                )}
                <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
                <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-cream/95 py-1.5 pr-1.5 pl-3 text-[0.58rem] font-semibold tracking-[0.18em] text-espresso uppercase shadow transition-colors group-hover:bg-gold-soft sm:right-4 sm:bottom-4">
                    Povestea
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-espresso text-cream">
                        <Icon name="plus" className="h-3 w-3" />
                    </span>
                </span>
            </span>
            <span className="mt-3 block px-0.5 short:mt-2">
                <span className="block font-display text-[1.7rem] leading-none short:text-[1.45rem] sm:text-3xl">{m.name}</span>
                {/* Always two lines tall on wider screens, so the class chips line up across the cards. */}
                <span className="mt-1.5 block text-[0.6rem] leading-snug font-medium tracking-[0.16em] text-bronze uppercase sm:min-h-[2.75em] sm:text-[0.66rem]">{m.role}</span>
                <span className="mt-2 flex flex-wrap gap-1.5 short:hidden">
                    {m.classes.slice(0, 3).map((c) => (
                        <span key={c} className="rounded-full border border-bronze/25 px-2.5 py-1 text-[0.62rem] text-cocoa">
                            {c}
                        </span>
                    ))}
                    {m.classes.length > 3 && <span className="px-1 py-1 text-[0.62rem] text-cocoa/70">+{m.classes.length - 3}</span>}
                </span>
            </span>
        </button>
    );
}

/** Stand-in for an instructor without a photo yet: her initials on the brand's warm gradient. */
export function Avatar({ name, className = '', compact = false }: { name: string; className?: string; compact?: boolean }) {
    const initials = name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2);
    return (
        <span
            role="img"
            aria-label={`${name} — fotografie în curând`}
            className={`relative flex flex-col items-center justify-center overflow-hidden ${className}`}
            style={{ background: 'radial-gradient(70% 60% at 50% 38%, #f3e6d2 0%, #e3cfb2 55%, #c9a97f 100%)' }}
        >
            <span className="absolute top-1/2 left-1/2 aspect-square w-[78%] -translate-x-1/2 -translate-y-[58%] rounded-full border border-bronze/30" />
            <span className="absolute top-1/2 left-1/2 aspect-square w-[68%] -translate-x-1/2 -translate-y-[58%] rounded-full border border-dashed border-bronze/25" />
            <span className={`text-gold-gradient relative font-display leading-none tracking-[-0.02em] ${compact ? 'text-6xl' : 'text-[5.5rem] sm:text-[7rem]'}`}>{initials}</span>
            <span className={`relative text-[0.6rem] font-medium tracking-[0.28em] text-bronze uppercase ${compact ? 'mt-2' : 'mt-4'}`}>Fotografie în curând</span>
        </span>
    );
}
