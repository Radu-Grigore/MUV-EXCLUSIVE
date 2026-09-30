import { useEffect, useState } from 'react';
import { getConsent, onOpenSettings, saveConsent } from '@/lib/consent';
import { pageHref } from '@/lib/routes';

const categories = [
    { key: 'necessary', label: 'Strict necesare', note: 'Funcționarea site-ului și preferințele de cookies. Mereu active.', locked: true },
    { key: 'analytics', label: 'Analiză', note: 'Câți vizitatori are site-ul și ce pagini sunt vizitate.' },
    { key: 'marketing', label: 'Marketing', note: 'Reclame relevante și măsurarea campaniilor.' },
    { key: 'thirdParty', label: 'Terți', note: 'Servicii externe, de exemplu harta Google.' },
] as const;

type Choice = { analytics: boolean; marketing: boolean; thirdParty: boolean };

/** Cookie banner shown on the first visit; the footer link "Setări cookies" opens it again. */
export function CookieBanner() {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(false);
    const [choice, setChoice] = useState<Choice>({ analytics: false, marketing: false, thirdParty: false });

    useEffect(() => {
        const saved = getConsent();
        if (saved) setChoice({ analytics: saved.analytics, marketing: saved.marketing, thirdParty: saved.thirdParty });
        // No valid choice yet (first visit, or older than 6 months): ask straight away.
        if (!saved) setOpen(true);
        const off = onOpenSettings(() => {
            setDetails(true);
            setOpen(true);
        });
        return off;
    }, []);

    function save(value: Choice) {
        saveConsent(value);
        setChoice(value);
        setOpen(false);
        setDetails(false);
    }

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="false"
            aria-labelledby="cookie-title"
            className="fixed bottom-3 left-3 z-[120] w-[min(20rem,calc(100vw-5.5rem))] rounded-2xl border border-bronze/20 bg-cream/95 p-3.5 text-espresso shadow-[0_20px_50px_-15px_rgba(22,17,14,0.55)] backdrop-blur-lg sm:bottom-5 sm:left-5 sm:w-[21rem]"
        >
            <p id="cookie-title" className="text-[0.78rem] leading-snug text-cocoa">
                <span className="font-semibold text-espresso">Cookie-uri.</span> Folosim doar cookie-uri necesare; restul, doar cu acordul tău.{' '}
                <a href={pageHref('politica-de-cookies')} className="font-medium text-bronze underline underline-offset-2">
                    Detalii
                </a>
            </p>

            {details && (
                <ul className="mt-2.5 divide-y divide-espresso/10 rounded-xl border border-espresso/10 bg-white/70 px-2.5">
                    {categories.map((c) => {
                        const locked = 'locked' in c;
                        const checked = locked ? true : choice[c.key as keyof Choice];
                        return (
                            <li key={c.key}>
                                <label className={`flex items-center gap-2.5 py-2 ${locked ? 'opacity-70' : 'cursor-pointer'}`}>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        disabled={locked}
                                        onChange={(e) => setChoice((v) => ({ ...v, [c.key]: e.target.checked }))}
                                        className="h-4 w-4 shrink-0 accent-[#8b6c4f]"
                                    />
                                    <span className="text-[0.75rem] font-medium" title={c.note}>
                                        {c.label}
                                    </span>
                                </label>
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className="mt-2.5 flex items-center gap-1.5">
                <button
                    type="button"
                    onClick={() => save({ analytics: true, marketing: true, thirdParty: true })}
                    className="flex-1 rounded-full bg-espresso px-3 py-2.5 text-[0.58rem] font-semibold tracking-[0.16em] text-cream uppercase transition-colors hover:bg-bronze"
                >
                    Accept
                </button>
                <button
                    type="button"
                    onClick={() => save({ analytics: false, marketing: false, thirdParty: false })}
                    className="flex-1 rounded-full border border-espresso/25 px-3 py-2.5 text-[0.58rem] font-semibold tracking-[0.16em] uppercase transition-colors hover:border-espresso"
                >
                    Refuz
                </button>
                <button
                    type="button"
                    onClick={() => (details ? save(choice) : setDetails(true))}
                    className="px-2 py-2.5 text-[0.58rem] font-semibold tracking-[0.16em] text-bronze uppercase underline-offset-2 hover:underline"
                >
                    {details ? 'Salvează' : 'Setări'}
                </button>
            </div>
        </div>
    );
}
