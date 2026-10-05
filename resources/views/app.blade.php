<!DOCTYPE html>
<html lang="ro">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#f7f1ea">

        @php
            $pageTitle = isset($title) ? $title.' — MUV Exclusive' : 'MUV Exclusive — Sală de fitness pentru femei în Ploiești | Boutique Fitness Studio';
            $pageDescription = $description ?? 'Studio boutique de fitness și wellness exclusiv pentru femei în Ploiești, cartier Albert, MRS Village, clădirea M, Aleea Smaraldului nr. 11. Personal Training, Body Sculpt, Abs & Glutes, Aero Dance, Functional Shape, Tabata, Pilates, Functional Step și Khai Bo. Rezervări prin aplicația SmartGym. Deschidere oficială 01.11.2026.';
        @endphp
        <title>{{ $pageTitle }}</title>
        <meta name="description" content="{{ $pageDescription }}">
        <meta name="robots" content="index, follow, max-image-preview:large">

        <meta property="og:type" content="website">
        <meta property="og:site_name" content="MUV Exclusive">
        <meta property="og:locale" content="ro_RO">
        <meta property="og:title" content="{{ $pageTitle }}">
        <meta property="og:description" content="{{ $pageDescription }}">
        <meta property="og:url" content="{{ $canonicalUrl }}">
        <meta property="og:image" content="{{ $siteUrl }}/images/campaign.webp">
        <meta property="og:image:width" content="1334">
        <meta property="og:image:height" content="750">
        <meta property="og:image:alt" content="MUV Exclusive — Boutique Fitness Studio, Women Only, Ploiești">
        <meta name="twitter:card" content="summary_large_image">
        <link rel="canonical" href="{{ $canonicalUrl }}">
        @if (($page ?? 'home') === 'home')
            @include('partials.structured-data')
        @endif

        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
        {{-- Satoshi is served by Fontshare: open both connections early. --}}
        <link rel="preconnect" href="https://api.fontshare.com">
        <link rel="preconnect" href="https://cdn.fontshare.com" crossorigin>
        {{-- The hero photo is the largest element on screen: fetch it straight away. --}}
        <link rel="preload" as="image" href="{{ asset('images/athlete.webp') }}" imagesrcset="{{ asset('images/athlete-480.webp') }} 480w, {{ asset('images/athlete.webp') }} 760w" imagesizes="(min-width: 1024px) 24vw, (min-width: 640px) 58vw, 66vw" fetchpriority="high">
        {{-- The inlined font CSS uses paths relative to build/assets; anchor them so they work in any folder. --}}
        {!! str_replace('url("./', 'url("'.asset('build/assets').'/', (string) \Illuminate\Support\Facades\Vite::fonts()) !!}
        @viteReactRefresh
        @if (app()->isProduction() && ! \Illuminate\Support\Facades\Vite::isRunningHot())
            {{-- Production: the page CSS is inlined, saving a render-blocking request. --}}
            <style>{!! \Illuminate\Support\Facades\Vite::content('resources/css/app.css') !!}</style>
            @vite(['resources/js/app.tsx'])
        @else
            @vite(['resources/css/app.css', 'resources/js/app.tsx'])
        @endif
    </head>
    <body class="min-h-screen font-sans antialiased">
        <div id="app" data-page="{{ $page ?? 'home' }}" data-base="{{ url('/') }}">
            {{-- Plain HTML version of the page for search engines and browsers without JavaScript; the app replaces it. --}}
            @include('partials.seo-content', ['page' => $page ?? 'home', 'title' => $title ?? null, 'description' => $pageDescription])
        </div>
        @if (($page ?? 'home') === 'home')
        {{-- First frame of the intro, painted straight from the HTML while the JavaScript loads. --}}
        <noscript><style>#boot{display:none}</style></noscript>
        {{-- Safety net: if the scripts cannot run, this frame fades away by itself and the plain page shows. --}}
        <div id="boot" class="fixed inset-0 z-[100] flex flex-col bg-espresso text-cream" style="animation: boot-out .6s ease 8s forwards" aria-hidden="true">
            <div class="flex-1"></div>
            <div class="flex items-end justify-between px-5 pb-8 sm:px-12">
                <span class="eyebrow text-gold-soft">Women only fitness studio</span>
                <span class="font-display text-5xl text-cream tabular-nums sm:text-7xl">000</span>
            </div>
        </div>
        @endif
    </body>
</html>
