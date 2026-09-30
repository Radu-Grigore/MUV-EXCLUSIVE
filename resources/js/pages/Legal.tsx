import { useEffect } from 'react';
import { CookieBanner } from '@/components/CookieBanner';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/sections/Footer';
import { legalDocs, type LegalDoc } from '@/lib/legal';
import { homeHref, pageHref } from '@/lib/routes';

/** Turns e-mail addresses and web addresses inside the legal text into links. */
function Linked({ text }: { text: string }) {
    const parts = text.split(/(https?:\/\/[^\s,;)]+[^\s,;.)]|[\w.+-]+@[\w-]+\.[\w.]+[a-z])/gi);
    return (
        <>
            {parts.map((part, i) => {
                if (/^https?:\/\//i.test(part))
                    return (
                        <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-bronze underline underline-offset-4">
                            {part.replace(/^https?:\/\//, '')}
                        </a>
                    );
                if (/@/.test(part) && /^[\w.+-]+@/.test(part))
                    return (
                        <a key={i} href={`mailto:${part}`} className="text-bronze underline underline-offset-4">
                            {part}
                        </a>
                    );
                return part;
            })}
        </>
    );
}

export default function Legal({ doc }: { doc: LegalDoc }) {
    useEffect(() => {
        document.getElementById('boot')?.remove();
        document.title = `${doc.title} — MUV Exclusive`;
        window.scrollTo(0, 0);
    }, [doc]);

    return (
        <>
            <header className="sticky top-0 z-50 border-b border-bronze/10 bg-cream/85 backdrop-blur-lg">
                <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
                    <a href={homeHref()} aria-label="MUV Exclusive — pagina principală">
                        <Logo />
                    </a>
                    <a
                        href={homeHref()}
                        className="inline-flex items-center gap-2 rounded-full bg-espresso px-5 py-3 text-[0.62rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                    >
                        <Icon name="arrow" className="h-3.5 w-3.5 rotate-180" /> Înapoi la site
                    </a>
                </div>
            </header>

            <main className="relative z-10 bg-cream pb-20 lg:rounded-b-[3rem] lg:pb-32 lg:shadow-[0_40px_60px_-30px_rgba(22,17,14,0.45)]">
                <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:px-12">
                    <article className="min-w-0 lg:col-span-8">
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Informații legale
                        </p>
                        <h1 className="mt-4 font-display text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-7xl">{doc.title}</h1>
                        <p className="mt-4 text-sm text-cocoa/70">Ultima actualizare: {doc.updated}</p>

                        <div className="mt-10 space-y-10">
                            {doc.sections.map((s, i) => (
                                <section key={i}>
                                    {s.heading && <h2 className="font-display text-2xl leading-tight sm:text-3xl">{s.heading}</h2>}
                                    {s.paragraphs.map((p, j) => (
                                        <p key={j} className="mt-3 text-[0.95rem] leading-relaxed text-cocoa sm:text-base">
                                            <Linked text={p} />
                                        </p>
                                    ))}
                                </section>
                            ))}
                        </div>
                    </article>

                    <aside className="lg:col-span-4">
                        <nav aria-label="Documente legale" className="rounded-[1.5rem] border border-bronze/15 bg-white/60 p-5 lg:sticky lg:top-24 lg:p-7">
                            <p className="eyebrow text-bronze">Documente</p>
                            <ul className="mt-4 divide-y divide-espresso/10">
                                {legalDocs.map((d) => (
                                    <li key={d.slug}>
                                        <a
                                            href={pageHref(d.slug)}
                                            aria-current={d.slug === doc.slug ? 'page' : undefined}
                                            className={`flex items-center justify-between gap-3 py-3 text-[0.95rem] transition-colors ${
                                                d.slug === doc.slug ? 'font-semibold text-espresso' : 'text-cocoa hover:text-espresso'
                                            }`}
                                        >
                                            {d.title}
                                            <Icon name="arrow" className="h-4 w-4 shrink-0 opacity-50" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </div>
            </main>

            <Footer onHome={false} />
            <CookieBanner />
        </>
    );
}
