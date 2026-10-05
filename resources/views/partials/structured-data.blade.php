{{-- Structured data for Google (business card in search results / Maps). --}}
<script type="application/ld+json">
{!! json_encode([
    '@context' => 'https://schema.org',
    '@type' => 'ExerciseGym',
    '@id' => $siteUrl.'/#gym',
    'name' => 'MUV Exclusive',
    'description' => 'Studio boutique de fitness și wellness exclusiv pentru femei în Ploiești.',
    'url' => $siteUrl.'/',
    'image' => $siteUrl.'/images/campaign.webp',
    'logo' => $siteUrl.'/favicon.svg',
    'telephone' => '+40726697749',
    'email' => 'Muvexclusive@yahoo.com',
    'priceRange' => '49 – 999 lei',
    'currenciesAccepted' => 'RON',
    'foundingDate' => '2026-11-01',
    'address' => [
        '@type' => 'PostalAddress',
        'streetAddress' => 'Aleea Smaraldului nr. 11, MRS Village, clădirea M, parter',
        'addressLocality' => 'Ploiești',
        'addressRegion' => 'Prahova',
        'addressCountry' => 'RO',
    ],
    'areaServed' => 'Ploiești',
    'audience' => ['@type' => 'PeopleAudience', 'suggestedGender' => 'female'],
    'sameAs' => [
        'https://www.facebook.com/share/1HgyDhRNjD/',
        'https://www.instagram.com/muvexclusive2026',
    ],
    'parentOrganization' => [
        '@type' => 'Organization',
        'legalName' => 'SC AMD Energy Studio SRL',
        'vatID' => 'RO55562057',
        'taxID' => 'RO55562057',
    ],
    'makesOffer' => [
        ['@type' => 'Offer', 'name' => 'Day Pass', 'price' => '49', 'priceCurrency' => 'RON'],
        ['@type' => 'Offer', 'name' => 'Unlimited — 1 lună', 'price' => '349', 'priceCurrency' => 'RON'],
        ['@type' => 'Offer', 'name' => 'Unlimited — 3 luni', 'price' => '899', 'priceCurrency' => 'RON'],
        ['@type' => 'Offer', 'name' => 'Unlimited + Kids Corner — 1 lună', 'price' => '399', 'priceCurrency' => 'RON'],
        ['@type' => 'Offer', 'name' => 'Unlimited + Kids Corner — 3 luni', 'price' => '999', 'priceCurrency' => 'RON'],
        ['@type' => 'Offer', 'name' => 'Personal Training', 'price' => '249', 'priceCurrency' => 'RON'],
    ],
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT) !!}
</script>
