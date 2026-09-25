import type { IconName } from "@/lib/site";

const paths: Record<IconName | "phone" | "pin" | "facebook" | "instagram" | "whatsapp" | "close" | "arrow" | "clock", React.ReactNode> = {
  fist: (
    <>
      <path d="M7 11V7.5a1.5 1.5 0 0 1 3 0V11" />
      <path d="M10 10V6.5a1.5 1.5 0 0 1 3 0V10" />
      <path d="M13 10V7a1.5 1.5 0 0 1 3 0v4" />
      <path d="M16 9.5a1.5 1.5 0 0 1 3 0V14a6 6 0 0 1-6 6h-1.5A5.5 5.5 0 0 1 6 14.5V12a1.5 1.5 0 0 1 1.5-1.5H10a2 2 0 0 1 0 4H8.5" />
    </>
  ),
  kettlebell: (
    <>
      <path d="M8.5 9a3.5 3.5 0 1 1 7 0" />
      <path d="M7.2 9h9.6" />
      <path d="M12 21a7 7 0 0 0 5.6-11.2L16.8 9H7.2l-.8.8A7 7 0 0 0 12 21Z" />
    </>
  ),
  step: (
    <>
      <path d="M3 17h18" />
      <path d="M5 17v-3h14v3" />
      <path d="M7 14l1.5-3h7L17 14" />
    </>
  ),
  dumbbell: (
    <>
      <path d="M6.5 6.5v11M17.5 6.5v11" />
      <path d="M3.5 9v6M20.5 9v6" />
      <path d="M6.5 12h11" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-4 0-8-2.5-9-6 3 0 6 1.5 9 6Z" />
      <path d="M12 20c4 0 8-2.5 9-6-3 0-6 1.5-9 6Z" />
      <path d="M12 20c-2.5-3-2.5-9 0-14 2.5 5 2.5 11 0 14Z" />
      <path d="M12 20c-3-2-5.5-6-4.5-10 2 1 3.8 3 4.5 5" />
      <path d="M12 20c3-2 5.5-6 4.5-10-2 1-3.8 3-4.5 5" />
    </>
  ),
  flame: (
    <path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-3.5-10-2 1.5-3.5 4-3.5 6-1-.5-2-2-2-3.5C7.5 9 6 11.5 6 15a6 6 0 0 0 6 6Z" />
  ),
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-9-9.4C2 7.3 4.2 4.5 7.2 4.5c2 0 3.6 1.1 4.8 2.8 1.2-1.7 2.8-2.8 4.8-2.8 3 0 5.2 2.8 4.2 6.1-1.5 4.8-9 9.4-9 9.4Z" />
  ),
  people: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="9.5" r="2.2" />
      <circle cx="19" cy="9.5" r="2.2" />
      <path d="M6.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M1.5 19a3.5 3.5 0 0 1 5-3.2M22.5 19a3.5 3.5 0 0 0-5-3.2" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C4 11 9 4 20 4c0 11-7 16-15 15Z" />
      <path d="M5 19 14 10" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  home: (
    <>
      <path d="M3 11 12 4l9 7" />
      <path d="M5 10v10h14V10" />
      <path d="M10 20v-5h4v5" />
    </>
  ),
  bear: (
    <>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="6.5" r="2.5" />
      <circle cx="12" cy="13" r="7" />
      <path d="M10 15.5c1 .8 3 .8 4 0" />
      <circle cx="9.5" cy="11.5" r=".5" fill="currentColor" />
      <circle cx="14.5" cy="11.5" r=".5" fill="currentColor" />
    </>
  ),
  play: (
    <>
      <rect x="2.5" y="4.5" width="19" height="13" rx="2" />
      <path d="M10 8.5v5l4.5-2.5L10 8.5Z" />
      <path d="M8 21h8" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.2l1.6 4.2-2 1.4a11 11 0 0 0 5.1 5.1l1.4-2 4.2 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  facebook: <path d="M14 21v-7.5h2.6l.4-3H14V8.6c0-.9.3-1.5 1.6-1.5H17V4.4a20 20 0 0 0-2.3-.1c-2.3 0-3.8 1.4-3.8 3.9v2.3H8.3v3H11V21" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.2-4A8.5 8.5 0 1 1 8.3 19Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.6-2-1-1 .8a5 5 0 0 1-2.7-2.7l.8-1-1-2Z" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
};

export type AnyIcon = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6" }: { name: AnyIcon; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
