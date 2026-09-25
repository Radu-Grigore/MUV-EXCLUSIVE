export function Logo({ className = '', light = false }: { className?: string; light?: boolean }) {
    return (
        <span className={`inline-flex flex-col items-center leading-none transition-colors duration-500 ${className}`}>
            <span className={`font-display text-[1.75rem] font-medium tracking-[0.04em] ${light ? 'text-cream' : 'text-espresso'}`}>MUV</span>
            <span className={`mt-0.5 pl-[0.5em] text-[0.5rem] font-medium tracking-[0.5em] ${light ? 'text-gold-soft' : 'text-bronze'}`}>
                EXCLUSIVE
            </span>
        </span>
    );
}
