import { useEffect, useRef, useState } from 'react';
import { navLinks, site } from '@/lib/site';
import { isNavigating, lockScroll, onScroll, scrollToTarget } from '@/lib/scroll';
import { Icon } from './Icon';
import { Logo } from './Logo';

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [open, setOpen] = useState(false);
    const progress = useRef<HTMLSpanElement>(null);

    useEffect(
        () =>
            onScroll((y, direction) => {
                setScrolled(y > 24);
                setHidden(!isNavigating() && y > 240 && direction > 0);
                const max = document.documentElement.scrollHeight - window.innerHeight;
                if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
            }),
        [],
    );

    useEffect(() => {
        lockScroll(open);
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
        e.preventDefault();
        setOpen(false);
        lockScroll(false);
        requestAnimationFrame(() => scrollToTarget(href));
    }

    return (
        <>
            <header
                className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ease-out-expo ${
                    hidden && !open ? '-translate-y-full' : 'translate-y-0'
                } ${scrolled && !open ? 'bg-cream/80 shadow-[0_1px_0_rgba(139,108,79,0.12)] backdrop-blur-lg' : ''}`}
            >
                <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
                    <a href="#top" onClick={(e) => go(e, '#top')} aria-label="MUV Exclusive — începutul paginii" className="relative z-10">
                        <Logo light={open} />
                    </a>

                    <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigare principală">
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                onClick={(e) => go(e, l.href)}
                                className="group relative text-[0.68rem] font-medium tracking-[0.26em] text-cocoa uppercase transition-colors hover:text-espresso"
                            >
                                {l.label}
                                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100" />
                            </a>
                        ))}
                    </nav>

                    <div className="relative z-10 flex items-center gap-3">
                        <a
                            href={site.phoneHref}
                            className="hidden items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-[0.66rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze sm:inline-flex"
                        >
                            <Icon name="phone" className="h-4 w-4" />
                            {site.phone}
                        </a>
                        <button
                            type="button"
                            className={`flex h-11 items-center gap-3 rounded-full pr-1 pl-4 text-[0.66rem] font-semibold tracking-[0.2em] uppercase lg:hidden ${
                                open ? 'text-cream' : 'text-espresso'
                            }`}
                            aria-label={open ? 'Închide meniul' : 'Deschide meniul'}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen((v) => !v)}
                        >
                            {open ? 'Închide' : 'Meniu'}
                            <span className={`relative grid h-10 w-10 place-items-center rounded-full ${open ? 'bg-cream/10' : 'bg-espresso'}`}>
                                <span className={`absolute h-px w-4 bg-cream transition-transform duration-500 ease-out-expo ${open ? 'rotate-45' : '-translate-y-[3px]'}`} />
                                <span className={`absolute h-px w-4 bg-cream transition-transform duration-500 ease-out-expo ${open ? '-rotate-45' : 'translate-y-[3px]'}`} />
                            </span>
                        </button>
                    </div>
                </div>
                <span ref={progress} className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gold" aria-hidden="true" />
            </header>

            <div
                id="mobile-menu"
                data-lenis-prevent
                className={`fixed inset-0 z-40 flex flex-col bg-espresso text-cream transition-[clip-path] duration-700 ease-out-expo lg:hidden ${
                    open ? '[clip-path:inset(0_0_0_0)]' : 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
                }`}
                aria-hidden={!open}
            >
                <nav className="flex flex-1 flex-col justify-center gap-1 px-6 pt-20" aria-label="Navigare mobilă">
                    {navLinks.map((l, i) => (
                        <a
                            key={l.href}
                            href={l.href}
                            tabIndex={open ? 0 : -1}
                            onClick={(e) => go(e, l.href)}
                            className="line-mask group flex items-baseline gap-4 border-b border-cream/10 py-3"
                        >
                            <span
                                className={`flex items-baseline gap-4 transition-transform duration-700 ease-out-expo ${open ? 'translate-y-0' : 'translate-y-full'}`}
                                style={{ transitionDelay: open ? `${150 + i * 60}ms` : '0ms' }}
                            >
                                <span className="text-[0.65rem] tracking-[0.2em] text-gold">0{i + 1}</span>
                                <span className="font-display text-[2.6rem] leading-none font-light">{l.label}</span>
                            </span>
                        </a>
                    ))}
                </nav>
                <div
                    className={`grid gap-4 px-6 pt-6 pb-10 transition-opacity duration-700 ${open ? 'opacity-100 delay-500' : 'opacity-0'}`}
                >
                    <a href={site.phoneHref} tabIndex={open ? 0 : -1} className="inline-flex items-center justify-center gap-2 rounded-full bg-cream py-4 text-xs font-semibold tracking-[0.2em] text-espresso uppercase">
                        <Icon name="phone" className="h-4 w-4" /> {site.phone}
                    </a>
                    <div className="flex items-center justify-between text-xs text-cream/60">
                        <span>
                            {site.address}, {site.city}
                        </span>
                        <span className="flex gap-4 text-gold-soft">
                            <a href={site.facebook} tabIndex={open ? 0 : -1} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <Icon name="facebook" className="h-5 w-5" />
                            </a>
                            <a href={site.instagram} tabIndex={open ? 0 : -1} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <Icon name="instagram" className="h-5 w-5" />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
