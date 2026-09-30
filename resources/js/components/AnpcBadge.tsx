import { asset } from '@/lib/site';

/** Official ANPC "Soluționarea alternativă a litigiilor" pictogram, linking to the ANPC page. */
export function AnpcSalBadge({ className = '' }: { className?: string }) {
    return (
        <a
            href="https://anpc.ro/ce-este-sal/"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block overflow-hidden rounded-lg transition-opacity hover:opacity-90 ${className}`}
        >
            <img
                src={asset('/images/anpc-sal.png')}
                alt="ANPC — Soluționarea alternativă a litigiilor (detalii)"
                width={250}
                height={61}
                loading="lazy"
                decoding="async"
                className="block h-auto w-[250px]"
            />
        </a>
    );
}
