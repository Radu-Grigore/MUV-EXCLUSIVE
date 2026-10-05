import { useEffect, useState } from 'react';
import { CookieBanner } from '@/components/CookieBanner';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/sections/Footer';
import { nutritionIntro, nutritionPrograms, type NutritionProgram } from '@/lib/nutrition';
import { homeHref } from '@/lib/routes';
import { site } from '@/lib/site';

const lei = (n: number) => n.toLocaleString('ro-RO');
const TOTAL_WEEKS = Math.max(...nutritionPrograms.map((p) => p.weeks.max + p.weeks.followUp));

function whatsappFor(p: NutritionProgram) {
    return `${site.whatsapp}?text=${encodeURIComponent(`Bună! Aș dori mai multe detalii despre programul ${p.name} la MUV Exclusive.`)}`;
}

/** Weeks at a glance: solid = programme, lighter = "up to" weeks, outlined = follow-up. */
function WeekBar({ p, dark }: { p: NutritionProgram; dark: boolean }) {
    const cells = Array.from({ length: TOTAL_WEEKS }, (_, i) => {
        const w = i + 1;
        if (w <= p.weeks.min) return 'core';
        if (w <= p.weeks.max) return 'flex';
        if (w <= p.weeks.max + p.weeks.followUp) return 'follow';
        return 'none';
    });
    const style = {
        core: dark ? 'bg-gold' : 'bg-espresso',
        flex: dark ? 'bg-gold/45' : 'bg-espresso/40',
        follow: dark ? 'border border-dashed border-gold/70' : 'border border-dashed border-bronze/70',
        none: dark ? 'bg-cream/[0.06]' : 'bg-espresso/[0.05]',
    } as const;
    return (
        <div aria-label={`Durată: ${p.duration}`} role="img">
            <div className="flex gap-1">
                {cells.map((c, i) => (
                    <span key={i} className={`h-3 flex-1 rounded-full ${style[c]}`} />
                ))}
            </div>
            <div className={`mt-2 flex justify-between text-[0.6rem] tracking-[0.14em] uppercase ${dark ? 'text-cream/50' : 'text-cocoa/60'}`}>
                <span>Săpt. 1</span>
                <span>Săpt. {TOTAL_WEEKS}</span>
            </div>
        </div>
    );
}

function ProgramCard({ p, dark }: { p: NutritionProgram; dark: boolean }) {
    const [all, setAll] = useState(false);
    const shown = all ? p.includes : p.includes.slice(0, 6);
    const muted = dark ? 'text-cream/70' : 'text-cocoa';

    return (
        <article
            className={`relative flex flex-col overflow-hidden rounded-[2rem] p-6 sm:p-10 ${
                dark ? 'bg-espresso text-cream' : 'bg-white/80 text-espresso shadow-[0_40px_70px_-50px_rgba(42,32,26,0.7)]'
            }`}
        >
            {dark && (
                <span className="absolute top-6 right-6 rounded-full bg-gold px-3 py-1 text-[0.58rem] font-semibold tracking-[0.18em] text-ink uppercase sm:top-8 sm:right-8">
                    Cel mai complet
                </span>
            )}
            <p className={`eyebrow pr-32 ${dark ? 'text-gold-soft' : 'text-bronze'}`}>{p.durationShort}</p>
            <h2 className="mt-3 pr-24 font-display text-[2.2rem] leading-[0.95] sm:text-5xl">{p.name}</h2>
            <p className={`mt-4 leading-relaxed ${muted}`}>{p.subtitle}</p>

            <div className="mt-6 flex items-end gap-2">
                <span className={`font-display text-6xl leading-none ${dark ? 'text-gold-soft' : 'text-espresso'}`}>{lei(p.price)}</span>
                <span className={`mb-1.5 text-xs tracking-[0.16em] uppercase ${muted}`}>lei · investiție</span>
            </div>
            <p className={`mt-2 text-sm ${muted}`}>
                Durată: <span className={dark ? 'text-cream' : 'text-espresso'}>{p.duration}</span>
            </p>

            <div className="mt-6">
                <WeekBar p={p} dark={dark} />
            </div>

            <div className={`mt-6 space-y-3 text-[0.95rem] leading-relaxed ${muted}`}>
                {p.intro.map((t) => (
                    <p key={t}>{t}</p>
                ))}
            </div>

            <h3 className={`eyebrow mt-8 ${dark ? 'text-gold-soft' : 'text-bronze'}`}>Programul include</h3>
            <ul className="mt-3 space-y-2.5">
                {shown.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.95rem] leading-snug">
                        <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${dark ? 'bg-gold text-ink' : 'bg-espresso text-gold-soft'}`}>
                            <Icon name="check" className="h-3 w-3" />
                        </span>
                        {item}
                    </li>
                ))}
            </ul>
            {p.includes.length > 6 && (
                <button
                    type="button"
                    onClick={() => setAll((v) => !v)}
                    aria-expanded={all}
                    className={`mt-4 self-start text-sm font-medium underline underline-offset-4 ${dark ? 'text-gold-soft decoration-gold/40' : 'text-bronze decoration-bronze/40'}`}
                >
                    {all ? 'Arată mai puțin' : `Vezi tot ce include (+${p.includes.length - 6})`}
                </button>
            )}

            <div className={`mt-8 space-y-3 border-t pt-6 text-sm leading-relaxed ${dark ? 'border-cream/10 text-cream/60' : 'border-espresso/10 text-cocoa/80'}`}>
                {p.closing.map((t) => (
                    <p key={t}>{t}</p>
                ))}
            </div>

            <a
                href={whatsappFor(p)}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full py-4 text-[0.66rem] font-semibold tracking-[0.2em] uppercase transition-colors ${
                    dark ? 'bg-gold text-ink hover:bg-gold-soft' : 'bg-espresso text-cream hover:bg-bronze'
                }`}
            >
                <Icon name="whatsapp" className="h-4 w-4" /> Vreau acest program
            </a>
        </article>
    );
}

