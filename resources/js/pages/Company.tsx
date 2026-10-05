import { useEffect } from 'react';
import { AnpcSalBadge } from '@/components/AnpcBadge';
import { CookieBanner } from '@/components/CookieBanner';
import { Icon } from '@/components/Icon';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/sections/Footer';
import { legalDocs } from '@/lib/legal';
import { homeHref, pageHref } from '@/lib/routes';
import { company, site } from '@/lib/site';

/** "Date de identificare": the company that runs the studio and how to reach it. */
export default function Company() {
    useEffect(() => {
        document.getElementById('boot')?.remove();
        document.title = 'Date de identificare — MUV Exclusive';
        window.scrollTo(0, 0);
    }, []);

    const details = [
        { label: 'Denumire', value: company.name },
        { label: 'CUI', value: company.cui },
        { label: 'Nr. Reg. Com.', value: company.regCom },
        { label: 'Sediu social', value: company.seat },
        { label: 'Adresa sălii', value: site.address },
        { label: 'Telefon', value: site.phoneIntl, href: site.phoneHref },
        { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    ];

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

            <main className="relative z-10 bg-cream pb-20 lg:rounded-b-[3rem] lg:pb-28 lg:shadow-[0_40px_60px_-30px_rgba(22,17,14,0.45)]">
                <div className="mx-auto grid max-w-[1440px] gap-10 px-5 pt-10 sm:px-8 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:px-12">
                    <article className="min-w-0 lg:col-span-8">
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Informații legale
                        </p>
                        <h1 className="mt-4 font-display text-[2.6rem] leading-[0.95] sm:text-6xl lg:text-7xl">Date de identificare</h1>
                        <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-cocoa sm:text-base">
                            Sala MUV Exclusive este operată de {company.name}. Mai jos găsești datele de identificare ale firmei și datele de contact.
                        </p>

                        <dl className="mt-10 grid overflow-hidden rounded-[1.6rem] border border-bronze/15 bg-white/70 sm:grid-cols-2">
                            {details.map((d) => (
                                <div key={d.label} className="border-b border-espresso/10 px-6 py-5 sm:px-8">
                                    <dt className="text-[0.62rem] font-medium tracking-[0.24em] text-bronze uppercase">{d.label}</dt>
                                    <dd className="mt-1.5 text-base text-espresso">
                                        {d.href ? (
                                            <a href={d.href} className="font-semibold underline decoration-bronze/30 underline-offset-4 hover:decoration-bronze">
                                                {d.value}
                                            </a>
                                        ) : (
                                            d.value
                                        )}
                                    </dd>
                                </div>
                            ))}
                        </dl>

                        <div className="mt-10">
                            <p className="text-sm text-cocoa">Soluționarea alternativă a litigiilor (ANPC):</p>
                            <AnpcSalBadge className="mt-3" />
                        </div>
                    </article>

                    <aside className="lg:col-span-4">
                        <nav aria-label="Documente legale" className="rounded-[1.5rem] border border-bronze/15 bg-white/60 p-5 lg:sticky lg:top-24 lg:p-7">
                            <p className="eyebrow text-bronze">Documente</p>
                            <ul className="mt-4 divide-y divide-espresso/10">
                                {legalDocs.map((d) => (
                                    <li key={d.slug}>
                                        <a href={pageHref(d.slug)} className="flex items-center justify-between gap-3 py-3 text-[0.95rem] text-cocoa transition-colors hover:text-espresso">
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
