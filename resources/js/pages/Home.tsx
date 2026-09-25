import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Classes } from '@/components/sections/Classes';
import { Contact } from '@/components/sections/Contact';
import { FloatingActions, Footer } from '@/components/sections/Footer';
import { Hero } from '@/components/sections/Hero';
import { Kids } from '@/components/sections/Kids';
import { Manifesto } from '@/components/sections/Manifesto';
import { Opening } from '@/components/sections/Opening';
import { Pillars } from '@/components/sections/Pillars';
import { Posters } from '@/components/sections/Posters';
import { initSmoothScroll, ScrollTrigger } from '@/lib/scroll';

export default function Home() {
    useEffect(() => {
        initSmoothScroll();
        // Fonts and lazy images change section heights; re-measure pinned/scrubbed sections once settled.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    }, []);

    return (
        <>
            <Header />
            <main>
                <Hero />
                <Manifesto />
                <Pillars />
                <Classes />
                <Kids />
                <Posters />
                <Opening />
                <Contact />
            </main>
            <Footer />
            <FloatingActions />
        </>
    );
}
