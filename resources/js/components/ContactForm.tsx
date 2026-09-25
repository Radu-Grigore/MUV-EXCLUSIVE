import { useState } from 'react';
import { classes, site } from '@/lib/site';
import { Icon } from './Icon';

// No backend yet: the form composes a WhatsApp message to the studio.
export function ContactForm() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [interest, setInterest] = useState('');
    const [message, setMessage] = useState('');

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const lines = [
            `Bună! Sunt ${name.trim()} și aș dori să aflu mai multe despre MUV Exclusive.`,
            interest && `Mă interesează: ${interest}.`,
            phone.trim() && `Telefon: ${phone.trim()}`,
            message.trim(),
        ].filter(Boolean);
        window.open(`${site.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener,noreferrer');
    }

    const field =
        'w-full rounded-xl border border-cream/15 bg-white/[0.06] px-4 py-2.5 text-base sm:rounded-2xl sm:px-5 sm:py-4 text-cream placeholder:text-cream/35 outline-none transition focus:border-gold focus:bg-white/[0.1] focus:ring-4 focus:ring-gold/15 sm:text-sm';

    return (
        <form onSubmit={onSubmit} className="grid gap-3 sm:gap-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <label className="grid min-w-0 gap-1.5 sm:gap-2">
                    <span className="eyebrow text-gold-soft">Nume</span>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Numele tău" autoComplete="name" />
                </label>
                <label className="grid min-w-0 gap-1.5 sm:gap-2">
                    <span className="eyebrow text-gold-soft">Telefon</span>
                    <input
                        type="tel"
                        inputMode="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={field}
                        placeholder="07xx xxx xxx"
                        autoComplete="tel"
                    />
                </label>
            </div>
            <fieldset className="grid gap-2 sm:gap-3">
                <legend className="eyebrow mb-1.5 text-gold-soft sm:mb-2">Te interesează</legend>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[...classes.map((c) => c.name), 'Abonament', 'Kids Corner'].map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => setInterest((v) => (v === opt ? '' : opt))}
                            aria-pressed={interest === opt}
                            className={`rounded-full border px-3 py-1.5 text-xs transition-colors sm:px-4 sm:py-2 ${
                                interest === opt ? 'border-gold bg-gold text-ink' : 'border-cream/15 text-cream/75 hover:border-cream/40'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </fieldset>
            <label className="grid min-w-0 gap-1.5 sm:gap-2">
                <span className="eyebrow text-gold-soft">Mesaj</span>
                <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${field} resize-none`}
                    placeholder="Spune-ne cu ce te putem ajuta"
                />
            </label>
            <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 sm:mt-2 sm:py-4 text-[0.66rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-colors hover:bg-gold-soft"
            >
                <Icon name="whatsapp" className="h-4 w-4" /> Trimite pe WhatsApp
            </button>
            <p className="text-center text-xs text-cream/50">
                Sau sună-ne direct la{' '}
                <a href={site.phoneHref} className="font-semibold text-gold-soft underline-offset-4 hover:underline">
                    {site.phone}
                </a>
            </p>
        </form>
    );
}
