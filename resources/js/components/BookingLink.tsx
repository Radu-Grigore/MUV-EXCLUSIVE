import { androidAppIntent, appStoreForDevice, smartgym } from '@/lib/site';

/**
 * Android: try to open the installed SmartGym app; if the page is still in front 1.5 s later (app not
 * installed, or a browser that ignores app links), go to Google Play instead.
 */
export function openAndroidApp(e: React.MouseEvent) {
    // Inside a frame (a preview tool) or an in-app browser that can't leave the page: just open the store.
    if (window.top !== window.self) return;
    e.preventDefault();
    let left = false;
    const onHide = () => document.hidden && (left = true);
    document.addEventListener('visibilitychange', onHide);
    window.location.href = androidAppIntent;
    window.setTimeout(() => {
        document.removeEventListener('visibilitychange', onHide);
        if (!left && !document.hidden) window.location.href = smartgym.googlePlay;
    }, 1500);
}

/**
 * Props for a "book a class" link. Phones get the store page for their system in a new tab (the App Store and
 * Google Play show "Open" when SmartGym is installed); on Android a tap first tries to open the app itself.
 * Computers scroll to the booking section.
 */
export function bookingLinkProps(): React.AnchorHTMLAttributes<HTMLAnchorElement> {
    const store = appStoreForDevice();
    if (!store) return { href: '#rezervari' };
    return { href: store, target: '_blank', rel: 'noopener noreferrer', onClick: store === smartgym.googlePlay ? openAndroidApp : undefined };
}
