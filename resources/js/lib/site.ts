export const site = {
  name: "MUV Exclusive",
  tagline: "Boutique Fitness Studio · Women Only",
  phone: "0726 697 749",
  phoneHref: "tel:+40726697749",
  whatsapp: "https://wa.me/40726697749",
  facebook: "https://www.facebook.com/share/1HgyDhRNjD/?mibextid=wwXIfr",
  email: "Muvexclusive@yahoo.com",
  phoneIntl: "+40 726 697 749",
  instagram: "https://www.instagram.com/muvexclusive2026",
  instagramHandle: "@muvexclusive2026",
  address: "Cartier Albert, MRS Village, clădirea M, parter, Aleea Smaraldului nr. 11",
  addressShort: "MRS Village, clădirea M, parter",
  street: "Aleea Smaraldului nr. 11",
  city: "Ploiești",
  mapsQuery: "Aleea Smaraldului 11, MRS Village, Ploiești",
  openingDate: "2026-11-01T09:00:00+02:00",
  openingLabel: "01.11.2026",
};

/** The company that runs the studio (shown in the footer and the legal pages). */
export const company = {
  name: "SC AMD Energy Studio SRL",
  cui: "RO55562057",
  regCom: "J2026053696003",
  seat: "Ploiești, str. Cameliei nr. 18, bl. 25, sc. A, ap. 7",
};

/** Class bookings go through the SmartGym member app. */
export const smartgym = {
  gymCode: "3490",
  appStore: "https://apps.apple.com/ro/app/smartgym-romania/id6760034259",
  googlePlay: "https://play.google.com/store/apps/details?id=com.gymapp.ro",
  // The link behind the QR code on the SmartGym flyer; it sends each phone to its own store.
  qr: "https://smartgym.ro/app",
  androidPackage: "com.gymapp.ro",
};

/** Android link that launches the SmartGym app (Chrome falls back to Google Play when it is not installed). */
export const androidAppIntent = `intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=${smartgym.androidPackage};S.browser_fallback_url=${encodeURIComponent(smartgym.googlePlay)};end`;

/** The store page for this device: App Store on iPhone/iPad, Google Play on Android, null elsewhere. */
export function appStoreForDevice(): string | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return smartgym.appStore;
  if (/Android/i.test(ua)) return smartgym.googlePlay;
  return null;
}

/** Unlimited memberships: the same plan for one or three months. */
export type Membership = {
  id: string;
  name: string;
  tagline: string;
  month: number;
  quarter: number;
  perks: string[];
  featured?: boolean;
};

export const memberships: Membership[] = [
  {
    id: "unlimited",
    name: "Unlimited",
    tagline: "Clase nelimitate",
    month: 349,
    quarter: 899,
    perks: [
      "Acces nelimitat la toate clasele de grup",
      "Body Sculpt, Abs & Glutes, Aero Dance, Functional Shape, Tabata, Boot Camp, Pilates, Functional Step, Khai Bo",
      "Rezervări rapide în aplicația SmartGym",
    ],
  },
  {
    id: "unlimited-kids",
    name: "Unlimited + Kids Corner",
    tagline: "Pentru mămici",
    month: 399,
    quarter: 999,
    perks: [
      "Tot ce include abonamentul Unlimited",
      "Acces la Kids Corner pentru cei mici",
      "Te antrenezi liniștită cât cei mici se joacă",
    ],
    featured: true,
  },
];

/** One-off options shown next to the memberships. */
export const extraPlans = [
  { id: "day-pass", name: "Day Pass", tagline: "Acces pentru o zi", price: 49, period: "o zi", note: "Perfect ca să încerci oricare dintre clase." },
  {
    id: "personal-training",
    name: "Personal Training",
    tagline: "Antrenament 1 la 1",
    price: 249,
    period: "abonament",
    note: "Antrenorul se achită separat, în funcție de numărul de ore.",
  },
];

/** The opening day: demo classes booked through the app. */
export const openingDay = [
  { value: 5, label: "ore demo" },
  { value: 5, label: "clase de aerobic diferite" },
  { value: 90, label: "locuri disponibile" },
];

