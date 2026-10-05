/** Stand-alone content pages (beside the legal ones), linked from the footer. */
export type InfoPage = {
    slug: string;
    title: string;
    eyebrow: string;
    /** The class whose poster and timetable slots the page shows. */
    classId?: string;
    tagline: string;
    paragraphs: string[];
};

export const infoPages: InfoPage[] = [
    {
        slug: 'clase-de-pilates',
        title: 'Clase de Pilates',
        eyebrow: 'Clase',
        classId: 'pilates',
        tagline: 'Mișcare conștientă, forță, postură și un corp care să te susțină cât mai bine în timp.',
        paragraphs: [
            'Pilates este mai mult decât un antrenament. Este o metodă de mișcare care dezvoltă controlul, stabilitatea, mobilitatea și forța, ajutând corpul să funcționeze mai eficient și mai echilibrat.',
            'Prin exerciții executate corect și adaptate nivelului fiecărei participante, lucrăm pentru o postură mai bună, musculatură mai puternică, articulații mai bine susținute și o mai bună conștientizare a propriului corp.',
            'Pilates poate fi un sprijin valoros atât pentru menținerea sănătății sistemului muscular și osteo-articular, cât și pentru revenirea treptată la mișcare după perioade de sedentarism, disconfort sau scădere a mobilității.',
            'La MUV Exclusive, clasele sunt gândite astfel încât mișcarea să fie sigură, controlată și eficientă, fără presiunea de a ține pasul cu ceilalți și fără ideea că mai intens înseamnă întotdeauna mai bine.',
            'Pentru noi, Pilates înseamnă și longevitate: să construim astăzi forța, mobilitatea și stabilitatea de care corpul nostru va avea nevoie și peste ani.',
        ],
    },
];

export function infoPage(slug: string): InfoPage | undefined {
    return infoPages.find((p) => p.slug === slug);
}
