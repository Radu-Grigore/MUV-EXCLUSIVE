import { posters, site } from '@/lib/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

function Row({ items, reverse = false }: { items: typeof posters; reverse?: boolean }) {
    const loop = [...items, ...items];
    return (
        <div className="overflow-hidden">
            <ul className={`marquee-track flex w-max gap-3 sm:gap-5 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
                {loop.map((p, i) => (
                    <li key={i} aria-hidden={i >= items.length} className="h-[210px] shrink-0 overflow-hidden rounded-[1.25rem] bg-sand sm:h-[300px] lg:h-[340px]">
                        <img
                            src={p.src}
                            alt={i >= items.length ? '' : p.alt}
                            width={p.width}
                            height={p.height}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-auto object-cover transition-transform duration-700 ease-out-expo hover:scale-105"
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Posters() {
    const half = Math.ceil(posters.length / 2);
    return (
        <section className="overflow-hidden py-24 sm:py-32" aria-labelledby="posters-title">
            <Reveal className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-5 sm:flex-row sm:items-end sm:px-8 lg:px-12">
                <div>
                    <p className="eyebrow flex items-center gap-3 text-bronze">
                        <span className="h-px w-8 bg-gold" /> Pregătim ceva frumos
                    </p>
                    <h2 id="posters-title" className="mt-5 font-display text-5xl leading-none font-light sm:text-7xl">
                        Din lumea <em className="text-bronze">MUV</em>
                    </h2>
                </div>
                <a
                    href={site.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 self-start rounded-full border border-espresso/15 py-2 pr-2 pl-5 text-[0.64rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-colors hover:border-espresso sm:self-auto"
                >
                    <Icon name="instagram" className="h-4 w-4" /> {site.instagramHandle}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-espresso text-cream transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                        <Icon name="arrow-up-right" className="h-4 w-4" />
                    </span>
                </a>
            </Reveal>

            <div className="mt-14 grid gap-3 sm:gap-5">
                <Row items={posters.slice(0, half)} />
                <Row items={posters.slice(half)} reverse />
            </div>
        </section>
    );
}
