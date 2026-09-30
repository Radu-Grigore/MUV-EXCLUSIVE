import {
    Activity,
    ArrowRight,
    ArrowUpRight,
    Check,
    Copy,
    Smartphone,
    Clock,
    Dumbbell,
    Flame,
    Flower2,
    HandFist,
    Heart,
    House,
    Leaf,
    MapPin,
    Phone,
    Plus,
    ToyBrick,
    Tv,
    UserRound,
    Users,
    Weight,
    X,
    Zap,
    type LucideIcon,
} from 'lucide-react';
import type { IconName } from '@/lib/site';

const lucide: Record<string, LucideIcon> = {
    fist: HandFist,
    kettlebell: Weight,
    step: Activity,
    dumbbell: Dumbbell,
    lotus: Flower2,
    flame: Flame,
    person: UserRound,
    heart: Heart,
    people: Users,
    leaf: Leaf,
    bolt: Zap,
    home: House,
    bear: ToyBrick,
    play: Tv,
    phone: Phone,
    pin: MapPin,
    close: X,
    arrow: ArrowRight,
    'arrow-up-right': ArrowUpRight,
    clock: Clock,
    plus: Plus,
    copy: Copy,
    check: Check,
    smartphone: Smartphone,
};

// Brand marks are not part of Lucide.
const brands = {
    facebook: <path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.5 1.6-1.5H17V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8.3v3H11V21" />,
    instagram: (
        <>
            <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
        </>
    ),
    apple: (
        <path
            fill="currentColor"
            stroke="none"
            d="M16.4 12.6c0-2.4 2-3.5 2-3.6a4.3 4.3 0 0 0-3.4-1.8c-1.4-.2-2.8.8-3.5.8-.7 0-1.8-.8-3-.8a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3a10 10 0 0 0 1.3-2.6 4 4 0 0 1-2.5-3.6ZM14.1 5.5A4 4 0 0 0 15 2.5a4.2 4.2 0 0 0-2.7 1.4 3.9 3.9 0 0 0-1 2.9 3.5 3.5 0 0 0 2.8-1.3Z"
        />
    ),
    googleplay: (
        <>
            <path fill="currentColor" stroke="none" d="M4.6 2.8 13.9 12l-9.3 9.2a1.3 1.3 0 0 1-.6-1.1V3.9c0-.5.2-.9.6-1.1Z" opacity=".85" />
            <path fill="currentColor" stroke="none" d="m15.4 10.5 2.6-1.5 2.9 1.7c.9.5.9 1.8 0 2.3L18 14.7l-2.6-1.6-1.5-1.1Z" />
            <path fill="currentColor" stroke="none" d="M4.6 2.8c.4-.2.9-.2 1.3.1l9.5 7.6L13.9 12Z" opacity=".65" />
            <path fill="currentColor" stroke="none" d="m13.9 12 1.5 1.1-9.5 7.9c-.4.3-.9.3-1.3.2Z" opacity=".5" />
        </>
    ),
    whatsapp: (
        <>
            <path d="M4 20l1.2-4A8.5 8.5 0 1 1 8.3 19Z" />
            <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2Z" />
        </>
    ),
};

export type AnyIcon = IconName | keyof typeof brands | 'phone' | 'pin' | 'close' | 'arrow' | 'arrow-up-right' | 'clock' | 'plus' | 'copy' | 'check' | 'smartphone';

export function Icon({ name, className = 'h-6 w-6', strokeWidth = 1.5 }: { name: AnyIcon; className?: string; strokeWidth?: number }) {
    const L = lucide[name];
    if (L) return <L className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {brands[name as keyof typeof brands]}
        </svg>
    );
}
