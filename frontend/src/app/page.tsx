import Image from "next/image";
import { Classes } from "@/components/Classes";
import { ContactForm } from "@/components/ContactForm";
import { Countdown } from "@/components/Countdown";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { Reveal } from "@/components/Reveal";
import { kidsFeatures, navLinks, site, values } from "@/lib/site";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Marquee />
        <About />
        <Classes />
        <Kids />
        <Gallery />
        <Opening />
        <Contact />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}

function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden pt-28 pb-20 sm:pt-32 lg:min-h-screen lg:pb-10">
      <div className="pointer-events-none absolute -top-32 -right-40 -z-10 h-[640px] w-[640px] rounded-full bg-gold-soft/50 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 -left-40 -z-10 h-[420px] w-[420px] rounded-full bg-linen blur-[120px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="text-center lg:text-left">
          <Reveal>
            <p className="eyebrow inline-flex items-center gap-4 text-bronze">
              <span className="h-px w-10 bg-gold" /> În curând în {site.city}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8">
              <span className="block font-display text-[6.5rem] leading-[0.8] font-medium tracking-[-0.02em] text-gold-gradient sm:text-[10rem] lg:text-[11.5rem]">
                MUV
              </span>
              <span className="mt-4 block pl-[0.6em] text-2xl font-light tracking-[0.6em] text-espresso sm:text-4xl">
                EXCLUSIVE
              </span>
              <span className="mt-4 block text-[0.66rem] font-medium tracking-[0.32em] text-cocoa uppercase sm:text-xs sm:tracking-[0.45em]">
                Boutique Fitness Studio
              </span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-4 font-script text-6xl text-bronze sm:text-7xl">Women Only</p>
          </Reveal>
          <Reveal delay={360}>
            <p className="mx-auto mt-6 max-w-md text-[0.95rem] leading-relaxed text-cocoa lg:mx-0">
              Un studio boutique de fitness și wellness creat exclusiv pentru femei. Mișcare, echilibru și o
              comunitate care te susține — <span className="italic">more than a workout, a better you.</span>
            </p>
          </Reveal>
          <Reveal delay={480}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-espresso px-7 py-4 text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-cream shadow-[0_18px_40px_-18px_rgba(42,32,26,0.8)] transition hover:-translate-y-0.5 hover:bg-bronze"
              >
                Rezervă-ți locul <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a
                href="#clase"
                className="inline-flex items-center gap-2 rounded-full border border-espresso/20 bg-white/40 px-7 py-4 text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-espresso backdrop-blur transition hover:border-bronze hover:text-bronze"
              >
                Vezi clasele
              </a>
            </div>
          </Reveal>
          <Reveal delay={600}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs tracking-[0.2em] text-cocoa uppercase lg:justify-start">
              <span className="inline-flex items-center gap-2">
                <Icon name="pin" className="h-4 w-4 text-gold" /> Zona Albert, MRS Village
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-gold" /> Deschidere {site.openingLabel}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative mx-auto w-full max-w-[300px] sm:max-w-[420px]">
          <div className="absolute -inset-6 animate-glow rounded-t-full rounded-b-[3rem] border border-gold/60 shadow-[0_0_60px_8px_rgba(230,207,166,0.55)]" />
          <div className="relative aspect-[380/640] overflow-hidden rounded-t-full rounded-b-[2.5rem] bg-sand shadow-[0_40px_80px_-40px_rgba(42,32,26,0.6)]">
            <Image
              src="/images/athlete.webp"
              alt="Femeie antrenându-se în studioul MUV Exclusive"
              fill
              preload
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover object-top"
            />
          </div>

          <div className="absolute -bottom-8 -left-8 grid h-28 w-28 animate-float place-items-center rounded-full bg-cream shadow-xl sm:-left-12 sm:h-36 sm:w-36">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow text-bronze">
              <defs>
                <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
              </defs>
              <text className="fill-current text-[8.2px] tracking-[0.3em] uppercase">
                <textPath href="#circle">Move · Feel · Balance · Belong ·</textPath>
              </text>
            </svg>
            <span className="text-center leading-none">
              <span className="block font-display text-3xl font-semibold text-espresso">01.11</span>
              <span className="text-[0.55rem] tracking-[0.3em] text-bronze">2026</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Move", "Feel", "Balance", "Belong", "More than a workout", "A better you", "Women only"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-bronze/15 bg-sand py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center">
        {[...row, ...row].map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="px-7 font-display text-2xl font-light tracking-[0.25em] text-cocoa uppercase sm:text-3xl">
              {w}
            </span>
            <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="despre" className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 -z-10 scale-110 rounded-full bg-gold-soft/60 blur-3xl" />
          <div className="relative aspect-square overflow-hidden rounded-full border border-gold/40 p-3">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src="/images/logo-sign.webp"
                alt="Logo MUV Exclusive — Women Only Fitness Studio, iluminat pe perete"
                fill
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-bronze">Despre MUV</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.05] font-light sm:text-6xl">
              Un spațiu creat <em className="text-bronze">doar pentru tine</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-7 leading-relaxed text-cocoa">
              MUV Exclusive este primul studio boutique de fitness și wellness exclusiv pentru femei din zona
              Albert, în incinta MRS Village din Ploiești. Am creat un loc cald, elegant și intim, în care fiecare
              femeie se poate mișca în ritmul ei, fără presiune și fără priviri.
            </p>
            <p className="mt-4 leading-relaxed text-cocoa">
              Aici nu vii doar la sală. Vii să te reconectezi cu tine, să prinzi putere, să cunoști femei
              minunate și să pleci de fiecare dată cu un zâmbet.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group h-full rounded-3xl border border-bronze/15 bg-white/55 p-6 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(139,108,79,0.6)]">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-sand text-bronze transition group-hover:bg-espresso group-hover:text-gold-soft">
                    <Icon name={v.icon} />
                  </span>
                  <h3 className="mt-5 text-[0.72rem] font-semibold tracking-[0.25em] uppercase">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cocoa/85">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Kids() {
  return (
    <section id="kids" className="relative overflow-hidden bg-[#f3efe4] py-24 sm:py-32">
      <div className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full bg-[#7c8f5a]/25 blur-2xl" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-48 w-48 rounded-full bg-[#e9b949]/30 blur-2xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-[#5b8fc7]/20 blur-2xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <span className="inline-block -rotate-3 rounded-xl bg-[#6f7f4d] px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase">
            New
          </span>
          <h2 className="mt-6 font-display text-5xl leading-[1.05] font-light sm:text-6xl">
            Kids Corner <em className="block text-bronze">la MUV Exclusive</em>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-cocoa">
            Pentru mai mult timp pentru tine. În timp ce tu te antrenezi, cei mici se joacă într-un colț amenajat
            special pentru ei — cu jucării, cărți, desene animate și multă voie bună. Tu te relaxezi, ei se
            distrează.
          </p>
          <p className="mt-6 font-script text-5xl text-[#6f7f4d]">Un loc special pentru cei mici!</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {kidsFeatures.map((f, i) => {
            const colors = ["#6f7f4d", "#e0a93b", "#3f6fa3", "#c86b6b"];
            return (
              <Reveal key={f.title} delay={i * 100}>
                <div className="flex h-full flex-col items-start gap-5 rounded-[2rem] bg-white/80 p-6 shadow-[0_24px_50px_-35px_rgba(42,32,26,0.5)] transition duration-500 hover:-translate-y-1 sm:p-8">
                  <span
                    className="grid h-14 w-14 place-items-center rounded-2xl text-white"
                    style={{ background: colors[i % colors.length] }}
                  >
                    <Icon name={f.icon} className="h-7 w-7" />
                  </span>
                  <p className="text-sm font-medium leading-snug text-espresso">{f.title}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-bronze">Pregătim ceva frumos</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.05] font-light sm:text-6xl">
              Din lumea <em className="text-bronze">MUV</em>
            </h2>
          </div>
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.25em] text-espresso uppercase transition hover:text-bronze"
          >
            <Icon name="instagram" className="h-5 w-5" /> {site.instagramHandle}
          </a>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <figure className="group relative aspect-[16/9] overflow-hidden rounded-[2rem] bg-sand">
              <Image
                src="/images/campaign.webp"
                alt="Afiș MUV Exclusive — În curând în Ploiești, zona Albert, MRS Village"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          </Reveal>
          <Reveal delay={120}>
            <figure className="group relative aspect-square overflow-hidden rounded-[2rem] bg-sand lg:aspect-auto lg:h-full">
              <Image
                src="/images/classes-poster.webp"
                alt="Afiș cu clasele MUV Exclusive: Khai Bo, Functional Training, Step Aerobic, Total Body, Pilates, Tabata, Instructor Personal"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover object-top transition duration-700 group-hover:scale-[1.03]"
              />
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Opening() {
  return (
    <section id="deschidere" className="relative overflow-hidden bg-ink py-24 text-cream sm:py-32">
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30 shadow-[0_0_120px_20px_rgba(199,160,106,0.25),inset_0_0_120px_10px_rgba(199,160,106,0.12)] sm:h-[720px] sm:w-[720px]" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Deschidere oficială</p>
          <h2 className="mt-6 font-display text-6xl font-light tracking-[0.04em] sm:text-8xl">
            01<span className="text-gold">.</span>11<span className="text-gold">.</span>2026
          </h2>
          <p className="mt-5 font-script text-5xl text-gold-soft">Te așteptăm!</p>
        </Reveal>
        <Reveal delay={150} className="mx-auto mt-12 max-w-2xl">
          <Countdown variant="dark" />
        </Reveal>
        <Reveal delay={300}>
          <p className="mx-auto mt-10 max-w-xl text-sm leading-relaxed text-cream/70">
            Locurile în grupe sunt limitate. Scrie-ne acum și îți păstrăm un loc la primele clase — plus o surpriză
            pentru membrele fondatoare.
          </p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-[0.68rem] font-semibold tracking-[0.25em] text-ink uppercase transition hover:bg-gold-soft"
          >
            <Icon name="whatsapp" className="h-4 w-4" /> Vreau să fiu printre primele
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  const cards = [
    { icon: "pin" as const, label: "Adresă", value: `${site.address}, ${site.city}`, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}` },
    { icon: "phone" as const, label: "Telefon", value: site.phone, href: site.phoneHref },
    { icon: "instagram" as const, label: "Instagram", value: site.instagramHandle, href: site.instagram },
    { icon: "facebook" as const, label: "Facebook", value: "Muvexclusive", href: site.facebook },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-bronze">Contact</p>
          <h2 className="mt-5 font-display text-5xl leading-[1.05] font-light sm:text-6xl">
            Hai să ne <em className="text-bronze">cunoaștem</em>
          </h2>
          <p className="mt-5 text-cocoa">Ai o întrebare sau vrei să îți rezervi locul? Suntem la un mesaj distanță.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-3xl border border-bronze/15 bg-white/55 p-5 transition hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(139,108,79,0.6)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand text-bronze transition group-hover:bg-espresso group-hover:text-gold-soft">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="eyebrow block text-bronze">{c.label}</span>
                    <span className="mt-1.5 block text-sm font-medium text-espresso">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="relative min-h-[300px] flex-1 overflow-hidden rounded-[2rem] border border-bronze/15 bg-sand">
              <iframe
                title="Hartă MUV Exclusive — MRS Village, Ploiești"
                src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
                className="absolute inset-0 h-full w-full grayscale-[0.4] sepia-[0.25]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="h-full rounded-[2rem] bg-sand/70 p-7 sm:p-10">
              <h3 className="font-display text-3xl">Scrie-ne un mesaj</h3>
              <p className="mt-2 mb-7 text-sm text-cocoa/80">Completează formularul și îți răspundem rapid pe WhatsApp.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-espresso pt-16 pb-24 text-cream/70 sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Boutique fitness &amp; wellness studio, exclusiv pentru femei. More than a workout — a better you.
          </p>
        </div>
        <nav aria-label="Navigare subsol" className="grid grid-cols-2 gap-3 text-xs tracking-[0.2em] uppercase">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-gold-soft">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="space-y-3 text-sm">
          <p>
            {site.address}, {site.city}
          </p>
          <p>
            <a href={site.phoneHref} className="transition hover:text-gold-soft">
              {site.phone}
            </a>
          </p>
          <div className="flex gap-3 pt-2">
            <a
              href={site.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-gold hover:text-gold-soft"
            >
              <Icon name="facebook" className="h-5 w-5" />
            </a>
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-cream/20 transition hover:border-gold hover:text-gold-soft"
            >
              <Icon name="instagram" className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-cream/10 px-5 pt-6 text-[0.65rem] tracking-[0.2em] uppercase sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} MUV Exclusive</span>
        <span>Move · Feel · Balance · Belong</span>
      </div>
    </footer>
  );
}

function FloatingActions() {
  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3 sm:right-6 sm:bottom-6">
      <a
        href={site.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Scrie-ne pe WhatsApp"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_14px_30px_-10px_rgba(37,211,102,0.7)] transition hover:scale-105"
      >
        <Icon name="whatsapp" className="h-7 w-7" />
      </a>
      <a
        href={site.phoneHref}
        aria-label={`Sună la ${site.phone}`}
        className="grid h-14 w-14 place-items-center rounded-full bg-espresso text-cream shadow-xl transition hover:scale-105 sm:hidden"
      >
        <Icon name="phone" className="h-6 w-6" />
      </a>
    </div>
  );
}
