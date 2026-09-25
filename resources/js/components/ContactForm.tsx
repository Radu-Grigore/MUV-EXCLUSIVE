
import { useState } from "react";
import { classes, site } from "@/lib/site";
import { Icon } from "./Icon";

// No backend yet: the form composes a WhatsApp message to the studio.
export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Bună! Sunt ${name.trim()} și aș dori să aflu mai multe despre MUV Exclusive.`,
      interest && `Mă interesează: ${interest}.`,
      phone.trim() && `Telefon: ${phone.trim()}`,
      message.trim(),
    ].filter(Boolean);
    window.open(`${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-2xl border border-bronze/20 bg-white/70 px-5 py-4 text-sm text-espresso placeholder:text-cocoa/50 outline-none transition focus:border-gold focus:bg-white focus:ring-4 focus:ring-gold/15";

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="eyebrow text-bronze">Nume</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Numele tău" autoComplete="name" />
        </label>
        <label className="grid gap-2">
          <span className="eyebrow text-bronze">Telefon</span>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={field}
            placeholder="07xx xxx xxx"
            autoComplete="tel"
          />
        </label>
      </div>
      <label className="grid gap-2">
        <span className="eyebrow text-bronze">Te interesează</span>
        <select value={interest} onChange={(e) => setInterest(e.target.value)} className={`${field} appearance-none`}>
          <option value="">Alege o clasă (opțional)</option>
          {classes.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Abonament">Abonament</option>
          <option value="Kids Corner">Kids Corner</option>
        </select>
      </label>
      <label className="grid gap-2">
        <span className="eyebrow text-bronze">Mesaj</span>
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
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-espresso px-7 py-4 text-[0.68rem] font-semibold tracking-[0.25em] uppercase text-cream transition hover:bg-bronze"
      >
        <Icon name="whatsapp" className="h-4 w-4" /> Trimite pe WhatsApp
      </button>
      <p className="text-center text-xs text-cocoa/60">
        Sau sună-ne direct la{" "}
        <a href={site.phoneHref} className="font-semibold text-bronze underline-offset-4 hover:underline">
          {site.phone}
        </a>
      </p>
    </form>
  );
}
