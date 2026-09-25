"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

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
  ["days", "Zile"],
  ["hours", "Ore"],
  ["minutes", "Minute"],
  ["seconds", "Secunde"],
];

export function Countdown({ variant = "light" }: { variant?: "light" | "dark" }) {
  const target = new Date(site.openingDate).getTime();
  // null until mounted, so server and client render the same markup
  const [parts, setParts] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setParts(diff(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const dark = variant === "dark";

  if (parts === null) {
    return (
      <p className={`font-script text-5xl ${dark ? "text-gold-soft" : "text-bronze"}`}>
        Suntem deschise — te așteptăm!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4" role="timer" aria-label="Timp rămas până la deschidere">
      {labels.map(([key, label]) => (
        <div
          key={key}
          className={`flex flex-col items-center rounded-2xl border px-2 py-3 sm:px-5 sm:py-4 ${
            dark ? "border-gold/25 bg-white/5" : "border-bronze/15 bg-white/50 backdrop-blur"
          }`}
        >
          <span
            className={`font-display text-3xl font-medium tabular-nums sm:text-5xl ${dark ? "text-cream" : "text-espresso"}`}
          >
            {parts ? String(parts[key]).padStart(2, "0") : "--"}
          </span>
          <span className={`mt-1 text-[0.58rem] tracking-[0.25em] uppercase sm:text-[0.62rem] ${dark ? "text-gold-soft" : "text-bronze"}`}>
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
