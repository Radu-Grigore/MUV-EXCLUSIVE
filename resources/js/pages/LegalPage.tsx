import { legalDoc } from '@/lib/legal';
import Legal from './Legal';

export default function LegalPage({ slug }: { slug: string }) {
    const doc = legalDoc(slug);
    return doc ? <Legal doc={doc} /> : null;
}
