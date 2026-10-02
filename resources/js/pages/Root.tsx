import { lazy, Suspense, useEffect, useState } from 'react';
import { currentPage, isStaticBuild, legalSlugs } from '@/lib/routes';
import Home from './Home';

// The legal pages (and their long texts) are only downloaded when one of them is opened.
const LegalPage = lazy(() => import('./LegalPage'));

/** Picks the page: the main one-page site, or one of the legal pages. */
export default function Root() {
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        // Only the static build switches pages in place (hash routes); Laravel serves each page itself.
        if (!isStaticBuild()) return;
        const onHash = () => setPage(currentPage());
        window.addEventListener('hashchange', onHash);
        return () => window.removeEventListener('hashchange', onHash);
    }, []);

    return legalSlugs.includes(page) ? (
        <Suspense fallback={null}>
            <LegalPage slug={page} />
        </Suspense>
    ) : (
        <Home />
    );
}
