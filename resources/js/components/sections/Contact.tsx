import { useEffect, useState } from 'react';
import { getConsent, onConsentChange, saveConsent } from '@/lib/consent';
import { site } from '@/lib/site';
import { ContactForm } from '../ContactForm';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export function Contact() {
    const cards = [
        { icon: 'pin' as const, label: 'Adresă', value: `${site.addressShort}, ${site.street}, ${site.city}`, href: mapsLink },
        { icon: 'phone' as const, label: 'Telefon', value: site.phone, href: site.phoneHref },
        { icon: 'instagram' as const, label: 'Instagram', value: site.instagramHandle, href: site.instagram },
        { icon: 'facebook' as const, label: 'Facebook', value: 'Muvexclusive', href: site.facebook },
        { icon: 'mail' as const, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    ];

    return (
        <section id="contact" data-snap className="phone-screen py-6 sm:py-24 lg:flex lg:min-h-[calc(100svh-72px)] lg:flex-col lg:justify-center lg:py-12">
            <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
                <Reveal className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
                    <div>
                        <p className="eyebrow flex items-center gap-3 text-bronze">
                            <span className="h-px w-8 bg-gold" /> Contact
                        </p>
                        <h2 data-split className="mt-3 font-display text-[2.4rem] leading-none font-light short:mt-2 short:text-[2rem] sm:mt-5 sm:text-7xl">
                            Hai să ne <em className="text-bronze">cunoaștem</em>
                        </h2>
                    </div>
                    <p className="hidden max-w-sm text-cocoa sm:block">Ai o întrebare sau vrei să îți rezervi locul? Suntem la un mesaj distanță.</p>
                </Reveal>

                <div className="mt-5 grid grid-cols-1 gap-4 short:mt-3 short:gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-[1fr_1.05fr]">
                    <Reveal className="flex min-w-0 flex-col gap-5">
                        <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-2 sm:gap-3">
                            {cards.map((c) => {
                                const external = c.href.startsWith('http');
                                const wide = c.icon === 'mail';
                                return (
                                    <a
                                        key={c.label}
                                        href={c.href}
                                        target={external ? '_blank' : undefined}
                                        rel={external ? 'noopener noreferrer' : undefined}
                                        className={`group flex min-w-0 flex-col items-center gap-1.5 rounded-2xl border border-bronze/15 bg-white/60 px-0.5 py-2.5 transition-[background-color,box-shadow] duration-500 hover:bg-white hover:shadow-[0_24px_50px_-30px_rgba(139,108,79,0.6)] sm:flex-row sm:gap-4 sm:rounded-3xl sm:p-5 ${wide ? 'sm:col-span-2' : ''}`}
                                    >
                                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sand sm:h-11 sm:w-11 short:h-9 short:w-9 text-bronze transition-colors group-hover:bg-espresso group-hover:text-gold-soft">
                                            <Icon name={c.icon} className="h-5 w-5" />
                                        </span>
                                        <span className="min-w-0 text-center sm:text-left">
                                            <span className="block truncate text-[0.6rem] font-medium text-bronze sm:text-[0.7rem] sm:tracking-[0.34em] sm:uppercase">{c.label}</span>
                                            <span className={`mt-1 hidden text-sm font-medium text-espresso sm:block ${c.icon === 'pin' ? 'leading-snug' : 'truncate'}`}>{c.value}</span>
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                        <div className="hidden min-h-[280px] flex-1 flex-col sm:flex">
                            <MapFacade />
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="h-full rounded-[1.75rem] bg-espresso p-5 text-cream short:p-4 sm:rounded-[2rem] sm:p-10">
                            <h3 className="mb-3 font-display text-2xl font-light short:hidden sm:mb-0 sm:text-4xl">Scrie-ne un mesaj</h3>
                            <p className="mt-1 mb-4 hidden text-sm text-cream/60 sm:mt-2 sm:mb-8 sm:block">Completează formularul și îți răspundem rapid pe WhatsApp.</p>
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
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        setAllowed(!!getConsent()?.thirdParty);
        return onConsentChange((c) => setAllowed(c.thirdParty));
    }, []);

    function showMap() {
        // Google Maps sets third-party cookies: asking for the map counts as agreeing to them.
        if (!allowed) {
            const current = getConsent();
            saveConsent({ analytics: current?.analytics ?? false, marketing: current?.marketing ?? false, thirdParty: true });
        }
        setLoaded(true);
    }

    return (
        <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[2rem] border border-bronze/15 bg-sand">
            {loaded ? (
                <iframe
                    title="Hartă MUV Exclusive — Aleea Smaraldului nr. 11, MRS Village, Ploiești"
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
                        <p className="font-display text-2xl">MRS Village, clădirea M</p>
                        <p className="mt-1 text-sm text-cocoa">
                            Parter · {site.street}
                            <br />
                            Cartier Albert, {site.city}
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            type="button"
                            onClick={showMap}
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
                    {!allowed && <p className="max-w-xs text-xs text-cocoa/80">Harta este oferită de Google și poate folosi cookie-uri de la terți.</p>}
                </div>
            )}
        </div>
    );
}
