import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';
import { CookieBanner } from '@/components/CookieBanner';
import { Cursor } from '@/components/Cursor';
import { Header } from '@/components/Header';
import { Preloader } from '@/components/Preloader';
import { Booking } from '@/components/sections/Booking';
import { Classes } from '@/components/sections/Classes';
import { Contact } from '@/components/sections/Contact';
import { FloatingActions, Footer } from '@/components/sections/Footer';
import { Gallery } from '@/components/sections/Gallery';
import { Hero } from '@/components/sections/Hero';
import { Kids } from '@/components/sections/Kids';
import { Manifesto } from '@/components/sections/Manifesto';
import { Opening } from '@/components/sections/Opening';
import { Pricing } from '@/components/sections/Pricing';
import { Team } from '@/components/sections/Team';
import { gsap, initSmoothScroll, introDone, scrollToTarget, ScrollTrigger, SplitText, whenNear } from '@/lib/scroll';

export default function Home() {
    useEffect(() => {
        // The HTML ships a static first frame of the intro; the app has taken over now.
        document.getElementById('boot')?.remove();
        document.title = 'MUV Exclusive — Sală de fitness pentru femei în Ploiești | Boutique Fitness Studio';
        initSmoothScroll();
        // Arriving from another page with a section in the address (…/#clase): go there once the intro is done.
        const hash = window.location.hash;
        if (/^#[a-z][\w-]*$/i.test(hash) && document.querySelector(hash)) introDone.then(() => setTimeout(() => scrollToTarget(hash), 150));
        // Fonts and lazy images change section heights; re-measure pinned/scrubbed sections once settled.
        document.fonts?.ready.then(() => ScrollTrigger.refresh());
        window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    }, []);

    // Section headings marked with data-split rise line by line from under a mask.
    // Each heading is split once it is about a screen away, not all at start-up.
    useGSAP((_, contextSafe) => {
        const offs = gsap.utils.toArray<HTMLElement>('[data-split]').map((el) =>
            whenNear(el, contextSafe!(() => {
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
            })),
        );
        return () => offs.forEach((off) => off());
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
                <Classes />
                <Team />
                <Kids />
                <Pricing />
                <Gallery />
                <Booking />
                <Opening />
                <Contact />
            </main>
            <Footer onHome />
            <FloatingActions />
            <CookieBanner />
        </>
    );
}
