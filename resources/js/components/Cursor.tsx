import { useGSAP } from '@gsap/react';
import { useRef, useState } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion } from '@/lib/scroll';

/**
 * Desktop-only custom cursor (dot + trailing ring with a contextual label) and
 * magnetic pull for elements marked with `data-magnetic`. Touch devices skip it entirely.
 */
export function Cursor() {
    const [enabled] = useState(() => hasFinePointer() && !prefersReducedMotion());
    const dot = useRef<HTMLDivElement>(null);
    const ring = useRef<HTMLDivElement>(null);
    const label = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            if (!enabled) return;
            document.documentElement.classList.add('has-cursor');

            const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
            const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
            const rx = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' });
            const ry = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' });

            let hovered: HTMLElement | null = null;

            const onMove = (e: PointerEvent) => {
                dx(e.clientX);
                dy(e.clientY);
                rx(e.clientX);
                ry(e.clientY);

                const target = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]');
                if (target === hovered) return;
                hovered = target;
                const text = target?.dataset.cursor ?? '';
                if (label.current) label.current.textContent = text;
                gsap.to(ring.current, {
                    scale: text ? 2.6 : target ? 1.6 : 1,
                    backgroundColor: text ? 'rgba(42,32,26,0.92)' : 'rgba(199,160,106,0)',
                    borderColor: text ? 'rgba(42,32,26,0)' : 'rgba(139,108,79,0.6)',
                    duration: 0.4,
                    ease: 'expo.out',
                });
                gsap.to(dot.current, { scale: target ? 0 : 1, duration: 0.3 });
                gsap.to(label.current, { autoAlpha: text ? 1 : 0, duration: 0.25 });
            };

            const onLeave = () => gsap.to([dot.current, ring.current], { autoAlpha: 0, duration: 0.2 });
            const onEnter = () => gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.2 });

            // Magnetic elements drift toward the pointer and spring back on leave.
            const magnets = gsap.utils.toArray<HTMLElement>('[data-magnetic]');
            const cleanups = magnets.map((el) => {
                const mx = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
                const my = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
                const move = (e: PointerEvent) => {
                    const r = el.getBoundingClientRect();
                    mx((e.clientX - (r.left + r.width / 2)) * 0.3);
                    my((e.clientY - (r.top + r.height / 2)) * 0.3);
                };
                const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
                el.addEventListener('pointermove', move);
                el.addEventListener('pointerleave', leave);
                return () => {
                    el.removeEventListener('pointermove', move);
                    el.removeEventListener('pointerleave', leave);
                };
            });

            window.addEventListener('pointermove', onMove, { passive: true });
            document.documentElement.addEventListener('pointerleave', onLeave);
            document.documentElement.addEventListener('pointerenter', onEnter);
            return () => {
                document.documentElement.classList.remove('has-cursor');
                window.removeEventListener('pointermove', onMove);
                document.documentElement.removeEventListener('pointerleave', onLeave);
                document.documentElement.removeEventListener('pointerenter', onEnter);
                cleanups.forEach((c) => c());
            };
        },
        { dependencies: [enabled] },
    );

    if (!enabled) return null;

    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90]">
            <div ref={ring} className="fixed top-0 left-0 -mt-5 -ml-5 grid h-10 w-10 place-items-center rounded-full border border-bronze/60">
                <span ref={label} className="invisible text-[0.32rem] font-semibold tracking-[0.2em] text-cream uppercase opacity-0" />
            </div>
            <div ref={dot} className="fixed top-0 left-0 -mt-1 -ml-1 h-2 w-2 rounded-full bg-espresso" />
        </div>
    );
}
