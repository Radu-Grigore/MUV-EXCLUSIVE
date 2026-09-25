import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';
import { Cursor } from '@/components/Cursor';
import { Header } from '@/components/Header';
import { Preloader } from '@/components/Preloader';
import { Classes } from '@/components/sections/Classes';
import { Contact } from '@/components/sections/Contact';
import { FloatingActions, Footer } from '@/components/sections/Footer';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Kids } from '@/components/sections/Kids';
import { Manifesto } from '@/components/sections/Manifesto';
import { Opening } from '@/components/sections/Opening';
import { Pillars } from '@/components/sections/Pillars';
import { VelocityMarquee } from '@/components/VelocityMarquee';
import { gsap, initSmoothScroll, ScrollTrigger, SplitText } from '@/lib/scroll';

export default function Home() {
    useEffect(() => {
        initSmoothScroll();
        // Fonts and lazy images change section heights; re-measure pinned/scrubbed sections once settled.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    }, []);

    // Section headings marked with data-split rise line by line from under a mask.
    useGSAP(() => {
        const mm = gsap.matchMedia();
        mm.add('(prefers-reduced-motion: no-preference)', () => {
            gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
                SplitText.create(el, {
                    type: 'lines',
                    mask: 'lines',
                    autoSplit: true,
                    onSplit: (self) =>
                        gsap.from(self.lines, {
                            yPercent: 110,
                            duration: 1.2,
                            stagger: 0.12,
                            ease: 'expo.out',
                            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                        }),
                });
            });
        });
    });

    return (
        <>
            <Preloader />
            <Cursor />
            <Header />
            {/* On desktop the page slides away to reveal the footer parked underneath. */}
            <main className="relative z-10 bg-cream lg:rounded-b-[3rem] lg:shadow-[0_40px_60px_-30px_rgba(22,17,14,0.45)]">
                <Hero />
                <Manifesto />
                <VelocityMarquee />
                <Pillars />
                <Classes />
                <Kids />
                <Gallery />
                <Opening />
                <Contact />
            </main>
            <Footer />
            <FloatingActions />
        </>
    );
}
