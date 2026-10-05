/** The nutrition programmes (page /nutritie). Text as supplied by MUV Exclusive. */
export type NutritionProgram = {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    duration: string;
    /** Short form for the card's label. */
    durationShort: string;
    /** For the week bar: active weeks (min–max) and the follow-up weeks after them. */
    weeks: { min: number; max: number; followUp: number };
    intro: string[];
    includes: string[];
    closing: string[];
};

export const nutritionIntro = {
    tagline: 'Mișcare, alimentație și echilibru — într-o abordare care ține cont de tine, nu doar de obiectivul tău.',
    paragraphs: [
        'Rezultatele care se păstrează în timp nu se construiesc doar în sala de antrenament. Alimentația influențează energia, recuperarea, compoziția corporală, starea de bine și felul în care corpul răspunde diferitelor etape ale vieții.',
        'La MUV Exclusive, nutriția completează mișcarea printr-o abordare personalizată, realistă și adaptată stilului tău de viață. Punem accent pe sănătatea feminină, echilibru, energie, masă musculară și obiceiuri sustenabile, fără diete extreme, reguli rigide sau soluții rapide.',
    ],
};

export const nutritionPrograms: NutritionProgram[] = [
    {
        id: 'muv-nutrition',
        name: 'MUV Nutrition',
        subtitle: 'Un program creat special pentru clientele MUV, pentru a pune bazele unei alimentații mai echilibrate, adaptate corpului tău, obiectivelor tale și stilului tău de viață.',
        price: 1000,
        duration: '4 săptămâni',
        durationShort: '4 săptămâni',
        weeks: { min: 4, max: 4, followUp: 2 },
        intro: [
            'Timp de 4 săptămâni lucrăm împreună pentru a identifica ce ai nevoie să schimbi și cum poți integra aceste schimbări într-un mod realist și sustenabil.',
            'Programul este potrivit dacă îți dorești mai multă energie, o alimentație mai bine organizată, susținerea antrenamentelor, scădere în greutate, îmbunătățirea compoziției corporale sau pur și simplu mai multă claritate în alegerile alimentare de zi cu zi.',
        ],
        includes: [
            '2 ședințe individuale de consiliere nutrițională – consultația inițială și consultația finală',
            'Evaluarea stilului de viață și a obiceiurilor alimentare',
            'Stabilirea obiectivelor și priorităților pentru cele 4 săptămâni',
            'Recomandări nutriționale personalizate și structurarea meselor',
            'Ghidare pentru aportul de proteine, hidratare, organizarea meselor și susținerea antrenamentelor',
            'Materiale educaționale adaptate nevoilor tale',
            'Fișă simplă de monitorizare a progresului',
            'Follow-up pe parcursul programului',
            'Recomandări pentru perioada următoare, astfel încât schimbările începute să poată fi continuate și după încheierea programului',
            'Plan alimentar adaptat nevoilor tale pentru 14 zile',
            'Bonus: 2 săptămâni de follow-up pe WhatsApp după încheierea programului',
        ],
        closing: [
            'Nu este o dietă rigidă și nici un plan construit în jurul perfecțiunii. Este un program de consiliere și educație nutrițională, gândit să îți ofere structură, claritate și instrumente pe care să le poți folosi în viața reală.',
            'Programul este disponibil exclusiv clientelor MUV Exclusive și poate fi achiziționat separat.',
        ],
    },
    {
        id: 'aprofundat',
        name: 'Program individual aprofundat',
        subtitle: 'Un proces personalizat, construit etapizat, pentru schimbări care să funcționeze nu doar câteva săptămâni, ci pe termen lung.',
        price: 2000,
        duration: '6–8 săptămâni + 2 săptămâni de follow-up incluse',
        durationShort: '6–8 săptămâni + follow-up',
        weeks: { min: 6, max: 8, followUp: 2 },
        intro: [
            'Acest program este potrivit atunci când îți dorești mai mult decât câteva recomandări punctuale și ai nevoie de timp pentru a înțelege, implementa și ajusta schimbările în funcție de modul în care răspunde corpul tău și de realitatea vieții de zi cu zi.',
            'Lucrăm împreună, de regulă, timp de 6–8 săptămâni, într-un proces structurat pe etape, urmat de încă 2 săptămâni de follow-up incluse, astfel încât să ai timp să consolidezi ceea ce ai construit și să continui cu cât mai multă autonomie.',
            'Pornim de la o evaluare detaliată a istoricului de sănătate, stilului de viață, alimentației, simptomelor și obiectivelor tale. De aici construim strategia și o ajustăm pe parcurs, pe baza progresului și a feedbackului tău.',
        ],
        includes: [
            'Evaluare inițială aprofundată și anamneză detaliată privind istoricul de sănătate și stilul de viață',
            'Analiza obiceiurilor alimentare și a contextului individual',
            'Analiza și interpretarea, din perspectivă nutrițională, a rezultatelor analizelor medicale disponibile, acolo unde este relevant',
            'Ghid orientativ privind analizele și investigațiile care pot fi utile de discutat cu medicul, în funcție de contextul individual',
            'Stabilirea strategiei și a obiectivelor pe etape',
            'Recomandări nutriționale complet personalizate',
            'Structurarea meselor și adaptarea lor la programul și stilul tău de viață',
            'Plan alimentar personalizat pentru 30 de zile, adaptat obiectivelor, nevoilor individuale și, acolo unde este relevant, etapei de viață și contextului hormonal',
            'Strategie pentru aportul de proteine, hidratare, recuperare și susținerea masei musculare',
            'Materiale educaționale și instrumente practice adaptate nevoilor tale',
            'Monitorizarea progresului și reevaluări periodice',
            'Consultații de follow-up de aproximativ 30 de minute, la 10–14 zile, pentru analizarea progresului și ajustarea strategiei',
            'Suport între consultații, în limitele stabilite la începutul programului',
            'Ajustări ale recomandărilor și planului alimentar acolo unde este necesar',
            'Etapă finală de consolidare, pentru ca schimbările implementate să poată deveni sustenabile și ușor de continuat pe termen lung',
            '2 săptămâni suplimentare de follow-up, după etapa activă a programului',
        ],
        closing: [
            'În cazul femeilor, strategia nutrițională ține cont și de etapa de viață în care se află fiecare clientă — de la perioada reproductivă și particularitățile ciclului menstrual până la perimenopauză și menopauză — astfel încât recomandările să fie cât mai relevante pentru contextul individual.',
            'Scopul nu este să urmezi perfect un plan alimentar, ci să înțelegi ce funcționează pentru corpul tău, să înveți să faci alegeri mai bune și să construim împreună un mod de alimentație pe care să îl poți menține.',
        ],
    },
];
