import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { gsap, hasFinePointer, prefersReducedMotion, ScrollTrigger } from '@/lib/scroll';

const palette = ['#e9b949', '#5b8fc7', '#c86b6b', '#6f7f4d', '#7ec8e3', '#f28c5b'];

const balloons = [
    { color: '#e9b949', left: '8%', size: 64, delay: 0 },
    { color: '#5b8fc7', left: '22%', size: 52, delay: 3.5, desktop: true },
    { color: '#c86b6b', left: '63%', size: 58, delay: 1.8 },
    { color: '#6f7f4d', left: '82%', size: 48, delay: 5.2 },
    { color: '#7ec8e3', left: '47%', size: 44, delay: 7, desktop: true },
];

const twinkles = [
    { top: '12%', left: '52%' },
    { top: '22%', left: '88%' },
    { top: '40%', left: '70%' },
    { top: '9%', left: '30%' },
    { top: '58%', left: '94%' },
    { top: '72%', left: '56%' },
    { top: '30%', left: '4%' },
];

const sparkle = 'M12 0c.7 6.3 5.7 11.3 12 12-6.3.7-11.3 5.7-12 12-.7-6.3-5.7-11.3-12-12C6.3 11.3 11.3 6.3 12 0Z';

/**
 * Playful animated layer for the Kids Corner: rising balloons, a looping paper plane,
 * a bouncing ball, twinkling stars and a self-drawing rainbow. On desktop the pointer
 * leaves a star trail and clicks burst into confetti. Everything pauses off-screen.
 */
