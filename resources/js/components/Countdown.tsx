import NumberFlow from '@number-flow/react';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts | null {
    const ms = target - Date.now();
    if (ms <= 0) return null;
    return {
        days: Math.floor(ms / 86_400_000),
        hours: Math.floor(ms / 3_600_000) % 24,
        minutes: Math.floor(ms / 60_000) % 60,
        seconds: Math.floor(ms / 1000) % 60,
    };
}

const labels: [keyof Parts, string][] = [
    ['days', 'Zile'],
    ['hours', 'Ore'],
    ['minutes', 'Minute'],
    ['seconds', 'Secunde'],
];

export function Countdown() {
    const target = new Date(site.openingDate).getTime();
    const [parts, setParts] = useState<Parts | null>(() => diff(target));

    useEffect(() => {
        const id = setInterval(() => setParts(diff(target)), 1000);
        return () => clearInterval(id);
    }, [target]);

    if (!parts) {
        return <p className="font-script text-5xl text-gold-soft">Suntem deschise — te așteptăm!</p>;
    }

    return (
        <div className="grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-label="Timp rămas până la deschidere">
            {labels.map(([key, label]) => (
                <div key={key} className="flex flex-col items-center rounded-2xl border border-gold/20 bg-white/[0.04] px-1 py-3 sm:px-4 sm:py-6">
                    <NumberFlow
                        value={parts[key]}
                        format={{ minimumIntegerDigits: 2 }}
                        className="font-display text-4xl leading-none font-medium text-cream tabular-nums sm:text-6xl"
                    />
                    <span className="mt-2 text-[0.55rem] tracking-[0.24em] text-gold-soft uppercase sm:text-[0.62rem]">{label}</span>
                </div>
            ))}
        </div>
    );
}
