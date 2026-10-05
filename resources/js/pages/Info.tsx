import { useEffect } from 'react';
import { bookingLinkProps } from '@/components/BookingLink';
import { CookieBanner } from '@/components/CookieBanner';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/sections/Footer';
import type { InfoPage } from '@/lib/pages';
import { posterFor, posterSrcSet } from '@/lib/posters';
import { homeHref } from '@/lib/routes';
import { classes, site, smartgym, team, timetable } from '@/lib/site';

/** A content page (e.g. Clase de Pilates): the text, the class poster, its weekly times and booking. */
export default function Info({ page }: { page: InfoPage }) {
    useEffect(() => {
        document.getElementById('boot')?.remove();
        document.title = `${page.title} — MUV Exclusive`;
        window.scrollTo(0, 0);
    }, [page]);

    const cls = classes.find((c) => c.id === page.classId);
    const poster = cls ? posterFor(cls.id) : undefined;
    // The class's slots in the weekly timetable (matched by the class's first word, e.g. "Pilates").
    const word = cls?.name.split(' ')[0].toLowerCase();
    const slots = word
        ? timetable.flatMap((d) => d.slots.filter((s) => s.name.toLowerCase().startsWith(word)).map((s) => ({ ...s, day: d.day })))
        : [];
    const teacher = slots[0] && team.find((m) => m.name.startsWith(slots[0].by));

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-bronze/10 bg-cream/85 backdrop-blur-lg">
                <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
                    <a href={homeHref()} aria-label="MUV Exclusive — pagina principală">
                        <Logo />
                    </a>
                    <a
                        href={homeHref('#clase')}
                        className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-[0.62rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                    >
                        <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" /> Toate clasele
                    </a>
                </div>
            </header>

            <main className="relative z-10 bg-cream pb-20 lg:rounded-b-[3rem] lg:pb-28 lg:shadow-[0_40px_60px_-30px_rgba(22,17,14,0.45)]">
                <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:px-12">
                    <article className="min-w-0 lg:col-span-7">
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> {page.eyebrow}
                        </p>
                        <h1 className="mt-4 font-display text-[2.8rem] leading-[0.95] sm:text-6xl lg:text-7xl">{page.title}</h1>
                        <p className="mt-5 max-w-2xl font-display text-2xl leading-snug text-bronze italic sm:text-3xl">{page.tagline}</p>

                        <div className="mt-8 max-w-2xl space-y-5 text-[1rem] leading-relaxed text-cocoa sm:text-[1.08rem]">
                            {page.paragraphs.map((p) => (
                                <p key={p}>{p}</p>
                            ))}
                        </div>

                        {cls && (
                            <ul className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-2">
                                {cls.benefits.map((b) => (
                                    <li key={b} className="flex items-center gap-3 rounded-2xl bg-white/70 px-4 py-3 text-[0.95rem]">
                                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-espresso text-gold-soft">
                                            <Icon name="check" className="h-3.5 w-3.5" />
                                        </span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {cls?.script && <p className="mt-10 font-script text-5xl text-bronze">{cls.script}</p>}
                    </article>

                    <aside className="space-y-6 lg:col-span-5">
                        {poster && cls && (
                            <img
                                src={poster}
                                srcSet={posterSrcSet(cls.id)}
                                sizes="(min-width: 1024px) 34vw, 92vw"
                                alt={`Afiș ${cls.name} — MUV Exclusive`}
                                width={1060}
                                height={1484}
                                loading="lazy"
                                decoding="async"
                                className="mx-auto block h-auto w-full max-w-md rounded-[1.6rem] shadow-[0_40px_70px_-40px_rgba(42,32,26,0.8)]"
                            />
                        )}

                        <div className="rounded-[1.6rem] bg-espresso p-6 text-cream sm:p-8">
                            {slots.length > 0 && (
                                <>
                                    <p className="eyebrow text-gold-soft">Programul săptămânal</p>
                                    {teacher && <p className="mt-2 text-sm text-cream/70">Cu {teacher.name}</p>}
                                    <ul className="mt-4 divide-y divide-gold/15">
                                        {slots.map((s) => (
                                            <li key={s.day + s.time} className="flex items-baseline justify-between gap-4 py-2.5">
                                                <span>{s.day}</span>
                                                <span className="font-medium text-gold-soft tabular-nums">{s.time}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <p className="mt-5 text-sm leading-relaxed text-cream/70">
                                Rezervările se fac în aplicația <span className="text-cream">SmartGym</span>, cu codul sălii{' '}
                                <span className="font-semibold text-gold-soft">{smartgym.gymCode}</span>.
                            </p>
                            <div className="mt-5 flex items-center gap-3">
                                <a
                                    {...bookingLinkProps()}
                                    className="group inline-flex flex-1 items-center justify-between gap-3 rounded-full bg-gold py-2.5 pr-2.5 pl-6 text-[0.64rem] font-semibold tracking-[0.2em] text-ink uppercase transition-colors hover:bg-gold-soft"
                                >
                                    Rezervă în aplicație
                                    <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-gold-soft">
                                        <Icon name="arrow" className="h-4 w-4" />
                                    </span>
                                </a>
                                <a
                                    href={site.whatsapp}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Întreabă-ne pe WhatsApp"
                                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cream/25 transition-colors hover:border-gold"
                                >
                                    <Icon name="whatsapp" className="h-5 w-5" />
                                </a>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer onHome={false} />
            <CookieBanner />
        </>
    );
}
