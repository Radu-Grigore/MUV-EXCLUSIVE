import { kidsFeatures } from '@/lib/site';
import { Icon } from '../Icon';
import { Reveal } from '../Reveal';

const colors = ['#6f7f4d', '#e0a93b', '#3f6fa3', '#c86b6b'];

export function Kids() {
    return (
        <section id="kids" data-scroll-offset="-84" className="px-3 py-3 sm:px-5 sm:py-5">
            <div
                className="relative overflow-hidden rounded-[2rem] px-5 py-20 sm:rounded-[3rem] sm:px-10 sm:py-28 lg:px-16"
                style={{
                    background:
                        'radial-gradient(40% 50% at 0% 0%, rgba(124,143,90,0.35) 0%, transparent 70%), radial-gradient(35% 45% at 100% 100%, rgba(233,185,73,0.35) 0%, transparent 70%), radial-gradient(30% 40% at 80% 10%, rgba(91,143,199,0.22) 0%, transparent 70%), #f4efe2',
                }}
            >
                <div className="relative mx-auto grid max-w-[1300px] items-center gap-14 lg:grid-cols-2">
                    <Reveal>
                        <span className="inline-block -rotate-3 rounded-xl bg-[#6f7f4d] px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-lg">
                            New
                        </span>
                        <h2 data-split className="mt-6 font-display text-6xl leading-[0.95] font-light sm:text-7xl">
                            Kids Corner
                            <em className="mt-2 block text-4xl text-bronze sm:text-5xl">la MUV Exclusive</em>
                        </h2>
                        <p className="mt-7 max-w-lg leading-relaxed text-cocoa">
                            Pentru mai mult timp pentru tine. În timp ce tu te antrenezi, cei mici se joacă într-un colț amenajat special pentru ei — cu
                            jucării, cărți, desene animate și multă voie bună.
                        </p>
                        <p className="mt-6 font-script text-5xl text-[#6f7f4d]">Un loc special pentru cei mici!</p>
                    </Reveal>

                    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
                        {kidsFeatures.map((f, i) => (
                            <Reveal as="li" key={f.title} delay={i * 90}>
                                <div className="group flex h-full flex-col justify-between gap-8 rounded-[1.75rem] bg-white/75 p-5 shadow-[0_24px_50px_-35px_rgba(42,32,26,0.5)] transition-transform duration-700 ease-out-expo hover:-translate-y-1.5 sm:p-7">
                                    <span
                                        className="grid h-14 w-14 place-items-center rounded-2xl text-white transition-transform duration-700 ease-out-expo group-hover:rotate-[-8deg] group-hover:scale-110"
                                        style={{ background: colors[i % colors.length] }}
                                    >
                                        <Icon name={f.icon} className="h-7 w-7" />
                                    </span>
                                    <p className="text-sm leading-snug font-medium text-espresso sm:text-base">{f.title}</p>
                                </div>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
