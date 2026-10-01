import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { asset, site, type TeamMember } from '@/lib/site';
import { lockScroll, scrollToTarget } from '@/lib/scroll';
import { bookingLinkProps } from '../BookingLink';
import { Icon } from '../Icon';

type Props = { active: TeamMember | null; onClose: () => void };

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

export default function TeamDialog({ active, onClose }: Props) {
    // Portalled to <body> so the panel sits above the fixed header and floating buttons.
    return createPortal(<AnimatePresence>{active && <Panel key={active.id} m={active} onClose={onClose} />}</AnimatePresence>, document.body);
}

/** Side drawer on desktop, bottom sheet on phones: the instructor's photos and full story. */
function Panel({ m, onClose }: { m: TeamMember; onClose: () => void }) {
    const phone = useIsPhone();
    const book = bookingLinkProps();
    const hidden = phone ? { y: '100%' } : { x: '100%' };
    const shown = phone ? { y: 0 } : { x: 0 };

    return (
        <motion.div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="member-title">
            <motion.div
                className="absolute inset-0 bg-ink/55 backdrop-blur-[2px]"
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
                    <span className="eyebrow text-bronze">Echipa MUV Exclusive</span>
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
                    {/* Photos: one, or a swipeable row when there are several */}
                    <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 sm:-mx-10 sm:px-10">
                        {m.photos.map((p, i) => (
                            <img
                                key={p.src}
                                src={asset(p.src)}
                                alt={`${m.name} — fotografie ${i + 1}`}
                                loading={i === 0 ? 'eager' : 'lazy'}
                                decoding="async"
                                className={`h-72 shrink-0 snap-start rounded-[1.4rem] object-cover sm:h-80 ${m.photos.length > 1 ? 'w-[78%]' : 'w-full'}`}
                                style={{ objectPosition: p.position ?? '50% 20%' }}
                            />
                        ))}
                    </div>

                    <h3 id="member-title" className="mt-6 font-display text-[2.6rem] leading-[0.95] sm:text-5xl">
                        {m.name}
                    </h3>
                    <p className="mt-2 text-xs font-medium tracking-[0.18em] text-bronze uppercase">{m.role}</p>
                    {m.extra && <p className="mt-1 text-sm text-cocoa">{m.extra}</p>}

                    <ul className="mt-4 flex flex-wrap gap-2">
                        {m.classes.map((c) => (
                            <li key={c} className="rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-medium text-cocoa">
                                {c}
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 space-y-4 text-[1rem] leading-relaxed text-cocoa">
                        {m.bio.map((block, i) =>
                            Array.isArray(block) ? (
                                <ul key={i} className="space-y-2 rounded-2xl border border-espresso/10 bg-white/60 p-4">
                                    {block.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p key={i}>{block}</p>
                            ),
                        )}
                    </div>
                    {m.closing && <p className="mt-6 font-script text-5xl text-bronze">{m.closing}</p>}
                </div>

                <div className="shrink-0 border-t border-espresso/10 bg-cream/95 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:px-10">
                    <div className="flex gap-3">
                        <a
                            {...book}
                            onClick={(e) => {
                                if (book.onClick) return book.onClick(e);
                                if (book.target) return;
                                // Computer: close the panel and show the booking steps instead.
                                e.preventDefault();
                                e.stopPropagation();
                                onClose();
                                lockScroll(false);
                                requestAnimationFrame(() => scrollToTarget('#rezervari'));
                            }}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-[0.66rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                        >
                            <Icon name="smartphone" className="h-4 w-4" /> Rezervă în aplicație
                        </a>
                        <a
                            href={`${site.whatsapp}?text=${encodeURIComponent(`Bună! Aș dori mai multe detalii despre clasele cu ${m.name} la MUV Exclusive.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Întreabă-ne pe WhatsApp"
                            className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-espresso/15 transition-colors hover:border-espresso"
                        >
                            <Icon name="whatsapp" className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </motion.aside>
        </motion.div>
    );
}
