import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { timetable, type Slot } from '@/lib/site';
import { gsap, whenNear } from '@/lib/scroll';
import { bookingLinkProps } from '../BookingLink';
import { Icon } from '../Icon';

/** Each instructor's colour in the timetable (as on the studio's own schedule). */
const tone: Record<Slot['by'], { dot: string; card: string }> = {
    Ana: { dot: 'bg-[#d39a3a]', card: 'border-[#d39a3a]/35 bg-[#d39a3a]/[0.09]' },
    Cristina: { dot: 'bg-[#7f9150]', card: 'border-[#7f9150]/35 bg-[#7f9150]/[0.09]' },
    Irina: { dot: 'bg-[#b8946a]', card: 'border-[#b8946a]/40 bg-[#b8946a]/[0.1]' },
    Valy: { dot: 'bg-[#6f8aa8]', card: 'border-[#6f8aa8]/35 bg-[#6f8aa8]/[0.09]' },
};

/** Monday = 0 … Sunday = 6; on Sunday (no classes) the phone view opens on Monday. */
function todayIndex() {
    const i = (new Date().getDay() + 6) % 7;
    return timetable[i].slots.length ? i : 0;
}

/** The weekly class timetable for November. Desktop: the whole week. Phone: one day at a time. */
export function Schedule() {
    const root = useRef<HTMLElement>(null);
    const [day, setDay] = useState(todayIndex);

    useGSAP(
        (_, contextSafe) =>
            // Prepared once the section is about a screen away, so it costs nothing at start-up.
            whenNear(root.current, contextSafe!(() => {
                gsap.from('[data-day]', {
                    y: 40,
                    autoAlpha: 0,
                    duration: 1,
                    stagger: 0.06,
                    ease: 'expo.out',
                    scrollTrigger: { trigger: '[data-week]', start: 'top 88%', once: true },
                });
            })),
        { scope: root },
    );

    return (
        <section
            ref={root}
            id="program"
            data-snap
            className="phone-screen relative flex flex-col justify-center overflow-hidden bg-sand py-6 text-espresso short:py-4 sm:py-20 lg:min-h-[calc(100svh-72px)] lg:py-12 lower:py-6"
        >
            <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <div className="text-center lg:flex lg:items-end lg:justify-between lg:gap-10 lg:text-left">
                    <div>
                        <p className="eyebrow inline-flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Noiembrie 2026 <span className="h-px w-8 bg-gold lg:hidden" />
                        </p>
                        <h2 data-split className="mt-2 font-display text-[2.1rem] leading-[0.95] short:text-[1.8rem] sm:mt-4 sm:text-6xl lg:text-[clamp(2.75rem,6svh,4.25rem)]">
                            Programul <em className="text-bronze">claselor</em>
                        </h2>
                    </div>
                    <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[0.7rem] text-cocoa sm:text-xs lg:mt-0 lg:justify-end">
                        {(Object.keys(tone) as Slot['by'][]).map((n) => (
                            <li key={n} className="inline-flex items-center gap-1.5">
                                <span className={`h-2 w-2 rounded-full ${tone[n].dot}`} /> {n}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Phone: day tabs */}
                <div role="tablist" aria-label="Ziua" className="mt-4 grid grid-cols-7 gap-1 short:mt-3 lg:hidden">
                    {timetable.map((d, i) => (
                        <button
                            key={d.day}
                            role="tab"
                            aria-selected={i === day}
                            aria-label={d.day}
                            onClick={() => setDay(i)}
                            className={`rounded-full py-2 text-[0.7rem] font-semibold tracking-[0.08em] uppercase transition-colors ${
                                i === day ? 'bg-espresso text-cream' : 'bg-white/60 text-cocoa'
                            }`}
                        >
                            {d.short}
                        </button>
                    ))}
                </div>

                <ol data-week className="mt-3 grid gap-3 sm:mt-8 lg:mt-10 lg:grid-cols-7 lg:gap-3 low:mt-6 lower:mt-4">
                    {timetable.map((d, i) => (
                        <li key={d.day} data-day className={`${i === day ? 'block' : 'hidden'} lg:block`}>
                            <p className="hidden border-b border-espresso/10 pb-2 font-display text-2xl lg:block lower:pb-1 lower:text-xl">{d.day}</p>
                            <p className="mb-2 font-display text-2xl short:hidden lg:hidden">{d.day}</p>
                            {d.slots.length ? (
                                <ul className="space-y-2 lg:mt-3 lower:mt-2 lower:space-y-1.5">
                                    {d.slots.map((s) => (
                                        <li
                                            key={s.time}
                                            className={`flex items-center gap-3 rounded-2xl border px-4 py-2.5 short:py-2 lg:block lg:px-3 lg:py-2 lower:py-1.5 ${tone[s.by].card}`}
                                        >
                                            <span className="flex w-[5.6rem] shrink-0 items-center justify-between text-[0.72rem] font-semibold text-cocoa tabular-nums lg:w-auto lg:text-[0.68rem]">
                                                {s.time}
                                                <span className="hidden items-center gap-1 font-normal lg:inline-flex">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${tone[s.by].dot}`} /> {s.by}
                                                </span>
                                            </span>
                                            <span className="min-w-0 flex-1 font-display text-lg leading-tight lg:mt-0.5 lg:block lg:text-[1.15rem] lower:text-[1.05rem]">{s.name}</span>
                                            <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.72rem] text-cocoa lg:hidden">
                                                <span className={`h-1.5 w-1.5 rounded-full ${tone[s.by].dot}`} /> {s.by}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="rounded-2xl border border-dashed border-espresso/15 px-4 py-6 text-center text-sm text-cocoa/70 lg:mt-3">Zi liberă</p>
                            )}
                        </li>
                    ))}
                </ol>

                <div className="mt-4 flex flex-col items-center gap-3 text-center sm:mt-8 lg:mt-8 lg:flex-row lg:justify-between lg:text-left low:mt-6 lower:mt-4">
                    <p className="text-[0.78rem] text-cocoa short:hidden sm:text-sm">Locurile se rezervă în aplicația SmartGym. Programul poate suferi mici modificări.</p>
                    <a
                        {...bookingLinkProps()}
                        className="group inline-flex items-center gap-3 rounded-full bg-espresso py-2 pr-2 pl-6 text-[0.64rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                    >
                        Rezervă în aplicație
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-cream text-espresso transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
                            <Icon name="arrow" className="h-4 w-4" />
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
