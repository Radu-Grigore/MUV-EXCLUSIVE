<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Middleware\ShareErrorsFromSession;

// The site has no logins or server-side forms, so its pages set no session or CSRF cookies:
// nothing is stored in the visitor's browser before they agree to it.
Route::withoutMiddleware([StartSession::class, ShareErrorsFromSession::class, PreventRequestForgery::class])->group(function () {
    Route::view('/', 'app', ['page' => 'home']);

    // Legal pages (their text lives in resources/js/lib/legal.ts).
    foreach ([
        'termeni-si-conditii' => ['Termeni și condiții', 'Termenii și condițiile de utilizare a site-ului și a serviciilor sălii MUV Exclusive din Ploiești: abonamente, rezervări prin SmartGym, regulament.'],
        'politica-de-confidentialitate' => ['Politica de confidențialitate', 'Cum prelucrează MUV Exclusive (SC AMD Energy Studio SRL) datele personale și ce drepturi aveți conform GDPR.'],
        'politica-de-cookies' => ['Politica de cookies', 'Ce cookie-uri folosește site-ul MUV Exclusive și cum vă puteți da sau retrage acordul.'],
        'politica-de-anulare-si-rambursare' => ['Politica de anulare și rambursare', 'Dreptul de retragere, rambursarea abonamentelor și anularea claselor la MUV Exclusive.'],
    ] as $slug => [$title, $description]) {
        Route::view($slug, 'app', ['page' => $slug, 'title' => $title, 'description' => $description]);
    }

    Route::view('date-de-identificare', 'app', [
        'page' => 'date-de-identificare',
        'title' => 'Date de identificare',
        'description' => 'Datele de identificare ale SC AMD Energy Studio SRL, firma care operează sala MUV Exclusive din Ploiești: CUI, Nr. Reg. Com., sediu social și contact.',
    ]);

    Route::view('nutritie', 'app', [
        'page' => 'nutritie',
        'title' => 'Nutriție',
        'description' => 'Consultații și programe de nutriție la MUV Exclusive Ploiești: MUV Nutrition (4 săptămâni, 1.000 lei) și programul individual aprofundat (6–8 săptămâni + follow-up, 2.000 lei).',
    ]);

    // Content pages (their text lives in resources/js/lib/pages.ts).
    Route::view('clase-de-pilates', 'app', [
        'page' => 'clase-de-pilates',
        'title' => 'Clase de Pilates',
        'description' => 'Clase de Pilates la MUV Exclusive Ploiești: mișcare conștientă, forță, postură și mobilitate, adaptate fiecărei participante. Rezervări în aplicația SmartGym.',
    ]);
});
