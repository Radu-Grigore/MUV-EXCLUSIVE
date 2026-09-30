/** ANPC "Soluționarea alternativă a litigiilor" pictogram (250×50), linking to the ANPC page. */
export function AnpcSalBadge({ className = '' }: { className?: string }) {
    return (
        <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ANPC — Soluționarea alternativă a litigiilor"
            className={`inline-block rounded-md bg-white transition-opacity hover:opacity-90 ${className}`}
        >
            <svg viewBox="0 0 250 50" width="250" height="50" className="block h-auto w-[210px] sm:w-[250px]" role="img" aria-hidden="true">
                <rect x="0.75" y="0.75" width="248.5" height="48.5" rx="6" fill="#fff" stroke="#1f3c88" strokeWidth="1.5" />
                <rect x="6" y="6" width="58" height="38" rx="4" fill="#1f3c88" />
                <text x="35" y="31" textAnchor="middle" fill="#fff" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="16" letterSpacing="0.5">
                    ANPC
                </text>
                <text x="74" y="22" fill="#1f3c88" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="10.5" letterSpacing="0.2">
                    SOLUȚIONAREA ALTERNATIVĂ
                </text>
                <text x="74" y="36" fill="#1f3c88" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="10.5" letterSpacing="0.2">
                    A LITIGIILOR
                </text>
            </svg>
        </a>
    );
}
