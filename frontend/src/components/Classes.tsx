"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { classes, site, type FitnessClass } from "@/lib/site";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function Classes() {
  const [active, setActive] = useState<FitnessClass | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="clase" className="relative overflow-hidden bg-espresso py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Clasele noastre</p>
          <h2 className="mt-5 font-display text-5xl font-light leading-[1.05] sm:text-6xl">
            Găsește mișcarea <em className="text-gold-soft">care ți se potrivește</em>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-cream/70 sm:text-base">
            Șapte experiențe diferite, un singur scop: să te simți puternică, liberă și bine în pielea ta.
            Apasă pe o clasă pentru detalii.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 4) * 90}>
              <button
                type="button"
                onClick={() => setActive(c)}
                className="group relative flex h-full min-h-[340px] w-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 text-left transition duration-500 hover:-translate-y-1 hover:border-white/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                style={{ "--accent": c.accent } as React.CSSProperties}
              >
                {c.image ? (
                  <Image
                    src={c.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-bottom opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-80"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(120% 80% at 50% 0%, ${c.accent}55 0%, transparent 60%), linear-gradient(180deg, ${c.accent}26 0%, #1c1511 100%)`,
                    }}
                  >
                    <Icon
                      name={c.icon}
                      className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-[65%] opacity-25 transition duration-700 group-hover:scale-110 group-hover:opacity-40"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/10" />
                <span
                  className="absolute inset-x-0 top-0 h-1 opacity-80 shadow-[0_0_24px_4px_var(--accent)]"
                  style={{ background: c.accent }}
                />

                <div className="relative mt-auto p-6">
                  <span
                    className="mb-4 grid h-11 w-11 place-items-center rounded-full border"
                    style={{ borderColor: `${c.accent}99`, color: c.accent }}
                  >
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-3xl font-medium">{c.name}</h3>
                  <p className="mt-2 text-[0.62rem] tracking-[0.26em] uppercase" style={{ color: c.accent }}>
                    {c.keywords.join(" · ")}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-cream/80 transition group-hover:gap-3 group-hover:text-cream">
                    Descoperă <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </div>
              </button>
            </Reveal>
          ))}

          <Reveal as="li" delay={270}>
            <div className="flex h-full min-h-[340px] flex-col justify-between rounded-[1.75rem] border border-gold/30 bg-gradient-to-br from-gold/20 to-transparent p-7">
              <p className="font-script text-5xl leading-none text-gold-soft">More than a workout</p>
              <div>
                <p className="text-sm leading-relaxed text-cream/75">
                  Grupe mici, instructori dedicați și un program gândit pentru ritmul tău. Rezervă-ți locul de pe acum.
                </p>
                <a
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-espresso transition hover:bg-gold-soft"
                >
                  Rezervă-ți locul <Icon name="arrow" className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </ul>
      </div>

      {active && <ClassDialog c={active} onClose={() => setActive(null)} />}
    </section>
  );
}

function ClassDialog({ c, onClose }: { c: FitnessClass; onClose: () => void }) {
  const message = encodeURIComponent(`Bună! Aș dori mai multe detalii despre clasa ${c.name} la MUV Exclusive.`);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-0 backdrop-blur-md sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="class-dialog-title"
      onClick={onClose}
    >
      <div
        className="relative grid max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-cream text-espresso shadow-2xl sm:rounded-[2rem] md:grid-cols-[0.9fr_1.1fr]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          autoFocus
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-espresso shadow transition hover:bg-white"
          aria-label="Închide"
        >
          <Icon name="close" className="h-5 w-5" />
        </button>

        <div className="relative min-h-[320px] overflow-hidden bg-ink md:min-h-[520px]">
          {c.image ? (
            <Image src={c.image} alt={`Afiș ${c.name} — MUV Exclusive`} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-contain" />
          ) : (
            <div
              className="absolute inset-0 grid place-items-center text-white/80"
              style={{ background: `linear-gradient(160deg, ${c.accent} 0%, #2a201a 100%)` }}
            >
              <Icon name={c.icon} className="h-32 w-32" />
            </div>
          )}
        </div>

        <div className="p-7 sm:p-10">
          <p className="eyebrow" style={{ color: c.accent }}>
            {c.keywords.join(" · ")}
          </p>
          <h3 id="class-dialog-title" className="mt-3 font-display text-5xl font-medium leading-none">
            {c.name}
          </h3>
          <p className="mt-5 leading-relaxed text-cocoa">{c.description}</p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {c.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-sm">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-gold/60 text-bronze">
                  <Icon name="bolt" className="h-4 w-4" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          {c.script && <p className="mt-8 font-script text-4xl text-bronze">{c.script}</p>}

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`${site.whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-espresso px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.25em] uppercase text-cream transition hover:bg-bronze"
            >
              <Icon name="whatsapp" className="h-4 w-4" /> Scrie-ne pe WhatsApp
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full border border-espresso/20 px-6 py-3.5 text-[0.65rem] font-semibold tracking-[0.25em] uppercase transition hover:border-bronze hover:text-bronze"
            >
              <Icon name="phone" className="h-4 w-4" /> Sună-ne
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
