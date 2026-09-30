/**
 * Cookie consent (Politica de cookies). Strictly necessary storage is always on; everything else waits for
 * consent. The choice itself is kept in a first-party, strictly necessary cookie for 6 months, after which
 * the visitor is asked again.
 */
export type Consent = { analytics: boolean; marketing: boolean; thirdParty: boolean; date: string };

const COOKIE = 'muv_consent';
const MAX_AGE = 60 * 60 * 24 * 182; // 6 months
const EVENT = 'muv-consent';

export function getConsent(): Consent | null {
    try {
        const raw = document.cookie
            .split('; ')
            .find((c) => c.startsWith(`${COOKIE}=`))
            ?.slice(COOKIE.length + 1);
        if (!raw) return null;
        const value = JSON.parse(decodeURIComponent(raw)) as Consent;
        return Date.now() - new Date(value.date).getTime() < MAX_AGE * 1000 ? value : null;
    } catch {
        return null;
    }
}

export function saveConsent(choice: Omit<Consent, 'date'>) {
    const value: Consent = { analytics: !!choice.analytics, marketing: !!choice.marketing, thirdParty: !!choice.thirdParty, date: new Date().toISOString() };
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
    window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

/** Opens the cookie settings again (footer link "Setări cookies"). */
export function openCookieSettings() {
    window.dispatchEvent(new CustomEvent(`${EVENT}-open`));
}

export function onConsentChange(fn: (c: Consent) => void) {
    const handler = (e: Event) => fn((e as CustomEvent<Consent>).detail);
    window.addEventListener(EVENT, handler);
    return () => window.removeEventListener(EVENT, handler);
}

export function onOpenSettings(fn: () => void) {
    window.addEventListener(`${EVENT}-open`, fn);
    return () => window.removeEventListener(`${EVENT}-open`, fn);
}