export type Slot = { time: string; name: string; by: "Ana" | "Cristina" | "Irina" | "Valy" };

/** Weekly timetable for November 2026 (Monday first). Booking is through the SmartGym app. */
export const timetable: { day: string; short: string; slots: Slot[] }[] = [
  { day: "Luni", short: "Lu", slots: [
    { time: "08:30–09:30", name: "Abs & Glutes", by: "Valy" },
    { time: "17:30–18:20", name: "Pilates", by: "Irina" },
    { time: "18:30–19:20", name: "Khai Bo", by: "Cristina" },
    { time: "19:30–20:20", name: "Aero Dance", by: "Cristina" },
  ] },
  { day: "Marți", short: "Ma", slots: [
    { time: "08:30–09:30", name: "Pilates", by: "Irina" },
    { time: "17:30–18:20", name: "Functional Shape", by: "Cristina" },
    { time: "18:30–19:20", name: "Abs & Glutes", by: "Ana" },
    { time: "19:30–20:20", name: "Boot Camp", by: "Cristina" },
  ] },
  { day: "Miercuri", short: "Mi", slots: [
    { time: "08:30–09:30", name: "Tabata", by: "Ana" },
    { time: "17:30–18:20", name: "Pilates", by: "Irina" },
    { time: "18:30–19:20", name: "Aero Dance", by: "Cristina" },
    { time: "19:30–20:20", name: "Functional Step", by: "Cristina" },
  ] },
  { day: "Joi", short: "Jo", slots: [
    { time: "08:30–09:30", name: "Pilates", by: "Irina" },
    { time: "17:30–18:20", name: "Khai Bo", by: "Cristina" },
    { time: "18:30–19:20", name: "Abs & Glutes", by: "Ana" },
    { time: "19:30–20:20", name: "Functional Shape", by: "Cristina" },
  ] },
  { day: "Vineri", short: "Vi", slots: [
    { time: "08:30–09:30", name: "Body Sculpt", by: "Ana" },
    { time: "17:30–18:20", name: "Aero Dance", by: "Cristina" },
    { time: "18:30–19:20", name: "Boot Camp", by: "Cristina" },
  ] },
  { day: "Sâmbătă", short: "Sâ", slots: [{ time: "10:00–11:00", name: "Total Body", by: "Valy" }] },
  { day: "Duminică", short: "Du", slots: [] },
];

/** The opening day's timetable (01.11.2026). */
export const openingSchedule = [
  { time: "09:30–10:30", name: "Full Body", by: "Valy" },
  { time: "11:00–12:00", name: "Tabata", by: "Ana" },
  { time: "12:30–13:30", name: "Aero Dance", by: "Cristina" },
  { time: "16:30–17:30", name: "Khai Bo", by: "Cristina" },
  { time: "18:00–19:30", name: "Pilates & Nutriție", by: "Irina" },
];

export const navLinks = [
  { href: "#despre", label: "Despre" },
  { href: "#clase", label: "Clase" },
  { href: "#echipa", label: "Echipa" },
  { href: "#program", label: "Program" },
  { href: "#kids", label: "Kids Corner" },
  { href: "#abonamente", label: "Abonamente" },
  { href: "#servicii", label: "Servicii" },
  { href: "#rezervari", label: "Rezervări" },
  { href: "#contact", label: "Contact" },
];

export type IconName =
  | "fist"
  | "kettlebell"
  | "step"
  | "dumbbell"
  | "lotus"
  | "flame"
  | "person"
  | "heart"
  | "people"
  | "leaf"
  | "bolt"
  | "home"
  | "bear"
  | "play";

export type FitnessClass = {
  id: string;
  name: string;
  keywords: string[];
  description: string;
  benefits: string[];
  icon: IconName;
  accent: string;
  script?: string;
  /** Optional longer presentation, shown in the class panel ("Citește mai mult"). */
  tagline?: string;
  story?: string[];
  /** Slug of the class's own page, when it has one. */
  page?: string;
};

