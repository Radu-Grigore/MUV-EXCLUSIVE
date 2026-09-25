export function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span
        className={`font-display text-[1.9rem] font-medium tracking-[0.04em] ${light ? "text-cream" : "text-espresso"}`}
      >
        MUV
      </span>
      <span className={`mt-0.5 text-[0.55rem] font-medium tracking-[0.5em] pl-[0.5em] ${light ? "text-gold-soft" : "text-bronze"}`}>
        EXCLUSIVE
      </span>
    </span>
  );
}
