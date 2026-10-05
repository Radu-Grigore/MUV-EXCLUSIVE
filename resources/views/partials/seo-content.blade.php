@if ($page === 'home')
    <main>
        <h1>MUV Exclusive — Boutique Fitness Studio, exclusiv pentru femei, în Ploiești</h1>
        <p>{{ $description }}</p>
        <h2>Clase</h2>
        <ul>
            <li>Personal Training</li>
            <li>Body Sculpt</li>
            <li>Abs &amp; Glutes</li>
            <li>Aero Dance</li>
            <li>Functional Shape</li>
            <li>Tabata</li>
            <li>Boot Camp</li>
            <li>Pilates Clasic</li>
            <li>Functional Step</li>
            <li>Khai Bo</li>
        </ul>
        <h2>Echipa</h2>
        <ul>
            <li>Ana Voican — Instructor Fitness, Functional &amp; Weight training</li>
            <li>Cristina Dom — Instructor Fitness &amp; Aerobic, Personal Trainer</li>
            <li>Irina Vișan — Instructor Pilates &amp; Nutriționist Integrativ</li>
            <li>Valy Cîrstea — Instructor certificat Aerobic &amp; Fitness</li>
        </ul>
        <h2>Abonamente</h2>
        <ul>
            <li>Day Pass — 49 lei / o zi</li>
            <li>Unlimited — 349 lei / lună sau 899 lei / 3 luni</li>
            <li>Unlimited + Kids Corner — 399 lei / lună sau 999 lei / 3 luni</li>
            <li>Personal Training — 249 lei (antrenorul se achită separat, în funcție de numărul de ore)</li>
        </ul>
        <h2>Servicii complementare</h2>
        <ul>
            <li>Masaj — recuperare, relaxare, timp pentru tine (pe bază de programare)</li>
            <li>Consultații de nutriție — mișcare, alimentație și echilibru (pe bază de programare)</li>
        </ul>
        <h2>Rezervări</h2>
        <p>Rezervările la clase se fac în aplicația SmartGym, cu codul sălii 3490.</p>
        <h2>Contact</h2>
        <p>Cartier Albert, MRS Village, clădirea M, parter, Aleea Smaraldului nr. 11, Ploiești. Telefon: <a href="tel:+40726697749">+40 726 697 749</a>. Email: <a href="mailto:Muvexclusive@yahoo.com">Muvexclusive@yahoo.com</a>.</p>
    </main>
@else
    <main>
        <h1>{{ $title }}</h1>
        <p>{{ $description }}</p>
        <p><a href="{{ url('/') }}">MUV Exclusive — pagina principală</a></p>
    </main>
@endif