export const classes: FitnessClass[] = [
  {
    id: "personal-training",
    name: "Personal Training",
    keywords: ["Antrenament 1 la 1", "Personalizat", "Rezultate"],
    description:
      "Antrenamente personalizate, adaptate obiectivelor tale, pentru rezultate vizibile, o formă fizică mai bună și mai multă încredere în tine.",
    benefits: ["Crește forța", "Îmbunătățește condiția fizică", "Corectează postura", "Rezultate personalizate"],
    icon: "person",
    accent: "#b98d5f",
    script: "Stronger, Faster, You",
  },
  {
    id: "body-sculpt",
    name: "Body Sculpt",
    keywords: ["Tonifiere", "Greutăți", "Rezultate vizibile"],
    description:
      "Un antrenament complet care tonifică și modelează întregul corp, folosind greutăți și exerciții eficiente pentru rezultate vizibile.",
    benefits: [
      "Îmbunătățește rezistența cardiovasculară",
      "Ajută la arderea caloriilor",
      "Tonifică și modelează mușchii întregului corp",
      "Îți oferă energie și stare de bine",
    ],
    icon: "kettlebell",
    accent: "#c9a36a",
    script: "More than fitness",
  },
  {
    id: "abs-glutes",
    name: "Abs & Glutes",
    keywords: ["Abdomen", "Fesieri", "Postură"],
    description:
      "Un antrenament eficient care activează și întărește mușchii abdominali și fesieri, pentru un corp tonifiat, puternic și armonios.",
    benefits: [
      "Definește zona abdominală",
      "Tonifică și ridică fesele",
      "Îți îmbunătățește postura și stabilitatea",
      "Îți oferă mai multă forță și încredere",
    ],
    icon: "flame",
    accent: "#c58a6a",
    script: "More than fitness",
  },
  {
    id: "aero-dance",
    name: "Aero Dance",
    keywords: ["Dans", "Ritm", "Energie"],
    description:
      "Un antrenament energic, pe ritm de muzică, care combină pași de aerobic și mișcări de dans, pentru arderea caloriilor, îmbunătățirea coordonării și o stare de bine la fiecare clasă.",
    benefits: ["Arde calorii", "Îmbunătățește coordonarea", "Crește energia", "Îți dă o stare de bine"],
    icon: "bolt",
    accent: "#d98a8a",
    script: "Stronger, Faster, You",
  },
  {
    id: "functional-shape",
    name: "Functional Shape",
    keywords: ["Forță", "Tonus", "Mobilitate"],
    description:
      "Un antrenament complet, care combină exercițiile funcționale cu forța, pentru un corp mai puternic, mai tonifiat și o formă fizică echilibrată.",
    benefits: ["Tonifiază și modelează musculatura", "Crește condiția fizică", "Arde calorii", "Îmbunătățește mobilitatea și postura"],
    icon: "dumbbell",
    accent: "#e39a55",
    script: "Stronger, Faster, You",
  },
  {
    id: "tabata",
    name: "Tabata",
    keywords: ["Ardere grăsimi", "Cardio intens", "Rezultate rapide"],
    description:
      "Un antrenament intens, pe intervale, care îmbină exerciții cardio și de forță, pentru arderea rapidă a caloriilor, creșterea rezistenței și un corp mai tonifiat.",
    benefits: ["Arde calorii", "Crește rezistența", "Îmbunătățește condiția fizică", "Tonifiază tot corpul"],
    icon: "flame",
    accent: "#d0a04a",
    script: "Stronger, Faster, You",
  },
  {
    id: "bootcamp",
    name: "Boot Camp",
    keywords: ["Cardio & forță", "Intervale", "Energie"],
    description:
      "Un antrenament intens și dinamic care combină exercițiile cardio și de forță, pentru un corp mai puternic, mai rezistent și plin de energie. Lucrezi pe intervale: 1 minut de exerciții intense, 20 de secunde pauză.",
    benefits: ["Arde caloriile și îmbunătățește rezistența", "Activează toți mușchii corpului", "Crește forța și condiția fizică", "Îți oferă energie și motivație"],
    icon: "bolt",
    accent: "#e0b45a",
    script: "More than fitness",
  },
  {
    id: "pilates",
    name: "Pilates Clasic",
    keywords: ["Postură", "Forță", "Mobilitate"],
    description:
      "Pilates este mai mult decât un antrenament: o metodă de mișcare care dezvoltă controlul, stabilitatea, mobilitatea și forța, ajutând corpul să funcționeze mai eficient și mai echilibrat.",
    benefits: ["Postură mai bună", "Musculatură mai puternică", "Articulații mai bine susținute", "Conștientizarea corpului"],
    tagline: "Mișcare conștientă, forță, postură și un corp care să te susțină cât mai bine în timp.",
    page: "clase-de-pilates",
    icon: "lotus",
    accent: "#9a7bb0",
    script: "Stronger You",
  },
  {
    id: "functional-step",
    name: "Functional Step",
    keywords: ["Step", "Funcțional", "Cardio"],
    description:
      "Un antrenament complet și versatil care combină exercițiile pe step cu mișcări funcționale, pentru un corp tonifiat, puternic și multe calorii arse.",
    benefits: [
      "Îmbunătățește rezistența cardiovasculară",
      "Ajută la arderea caloriilor",
      "Tonifică picioarele și fesierii",
      "Îți oferă energie și stare de bine",
    ],
    icon: "step",
    accent: "#8fa06a",
    script: "More than fitness",
  },
  {
    id: "khai-bo",
    name: "Khai Bo",
    keywords: ["Energie", "Disciplină", "Încredere"],
    description:
      "Un antrenament intens și dinamic, care combină tehnici din kickboxing, aerobic și exerciții funcționale, pentru un corp mai puternic, mai tonifiat și o stare de bine garantată.",
    benefits: ["Arde calorii", "Tonifiază tot corpul", "Crește rezistența", "Eliberează stresul"],
    icon: "fist",
    accent: "#c9a25e",
    script: "Stronger, Faster, You",
  },
];

