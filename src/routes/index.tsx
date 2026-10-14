import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Gift, MapPin, MessageCircle, Heart } from "lucide-react";
import garland from "@/assets/cherry-garland.png";
import cherry from "@/assets/cherry.png";
import { EVENT, useGuests } from "@/lib/guests";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { id?: string } => (s["id"] ? { id: String(s["id"]) } : {}),
  head: () => ({
    meta: [
      { title: "Chá de Bebê — Seu convite" },
      { name: "description", content: "Você está convidado para o nosso Chá de Bebê! Confirme sua presença." },
      { property: "og:title", content: "Chá de Bebê — Seu convite" },
      { property: "og:description", content: "Você está convidado para o nosso Chá de Bebê!" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const { id } = Route.useSearch();
  const { guests, confirm } = useGuests();
  const guest = guests.find((g) => g.id === (id ?? "123"));

  const actions = [
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${EVENT.motherWhatsApp}` },
    { label: "Local", icon: MapPin, href: EVENT.mapsUrl },
    { label: "Lista completa", icon: Gift, href: EVENT.giftListUrl },
  ];

  return (
    <main className="relative mx-auto flex min-h-screen max-w-md flex-col items-center overflow-hidden px-5 pb-10">
      <img src={garland} alt="" width={1536} height={640} className="pointer-events-none -mx-10 w-[130%] max-w-none -mt-6" />
      <img src={cherry} alt="" loading="lazy" width={816} height={816} className="animate-float pointer-events-none absolute left-1 top-[55%] w-12 opacity-70" />
      <img src={cherry} alt="" loading="lazy" width={816} height={816} className="animate-float pointer-events-none absolute right-2 top-[75%] w-10 opacity-60 [animation-delay:2s]" />

      <section className="animate-fade-up relative -mt-8 w-full rounded-[2rem] border border-border bg-card/85 px-6 py-8 text-center shadow-soft backdrop-blur">
        <p className="font-serif text-sm uppercase tracking-[0.3em] text-muted-foreground">Você está convidado</p>
        <h1 className="mt-1 font-script text-6xl leading-tight text-primary">Chá de Bebê</h1>

        <div className="ribbon mx-auto mt-4 w-[110%] -translate-x-[4.5%] py-3 font-serif text-lg font-semibold shadow-soft">
          {EVENT.date} · {EVENT.time}
        </div>

        {guest ? (
          <>
            <p className="mt-6 font-script text-4xl text-foreground">Olá, {guest.name}!</p>
            <p className="mt-2 font-serif text-lg text-muted-foreground">
              Será uma alegria ter você conosco nesse momento tão doce.
            </p>
            <div className="mt-5 rounded-2xl border border-dashed border-accent bg-secondary/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-secondary-foreground">Sua sugestão de presente é</p>
              <p className="mt-1 flex items-center justify-center gap-2 font-serif text-2xl font-bold text-primary">
                <Gift className="size-5 shrink-0" /> {guest.gift}
              </p>
            </div>
            <button
              onClick={() => confirm(guest.id)}
              disabled={guest.confirmed}
              className="bg-cherry mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:translate-y-0 disabled:opacity-80 disabled:brightness-100"
            >
              {guest.confirmed ? (<><CheckCircle2 className="size-5" /> Presença Confirmada!</>) : (<><Heart className="size-5" /> Confirmar Presença</>)}
            </button>
          </>
        ) : (
          <p className="mt-6 font-serif text-lg text-muted-foreground">Convite não encontrado. Verifique seu link 🍒</p>
        )}
        <p className="mt-5 text-sm text-muted-foreground">{EVENT.address}</p>
      </section>

      <nav className="mt-8 flex w-full justify-center gap-6">
        {actions.map(({ label, icon: Icon, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex w-20 flex-col items-center gap-2 text-center">
            <span className="flex size-16 items-center justify-center rounded-full border-2 border-accent bg-card text-primary shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="size-6" />
            </span>
            <span className="text-xs font-semibold text-foreground">{label}</span>
          </a>
        ))}
      </nav>

      <div className="lace mt-10 w-full" />
    </main>
  );
}
