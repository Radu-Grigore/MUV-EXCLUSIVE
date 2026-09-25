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
        'w-full rounded-2xl border border-cream/15 bg-white/[0.06] px-5 py-4 text-base text-cream placeholder:text-cream/35 outline-none transition focus:border-gold focus:bg-white/[0.1] focus:ring-4 focus:ring-gold/15 sm:text-sm';

    return (
        <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                    <span className="eyebrow text-gold-soft">Nume</span>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Numele tău" autoComplete="name" />
                </label>
                <label className="grid gap-2">
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
            <fieldset className="grid gap-3">
                <legend className="eyebrow mb-2 text-gold-soft">Te interesează</legend>
                <div className="flex flex-wrap gap-2">
                    {[...classes.map((c) => c.name), 'Abonament', 'Kids Corner'].map((opt) => (
                        <button
                            key={opt}
                            type="button"
                            onClick={() => setInterest((v) => (v === opt ? '' : opt))}
                            aria-pressed={interest === opt}
                            className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                                interest === opt ? 'border-gold bg-gold text-ink' : 'border-cream/15 text-cream/75 hover:border-cream/40'
                            }`}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </fieldset>
            <label className="grid gap-2">
                <span className="eyebrow text-gold-soft">Mesaj</span>
                <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${field} resize-none`}
                    placeholder="Spune-ne cu ce te putem ajuta"
                />
            </label>
            <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-cream px-7 py-4 text-[0.66rem] font-semibold tracking-[0.22em] text-espresso uppercase transition-colors hover:bg-gold-soft"
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