/** The instructors (section "Echipa"). A bio is a list of paragraphs; an array inside it is a bullet list. */
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  extra?: string;
  intro: string;
  /** `card`: a lighter copy sized for the card; the dialog shows `src`. */
  photos: { src: string; card?: string; position?: string }[];
  classes: string[];
  schedule?: string[];
  bio: (string | string[])[];
  closing?: string;
};

export const team: TeamMember[] = [
  {
    id: "cristina-dom",
    name: "Cristina Dom",
    role: "Instructor Fitness & Aerobic, Personal Trainer",
    intro: "Cu peste 20 de ani de experiență în dans, balet, coregrafie și fitness, Cristina aduce în fiecare antrenament mișcare, tehnică, energie și expresivitate.",
    photos: [
      { src: "/images/echipa/cristina-dom.jpg", card: "/images/echipa/cristina-dom-card.webp", position: "50% 50%" },
      { src: "/images/echipa/cristina-dom-2.jpg" },
      { src: "/images/echipa/cristina-dom-3.jpg" },
    ],
    classes: ["Khai Bo", "Aero Dance", "Functional Shape", "Functional Step", "Boot Camp", "Personal Training"],
    bio: [
      "Cu peste 20 de ani de experiență în dans, balet, coregrafie și fitness, Cristina aduce în fiecare antrenament o combinație armonioasă de mișcare, tehnică, energie și expresivitate.",
      "Experiența sa îndelungată în dans și balet i-a dezvoltat o atenție deosebită pentru postură, coordonare, mobilitate și controlul corpului, iar pregătirea în fitness și aerobic completează această abordare prin antrenamente dinamice și eficiente.",
      "Pentru Cristina, mișcarea înseamnă mai mult decât un antrenament: înseamnă energie, încredere și bucuria de a descoperi tot ceea ce poate face corpul tău. Clasele sale îmbină ritmul, exercițiile cardio, forța și coordonarea și pot fi adaptate diferitelor niveluri de pregătire.",
      "În cadrul MUV Exclusive, Cristina va susține următoarele clase:",
      [
        "Khai Bo – energie, cardio și combinații inspirate din artele marțiale",
        "Aero Dance – dans, ritm și un antrenament cardio care te face să uiți că faci sport",
        "Functional Shape – exerciții funcționale pentru tonifiere, forță și mobilitate",
        "Functional Step – cardio, coordonare și energie pe muzică",
        "Boot Camp – cardio și forță pe intervale, pentru un corp mai puternic și mai rezistent",
      ],
      "În plus, în calitate de Personal Trainer, Cristina va lucra individual cu femeile care își doresc un program personalizat, adaptat obiectivelor și nivelului lor de pregătire.",
      "La MUV Exclusive credem că sportul trebuie să fie eficient, dar și o experiență la care să vii cu drag. Alături de Cristina, fiecare antrenament vine cu energie, ritm și provocarea de a deveni puțin mai puternică de la o clasă la alta.",
      "Vino să descoperi clasele Cristinei la MUV Exclusive și găsește forma de mișcare care te face să te simți bine în corpul tău.",
    ],
  },
  {
    id: "ana-voican",
    name: "Ana Voican",
    role: "Instructor Fitness, Functional & Weight training",
    extra: "Fondator Strong & Fit Factory (online workout sessions)",
    intro: "De peste 10 ani, Ana este preocupată constant de mișcare și de construirea unui stil de viață sănătos, având formare în cadrul World Class.",
    photos: [{ src: "/images/echipa/ana-voican.jpg", card: "/images/echipa/ana-voican-card.webp", position: "50% 20%" }, { src: "/images/echipa/ana-voican-2.jpg" }],
    classes: ["HIIT & Tabata", "Abs & Glutes", "Body Sculpt"],
    schedule: ["Marți și joi: 18:30–19:20", "Miercuri și vineri: 08:30–09:30"],
    bio: [
      "De peste 10 ani, Ana este preocupată constant de mișcare și de construirea unui stil de viață sănătos, având formare în cadrul World Class.",
      "Este pasionată de alergare, maratoane, ciclism și experiențe sportive care ne provoacă să ne depășim limitele. Pentru Ana, sportul este o formă de igienă personală: un obicei esențial pentru sănătate, energie și echilibru. Motivația ne ajută să începem, însă disciplina și consecvența sunt cele care ne duc mai departe.",
      "În antrenamentele sale combină exercițiile funcționale, cardio și de forță, urmărind tonifierea corpului, dezvoltarea masei musculare și îmbunătățirea rezistenței cardio-respiratorii. Clasele sunt dinamice, eficiente și adaptabile diferitelor niveluri de pregătire, astfel încât fiecare participantă să poată progresa în propriul ritm.",
      "În cadrul MUV Exclusive, Ana va susține clasele de HIIT & Tabata, Abs & Glutes, Body Sculpt:",
      ["Marți și joi: 18:30–19:20", "Miercuri și vineri: 08:30–09:30"],
      "Dincolo de antrenamentele din sală, alături de Ana dezvoltăm experiențe și retreaturi dedicate femeilor, în care mișcarea se îmbină cu relaxarea, timpul petrecut în natură și conectarea într-o comunitate autentică.",
      "Vino să lucrăm împreună pentru un corp mai puternic, mai multă energie și un stil de viață pe care să îl poți susține pe termen lung.",
    ],
    closing: "Make it happen!",
  },
  {
    id: "irina-visan",
    name: "Irina Vișan",
    role: "Instructor Pilates & Nutriționist Integrativ",
    intro: "Cred într-o abordare a sănătății feminine în care mișcarea și alimentația nu funcționează separat, ci se completează.",
    photos: [
      { src: "/images/echipa/irina-visan.jpg", card: "/images/echipa/irina-visan-card.webp", position: "60% 15%" },
      { src: "/images/echipa/irina-visan-2.jpg" },
      { src: "/images/echipa/irina-visan-3.jpg" },
    ],
    classes: ["Pilates", "Consiliere nutrițională", "Workshopuri"],
    bio: [
      "Cred într-o abordare a sănătății feminine în care mișcarea și alimentația nu funcționează separat, ci se completează.",
      "Sunt instructor Pilates și nutritionist integrativ, cu peste 10 ani de experiență în ambele domenii. În activitatea mea lucrez în special cu femei care își doresc să își îmbunătățească starea de sănătate, compoziția corporală, nivelul de energie și relația cu propriul corp, fără soluții extreme și fără reguli imposibil de susținut pe termen lung.",
      "În Pilates pun accent pe mișcare conștientă, control, postură, mobilitate și forță, cu respect pentru particularitățile fiecărui corp. Îmi doresc ca femeile cu care lucrez să nu facă pur și simplu „o clasă”, ci să înțeleagă mai bine cum se mișcă și cum își pot construi un corp mai puternic, mai armonios și mai funcțional.",
      "În nutriție, abordarea mea este una practică și bazată pe știință, adaptată realității fiecărei femei și etapelor prin care corpul ei trece. Pun un accent deosebit pe sănătatea hormonală, perioada de perimenopauză și menopauză, menținerea masei musculare, gestionarea greutății și construirea unor obiceiuri care pot deveni parte din viața de zi cu zi.",
      "În cadrul MUV Exclusive, voi susține clase de Pilates, programe individuale de consiliere și educație nutrițională, precum și workshopuri dedicate nutriției, sănătății feminine și unui stil de viață echilibrat.",
      "Pentru mine, obiectivul nu este perfecțiunea, ci construirea unei forme de sănătate care poate fi trăită și menținută în viața reală.",
    ],
  },
  {
    id: "valy-cirstea",
    name: "Valy Cîrstea",
    role: "Instructor certificat Aerobic & Fitness",
    intro: "Cu peste 20 de ani de experiență în aerobic și fitness, Valy este pasionată de mișcare, sănătate și energia pe care sportul o aduce în viața de zi cu zi.",
    photos: [
      { src: "/images/echipa/valy-cirstea.jpg", card: "/images/echipa/valy-cirstea-card.webp", position: "50% 50%" },
      { src: "/images/echipa/valy-cirstea-2.jpg" },
    ],
    classes: ["Aerobic", "Fitness", "Tonifiere"],
    bio: [
      "Cu peste 20 de ani de experiență în aerobic și fitness, Valy este pasionată de mișcare, sănătate și energia pe care sportul o aduce în viața de zi cu zi.",
      "Pentru ea, fiecare antrenament trebuie să fie dinamic, eficient și să îți dea o stare bună. Experiența acumulată de-a lungul anilor o ajută să combine exercițiile astfel încât fiecare clasă să te provoace, dar în același timp să îți permită să lucrezi în propriul ritm.",
      "Valy pune accent pe tonifiere, rezistență, coordonare și mobilitate, dar și pe atmosfera din timpul antrenamentului. Muzică, energie pozitivă și multă mișcare – pentru că rezultatele vin mai ușor atunci când îți place ceea ce faci.",
      "Cu Valy, nu vii doar să bifezi un antrenament. Vii să te miști, să îți depășești limitele, să te încarci cu energie și să pleci din sală cu o stare mai bună decât atunci când ai intrat.",
      "La MUV Exclusive, Valy aduce experiența celor peste 20 de ani de fitness într-un spațiu dedicat femeilor și într-o comunitate în care ne dorim ca fiecare dintre voi să își găsească plăcerea de a face mișcare.",
      "Pregătește-te pentru antrenamente cu energie, ritm și multă voie bună!",
    ],
  },
];

