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
    script: "Stronger, Faster, You",
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
    id: "tabata",
    name: "Tabata",
    keywords: ["Ardere grăsimi", "Cardio intens", "Rezultate rapide"],
    description:
      "Un antrenament intens, pe intervale, care îmbină exerciții cardio și de forță, pentru arderea rapidă a caloriilor, creșterea rezistenței și un corp mai tonifiat.",
    benefits: ["Arde calorii", "Crește rezistența", "Îmbunătățește condiția fizică", "Tonifiază tot corpul"],
    icon: "flame",
    accent: "#d0a04a",
    script: "Stronger, Faster, You",
  },];

export type GalleryItem = { src: string; title: string; caption: string; width: number; height: number };

export const kidsFeatures: { icon: IconName; title: string }[] = [
  { icon: "home", title: "Spațiu amenajat pentru cei mici" },
  { icon: "bear", title: "Jucării și cărți pentru joacă" },
  { icon: "play", title: "Desene animate pentru cei mici" },
  { icon: "heart", title: "Confort pentru toată familia" },
];
