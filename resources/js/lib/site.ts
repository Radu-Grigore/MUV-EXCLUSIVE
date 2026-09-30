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

/**
 * Where a "book" button goes on this device. Android opens the SmartGym app when it is installed and
 * falls back to Google Play otherwise; iPhone opens the App Store page (which shows "Open" when the app
 * is installed). Null on computers.
 */
export function appLaunchForDevice(): string | null {
  const store = appStoreForDevice();
  if (store !== smartgym.googlePlay) return store;
  return `intent://#Intent;action=android.intent.action.MAIN;category=android.intent.category.LAUNCHER;package=${smartgym.androidPackage};S.browser_fallback_url=${encodeURIComponent(smartgym.googlePlay)};end`;
}

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
      "Body Sculpt, Aero Dance, Functional Shape, Tabata, Pilates, Step, Khai Bo",
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
    id: "step",
    name: "Step Aerobic",
    keywords: ["Ritm", "Cardio", "Bună dispoziție"],
    description:
      "Un antrenament energic și distractiv care combină mișcarea cu muzica, pentru un corp tonifiat, o inimă mai sănătoasă și multă energie.",
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

export type GalleryItem = { src: string; title: string; caption: string; width: number; height: number };

export const kidsFeatures: { icon: IconName; title: string }[] = [
  { icon: "home", title: "Spațiu amenajat pentru cei mici" },
  { icon: "bear", title: "Jucării și cărți pentru joacă" },
  { icon: "play", title: "Desene animate pentru cei mici" },
  { icon: "heart", title: "Confort pentru toată familia" },
];

/**
 * URL of a file in public/, wherever the site is deployed (e.g. rbsolutions.ro/muv-exclusive).
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
