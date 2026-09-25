import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryItem } from '@/lib/site';
import { lockScroll } from '@/lib/scroll';
import { Icon } from '../Icon';
import { fallbackOnError } from './Gallery';

export default function Lightbox({ item, onClose }: { item: GalleryItem | null; onClose: () => void }) {
    useEffect(() => {
        lockScroll(!!item);
        if (!item) return;
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [item, onClose]);

    return createPortal(
        <AnimatePresence>
            {item && (
                <motion.div
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm sm:p-10"
                    role="dialog"
                    aria-modal="true"
                    aria-label={item.title}
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.img
                        src={item.src}
                        onError={fallbackOnError(item)}
                        alt={item.title}
                        className="max-h-full max-w-full rounded-2xl object-contain shadow-2xl"
                        initial={{ scale: 0.92, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                    />
                    <button
                        type="button"
                        onClick={onClose}
                        autoFocus
                        aria-label="Închide"
                        className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-cream text-espresso shadow-lg"
                    >
                        <Icon name="close" className="h-5 w-5" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}
