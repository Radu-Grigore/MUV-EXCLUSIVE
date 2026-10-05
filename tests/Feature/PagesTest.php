<?php

namespace Tests\Feature;

use Tests\TestCase;

class PagesTest extends TestCase
{
    public function test_the_home_page_renders_the_app(): void
    {
        $this->get('/')->assertOk()->assertSee('data-page="home"', false)->assertSee('id="boot"', false);
    }

    public function test_each_secondary_page_has_its_own_url_and_title(): void
    {
        foreach ([
            'termeni-si-conditii' => 'Termeni și condiții',
            'politica-de-confidentialitate' => 'Politica de confidențialitate',
            'politica-de-cookies' => 'Politica de cookies',
            'politica-de-anulare-si-rambursare' => 'Politica de anulare și rambursare',
            'clase-de-pilates' => 'Clase de Pilates',
            'date-de-identificare' => 'Date de identificare',
        ] as $slug => $title) {
            $this->get("/{$slug}")
                ->assertOk()
                ->assertSee("data-page=\"{$slug}\"", false)
                ->assertSee("<title>{$title} — MUV Exclusive</title>", false)
                ->assertDontSee('id="boot"', false);
        }
    }

    public function test_pages_set_no_cookies_before_consent(): void
    {
        $this->get('/')->assertOk()->assertCookieMissing('laravel_session')->assertCookieMissing('XSRF-TOKEN');
        $this->get('/politica-de-cookies')->assertOk()->assertCookieMissing('laravel_session')->assertCookieMissing('XSRF-TOKEN');
    }

    public function test_the_home_page_is_ready_for_search_engines(): void
    {
        $response = $this->get('/')->assertOk();

        $response->assertSee('<meta name="robots" content="index, follow', false)
            ->assertSee('<link rel="canonical"', false)
            ->assertSee('application/ld+json', false)
            ->assertSee('<h1>MUV Exclusive', false);

        preg_match('#<script type="application/ld\+json">(.*?)</script>#s', $response->getContent(), $m);
        $data = json_decode($m[1], true);
        $this->assertSame('ExerciseGym', $data['@type']);
        $this->assertSame('Ploiești', $data['address']['addressLocality']);
    }

    public function test_unknown_pages_get_the_branded_404(): void
    {
        $this->get('/pagina-care-nu-exista')
            ->assertNotFound()
            ->assertSee('Pagina nu există')
            ->assertSee('Înapoi la site');
    }
}
