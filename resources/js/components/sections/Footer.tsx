import { useEffect, useState } from 'react';
import { openCookieSettings } from '@/lib/consent';
import { legalDocs } from '@/lib/legal';
import { homeHref, pageHref } from '@/lib/routes';
import { company, navLinks, site } from '@/lib/site';
import { onScroll, scrollToTarget } from '@/lib/scroll';
import { AnpcSalBadge } from '../AnpcBadge';
import { Icon } from '../Icon';

export function Footer({ onHome }: { onHome: boolean }) {
    const socials = [
        { href: site.facebook, label: 'Facebook', icon: 'facebook' as const },
        { href: site.instagram, label: 'Instagram', icon: 'instagram' as const },
        { href: site.whatsapp, label: 'WhatsApp', icon: 'whatsapp' as const },
    ];
    const details = [
        { label: 'Firma', value: company.name },
        { label: 'CUI', value: company.cui },
        { label: 'Nr. Reg. Com.', value: company.regCom },
        { label: 'Sediu social', value: company.seat },
        { label: 'Adresa sălii', value: site.address },
        { label: 'Telefon', value: site.phoneIntl, href: site.phoneHref },
        { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    ];

    return (
        <footer className="relative z-0 overflow-hidden bg-espresso pt-16 text-cream/70 sm:pt-20 lg:-mt-12 lg:pt-32">
            {/* Brand, navigation, legal */}
            <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:gap-12 lg:px-12">
                <div className="md:col-span-5">
                    <p className="font-display text-3xl text-cream sm:text-4xl">MUV Exclusive</p>
                    <p className="mt-1 font-script text-3xl text-gold-soft sm:text-4xl">Move · Feel · Balance · Belong</p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed">
                        Boutique fitness &amp; wellness studio, exclusiv pentru femei. More than a workout — a better you.
                    </p>
                    <div className="mt-5 flex gap-3">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 transition-colors hover:border-gold hover:text-gold-soft"
                            >
                                <Icon name={s.icon} className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>

                <nav aria-label="Navigare subsol" className="md:col-span-3">
                    <p className="eyebrow text-gold-soft">Navigare</p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-3 text-[0.68rem] tracking-[0.22em] uppercase md:grid-cols-1">
                        {navLinks.map((l) => (
                            <li key={l.href}>
                                <a
                                    href={onHome ? l.href : homeHref(l.href)}
                                    onClick={(e) => {
                                        if (!onHome) return;
                                        e.preventDefault();
                                        scrollToTarget(l.href);
                                    }}
                                    className="inline-block py-1.5 transition-colors hover:text-gold-soft"
                                >
                                    {l.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="md:col-span-4">
                    <p className="eyebrow text-gold-soft">Informații legale</p>
                    <ul className="mt-4 space-y-0.5 text-sm">
                        {legalDocs.map((d) => (
                            <li key={d.slug}>
                                <a href={pageHref(d.slug)} className="inline-block py-1.5 transition-colors hover:text-gold-soft">
                                    {d.title}
                                </a>
                            </li>
                        ))}
                        <li>
                            <button type="button" onClick={openCookieSettings} className="py-1.5 transition-colors hover:text-gold-soft">
                                Setări cookies
                            </button>
                        </li>
                    </ul>
                    <div className="mt-5">
                        <a
                            href={pageHref('clase-de-pilates')}
                            className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-[0.62rem] font-semibold tracking-[0.2em] text-gold-soft uppercase transition-colors hover:border-gold hover:bg-gold/10"
                        >
                            Clase de Pilates <Icon name="arrow" className="h-3.5 w-3.5" />
                        </a>
                    </div>
                    <AnpcSalBadge className="mt-5" />
                </div>
            </div>

            {/* Company details, under the ANPC pictogram */}
            <div className="mx-auto mt-12 max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <address className="grid gap-x-8 gap-y-4 rounded-[1.5rem] border border-cream/10 bg-white/[0.03] p-5 not-italic sm:grid-cols-2 sm:p-7 lg:grid-cols-4">
                    {details.map((d) => (
                        <div key={d.label} className={d.label === 'Adresa sălii' || d.label === 'Sediu social' ? 'sm:col-span-2' : ''}>
                            <p className="text-[0.6rem] font-medium tracking-[0.24em] text-gold-soft/80 uppercase">{d.label}</p>
                            {d.href ? (
                                <a href={d.href} className="mt-1 inline-block text-sm font-semibold text-cream transition-colors hover:text-gold-soft">
                                    {d.value}
                                </a>
                            ) : (
                                <p className="mt-1 text-sm leading-snug text-cream/90">{d.value}</p>
                            )}
                        </div>
                    ))}
                </address>
            </div>

            <div className="mx-auto mt-10 flex max-w-[1440px] flex-col items-center justify-between gap-2 border-t border-cream/10 px-5 py-6 text-center text-[0.62rem] tracking-[0.2em] uppercase sm:flex-row sm:px-8 sm:text-left lg:px-12">
                <span>© {new Date().getFullYear()} MUV Exclusive. Toate drepturile rezervate.</span>
                <span>Deschidere oficială {site.openingLabel}</span>
            </div>

            <div aria-hidden="true" className="pointer-events-none flex flex-col items-center pt-2 pb-8 select-none lg:pb-10">
                <span className="text-gold-gradient font-display text-[18vw] leading-[0.8] font-medium tracking-[-0.03em] sm:text-[12vw] lg:text-[min(9vw,8rem)]">MUV</span>
                <span className="mt-2 pl-[0.6em] text-[3.4vw] font-light tracking-[0.6em] text-gold-soft sm:text-[2.2vw] lg:text-[min(1.6vw,1.4rem)]">EXCLUSIVE</span>
            </div>
        </footer>
    );
}

export function FloatingActions() {
    const [visible, setVisible] = useState(false);

    useEffect(() => onScroll((y) => setVisible(y > window.innerHeight * 0.8)), []);

    return (
        <div
            className={`fixed right-4 bottom-4 z-40 flex flex-col gap-3 transition-[opacity,transform] duration-500 ease-out-expo sm:right-6 sm:bottom-6 ${
                visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
            }`}
        >
            <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrie-ne pe WhatsApp"
                data-magnetic
                className="grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
            >
                <Icon name="whatsapp" className="h-6 w-6" />
            </a>
        </div>
    );
}
