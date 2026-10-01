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
      "Body Sculpt, Abs & Glutes, Aero Dance, Functional Shape, Tabata, Pilates, Functional Step, Khai Bo",
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

export const navLinks = [
  { href: "#despre", label: "Despre" },
  { href: "#clase", label: "Clase" },
  { href: "#echipa", label: "Echipa" },
  { href: "#kids", label: "Kids Corner" },
  { href: "#abonamente", label: "Abonamente" },
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
    id: "pilates",
    name: "Pilates Clasic",
    keywords: ["Postură", "Flexibilitate", "Echilibru"],
    description:
      "O combinație perfectă între mișcare, respirație și concentrare, care te ajută să îți întărești corpul, să îți îmbunătățești postura și să îți găsești echilibrul, atât fizic, cât și mental.",
    benefits: ["Postură corectă", "Corp mai puternic", "Echilibru mental", "Mai multă energie"],
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
  photos: { src: string; position?: string }[];
  classes: string[];
  schedule?: string[];
  bio: (string | string[])[];
  closing?: string;
};

export const team: TeamMember[] = [
  {
    id: "ana-voican",
    name: "Ana Voican",
    role: "Instructor Fitness, Functional & Weight training",
    extra: "Fondator Strong & Fit Factory (online workout sessions)",
    intro: "De peste 10 ani, Ana este preocupată constant de mișcare și de construirea unui stil de viață sănătos, având formare în cadrul World Class.",
    photos: [{ src: "/images/echipa/ana-voican.jpg", position: "50% 20%" }, { src: "/images/echipa/ana-voican-2.jpg" }],
    classes: ["HIIT & Tabata", "Abs & Glutes", "Body Sculpt"],
    schedule: ["Marți și joi: 18:30–19:30", "Miercuri și vineri: 08:30–09:30"],
    bio: [
      "De peste 10 ani, Ana este preocupată constant de mișcare și de construirea unui stil de viață sănătos, având formare în cadrul World Class.",
      "Este pasionată de alergare, maratoane, ciclism și experiențe sportive care ne provoacă să ne depășim limitele. Pentru Ana, sportul este o formă de igienă personală: un obicei esențial pentru sănătate, energie și echilibru. Motivația ne ajută să începem, însă disciplina și consecvența sunt cele care ne duc mai departe.",
      "În antrenamentele sale combină exercițiile funcționale, cardio și de forță, urmărind tonifierea corpului, dezvoltarea masei musculare și îmbunătățirea rezistenței cardio-respiratorii. Clasele sunt dinamice, eficiente și adaptabile diferitelor niveluri de pregătire, astfel încât fiecare participantă să poată progresa în propriul ritm.",
      "În cadrul MUV Exclusive, Ana va susține clasele de HIIT & Tabata, Abs & Glutes, Body Sculpt:",
      ["Marți și joi: 18:30–19:30", "Miercuri și vineri: 08:30–09:30"],
      "Dincolo de antrenamentele din sală, alături de Ana dezvoltăm experiențe și retreaturi dedicate femeilor, în care mișcarea se îmbină cu relaxarea, timpul petrecut în natură și conectarea într-o comunitate autentică.",
      "Vino să lucrăm împreună pentru un corp mai puternic, mai multă energie și un stil de viață pe care să îl poți susține pe termen lung.",
    ],
    closing: "Make it happen!",
  },
  {
    id: "cristina-dom",
    name: "Cristina Dom",
    role: "Instructor Fitness & Aerobic, Personal Trainer",
    intro: "Cu peste 20 de ani de experiență în dans, balet, coregrafie și fitness, Cristina aduce în fiecare antrenament mișcare, tehnică, energie și expresivitate.",
    photos: [{ src: "/images/echipa/cristina-dom.jpg", position: "60% 30%" }],
    classes: ["Khai Bo", "Aero Dance", "Functional Shape", "Functional Step", "Personal Training"],
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
      ],
      "În plus, în calitate de Personal Trainer, Cristina va lucra individual cu femeile care își doresc un program personalizat, adaptat obiectivelor și nivelului lor de pregătire.",
      "La MUV Exclusive credem că sportul trebuie să fie eficient, dar și o experiență la care să vii cu drag. Alături de Cristina, fiecare antrenament vine cu energie, ritm și provocarea de a deveni puțin mai puternică de la o clasă la alta.",
      "Vino să descoperi clasele Cristinei la MUV Exclusive și găsește forma de mișcare care te face să te simți bine în corpul tău.",
    ],
  },
  {
    id: "irina-visan",
    name: "Irina Vișan",
    role: "Instructor Pilates & Nutriționist Integrativ",
    intro: "Cred într-o abordare a sănătății feminine în care mișcarea și alimentația nu funcționează separat, ci se completează.",
    photos: [
      { src: "/images/echipa/irina-visan.jpg", position: "60% 15%" },
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
