/** The legal pages, one per document, linked from the footer. Text as supplied by MUV Exclusive. */
export type LegalDoc = {
    slug: string;
    title: string;
    updated: string;
    sections: { heading?: string; paragraphs: string[] }[];
};

export const legalDocs: LegalDoc[] = [
    {
        slug: 'termeni-si-conditii',
        title: 'Termeni și condiții',
        updated: '30 septembrie 2026',
        sections: [
            {
                heading: 'Informații generale',
                paragraphs: [
                    'Site-ul muvexclusive.ro este administrat de SC AMD Energy Studio SRL, cu sediul social în Ploiești, str. Cameliei nr. 18, bl. 25, sc. A, ap. 7, înregistrată la Registrul Comerțului sub nr. J2026053696003, CUI RO55562057, reprezentată prin Ana Maria Dumitrescu, în calitate de Administrator. Societatea operează sala de sport Muv Exclusive. Contact: Muvexclusive@yahoo.com, +40 726 697 749.',
                    'Prin accesarea site-ului și utilizarea serviciilor Muv Exclusive, sunteți de acord cu acești Termeni și condiții. Dacă nu sunteți de acord, vă rugăm să nu utilizați site-ul.',
                ],
            },
            {
                heading: 'Serviciile oferite',
                paragraphs: [
                    'Muv Exclusive oferă acces la spațiul de antrenament, clase de grup, antrenamente personale și alte servicii descrise pe site. Programul, tarifele și tipurile de abonament sunt afișate pe site și la recepție. Muv Exclusive își rezervă dreptul de a modifica programul, orarul claselor și tarifele, cu informarea prealabilă a clienților. Modificările de preț nu afectează abonamentele deja plătite.',
                ],
            },
            {
                heading: 'Abonamente și plată',
                paragraphs: [
                    'Abonamentele sunt personale și netransmisibile. Accesul în sală se face pe baza unui abonament valabil. Plata se face la recepție sau prin metodele de plată comunicate de Muv Exclusive. Condițiile de valabilitate și de suspendare pentru fiecare tip de abonament sunt comunicate clientului la momentul cumpărării.',
                ],
            },
            {
                heading: 'Rezervarea claselor prin SmartGym',
                paragraphs: [
                    'Rezervările la clasele de grup se fac prin aplicația SmartGym, folosind codul sălii 3490. Numărul de locuri la fiecare clasă este limitat. Dacă nu mai puteți participa, vă rugăm să anulați rezervarea din aplicație cât mai din timp, pentru a elibera locul altor membri.',
                    'Aplicația SmartGym este furnizată de un terț, iar utilizarea ei este supusă și termenilor și politicii de confidențialitate proprii ale aplicației.',
                ],
            },
            {
                heading: 'Starea de sănătate și răspunderea',
                paragraphs: [
                    'Clientul declară că starea sa de sănătate îi permite efectuarea de exerciții fizice. Recomandăm consultarea unui medic înainte de începerea unui program de antrenament. Clientul are obligația de a anunța instructorul despre orice afecțiune sau accidentare care ar putea influența antrenamentul.',
                    'Muv Exclusive nu răspunde pentru accidentările produse prin nerespectarea regulamentului intern, a indicațiilor instructorilor sau prin folosirea incorectă a aparatelor. Muv Exclusive nu răspunde pentru bunurile lăsate nesupravegheate în vestiare sau în incintă.',
                ],
            },
            {
                heading: 'Regulamentul sălii',
                paragraphs: [
                    'Clienții au obligația să respecte regulamentul intern afișat în sală, inclusiv: echipament și încălțăminte adecvate, folosirea prosopului pe aparate, returnarea greutăților la locul lor, respect față de ceilalți membri și față de personal. Muv Exclusive poate suspenda sau anula accesul clienților care încalcă grav regulamentul, fără returnarea contravalorii abonamentului.',
                ],
            },
            {
                heading: 'Minori',
                paragraphs: ['Persoanele sub 18 ani au acces în sală doar cu acordul scris al părintelui sau al tutorelui legal.'],
            },
            {
                heading: 'Proprietate intelectuală',
                paragraphs: [
                    'Conținutul site-ului (texte, imagini, logo, grafică) aparține Muv Exclusive sau este folosit cu acordul titularilor. Copierea sau utilizarea lui fără acord scris este interzisă.',
                ],
            },
            {
                heading: 'Prelucrarea datelor personale',
                paragraphs: ['Datele personale sunt prelucrate conform Politicii de confidențialitate, disponibilă pe site.'],
            },
            {
                heading: 'Soluționarea litigiilor',
                paragraphs: [
                    'Orice neînțelegere se rezolvă pe cale amiabilă, contactându-ne la Muvexclusive@yahoo.com. Dacă nu se ajunge la o soluție, consumatorii se pot adresa Autorității Naționale pentru Protecția Consumatorilor (ANPC), inclusiv prin procedura de soluționare alternativă a litigiilor (SAL): https://anpc.ro/ce-este-sal/, sau instanțelor competente din România.',
                ],
            },
            {
                heading: 'Modificări',
                paragraphs: ['Muv Exclusive poate actualiza acești termeni. Versiunea în vigoare este cea publicată pe site.'],
            },
        ],
    },
    {
        slug: 'politica-de-confidentialitate',
        title: 'Politica de confidențialitate',
        updated: '30 septembrie 2026',
        sections: [
            {
                heading: 'Cine suntem',
                paragraphs: [
                    'Sala de sport Muv Exclusive este operată de SC AMD Energy Studio SRL, CUI RO55562057, cu sediul social în Ploiești, str. Cameliei nr. 18, bl. 25, sc. A, ap. 7, care este operatorul datelor dumneavoastră personale. Pentru orice întrebare legată de datele personale ne puteți scrie la Muvexclusive@yahoo.com.',
                ],
            },
            {
                heading: 'Ce date colectăm și de ce',
                paragraphs: [
                    'Nume, telefon și email: le folosim pentru încheierea și gestionarea abonamentului și pentru comunicări despre serviciile noastre. Temeiul legal este executarea contractului.',
                    'Date de facturare: le folosim pentru emiterea facturilor și pentru evidența contabilă. Temeiul legal este o obligație legală.',
                    'Datele trimise prin formularul de contact, telefon sau email: le folosim pentru a răspunde solicitărilor dumneavoastră. Temeiul legal este interesul nostru legitim sau demersurile făcute la cererea dumneavoastră înainte de încheierea unui contract.',
                    'Date de navigare (cookies): le folosim pentru funcționarea și îmbunătățirea site-ului, conform Politicii de cookies. Cookie-urile care nu sunt strict necesare se folosesc doar cu acordul dumneavoastră.',
                ],
            },
            {
                heading: 'Cui transmitem datele',
                paragraphs: [
                    'Datele pot fi transmise doar către: firma de contabilitate, furnizorul de găzduire a site-ului, procesatorii de plăți, furnizorul aplicației de rezervări SmartGym și autoritățile publice, atunci când legea o cere. Nu vindem datele personale.',
                ],
            },
            {
                heading: 'Cât timp păstrăm datele',
                paragraphs: [
                    'Păstrăm datele pe durata abonamentului și ulterior doar atât cât este necesar pentru scopurile de mai sus sau cât ne obligă legea. Documentele contabile se păstrează conform legislației financiar-contabile.',
                ],
            },
            {
                heading: 'Drepturile dumneavoastră',
                paragraphs: [
                    'Aveți dreptul de acces, rectificare, ștergere, restricționare a prelucrării, portabilitate, opoziție și dreptul de a vă retrage oricând consimțământul. Pentru exercitarea lor, scrieți-ne la Muvexclusive@yahoo.com; vă răspundem în maximum 30 de zile.',
                    'Aveți și dreptul de a depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), https://www.dataprotection.ro.',
                ],
            },
            {
                heading: 'Securitatea datelor',
                paragraphs: [
                    'Luăm măsuri tehnice și organizatorice rezonabile pentru protejarea datelor: acces limitat, parole și conexiune securizată (HTTPS).',
                ],
            },
            {
                heading: 'Modificări',
                paragraphs: ['Muv Exclusive poate actualiza această politică. Versiunea în vigoare este cea publicată pe site.'],
            },
        ],
    },
    {
        slug: 'politica-de-cookies',
        title: 'Politica de cookies',
        updated: '30 septembrie 2026',
        sections: [
            {
                heading: 'Ce sunt cookie-urile',
                paragraphs: [
                    'Cookie-urile sunt fișiere mici salvate în browserul dumneavoastră când vizitați muvexclusive.ro. Ele ajută site-ul să funcționeze corect și ne arată cum este folosit, ca să îl putem îmbunătăți.',
                ],
            },
            {
                heading: 'Ce cookie-uri folosim',
                paragraphs: [
                    'Cookie-uri strict necesare: asigură funcționarea site-ului și salvează preferințele dumneavoastră privind cookie-urile. Nu necesită acord.',
                    'Cookie-uri de analiză: ne arată câți vizitatori are site-ul și ce pagini sunt vizitate. Se folosesc doar cu acordul dumneavoastră.',
                    'Cookie-uri de marketing: ne ajută să afișăm reclame relevante și să măsurăm campaniile. Se folosesc doar cu acordul dumneavoastră.',
                    'Cookie-uri de la terți: pot fi plasate de servicii externe integrate în site, cum ar fi hărți sau clipuri video. Se folosesc doar cu acordul dumneavoastră.',
                ],
            },
            {
                heading: 'Cum vă dați sau retrageți acordul',
                paragraphs: [
                    'La prima vizită, un banner vă permite să acceptați, să refuzați sau să alegeți categoriile de cookie-uri. Cookie-urile care nu sunt strict necesare se încarcă doar după acordul dumneavoastră. Vă puteți schimba oricând opțiunea din setările de cookies ale site-ului sau puteți șterge cookie-urile din setările browserului.',
                ],
            },
            {
                heading: 'Contact',
                paragraphs: ['Pentru întrebări ne puteți scrie la Muvexclusive@yahoo.com.'],
            },
        ],
    },
    {
        slug: 'politica-de-anulare-si-rambursare',
        title: 'Politica de anulare și rambursare',
        updated: '30 septembrie 2026',
        sections: [
            {
                heading: 'Dreptul de retragere pentru cumpărările online',
                paragraphs: [
                    'Conform OUG 34/2014, abonamentele Muv Exclusive cumpărate online pot fi anulate în termen de 14 zile de la cumpărare, fără a indica un motiv. Pentru anulare, trimiteți o solicitare la Muvexclusive@yahoo.com cu numele, data cumpărării și tipul abonamentului.',
                    'Dacă ați cerut activarea abonamentului înainte de expirarea celor 14 zile și l-ați folosit, veți primi înapoi suma proporțională cu perioada nefolosită. Rambursarea se face în maximum 14 zile de la primirea solicitării, prin aceeași metodă de plată folosită la cumpărare.',
                ],
            },
            {
                heading: 'După cele 14 zile',
                paragraphs: [
                    'Abonamentele nu se rambursează după expirarea termenului de retragere, cu excepția situațiilor prevăzute de lege sau a celor analizate și acceptate de Muv Exclusive, pentru motive justificate.',
                ],
            },
            {
                heading: 'Anularea claselor',
                paragraphs: [
                    'Rezervările la clase se anulează din aplicația SmartGym. Dacă Muv Exclusive anulează o clasă, membrii cu rezervare sunt anunțați prin aplicație.',
                ],
            },
        ],
    },
];

export function legalDoc(slug: string): LegalDoc | undefined {
    return legalDocs.find((d) => d.slug === slug);
}