/** The nutrition page: the approach, then the two programmes side by side. */
export default function Nutrition() {
    useEffect(() => {
        document.getElementById('boot')?.remove();
        document.title = 'Nutriție — MUV Exclusive';
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-bronze/10 bg-cream/85 backdrop-blur-lg">
                <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
                    <a href={homeHref()} aria-label="MUV Exclusive — pagina principală">
                        <Logo />
                    </a>
                    <a
                        href={homeHref('#servicii')}
                        className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-[0.62rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                    >
                        <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" /> Înapoi la site
                    </a>
                </div>
            </header>

            <main className="relative z-10 bg-cream pb-20 lg:rounded-b-[3rem] lg:pb-28 lg:shadow-[0_40px_60px_-30px_rgba(22,17,14,0.45)]">
                <section className="mx-auto max-w-[1440px] px-5 pt-10 sm:px-8 sm:pt-16 lg:grid lg:grid-cols-12 lg:gap-16 lg:px-12">
                    <div className="lg:col-span-7">
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Servicii complementare
                        </p>
                        <h1 className="mt-4 font-display text-[3rem] leading-[0.92] sm:text-7xl lg:text-8xl">
                            Nutriție <em className="text-bronze">MUV</em>
                        </h1>
                        <p className="mt-6 max-w-2xl font-display text-2xl leading-snug text-espresso italic sm:text-3xl">{nutritionIntro.tagline}</p>
                    </div>
                    <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-cocoa lg:col-span-5 lg:mt-24">
                        {nutritionIntro.paragraphs.map((t) => (
                            <p key={t}>{t}</p>
                        ))}
                        <p className="font-script text-4xl text-bronze">Move. Nourish. Feel good.</p>
                    </div>
                </section>

                <section className="mx-auto mt-14 max-w-[1440px] px-5 sm:mt-20 sm:px-8 lg:px-12">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2 className="font-display text-4xl leading-none sm:text-5xl">Alege programul</h2>
                        <ul className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-cocoa">
                            <li className="inline-flex items-center gap-2">
                                <span className="h-2.5 w-5 rounded-full bg-espresso" /> program
                            </li>
                            <li className="inline-flex items-center gap-2">
                                <span className="h-2.5 w-5 rounded-full bg-espresso/40" /> până la
                            </li>
                            <li className="inline-flex items-center gap-2">
                                <span className="h-2.5 w-5 rounded-full border border-dashed border-bronze/70" /> follow-up
                            </li>
                        </ul>
                    </div>
                    <div className="mt-8 grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
                        {nutritionPrograms.map((p, i) => (
                            <ProgramCard key={p.id} p={p} dark={i === 1} />
                        ))}
                    </div>
                    <p className="mt-8 text-center text-sm text-cocoa">Consultațiile și programele de nutriție se realizează pe bază de programare.</p>
                </section>
            </main>

            <Footer onHome={false} />
            <CookieBanner />
        </>
    );
}