export type Service = {
  id: string;
  title: string;
  tagline: string;
  icon: IconName;
  motto: string;
  /** The short version on the card; the full text opens in a panel. */
  lead: string;
  body: string[];
  note: string;
  /** Its own page (the card's "Detalii" goes there instead of opening the panel). */
  page?: string;
  /** The panel also lists the nutrition programmes (lib/nutrition.ts). */
  programs?: boolean;
  /** Price list (lei), shown on the card and in the panel. */
  prices?: { label: string; detail?: string; price: number }[];
};

/** Complementary services, booked by appointment (WhatsApp / phone), not through the class app. */
export const services: Service[] = [
  {
    id: "masaj",
    title: "Masaj",
    tagline: "Recuperare. Relaxare. Timp pentru tine.",
    icon: "lotus",
    motto: "Antrenează-te. Recuperează-te. Simte-te bine.",
    lead: "Mișcarea și recuperarea merg împreună. Completăm antrenamentele cu masaj pentru relaxare, recuperare musculară și starea generală de bine.",
    body: [
      "Mișcarea și recuperarea merg împreună. De aceea, la MUV Exclusive, completăm antrenamentele cu servicii de masaj dedicate relaxării, recuperării musculare și stării generale de bine.",
      "Fie că ai nevoie de relaxare după o perioadă solicitantă, de detensionarea musculaturii după antrenamente sau pur și simplu de un moment în care să încetinești ritmul, ședințele de masaj sunt adaptate nevoilor tale.",
      "Este acel timp în care corpul se relaxează, tensiunea se eliberează, iar tu îți recapeți energia.",
      "Pentru noi, un stil de viață activ înseamnă mai mult decât antrenament. Înseamnă să ai grijă de corpul tău și atunci când muncește, și atunci când are nevoie să se refacă.",
    ],
    note: "Serviciile de masaj se realizează pe bază de programare.",
    prices: [
      { label: "O ședință", detail: "60 min", price: 150 },
      { label: "Abonament 4 ședințe", price: 560 },
      { label: "Abonament 8 ședințe", price: 1100 },
    ],
  },
  {
    id: "nutritie",
    title: "Nutriție",
    tagline: "Mișcare, alimentație și echilibru.",
    icon: "leaf",
    motto: "Move. Nourish. Feel good.",
    lead: "La MUV Exclusive, nutriția completează mișcarea printr-o abordare personalizată, realistă și adaptată stilului tău de viață.",
    body: [
      "Mișcare, alimentație și echilibru — într-o abordare care ține cont de tine, nu doar de obiectivul tău.",
      "Rezultatele care se păstrează în timp nu se construiesc doar în sala de antrenament. Alimentația influențează energia, recuperarea, compoziția corporală, starea de bine și felul în care corpul răspunde diferitelor etape ale vieții.",
      "La MUV Exclusive, nutriția completează mișcarea printr-o abordare personalizată, realistă și adaptată stilului tău de viață.",
      "Fie că îți dorești să îți îmbunătățești obiceiurile alimentare, să îți susții mai bine antrenamentele, să îți optimizezi greutatea și compoziția corporală sau pur și simplu să înțelegi mai bine de ce are nevoie corpul tău, construim împreună o strategie pe care să o poți aplica în viața reală.",
      "Punem accent pe sănătatea feminină, echilibru, energie, masă musculară și obiceiuri sustenabile, fără diete extreme, reguli rigide sau soluții rapide.",
      "Pentru că schimbarea reală nu înseamnă să faci totul perfect. Înseamnă să găsești o formulă care funcționează pentru tine și pe care o poți păstra.",
    ],
    note: "Consultațiile și programele de nutriție se realizează pe bază de programare.",
    programs: true,
    prices: [
      { label: "MUV Nutrition – 4 săptămâni", price: 1000 },
      { label: "Program individual aprofundat de nutriție", price: 2000 },
    ],
  },
];

export type GalleryItem = { src: string; title: string; caption: string; width: number; height: number };

export const kidsFeatures: { icon: IconName; title: string }[] = [
  { icon: "home", title: "Spațiu amenajat pentru cei mici" },
  { icon: "bear", title: "Jucării și cărți pentru joacă" },
  { icon: "play", title: "Desene animate pentru cei mici" },
  { icon: "heart", title: "Confort pentru toată familia" },
];

/**
 * URL of a file in public/, wherever the site is deployed (https://muvexclusive.ro, or a subfolder for previews).
 */
// Laravel build: JS in public/build/assets (site root two folders up). The static build inlines
// its JS into index.html, so it sets VITE_PUBLIC_ROOT to '' and paths stay relative to the page.
const publicRoot = import.meta.env.DEV
    ? '/'
    : import.meta.env.VITE_PUBLIC_ROOT !== undefined
      ? import.meta.env.VITE_PUBLIC_ROOT
      : new URL('../../', import.meta.url).href;

export function asset(path: string): string {
    return publicRoot + path.replace(/^\//, '');
}
