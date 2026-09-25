import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const allura = Allura({
  variable: "--font-allura",
  subsets: ["latin", "latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "MUV Exclusive — Boutique Fitness Studio Women Only | Ploiești",
  description:
    "Studio boutique de fitness și wellness exclusiv pentru femei, în Ploiești, cartier Albert, MRS Village. Khai Bo, Pilates, Tabata, Step Aerobic, Functional Training, Total Body și antrenor personal. Deschidere oficială 01.11.2026.",
  keywords: ["fitness Ploiești", "sală femei Ploiești", "pilates Ploiești", "MUV Exclusive", "women only gym"],
  openGraph: {
    title: "MUV Exclusive — Women Only Fitness Studio",
    description: "More than a workout. A better you. Deschidere oficială 01.11.2026, Ploiești.",
    images: ["/images/campaign.webp"],
    locale: "ro_RO",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f1ea",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${montserrat.variable} ${cormorant.variable} ${allura.variable} antialiased`}
    >
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
