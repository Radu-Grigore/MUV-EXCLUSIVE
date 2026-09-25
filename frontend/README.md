# MUV Exclusive — site (Next.js + React)

Site de prezentare pe o singură pagină pentru MUV Exclusive, studio de fitness și wellness exclusiv pentru femei (Ploiești, cartier Albert, MRS Village).

## Pornire locală

Ai nevoie de Node.js 20.9 sau mai nou.

```
cd frontend
npm install
npm run dev
```

Apoi deschide http://localhost:3000.

## Unde modifici lucrurile

- Texte, telefon, adrese, clase, link-uri social media: `src/lib/site.ts`
- Imagini: `public/images/` (dacă înlocuiești un fișier cu unul la calitate mai bună, păstrează același nume)
- Secțiunile paginii: `src/app/page.tsx`, `src/components/`

## Build pentru producție

```
npm run build
npm start
```
