import { useState } from 'react';
import { site } from '@/lib/site';
import { ContactForm } from '../ContactForm';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export function Contact() {
    const cards = [
        { icon: 'pin' as const, label: 'Adresă', value: `${site.address}, ${site.city}`, href: mapsLink },
        { icon: 'phone' as const, label: 'Telefon', value: site.phone, href: site.phoneHref },
        { icon: 'instagram' as const, label: 'Instagram', value: site.instagramHandle, href: site.instagram },
        { icon: 'facebook' as const, label: 'Facebook', value: 'Muvexclusive', href: site.facebook },
    ];

    return (
        <section id="contact" className="py-20 sm:py-24">
            <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Contact
                        </p>
                        <h2 data-split className="mt-5 font-display text-5xl leading-none font-light sm:text-7xl">
                            Hai să ne <em className="text-bronze">cunoaștem</em>
                        </h2>
                    </div>
                    <p className="max-w-sm text-cocoa">Ai o întrebare sau vrei să îți rezervi locul? Suntem la un mesaj distanță.</p>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.05fr]">
                    <Reveal className="flex min-w-0 flex-col gap-5">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {cards.map((c) => {
                                const external = c.href.startsWith('http');
                                return (
                                    <a
                                        key={c.label}
                                        href={c.href}
                                        target={external ? '_blank' : undefined}
                                        rel={external ? 'noopener noreferrer' : undefined}
                                        className="group flex items-center gap-4 rounded-3xl border border-bronze/15 bg-white/60 p-5 transition-[background-color,box-shadow] duration-500 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(139,108,79,0.6)]"
                                    >
                                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sand text-bronze transition-colors group-hover:bg-espresso group-hover:text-gold-soft">
                                            <Icon name={c.icon} className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0">
                                            <span className="eyebrow block text-bronze">{c.label}</span>
                                            <span className="mt-1 block truncate text-sm font-medium text-espresso">{c.value}</span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                        <MapFacade />
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="h-full rounded-[2rem] bg-espresso p-7 text-cream sm:p-10">
                            <h3 className="font-display text-4xl font-light">Scrie-ne un mesaj</h3>
                            <p className="mt-2 mb-8 text-sm text-cream/60">Completează formularul și îți răspundem rapid pe WhatsApp.</p>
                            <ContactForm />
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/** Google Maps is heavy (~1 MB); it only loads when the visitor asks for it. */
function MapFacade() {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[2rem] border border-bronze/15 bg-sand">
            {loaded ? (
                <iframe
                    title="Hartă MUV Exclusive — MRS Village, Ploiești"
                    src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`}
                    className="absolute inset-0 h-full w-full"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            ) : (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-6 text-center"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(139,108,79,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(139,108,79,0.08) 1px, transparent 1px), radial-gradient(60% 60% at 50% 45%, rgba(230,207,166,0.7) 0%, transparent 70%)',
                        backgroundSize: '32px 32px, 32px 32px, 100% 100%',
                    }}
                >
                    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-espresso text-gold-soft shadow-xl">
                        <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
                        <Icon name="pin" className="relative h-6 w-6" />
                    </span>
                    <div>
                        <p className="font-display text-2xl">MRS Village, Ploiești</p>
                        <p className="mt-1 text-sm text-cocoa">Cartier Albert</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            type="button"
                            onClick={() => setLoaded(true)}
                            className="rounded-full bg-espresso px-5 py-3 text-[0.62rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                        >
                            Vezi harta
                        </button>
                        <a
                            href={mapsLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-espresso/20 px-5 py-3 text-[0.62rem] font-semibold tracking-[0.2em] text-espresso uppercase transition-colors hover:border-espresso"
                        >
                            Deschide în Maps
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
