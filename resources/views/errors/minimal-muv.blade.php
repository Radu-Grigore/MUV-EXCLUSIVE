<!DOCTYPE html>
<html lang="ro">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="robots" content="noindex">
        <meta name="theme-color" content="#f7f1ea">
        <title>@yield('title') — MUV Exclusive</title>
        <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
        <style>
            *{box-sizing:border-box}
            body{margin:0;min-height:100svh;display:flex;align-items:center;justify-content:center;background:#f7f1ea;color:#2a201a;font-family:"DM Sans",system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;padding:24px}
            .wrap{max-width:30rem}
            .logo{font-family:"Instrument Serif",Georgia,serif;font-size:2rem;letter-spacing:.04em;line-height:1}
            .logo small{display:block;margin-top:4px;font-family:inherit;font-size:.55rem;letter-spacing:.5em;color:#7a5c41}
            .code{margin:48px 0 0;font-family:"Instrument Serif",Georgia,serif;font-size:7rem;line-height:.9;background:linear-gradient(115deg,#6f5238 0%,#c7a06a 42%,#e6cfa6 55%,#8b6c4f 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
            h1{margin:12px 0 0;font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:2rem}
            p{margin:12px 0 0;color:#4a3a2e;line-height:1.6}
            a.btn{display:inline-block;margin-top:28px;padding:16px 28px;border-radius:999px;background:#2a201a;color:#f7f1ea;text-decoration:none;font-size:.66rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
            a.btn:hover{background:#7a5c41}
        </style>
    </head>
    <body>
        <main class="wrap">
            <div class="logo">MUV<small>EXCLUSIVE</small></div>
            <div class="code">@yield('code')</div>
            <h1>@yield('title')</h1>
            <p>@yield('message')</p>
            <a class="btn" href="{{ url('/') }}">Înapoi la site</a>
        </main>
    </body>
</html>
