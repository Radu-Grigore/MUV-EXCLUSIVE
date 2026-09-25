import {
    Activity,
    ArrowRight,
    ArrowUpRight,
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
    whatsapp: (
        <>
            <path d="M4 20l1.2-4A8.5 8.5 0 1 1 8.3 19Z" />
            <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2Z" />
        </>
    ),
};

export type AnyIcon = IconName | keyof typeof brands | 'phone' | 'pin' | 'close' | 'arrow' | 'arrow-up-right' | 'clock' | 'plus';

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
