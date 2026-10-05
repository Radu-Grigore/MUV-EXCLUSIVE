import { legalDoc } from '@/lib/legal';
import { infoPage } from '@/lib/pages';
import Company from './Company';
import Info from './Info';
import Legal from './Legal';
import Nutrition from './Nutrition';

/** The secondary pages: legal documents and content pages such as Clase de Pilates. */
export default function LegalPage({ slug }: { slug: string }) {
    const doc = legalDoc(slug);
    if (doc) return <Legal doc={doc} />;
    if (slug === 'date-de-identificare') return <Company />;
    if (slug === 'nutritie') return <Nutrition />;
    const page = infoPage(slug);
    return page ? <Info page={page} /> : null;
}
