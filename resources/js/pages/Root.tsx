import { useEffect, useState } from 'react';
import { legalDoc } from '@/lib/legal';
import { currentPage, isStaticBuild } from '@/lib/routes';
import Home from './Home';
import Legal from './Legal';

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

    const doc = legalDoc(page);
    return doc ? <Legal doc={doc} /> : <Home />;
}
