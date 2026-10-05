import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Service } from '@/lib/site';
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
                    <p className="mt-6 font-script text-4xl text-bronze sm:text-5xl">{s.motto}</p>
                    <p className="mt-4 rounded-2xl border border-espresso/10 bg-white/60 p-4 text-sm text-cocoa">{s.note}</p>
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
