import { AnimatePresence, motion } from 'motion/react';
import { site, type FitnessClass } from '@/lib/site';
import { Icon } from '../Icon';

export default function ClassDialogHost({ active, onClose }: { active: FitnessClass | null; onClose: () => void }) {
    return <AnimatePresence>{active && <ClassDialog key={active.id} c={active} onClose={onClose} />}</AnimatePresence>;
}

function ClassDialog({ c, onClose }: { c: FitnessClass; onClose: () => void }) {
    const message = encodeURIComponent(`Bună! Aș dori mai multe detalii despre clasa ${c.name} la MUV Exclusive.`);

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 backdrop-blur-sm sm:items-center sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-dialog-title"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
        >
            <motion.div
                data-lenis-prevent
                className="relative grid max-h-[92svh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-t-[2rem] bg-cream text-espresso shadow-2xl sm:rounded-[2rem] md:grid-cols-[0.85fr_1.15fr]"
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 80, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 60, opacity: 0, scale: 0.98 }}
                transition={{ type: 'spring', damping: 30, stiffness: 260 }}
            >
                <span className="absolute top-2.5 left-1/2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-espresso/20 sm:hidden" />
                <button
                    type="button"
                    onClick={onClose}
                    autoFocus
                    className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-cream/90 text-espresso shadow transition-colors hover:bg-white"
                    aria-label="Închide"
                >
                    <Icon name="close" className="h-5 w-5" />
                </button>

                <div
                    className="relative grid min-h-[240px] place-items-center overflow-hidden md:min-h-[520px]"
                    style={{ background: `radial-gradient(80% 60% at 50% 40%, ${c.accent}55 0%, transparent 70%), #16110e` }}
                >
                    {c.image ? (
                        <img src={c.image} alt={`Afiș ${c.name} — MUV Exclusive`} width={209} height={374} className="h-[240px] w-auto rounded-xl object-contain shadow-2xl md:h-[440px]" decoding="async" />
                    ) : (
                        <span style={{ color: c.accent }}>
                            <Icon name={c.icon} className="h-32 w-32" strokeWidth={0.8} />
                        </span>
                    )}
                </div>

                <div className="p-7 sm:p-10">
                    <p className="eyebrow" style={{ color: c.accent }}>
                        {c.keywords.join(' · ')}
                    </p>
                    <h3 id="class-dialog-title" className="mt-3 font-display text-5xl leading-none font-medium">
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
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-espresso px-6 py-4 text-[0.64rem] font-semibold tracking-[0.22em] text-cream uppercase transition-colors hover:bg-bronze sm:flex-none"
                        >
                            <Icon name="whatsapp" className="h-4 w-4" /> WhatsApp
                        </a>
                        <a
                            href={site.phoneHref}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-espresso/20 px-6 py-4 text-[0.64rem] font-semibold tracking-[0.22em] uppercase transition-colors hover:border-bronze hover:text-bronze sm:flex-none"
                        >
                            <Icon name="phone" className="h-4 w-4" /> Sună-ne
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
