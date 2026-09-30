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
        'termeni-si-conditii' => 'Termeni și condiții',
        'politica-de-confidentialitate' => 'Politica de confidențialitate',
        'politica-de-cookies' => 'Politica de cookies',
        'politica-de-anulare-si-rambursare' => 'Politica de anulare și rambursare',
    ] as $slug => $title) {
        Route::view($slug, 'app', ['page' => $slug, 'title' => $title]);
    }
});
