<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Files (scripts, fonts, images) always load from the address the page was opened on, so the
        // site works on the final domain, a test folder or a temporary host alike. Only the SEO addresses
        // (canonical, og:url, Google data) use the official address from APP_URL.
        $site = rtrim((string) config('app.url'), '/');
        View::share('siteUrl', $site);
        View::share('canonicalUrl', $site.(request()->path() === '/' ? '/' : '/'.request()->path()));
    }
}
