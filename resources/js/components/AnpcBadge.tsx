import { asset } from '@/lib/site';

/** Official ANPC "Soluționarea alternativă a litigiilor" pictogram (white corners removed), linking to the ANPC page. */
export function AnpcSalBadge({ className = '' }: { className?: string }) {
    return (
        <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" className={`inline-block transition-opacity hover:opacity-90 ${className}`}>
            <img
                src={asset('/images/anpc-sal.png')}
                alt="ANPC — Soluționarea alternativă a litigiilor (detalii)"
                width={250}
                height={62}
                loading="lazy"
                decoding="async"
                className="block h-auto w-[250px]"
            />
        </a>
    );
}
