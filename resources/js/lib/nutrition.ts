/** The nutrition page (/nutritie). Text exactly as supplied by MUV Exclusive — do not reword. */
export type NutritionProgram = {
    id: string;
    name: string;
    subtitle: string;
    /** For the week bar: active weeks (min–max) and the follow-up weeks after them. */
    weeks: { min: number; max: number; followUp: number };
    intro: string[];
    includes: string[];
    closing: string[];
    duration: string;
    investment: string;
};

export const nutritionIntro = {
    tagline: 'Mișcare, alimentație și echilibru — într-o abordare care ține cont de tine, nu doar de obiectivul tău.',
    paragraphs: [
        'Rezultatele care se păstrează în timp nu se construiesc doar în sala de antrenament. Alimentația influențează energia, recuperarea, compoziția corporală, starea de bine și felul în care corpul răspunde diferitelor etape ale vieții.',
        'La MUV Exclusive, nutriția completează mișcarea printr-o abordare personalizată, realistă și adaptată stilului tău de viață.',
        'Fie că îți dorești să îți îmbunătățești obiceiurile alimentare, să îți susții mai bine antrenamentele, să îți optimizezi greutatea și compoziția corporală sau pur și simplu să înțelegi mai bine de ce are nevoie corpul tău, construim împreună o strategie pe care să o poți aplica în viața reală.',
        'Punem accent pe sănătatea feminină, echilibru, energie, masă musculară și obiceiuri sustenabile, fără diete extreme, reguli rigide sau soluții rapide.',
        'Pentru că schimbarea reală nu înseamnă să faci totul perfect. Înseamnă să găsești o formulă care funcționează pentru tine și pe care o poți păstra.',
    ],
    motto: 'Move. Nourish. Feel good.',
    note: 'Consultațiile și programele de nutriție se realizează pe bază de programare.',
};

export const nutritionPrograms: NutritionProgram[] = [
    {
        id: 'muv-nutrition',
        name: 'MUV Nutrition – 4 săptămâni',
        subtitle: 'Un program creat special pentru clientele MUV, pentru a pune bazele unei alimentații mai echilibrate, adaptate corpului tău, obiectivelor tale și stilului tău de viață.',
        weeks: { min: 4, max: 4, followUp: 2 },
        intro: [
            'Timp de 4 săptămâni lucrăm împreună pentru a identifica ce ai nevoie să schimbi și cum poți integra aceste schimbări într-un mod realist și sustenabil.',
            'Programul este potrivit dacă îți dorești mai multă energie, o alimentație mai bine organizată, susținerea antrenamentelor, scădere în greutate, îmbunătățirea compoziției corporale sau pur și simplu mai multă claritate în alegerile alimentare de zi cu zi.',
        ],
        includes: [
            '2 ședințe individuale de consiliere nutrițională – consultația inițială și consultația finală;',
            'evaluarea stilului de viață și a obiceiurilor alimentare;',
            'stabilirea obiectivelor și priorităților pentru cele 4 săptămâni;',
            'recomandări nutriționale personalizate și structurarea meselor;',
            'ghidare pentru aportul de proteine, hidratare, organizarea meselor și susținerea antrenamentelor;',
            'materiale educaționale adaptate nevoilor tale;',
            'fișă simplă de monitorizare a progresului;',
            'follow-up pe parcursul programului;',
            'recomandări pentru perioada următoare, astfel încât schimbările începute să poată fi continuate și după încheierea programului.',
            'plan alimentar adaptat nevoilor tale  pentru 14 zile.',
            'bonus 2 săptămâni de followup pe whatsapp după încheierea programului .',
        ],
        closing: [
            'Nu este o dietă rigidă și nici un plan construit în jurul perfecțiunii. Este un program de consiliere și educație nutrițională, gândit să îți ofere structură, claritate și instrumente pe care să le poți folosi în viața reală.',
            'Programul este disponibil exclusiv clientelor MUV Exclusive și poate fi achiziționat separat.',
        ],
        duration: '4 săptămâni',
        investment: '1.000 lei',
    },
    {
        id: 'aprofundat',
        name: 'Program individual aprofundat de nutriție',
        subtitle: 'Un proces personalizat, construit etapizat, pentru schimbări care să funcționeze nu doar câteva săptămâni, ci pe termen lung.',
        weeks: { min: 6, max: 8, followUp: 2 },
        intro: [
            'Acest program este potrivit atunci când îți dorești mai mult decât câteva recomandări punctuale și ai nevoie de timp pentru a înțelege, implementa și ajusta schimbările în funcție de modul în care răspunde corpul tău și de realitatea vieții de zi cu zi.',
            'Lucrăm împreună, de regulă, timp de 6–8 săptămâni, într-un proces structurat pe etape, urmat de încă 2 săptămâni de follow-up incluse, astfel încât să ai timp să consolidezi ceea ce ai construit și să continui cu cât mai multă autonomie.',
            'Pornim de la o evaluare detaliată a istoricului de sănătate, stilului de viață, alimentației, simptomelor și obiectivelor tale. De aici construim strategia și o ajustăm pe parcurs, pe baza progresului și a feedbackului tău.',
        ],
        includes: [
            'evaluare inițială aprofundată și anamneză detaliată privind istoricul de sănătate și stilul de viață;',
            'analiza obiceiurilor alimentare și a contextului individual;',
            'analiza și interpretarea, din perspectivă nutrițională, a rezultatelor analizelor medicale disponibile, acolo unde este relevant;',
            'ghid orientativ privind analizele și investigațiile care pot fi utile de discutat cu medicul, în funcție de contextul individual;',
            'stabilirea strategiei și a obiectivelor pe etape;',
            'recomandări nutriționale complet personalizate;',
            'structurarea meselor și adaptarea lor la programul și stilul tău de viață;',
            'plan alimentar personalizat pentru 30 de zile, adaptat obiectivelor, nevoilor individuale și, acolo unde este relevant, etapei de viață și contextului hormonal;',
            'strategie pentru aportul de proteine, hidratare, recuperare și susținerea masei musculare;',
            'materiale educaționale și instrumente practice adaptate nevoilor tale;',
            'monitorizarea progresului și reevaluări periodice;',
            'consultații de follow-up de aproximativ 30 de minute, la 10–14 zile, pentru analizarea progresului și ajustarea strategiei;',
            'suport între consultații, în limitele stabilite la începutul programului;',
            'ajustări ale recomandărilor și planului alimentar acolo unde este necesar;',
            'etapă finală de consolidare, pentru ca schimbările implementate să poată deveni sustenabile și ușor de continuat pe termen lung;',
            '2 săptămâni suplimentare de follow-up, după etapa activă a programului.',
        ],
        closing: [
            'În cazul femeilor, strategia nutrițională ține cont și de etapa de viață în care se află fiecare clientă — de la perioada reproductivă și particularitățile ciclului menstrual până la perimenopauză și menopauză — astfel încât recomandările să fie cât mai relevante pentru contextul individual.',
            'Scopul nu este să urmezi perfect un plan alimentar, ci să înțelegi ce funcționează pentru corpul tău, să înveți să faci alegeri mai bune și să construim împreună un mod de alimentație pe care să îl poți menține.',
        ],
        duration: '6–8 săptămâni + 2 săptămâni de follow-up incluse',
        investment: '2.000 lei',
    },
];
