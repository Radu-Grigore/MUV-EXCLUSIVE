<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
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
        // Behind a host proxy/CDN the request can look like plain http; asset URLs must stay https.
        if (str_starts_with((string) config('app.url'), 'https://')) {
            URL::forceScheme('https');
        }

        // In production every generated URL (canonical, og:url, assets) uses the site's own address,
        // whatever host name the request came in on.
        if ($this->app->isProduction()) {
            URL::forceRootUrl((string) config('app.url'));
        }
    }
}
