import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Gift, MapPin, MessageCircle, Heart } from "lucide-react";
import frame from "@/assets/cherry-frame.png.asset.json";
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
    <main className="relative mx-auto flex min-h-screen max-w-md flex-col items-center px-4 py-6">
      <div className="animate-fade-up relative w-full overflow-hidden rounded-[1.25rem] shadow-soft">
        <img
          src={frame.url}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-fill"
        />

        <div className="relative px-9 pb-24 pt-[19rem] text-center">
          <p className="font-serif text-xs uppercase tracking-[0.3em] text-secondary-foreground/80">Você está convidado</p>
          <h1 className="font-script text-5xl leading-tight text-primary">Chá de Bebê</h1>

          <div className="ribbon mx-auto mt-3 w-full py-2 font-serif text-base font-semibold shadow-soft">
            {EVENT.date} · {EVENT.time}
          </div>

          {guest ? (
            <>
              <p className="mt-4 font-script text-3xl text-foreground">Olá, {guest.name}!</p>
              <p className="mt-1 font-serif text-base text-muted-foreground">
                Será uma alegria ter você conosco nesse momento tão doce.
              </p>
              <div className="mt-4 rounded-2xl border border-dashed border-accent bg-card/70 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-secondary-foreground">Sua sugestão de presente é</p>
                <p className="mt-1 flex items-center justify-center gap-2 font-serif text-xl font-bold text-primary">
                  <Gift className="size-5 shrink-0" /> {guest.gift}
                </p>
              </div>
              <button
                onClick={() => confirm(guest.id)}
                disabled={guest.confirmed}
                className="bg-cherry mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold text-primary-foreground shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:translate-y-0 disabled:opacity-80 disabled:brightness-100"
              >
                {guest.confirmed ? (<><CheckCircle2 className="size-5" /> Presença Confirmada!</>) : (<><Heart className="size-5" /> Confirmar Presença</>)}
              </button>
            </>
          ) : (
            <p className="mt-4 font-serif text-base text-muted-foreground">Convite não encontrado. Verifique seu link 🍒</p>
          )}

          <p className="mt-3 text-xs text-muted-foreground">{EVENT.address}</p>

          <nav className="mt-5 flex w-full justify-center gap-6">
            {actions.map(({ label, icon: Icon, href }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex w-16 flex-col items-center gap-1.5 text-center">
                <span className="flex size-12 items-center justify-center rounded-full border-2 border-accent bg-card/90 text-primary shadow-soft transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <span className="text-[11px] font-semibold text-foreground">{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </main>
  );
}
