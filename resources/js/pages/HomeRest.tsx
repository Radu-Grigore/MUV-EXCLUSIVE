import { useGSAP } from '@gsap/react';
import { useEffect } from 'react';
import { CookieBanner } from '@/components/CookieBanner';
import { Booking } from '@/components/sections/Booking';
import { Classes } from '@/components/sections/Classes';
import { Contact } from '@/components/sections/Contact';
import { FloatingActions, Footer } from '@/components/sections/Footer';
import { Gallery } from '@/components/sections/Gallery';
import { Kids } from '@/components/sections/Kids';
import { Manifesto } from '@/components/sections/Manifesto';
import { Opening } from '@/components/sections/Opening';
import { Pricing } from '@/components/sections/Pricing';
import { Team } from '@/components/sections/Team';
import { SplitText } from '@/lib/gsap-extra';
import { gsap, introDone, scrollToTarget, whenNear } from '@/lib/scroll';

/** Everything below the first screen. Main = the sections inside <main>; Outside = footer, floating buttons, cookie popup. */
export function Sections() {
    useEffect(() => {
        // Arriving from another page with a section in the address (…/#clase): go there once the intro is done.
        const hash = window.location.hash;
        if (/^#[a-z][\w-]*$/i.test(hash) && document.querySelector(hash)) introDone.then(() => setTimeout(() => scrollToTarget(hash), 150));
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
            <Manifesto />
            <Classes />
            <Team />
            <Kids />
            <Pricing />
            <Gallery />
            <Booking />
            <Opening />
            <Contact />
        </>
    );
}

export function Outside() {
    return (
        <>
            <Footer onHome />
            <FloatingActions />
            <CookieBanner />
        </>
    );
}
