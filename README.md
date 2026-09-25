# MUV Exclusive

Site de prezentare pe o singură pagină pentru MUV Exclusive, studio boutique de fitness și wellness exclusiv pentru femei (Ploiești, cartier Albert, MRS Village).

Construit cu Laravel 13 + React (Inertia) + Tailwind CSS.

## Prima pornire

Ai nevoie de PHP 8.3+, Composer și Node.js 20+.

```
composer install
npm install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm run build
php artisan serve
```

Deschide http://localhost:8000.

## În timp ce lucrezi la design

Ca pagina să se actualizeze singură la fiecare modificare, rulează în două terminale:

```
php artisan serve
npm run dev
```

## Unde modifici lucrurile

- Texte, telefon, adresă, clase, link-uri social media: `resources/js/lib/site.ts`
- Secțiunile paginii: `resources/js/pages/Home.tsx` și `resources/js/components/`
- Culori și fonturi: `resources/css/app.css`, `vite.config.js`
- Imagini: `public/images/` (dacă înlocuiești o poză cu una la calitate mai bună, păstrează același nume de fișier)
- Titlul și descrierea pentru Google / Facebook: `resources/views/app.blade.php`
