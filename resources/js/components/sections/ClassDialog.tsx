import { Check } from 'lucide-react';
import { AnimatePresence, motion, useDragControls, type Variants } from 'motion/react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { classes, site, type FitnessClass } from '@/lib/site';
import { Icon } from '../Icon';

type Props = { active: FitnessClass | null; onClose: () => void; onChange: (c: FitnessClass) => void };

export default function ClassDialogHost({ active, onClose, onChange }: Props) {
    // Portalled to <body> so the panel sits above the fixed header and floating buttons.
    return createPortal(
        <AnimatePresence>{active && <ClassPanel key="panel" c={active} onClose={onClose} onChange={onChange} />}</AnimatePresence>,
        document.body,
    );
}

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

const content: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

/** Side drawer on desktop, draggable bottom sheet on phones. */
function ClassPanel({ c, onClose, onChange }: { c: FitnessClass; onClose: () => void; onChange: (c: FitnessClass) => void }) {
    const phone = useIsPhone();
    const drag = useDragControls();
    const index = classes.findIndex((x) => x.id === c.id);
    const prev = classes[(index - 1 + classes.length) % classes.length];
    const next = classes[(index + 1) % classes.length];
    const message = encodeURIComponent(`Bună! Aș dori mai multe detalii despre clasa ${c.name} la MUV Exclusive.`);

    const hidden = phone ? { y: '100%' } : { x: '100%' };
    const shown = phone ? { y: 0 } : { x: 0 };

    return (
        <motion.div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-labelledby="class-panel-title">
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
                className="absolute inset-x-0 bottom-0 flex max-h-[92svh] flex-col overflow-hidden rounded-t-[2rem] bg-cream text-espresso shadow-[0_-30px_80px_-20px_rgba(22,17,14,0.5)] md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-[min(560px,100vw)] md:rounded-t-none md:rounded-l-[2.25rem]"
                initial={hidden}
                animate={shown}
                exit={hidden}
                transition={{ type: 'spring', damping: 34, stiffness: 300 }}
                drag={phone ? 'y' : false}
                dragControls={drag}
                dragListener={false}
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={{ top: 0, bottom: 0.6 }}
                onDragEnd={(_, info) => {
                    if (info.offset.y > 110 || info.velocity.y > 600) onClose();
                }}
            >
                {/* Coloured header */}
                <div
                    onPointerDown={(e) => phone && drag.start(e)}
                    className="relative shrink-0 touch-none px-6 pt-4 pb-8 sm:px-10 md:touch-auto md:pt-8"
                    style={{ background: `radial-gradient(120% 90% at 0% 0%, ${c.accent}55 0%, transparent 65%), linear-gradient(180deg, ${c.accent}1f, transparent)` }}
                >
                    <span className="mx-auto mb-4 block h-1 w-10 rounded-full bg-espresso/20 md:hidden" />
                    <div className="flex items-center justify-between">
                        <span className="eyebrow text-cocoa">
                            Clasa {String(index + 1).padStart(2, '0')} / {String(classes.length).padStart(2, '0')}
                        </span>
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

                    <AnimatePresence mode="wait">
                        <motion.div key={c.id} variants={content} initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                            <motion.div variants={item} className="mt-6 flex items-center gap-4">
                                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/80" style={{ color: c.accent }}>
                                    <Icon name={c.icon} className="h-7 w-7" strokeWidth={1.3} />
                                </span>
                                <h3 id="class-panel-title" className="font-display text-[2.6rem] leading-[0.95] font-medium sm:text-5xl">
                                    {c.name}
                                </h3>
                            </motion.div>
                            <motion.ul variants={item} className="mt-5 flex flex-wrap gap-2">
                                {c.keywords.map((k) => (
                                    <li key={k} className="rounded-full bg-white/70 px-3.5 py-1.5 text-xs font-medium text-cocoa">
                                        {k}
                                    </li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6 sm:px-10">
                    <AnimatePresence mode="wait">
                        <motion.div key={c.id} variants={content} initial="hidden" animate="show" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
                            <motion.p variants={item} className="text-[1.05rem] leading-relaxed text-cocoa">
                                {c.description}
                            </motion.p>

                            <motion.h4 variants={item} className="eyebrow mt-9 text-bronze">
                                Ce câștigi
                            </motion.h4>
                            <ul className="mt-3 divide-y divide-espresso/10 border-y border-espresso/10">
                                {c.benefits.map((b) => (
                                    <motion.li variants={item} key={b} className="flex items-center gap-4 py-3.5">
                                        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full" style={{ background: `${c.accent}33`, color: c.accent }}>
                                            <Check className="h-4 w-4" strokeWidth={2.2} />
                                        </span>
                                        <span className="text-[0.95rem]">{b}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {c.script && (
                                <motion.p variants={item} className="mt-8 font-script text-5xl text-bronze">
                                    {c.script}
                                </motion.p>
                            )}

                            <motion.nav variants={item} className="mt-10 grid grid-cols-2 gap-3" aria-label="Alte clase">
                                {[
                                    { c: prev, label: 'Anterioara', dir: 'left' as const },
                                    { c: next, label: 'Următoarea', dir: 'right' as const },
                                ].map(({ c: other, label, dir }) => (
                                    <button
                                        key={dir}
                                        type="button"
                                        onClick={() => onChange(other)}
                                        className={`group rounded-2xl border border-espresso/10 p-4 transition-colors hover:border-espresso/30 hover:bg-white ${dir === 'right' ? 'text-right' : ''}`}
                                    >
                                        <span className={`flex items-center gap-2 text-[0.6rem] tracking-[0.2em] text-cocoa/60 uppercase ${dir === 'right' ? 'justify-end' : ''}`}>
                                            {dir === 'left' && <Icon name="arrow" className="h-3 w-3 rotate-180" />}
                                            {label}
                                            {dir === 'right' && <Icon name="arrow" className="h-3 w-3" />}
                                        </span>
                                        <span className="mt-1 block font-display text-xl">{other.name}</span>
                                    </button>
                                ))}
                            </motion.nav>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Sticky actions */}
                <div className="shrink-0 border-t border-espresso/10 bg-cream/95 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur sm:px-10">
                    <div className="flex gap-3">
                        <a
                            href={`${site.whatsapp}?text=${message}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-[0.66rem] font-semibold tracking-[0.2em] text-cream uppercase transition-colors hover:bg-bronze"
                        >
                            <Icon name="whatsapp" className="h-4 w-4" /> Rezervă pe WhatsApp
                        </a>
                        <a
                            href={site.phoneHref}
                            aria-label={`Sună la ${site.phone}`}
                            className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-espresso/15 transition-colors hover:border-espresso"
                        >
                            <Icon name="phone" className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </motion.aside>
        </motion.div>
    );
}
