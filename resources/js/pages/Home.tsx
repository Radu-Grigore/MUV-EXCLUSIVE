import { lazy, startTransition, Suspense, useEffect, useState } from 'react';
import { Cursor } from '@/components/Cursor';
import { Header } from '@/components/Header';
import { Preloader } from '@/components/Preloader';
import { Hero } from '@/components/sections/Hero';
import { initSmoothScroll, ScrollTrigger } from '@/lib/scroll';

// Everything below the first screen is its own file. Its download starts right away, alongside this one,
// so it is ready long before the intro ends; it just no longer holds up the first paint.
const rest = import('./HomeRest');
const Sections = lazy(() => rest.then((m) => ({ default: m.Sections })));
const Outside = lazy(() => rest.then((m) => ({ default: m.Outside })));

export default function Home() {
    // The first screen (header + hero) is drawn on its own; the rest of the page follows straight after,
    // in small interruptible steps, so the phone paints the hero sooner and never freezes while it builds.
    const [more, setMore] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => startTransition(() => setMore(true)));
        return () => cancelAnimationFrame(id);
    }, []);

    useEffect(() => {
        // The HTML ships a static first frame of the intro; the app has taken over now.
        document.getElementById('boot')?.remove();
        document.title = 'MUV Exclusive — Sală de fitness pentru femei în Ploiești | Boutique Fitness Studio';
        initSmoothScroll();
        // Fonts and lazy images change section heights: re-measure the scroll animations once, when
        // everything has loaded and the phone is idle (each re-measure lays out the whole page).
        const settle = () => {
            const run = () => ScrollTrigger.refresh();
            if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(run, { timeout: 2000 });
            else setTimeout(run, 300);
        };
        if (document.readyState === 'complete') settle();
        else window.addEventListener('load', settle, { once: true });
    }, []);

    return (
        <>
            <Preloader />
            <Cursor />
            <Header />
            {/* On desktop the page slides away to reveal the footer parked underneath. */}
            <main className="relative z-10 bg-cream lg:rounded-b-[3rem] lg:shadow-[0_40px_60px_-30px_rgba(22,17,14,0.45)]">
                <Hero />
                {more && (
                    <Suspense fallback={null}>
                        <Sections />
                    </Suspense>
                )}
            </main>
            {more && (
                <Suspense fallback={null}>
                    <Outside />
                </Suspense>
            )}
        </>
    );
}
