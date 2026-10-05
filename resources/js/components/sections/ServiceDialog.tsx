import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Service } from '@/lib/site';
import { nutritionPrograms } from '@/lib/nutrition';
import { Icon } from '../Icon';
import { bookServiceHref } from './Services';

type Props = { active: Service | null; onClose: () => void };

function useIsPhone() {
    const [phone, setPhone] = useState(() => window.matchMedia('(max-width: 767px)').matches);
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 767px)');
        const on = () => setPhone(mq.matches);
        mq.addEventListener('change', on);
        return () => mq.removeEventListener('change', on);
    }, []);
    return phone;
}

export default function ServiceDialog({ active, onClose }: Props) {
    return createPortal(<AnimatePresence>{active && <Panel key={active.id} s={active} onClose={onClose} />}</AnimatePresence>, document.body);
}

/** Side drawer on desktop, bottom sheet on phones: the service's full text. */
function Panel({ s, onClose }: { s: Service; onClose: () => void }) {
    const phone = useIsPhone();
    const hidden = phone ? { y: '100%' } : { x: '100%' };
    const shown = phone ? { y: 0 } : { x: 0 };

    return (
        <motion.div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="service-title">
            <motion.div
                className="absolute inset-0 bg-ink/55"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
            />
            <motion.aside
                data-lenis-prevent
                className="absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col overflow-hidden rounded-t-[2rem] bg-cream text-espresso shadow-[0_-30px_80px_-20px_rgba(22,17,14,0.5)] md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(600px,100vw)] md:rounded-t-none md:rounded-l-[2.25rem]"
                initial={hidden}
                animate={shown}
                exit={hidden}
                transition={{ type: 'spring', damping: 34, stiffness: 300 }}
            >
                <div className="flex shrink-0 items-center justify-between px-6 pt-4 pb-3 sm:px-10 md:pt-8">
                    <span className="eyebrow text-bronze">Servicii complementare</span>
                    <button
                        type="button"
                        onClick={onClose}
                        autoFocus
                        aria-label="Închide"
                        className="grid h-11 w-11 place-items-center rounded-full bg-white/70 transition-colors hover:bg-white"
                    >
                        <Icon name="close" className="h-5 w-5" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6 sm:px-10">
                    <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-soft/50 text-bronze">
                        <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <h3 id="service-title" className="mt-5 font-display text-[2.6rem] leading-[0.95] sm:text-5xl">
                        {s.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium tracking-[0.18em] text-bronze uppercase">{s.tagline}</p>
                    <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-cocoa">
                        {s.body.map((p) => (
                            <p key={p}>{p}</p>
                        ))}
                    </div>
                    {s.prices && !s.programs && (
                        <ul className="mt-6 divide-y divide-espresso/10 rounded-2xl border border-espresso/10 bg-white/60">
                            {s.prices.map((p) => (
                                <li key={p.label} className="flex items-baseline justify-between gap-4 px-4 py-3">
                                    <span className="text-sm text-cocoa">
                                        {p.label}
                                        {p.detail && <span className="text-cocoa/70"> ({p.detail})</span>}
                                    </span>
                                    <span className="font-display text-2xl text-espresso">
                                        {p.price} <span className="font-sans text-xs text-cocoa">lei</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                    <p className="mt-6 font-script text-4xl text-bronze sm:text-5xl">{s.motto}</p>
                    <p className="mt-4 rounded-2xl border border-espresso/10 bg-white/60 p-4 text-sm text-cocoa">{s.note}</p>

                    {/* Nutrition: both programmes, text exactly as supplied */}
                    {s.programs &&
                        nutritionPrograms.map((p, i) => (
                            <section key={p.id} className={`mt-8 rounded-[1.6rem] p-6 ${i === 1 ? 'bg-espresso text-cream' : 'border border-espresso/10 bg-white/70'}`}>
                                <h4 className="font-display text-3xl leading-tight">{p.name}</h4>
                                <p className={`mt-3 font-display text-xl leading-snug italic ${i === 1 ? 'text-gold-soft' : 'text-bronze'}`}>{p.subtitle}</p>
                                <div className={`mt-4 space-y-3 text-[0.95rem] leading-relaxed ${i === 1 ? 'text-cream/80' : 'text-cocoa'}`}>
                                    {p.intro.map((t) => (
                                        <p key={t}>{t}</p>
                                    ))}
                                </div>
                                <p className="mt-6 font-display text-xl">Programul include:</p>
                                <ul className="mt-3 space-y-2">
                                    {p.includes.map((item) => (
                                        <li key={item} className="flex items-start gap-3 text-[0.92rem] leading-snug">
                                            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${i === 1 ? 'bg-gold text-ink' : 'bg-espresso text-gold-soft'}`}>
                                                <Icon name="check" className="h-3 w-3" />
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className={`mt-6 space-y-3 text-[0.95rem] leading-relaxed ${i === 1 ? 'text-cream/80' : 'text-cocoa'}`}>
                                    {p.closing.map((t) => (
                                        <p key={t}>{t}</p>
                                    ))}
                                </div>
                                <dl className={`mt-6 flex flex-wrap items-end justify-between gap-4 border-t pt-5 ${i === 1 ? 'border-cream/15' : 'border-espresso/10'}`}>
                                    <div>
                                        <dt className={`text-sm ${i === 1 ? 'text-cream/70' : 'text-cocoa'}`}>Durată:</dt>
                                        <dd className="mt-1 text-[0.95rem] font-medium">{p.duration}</dd>
                                    </div>
                                    <div className="text-right">
                                        <dt className={`text-sm ${i === 1 ? 'text-cream/70' : 'text-cocoa'}`}>Investiție:</dt>
                                        <dd className={`mt-1 font-display text-4xl leading-none ${i === 1 ? 'text-gold-soft' : 'text-espresso'}`}>{p.investment}</dd>
                                    </div>
                                </dl>
                            </section>
                        ))}
                </div>

                <div className="shrink-0 border-t border-espresso/10 bg-cream px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-10">
                    <a
                        href={bookServiceHref(s)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-[0.66rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                    >
                        <Icon name="whatsapp" className="h-4 w-4" /> Programează-te pe WhatsApp
                    </a>
                </div>
            </motion.aside>
        </motion.div>
    );
}
