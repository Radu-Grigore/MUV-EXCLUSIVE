type Props = {
    children: React.ReactNode;
    /** Content of the round badge sitting in the cut-out corner. */
    badge: React.ReactNode;
    /** Colour behind the card; the notch is painted with it. */
    notchColor: string;
    badgeClassName?: string;
    className?: string;
    as?: 'div' | 'button';
    onClick?: () => void;
    ariaLabel?: string;
    /** Label shown in the custom desktop cursor while hovering. */
    cursor?: string;
};

const NOTCH = 84; // px, size of the cut-out
const FILLET = 22; // px, radius of the concave joins

/**
 * Card with a rounded cut-out in the bottom-right corner holding a round badge.
 * The cut-out is painted in the surrounding background colour, with two concave
 * fillets so the card edge curves smoothly into it.
 */
export function NotchCard({ children, badge, notchColor, badgeClassName = '', className = '', as = 'div', onClick, ariaLabel, cursor }: Props) {
    const Tag = as;
    const fillet = `radial-gradient(circle at 0 0, transparent ${FILLET - 0.5}px, ${notchColor} ${FILLET}px)`;

    return (
        <Tag
            type={as === 'button' ? 'button' : undefined}
            onClick={onClick}
            aria-label={ariaLabel}
            data-cursor={cursor}
            className={`group relative block w-full rounded-[2rem] text-left ${className}`}
        >
            {children}
            <span aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0" style={{ width: NOTCH, height: NOTCH }}>
                <span className="absolute inset-0 rounded-tl-[1.9rem]" style={{ background: notchColor }} />
                <span className="absolute bottom-0" style={{ right: NOTCH, width: FILLET, height: FILLET, background: fillet }} />
                <span className="absolute right-0" style={{ bottom: NOTCH, width: FILLET, height: FILLET, background: fillet }} />
            </span>
            <span
                className={`absolute right-0 bottom-0 grid h-[68px] w-[68px] place-items-center overflow-hidden rounded-full text-sm font-semibold transition-transform duration-500 ease-out-expo group-hover:scale-105 ${badgeClassName}`}
            >
                {badge}
            </span>
        </Tag>
    );
}
