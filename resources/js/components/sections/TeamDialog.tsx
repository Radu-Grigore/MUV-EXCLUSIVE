import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { asset, site, type TeamMember } from '@/lib/site';
import { lockScroll, scrollToTarget } from '@/lib/scroll';
import { bookingLinkProps } from '../BookingLink';
import { Icon } from '../Icon';
import { Avatar } from './Team';

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
                    {/* Photos, whole and uncropped: one, or a swipeable row when there are several; a monogram when there is none yet */}
                    {m.photos.length === 0 && <Avatar name={m.name} compact className="h-56 w-full rounded-[1.4rem]" />}
                    {m.photos.length > 0 && <PhotoRow m={m} />}

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

/**
 * The instructor's photos in a row. Phones swipe; on a computer the arrows (or dragging with the mouse)
 * move from one photo to the next.
 */
function PhotoRow({ m }: { m: TeamMember }) {
    const row = useRef<HTMLDivElement>(null);
    const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
    const [edge, setEdge] = useState({ start: true, end: m.photos.length < 2 });

    function update() {
        const el = row.current;
        if (!el) return;
        setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });
    }

    // Re-measured as the photos load and when the window changes size (the row's width depends on both).
    useEffect(() => {
        update();
        const ro = new ResizeObserver(update);
        if (row.current) ro.observe(row.current);
        return () => ro.disconnect();
    }, []);

    function step(dir: 1 | -1) {
        const el = row.current;
        if (!el) return;
        const items = Array.from(el.children) as HTMLElement[];
        const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
        // The next photo whose left edge lies past (or before) the current position.
        const lefts = items.map((c) => c.offsetLeft - pad);
        const target = dir > 0 ? lefts.find((l) => l > el.scrollLeft + 4) : [...lefts].reverse().find((l) => l < el.scrollLeft - 4);
        el.scrollTo({ left: target ?? (dir > 0 ? el.scrollWidth : 0), behavior: 'smooth' });
    }

    function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
        if (e.pointerType !== 'mouse' || !row.current) return;
        drag.current = { x: e.clientX, left: row.current.scrollLeft, moved: false };
        row.current.style.scrollSnapType = 'none';
    }
    function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
        const d = drag.current;
        if (!d || !row.current) return;
        const dx = e.clientX - d.x;
        if (Math.abs(dx) > 3) d.moved = true;
        row.current.scrollLeft = d.left - dx;
    }
    function endDrag() {
        if (!drag.current || !row.current) return;
        drag.current = null;
        row.current.style.scrollSnapType = '';
    }

    const many = m.photos.length > 1;

    return (
        <div className="relative -mx-6 sm:-mx-10">
            <div
                ref={row}
                onScroll={update}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerLeave={endDrag}
                className={`no-scrollbar flex items-start snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 sm:scroll-px-10 sm:px-10 ${many ? 'md:cursor-grab md:active:cursor-grabbing' : ''}`}
            >
                {m.photos.map((p, i) => (
                    <img
                        key={p.src}
                        src={asset(p.src)}
                        alt={`${m.name} — fotografie ${i + 1}`}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                        onLoad={update}
                        className="h-auto max-h-[26rem] w-auto max-w-[calc(100vw-3rem)] shrink-0 snap-start rounded-[1.4rem] bg-sand select-none sm:max-h-[30rem] sm:max-w-[calc(100vw-5rem)] md:max-w-[520px]"
                    />
                ))}
            </div>
            {many && (
                <>
                    <button
                        type="button"
                        onClick={() => step(-1)}
                        aria-label="Fotografia anterioară"
                        className={`absolute top-1/2 left-3 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-espresso shadow-lg transition-opacity hover:bg-white md:grid ${edge.start ? 'pointer-events-none opacity-0' : ''}`}
                    >
                        <Icon name="arrow" className="h-4 w-4 rotate-180" />
                    </button>
                    <button
                        type="button"
                        onClick={() => step(1)}
                        aria-label="Fotografia următoare"
                        className={`absolute top-1/2 right-3 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-cream/90 text-espresso shadow-lg transition-opacity hover:bg-white md:grid ${edge.end ? 'pointer-events-none opacity-0' : ''}`}
                    >
                        <Icon name="arrow" className="h-4 w-4" />
                    </button>
                </>
            )}
        </div>
    );
}
