<!DOCTYPE html>
<html lang="ro">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#f7f1ea">

        <title>MUV Exclusive — Boutique Fitness Studio Women Only | Ploiești</title>
        <meta name="description" content="Studio boutique de fitness și wellness exclusiv pentru femei, în Ploiești, cartier Albert, MRS Village. Khai Bo, Pilates, Tabata și Step Aerobic. Deschidere oficială 01.11.2026.">

        <meta property="og:type" content="website">
        <meta property="og:locale" content="ro_RO">
        <meta property="og:title" content="MUV Exclusive — Women Only Fitness Studio">
        <meta property="og:description" content="More than a workout. A better you. Deschidere oficială 01.11.2026, Ploiești.">
        <meta property="og:url" content="{{ url('/') }}">
        <meta property="og:image" content="{{ asset('images/campaign.webp') }}">

        @fonts
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @inertiaHead
    </head>
    <body class="min-h-screen font-sans antialiased">
        @inertia
    </body>
</html>
