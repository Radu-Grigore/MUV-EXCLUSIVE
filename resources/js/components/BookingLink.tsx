import { appStoreForDevice } from '@/lib/site';

/**
 * Props for a "book a class" link: on a phone it opens the SmartGym app's store page
 * (which offers "Open" when the app is installed); elsewhere it scrolls to the booking section.
 */
export function bookingLinkProps(): React.AnchorHTMLAttributes<HTMLAnchorElement> {
    const store = appStoreForDevice();
    return store ? { href: store, target: '_blank', rel: 'noopener noreferrer' } : { href: '#rezervari' };
}
