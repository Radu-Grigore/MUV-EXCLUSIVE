
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-cream/85 shadow-[0_1px_0_rgba(139,108,79,0.15)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#top" aria-label="MUV Exclusive — începutul paginii" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigare principală">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative text-[0.7rem] font-medium tracking-[0.28em] uppercase text-cocoa transition-colors hover:text-bronze"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full bg-espresso px-5 py-2.5 text-[0.68rem] font-semibold tracking-[0.22em] uppercase text-cream transition hover:bg-bronze sm:inline-flex"
          >
            <Icon name="phone" className="h-4 w-4" />
            {site.phone}
          </a>
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full border border-bronze/30 lg:hidden"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-5 bg-espresso transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-px w-5 bg-espresso transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute h-px w-5 bg-espresso transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden ${
          open ? "max-h-[calc(100dvh-4.5rem)] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex h-[calc(100dvh-4.5rem)] flex-col items-center justify-center gap-7 pb-16" aria-label="Navigare mobilă">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-4xl font-light text-espresso transition-colors hover:text-bronze"
            >
              {l.label}
            </a>
          ))}
          <a
            href={site.phoneHref}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase text-cream"
          >
            <Icon name="phone" className="h-4 w-4" /> {site.phone}
          </a>
          <div className="flex gap-4 text-bronze">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <Icon name="facebook" />
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Icon name="instagram" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