export function KidsPlayground() {
    const root = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (prefersReducedMotion()) return;
            const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
            const loops: gsap.core.Animation[] = [];

            // Balloons drift up from below the floor, swaying, then start over.
            gsap.utils.toArray<HTMLElement>('[data-balloon]').forEach((b) => {
                const rise = gsap.fromTo(
                    b,
                    { yPercent: 0, y: 0 },
                    { y: () => -(root.current!.offsetHeight + 200), duration: 16, ease: 'none', repeat: -1, delay: Number(b.dataset.delay) },
                );
                const sway = gsap.to(b.firstElementChild, { x: 22, rotate: 8, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
                loops.push(rise, sway);
            });

            // Paper plane follows its path (position + heading read from the SVG path); the dashed trail marches behind it.
            const path = root.current!.querySelector<SVGPathElement>('#kids-plane-path')!;
            const plane = root.current!.querySelector<SVGGElement>('[data-plane]')!;
            const length = path.getTotalLength();
            const flight = { p: 0 };
            loops.push(
                gsap.to(flight, {
                    p: 1,
                    duration: 11,
                    ease: 'sine.inOut',
                    repeat: -1,
                    onUpdate: () => {
                        const at = flight.p * length;
                        const a = path.getPointAtLength(at);
                        const b = path.getPointAtLength(Math.min(length, at + 1));
                        const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
                        plane.setAttribute('transform', `translate(${a.x} ${a.y}) rotate(${angle})`);
                    },
                }),
                gsap.to(path, { strokeDashoffset: -200, duration: 6, ease: 'none', repeat: -1 }),
            );

            // Ball bounces across the floor and back.
            const ball = gsap.timeline({ repeat: -1, yoyo: true });
            ball.to('[data-ball]', { x: () => (isDesktop ? root.current!.offsetWidth * 0.32 : root.current!.offsetWidth * 0.5), rotate: 540, duration: 4.5, ease: 'none' }, 0);
            loops.push(ball, gsap.to('[data-ball-bounce]', { y: -70, duration: 0.45, ease: 'power2.out', yoyo: true, repeat: -1 }));

            // Twinkles.
            gsap.utils.toArray<HTMLElement>('[data-twinkle]').forEach((t, i) => {
                loops.push(
                    gsap.fromTo(t, { scale: 0, rotate: 0 }, { scale: 1, rotate: 90, duration: 0.9, ease: 'back.out(3)', yoyo: true, repeat: -1, repeatDelay: 1.2, delay: i * 0.45 }),
                );
            });

            // Rainbow draws itself in whenever the section comes back into view.
            const rainbow = gsap.fromTo('[data-rainbow] path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.6, stagger: 0.2, ease: 'power2.inOut', paused: true });

            ScrollTrigger.create({
                trigger: root.current,
                start: 'top bottom',
                end: 'bottom top',
                onToggle: (self) => {
                    loops.forEach((l) => (self.isActive ? l.resume() : l.pause()));
                    if (self.isActive) rainbow.restart();
                },
            });

            if (!hasFinePointer()) return;

            // Desktop: star trail behind the pointer and confetti on click.
            const section = root.current!.parentElement!; // the Kids frame
            let last = 0;
            const spawn = (x: number, y: number, burst: boolean) => {
                const rect = root.current!.getBoundingClientRect();
                const count = burst ? 22 : 1;
                for (let i = 0; i < count; i++) {
                    const el = document.createElement('span');
                    const size = burst ? gsap.utils.random(8, 14) : gsap.utils.random(10, 16);
                    el.className = 'pointer-events-none absolute';
                    el.style.cssText = `left:${x - rect.left}px;top:${y - rect.top}px;width:${size}px;height:${size}px;`;
                    el.innerHTML = burst && i % 2
                        ? `<span style="display:block;width:100%;height:60%;border-radius:2px;background:${gsap.utils.random(palette)}"></span>`
                        : `<svg viewBox="0 0 24 24" width="100%" height="100%"><path d="${sparkle}" fill="${gsap.utils.random(palette)}"/></svg>`;
                    root.current!.appendChild(el);
                    const angle = burst ? gsap.utils.random(0, Math.PI * 2) : gsap.utils.random(Math.PI * 0.35, Math.PI * 0.65);
                    const dist = burst ? gsap.utils.random(60, 170) : gsap.utils.random(20, 45);
                    gsap.timeline({ onComplete: () => el.remove() })
                        .fromTo(el, { xPercent: -50, yPercent: -50, scale: 0, rotate: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(3)' })
                        .to(el, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist + (burst ? 60 : 30), rotate: gsap.utils.random(-360, 360), duration: burst ? 1.2 : 0.9, ease: 'power2.out' }, 0)
                        .to(el, { autoAlpha: 0, duration: 0.4 }, burst ? 0.8 : 0.5);
                }
            };
            const onMove = (e: PointerEvent) => {
                const now = performance.now();
                if (now - last < 70) return;
                last = now;
                spawn(e.clientX, e.clientY, false);
            };
            const onClick = (e: MouseEvent) => {
                if ((e.target as HTMLElement).closest('button, a')) return;
                spawn(e.clientX, e.clientY, true);
            };
            section.addEventListener('pointermove', onMove);
            section.addEventListener('click', onClick);
            return () => {
                section.removeEventListener('pointermove', onMove);
                section.removeEventListener('click', onClick);
            };
        },
        { scope: root },
    );

    return (
        <div ref={root} aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[45%] overflow-hidden sm:h-[440px] lg:inset-0 lg:h-auto">
            {/* Flight path + plane, in a shared coordinate space */}
            <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
                <path
                    id="kids-plane-path"
                    d="M-60 150 C 180 40, 320 60, 420 150 S 560 300, 640 200 S 720 60, 800 130 S 900 260, 1060 120"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.8"
                    strokeWidth="2.5"
                    strokeDasharray="2 12"
                    strokeLinecap="round"
                />
                <g data-plane>
                    <path d="M22 0 L-22 -10 L-6 0 L-22 10 Z" fill="#ffffff" stroke="#5b8fc7" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M-6 0 L6 12" stroke="#5b8fc7" strokeWidth="2" strokeLinecap="round" />
                </g>
            </svg>

            {balloons.map((b, i) => (
                <div
                    key={i}
                    data-balloon
                    data-delay={b.delay}
                    className={`absolute top-full ${b.desktop ? 'hidden lg:block' : ''}`}
                    style={{ left: b.left, width: b.size }}
                >
                    <svg viewBox="0 0 40 70" className="w-full drop-shadow-[0_8px_12px_rgba(42,32,26,0.25)]">
                        <ellipse cx="20" cy="20" rx="17" ry="20" fill={b.color} />
                        <ellipse cx="13" cy="12" rx="4" ry="6" fill="#ffffff" opacity="0.45" />
                        <path d="M17 40 L23 40 L20 44 Z" fill={b.color} />
                        <path d="M20 44 C 16 52, 24 58, 19 70" fill="none" stroke="#7a6a5a" strokeWidth="1" />
                    </svg>
                </div>
            ))}

            {twinkles.map((t, i) => (
                <svg key={i} data-twinkle viewBox="0 0 24 24" className="absolute h-5 w-5 lg:h-6 lg:w-6" style={{ top: t.top, left: t.left }}>
                    <path d={sparkle} fill={i % 2 ? '#ffffff' : '#e9b949'} />
                </svg>
            ))}

            {/* Rainbow */}
            <svg data-rainbow viewBox="0 0 120 64" className="absolute top-[6%] right-[6%] w-24 lg:top-[8%] lg:right-[20%] lg:w-32">
                {['#c86b6b', '#e9b949', '#6f7f4d', '#5b8fc7'].map((c, i) => (
                    <path key={c} d={`M${10 + i * 9} 60 A ${50 - i * 9} ${50 - i * 9} 0 0 1 ${110 - i * 9} 60`} fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
                ))}
            </svg>

            {/* Ball rolling on the floor */}
            <div data-ball className="absolute bottom-[4%] left-[6%] lg:left-[40%]">
                <div data-ball-bounce>
                    <svg viewBox="0 0 40 40" className="h-11 w-11 drop-shadow-[0_10px_10px_rgba(42,32,26,0.3)] lg:h-14 lg:w-14">
                        <circle cx="20" cy="20" r="18" fill="#ffffff" />
                        <path d="M20 2 A18 18 0 0 1 38 20 L20 20 Z" fill="#c86b6b" />
                        <path d="M2 20 A18 18 0 0 0 20 38 L20 20 Z" fill="#5b8fc7" />
                        <path d="M20 38 A18 18 0 0 0 38 20 L20 20 Z" fill="#e9b949" />
                        <circle cx="20" cy="20" r="18" fill="none" stroke="#2a201a" strokeOpacity="0.15" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
