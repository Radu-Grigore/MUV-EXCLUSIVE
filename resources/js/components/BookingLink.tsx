import { appLaunchForDevice } from '@/lib/site';

/**
 * Props for a "book a class" link: on a phone it opens the SmartGym app (or its store page when the app
 * can't be opened); elsewhere it scrolls to the booking section.
 */
export function bookingLinkProps(): React.AnchorHTMLAttributes<HTMLAnchorElement> {
    return { href: appLaunchForDevice() ?? '#rezervari' };
}
