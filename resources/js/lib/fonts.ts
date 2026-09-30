/** Satoshi comes from Fontshare; the stylesheet is added at start-up without blocking the first paint (DM Sans shows meanwhile). */
export function loadSatoshi() {
    if (document.querySelector('link[data-satoshi]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700&display=swap';
    link.dataset.satoshi = '';
    document.head.appendChild(link);
}
