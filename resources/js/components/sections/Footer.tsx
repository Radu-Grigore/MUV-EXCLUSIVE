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

    return (
        <footer className="relative z-0 overflow-hidden bg-espresso pt-16 text-cream/70 sm:pt-20 lg:sticky lg:bottom-0 lg:-mt-12 lg:pt-32">
            <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 md:grid-cols-12 lg:gap-12 lg:px-12">
                <div className="md:col-span-4">
                    <p className="font-script text-4xl text-gold-soft sm:text-5xl">Move · Feel · Balance · Belong</p>
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

                <address className="text-sm leading-relaxed not-italic md:col-span-5">
                    <p className="font-display text-2xl text-cream">Muv Exclusive</p>
                    <p className="mt-2">{company.name}</p>
                    <p>
                        CUI {company.cui} | Nr. Reg. Com. {company.regCom}
                    </p>
                    <p>Sediu social: {company.seat}</p>
                    <p>Adresa sălii: {site.address}</p>
                    <p className="mt-2">
                        Telefon:{' '}
                        <a href={site.phoneHref} className="font-semibold text-gold-soft hover:underline">
                            {site.phoneIntl}
                        </a>{' '}
                        | Email:{' '}
                        <a href={`mailto:${site.email}`} className="font-semibold text-gold-soft hover:underline">
                            {site.email}
                        </a>
                    </p>
                </address>
            </div>

            <div className="mx-auto mt-12 max-w-[1440px] border-t border-cream/10 px-5 pt-8 sm:px-8 lg:px-12">
                <nav aria-label="Informații legale">
                    <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.8rem]">
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
                </nav>
                <AnpcSalBadge className="mt-5" />
            </div>

            <div className="mx-auto mt-8 flex max-w-[1440px] flex-col items-center justify-between gap-2 border-t border-cream/10 px-5 py-6 text-[0.62rem] tracking-[0.2em] uppercase sm:flex-row sm:px-8 lg:px-12">
                <span>© {new Date().getFullYear()} Muv Exclusive · {company.name}</span>
                <span>Deschidere oficială {site.openingLabel}</span>
            </div>

            <p
                aria-hidden="true"
                className="text-gold-gradient pointer-events-none pt-6 pb-[3vw] text-center font-display text-[30vw] leading-[0.8] font-medium tracking-[-0.03em] select-none lg:text-[min(26vw,24rem)]"
            >
                MUV
            </p>
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
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="MUV Exclusive pe Facebook"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#1877f2] text-white shadow-[0_14px_30px_-10px_rgba(24,119,242,0.7)] transition-transform hover:scale-105"
            >
                <Icon name="facebook" className="h-6 w-6" />
            </a>
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
