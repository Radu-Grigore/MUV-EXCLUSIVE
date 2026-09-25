import { useEffect, useState } from 'react';
import { navLinks, site } from '@/lib/site';
import { onScroll, scrollToTarget } from '@/lib/scroll';
import { Icon } from '../Icon';

export function Footer() {
    return (
        <footer className="relative overflow-hidden bg-espresso pt-20 text-cream/70">
            <div className="mx-auto grid max-w-[1440px] gap-12 px-5 sm:px-8 md:grid-cols-12 lg:px-12">
                <div className="md:col-span-5">
                    <p className="font-script text-5xl text-gold-soft">Move · Feel · Balance · Belong</p>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed">
                        Boutique fitness &amp; wellness studio, exclusiv pentru femei. More than a workout — a better you.
                    </p>
                </div>
                <nav aria-label="Navigare subsol" className="grid grid-cols-2 content-start gap-3 text-[0.68rem] tracking-[0.22em] uppercase md:col-span-3">
                    {navLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToTarget(l.href);
                            }}
                            className="transition-colors hover:text-gold-soft"
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>
                <div className="space-y-3 text-sm md:col-span-4">
                    <p>
                        {site.address}, {site.city}
                    </p>
                    <p>
                        <a href={site.phoneHref} className="transition-colors hover:text-gold-soft">
                            {site.phone}
                        </a>
                    </p>
                    <div className="flex gap-3 pt-2">
                        {[
                            { href: site.facebook, label: 'Facebook', icon: 'facebook' as const },
                            { href: site.instagram, label: 'Instagram', icon: 'instagram' as const },
                        ].map((s) => (
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
            </div>

            <div className="mx-auto mt-16 flex max-w-[1440px] flex-col items-center justify-between gap-2 border-t border-cream/10 px-5 py-6 text-[0.62rem] tracking-[0.2em] uppercase sm:flex-row sm:px-8 lg:px-12">
                <span>© {new Date().getFullYear()} MUV Exclusive</span>
                <span>Deschidere oficială {site.openingLabel}</span>
            </div>

            <p
                aria-hidden="true"
                className="text-gold-gradient pointer-events-none -mb-[0.2em] text-center font-display text-[36vw] leading-[0.8] font-medium tracking-[-0.03em] opacity-90 select-none"
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
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Scrie-ne pe WhatsApp"
                className="grid h-12 w-12 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
            >
                <Icon name="whatsapp" className="h-6 w-6" />
            </a>
        </div>
    );
}
