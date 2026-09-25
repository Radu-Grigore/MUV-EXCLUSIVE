export const site = {
  name: "MUV Exclusive",
  tagline: "Boutique Fitness Studio · Women Only",
  phone: "0726 697 749",
  phoneHref: "tel:+40726697749",
  whatsapp: "https://wa.me/40726697749",
  facebook: "https://www.facebook.com/Muvexclusive",
  instagram: "https://www.instagram.com/muvexclusive2026",
  instagramHandle: "@muvexclusive2026",
  address: "Cartier Albert, în incinta MRS Village",
  city: "Ploiești",
  mapsQuery: "MRS Village Ploiești",
  openingDate: "2026-11-01T09:00:00+02:00",
  openingLabel: "01.11.2026",
};

export const navLinks = [
  { href: "#despre", label: "Despre" },
  { href: "#clase", label: "Clase" },
  { href: "#kids", label: "Kids Corner" },
  { href: "#deschidere", label: "Deschidere" },
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
  image?: string;
  script?: string;
};

export const classes: FitnessClass[] = [
  {
    id: "khai-bo",
    name: "Khai Bo",
    keywords: ["Energie", "Disciplină", "Încredere"],
    description:
      "Un antrenament intens și dinamic, care combină tehnici din kickboxing, aerobic și exerciții funcționale, pentru un corp mai puternic, mai tonifiat și o stare de bine garantată.",
    benefits: ["Arde calorii", "Tonifiază tot corpul", "Crește rezistența", "Eliberează stresul"],
    icon: "fist",
    accent: "#c9a25e",
    image: "/images/khaibo.webp",
    script: "Stronger, Faster, You",
  },
  {
    id: "functional",
    name: "Functional Training",
    keywords: ["Forță", "Rezistență", "Rezultate"],
    description:
      "Mișcări naturale, cu greutăți și kettlebell, care îți construiesc forța de care ai nevoie în viața de zi cu zi — un corp puternic, stabil și echilibrat.",
    benefits: ["Crește forța", "Îmbunătățește mobilitatea", "Stabilitate și control", "Rezultate vizibile"],
    icon: "kettlebell",
    accent: "#c46a5a",
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
    image: "/images/step.webp",
    script: "More than fitness",
  },
  {
    id: "total-body",
    name: "Total Body",
    keywords: ["Tonus", "Definire", "O versiune mai bună a ta"],
    description:
      "Un antrenament complet care lucrează toate grupele musculare într-o singură oră, pentru tonus, definire și o siluetă armonioasă.",
    benefits: ["Lucrează tot corpul", "Definește musculatura", "Crește metabolismul", "Postură mai bună"],
    icon: "dumbbell",
    accent: "#6f8fa8",
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
    image: "/images/pilates.webp",
    script: "Stronger You",
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
    image: "/images/tabata.webp",
    script: "Stronger, Faster, You",
  },
  {
    id: "personal",
    name: "Instructor Personal",
    keywords: ["Plan personalizat", "Progres real", "Susținere continuă"],
    description:
      "Antrenamente one-to-one, construite în jurul obiectivelor tale. Un plan pe măsura ta, atenție la fiecare detaliu și susținere la fiecare pas.",
    benefits: ["Plan 100% personalizat", "Tehnică corectă", "Progres monitorizat", "Motivație constantă"],
    icon: "person",
    accent: "#c98590",
  },
];

export const pillars: { word: string; title: string; text: string; icon: IconName }[] = [
    {
        word: 'Move',
        title: 'Clase pentru fiecare zi',
        text: 'De la Khai Bo și Tabata la Pilates și Step — antrenamente variate, pentru orice nivel și orice stare.',
        icon: 'bolt',
    },
    {
        word: 'Feel',
        title: 'Boutique atmosphere',
        text: 'Lumină caldă, grupe mici și un spațiu elegant, în care fiecare detaliu e gândit pentru tine.',
        icon: 'lotus',
    },
    {
        word: 'Balance',
        title: 'Corp sănătos, minte liniștită',
        text: 'Mișcare, respirație și echilibru. Pentru cum arăți și, mai ales, pentru cum te simți.',
        icon: 'leaf',
    },
    {
        word: 'Belong',
        title: 'Women only · Comunitate reală',
        text: 'Un loc doar al nostru. Femei care se susțin, se motivează și cresc împreună.',
        icon: 'people',
    },
];

export type GalleryItem = { src: string; title: string; caption: string; width: number; height: number };

export const gallery: GalleryItem[] = [
    {
        src: '/images/campaign.webp',
        title: 'Campania de lansare',
        caption: 'În curând în Ploiești — zona Albert, MRS Village.',
        width: 1334,
        height: 750,
    },
    {
        src: '/images/classes-poster.webp',
        title: 'Clasele MUV',
        caption: 'Șapte experiențe, de la Khai Bo la antrenament personal.',
        width: 750,
        height: 750,
    },
    { src: '/images/step.webp', title: 'Step Aerobic', caption: 'Ritm, cardio și bună dispoziție. More than fitness.', width: 209, height: 374 },
    { src: '/images/khaibo.webp', title: 'Khai Bo', caption: 'Energie, disciplină și încredere. Stronger, faster, you.', width: 209, height: 374 },
    { src: '/images/tabata.webp', title: 'Tabata', caption: 'Intervale intense pentru rezultate rapide.', width: 209, height: 374 },
    { src: '/images/pilates.webp', title: 'Pilates', caption: 'Postură, flexibilitate și echilibru. Stronger you.', width: 209, height: 374 },
    {
        src: '/images/logo-sign.webp',
        title: 'Identitatea MUV',
        caption: 'Sigla noastră, în lumina caldă a studioului.',
        width: 750,
        height: 750,
    },
];

export const kidsFeatures: { icon: IconName; title: string }[] = [
  { icon: "home", title: "Spațiu amenajat pentru cei mici" },
  { icon: "bear", title: "Jucării și cărți pentru joacă" },
  { icon: "play", title: "Desene animate pentru cei mici" },
  { icon: "heart", title: "Confort pentru toată familia" },
];
