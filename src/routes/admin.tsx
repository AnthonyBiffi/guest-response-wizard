import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Copy, Gift, MessageCircle, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import cherry from "@/assets/cherry.png";
import { useGuests, type Guest } from "@/lib/guests";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Painel do Chá de Bebê" },
      { name: "description", content: "Gerencie convidados, presentes e confirmações do Chá de Bebê." },
      { property: "og:title", content: "Painel do Chá de Bebê" },
      { property: "og:description", content: "Gerencie convidados e confirmações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Admin,
});


function Admin() {
  const { guests, addGuest, remove } = useGuests();
  const [name, setName] = useState("");
  const [gift, setGift] = useState("");
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const linkFor = (g: Guest) => `${origin}/?id=${g.id}`;
  const confirmed = guests.filter((g) => g.confirmed).length;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !gift.trim()) return;
    const g = addGuest(name.trim(), gift.trim());
    setName(""); setGift("");
    toast.success(`Convite gerado para ${g.name}`);
  };
  const copy = async (g: Guest) => {
    await navigator.clipboard.writeText(linkFor(g));
    toast.success("Link copiado!");
  };
  const share = (g: Guest) => {
    const msg = `Olá, ${g.name}! 🍒 Você está convidado(a) para o nosso Chá de Bebê. Veja seu convite: ${linkFor(g)}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const input = "w-full rounded-xl border border-input bg-card px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";
  const iconBtn = "inline-flex size-9 items-center justify-center rounded-full border border-border bg-card transition hover:-translate-y-0.5 hover:bg-secondary";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <img src={cherry} alt="" width={816} height={816} className="size-12" />
          <div>
            <h1 className="font-script text-4xl text-primary">Chá de Bebê</h1>
            <p className="text-sm text-muted-foreground">Painel da mamãe</p>
          </div>
        </div>
        <Link to="/" className="text-sm font-semibold text-primary hover:underline">Ver convite →</Link>
      </header>

      <div className="mb-6 grid grid-cols-3 gap-3">
        {[["Convidados", guests.length], ["Confirmados", confirmed], ["Pendentes", guests.length - confirmed]].map(([l, v]) => (
          <div key={l} className="rounded-2xl border border-border bg-card/80 p-4 text-center shadow-soft">
            <p className="font-serif text-3xl font-bold text-primary">{v}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <section className="mb-8 rounded-3xl border border-border bg-card/80 p-6 shadow-soft">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold"><Plus className="size-5 text-primary" /> Novo Convite</h2>
        <form onSubmit={submit} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <input className={input} placeholder="Nome do Convidado" value={name} onChange={(e) => setName(e.target.value)} />
          <input className={input} placeholder="Presente Sugerido" value={gift} onChange={(e) => setGift(e.target.value)} />
          <button className="bg-cherry rounded-xl px-6 py-3 font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:brightness-110">Gerar Convite</button>
        </form>
      </section>

      <section className="rounded-3xl border border-border bg-card/80 p-6 shadow-soft">
        <h2 className="mb-4 flex items-center gap-2 font-serif text-2xl font-bold"><Users className="size-5 text-primary" /> Lista de Convidados</h2>
        <ul className="grid gap-3">
          {guests.map((g) => (
            <li key={g.id} className="animate-fade-up flex flex-col gap-3 rounded-2xl border border-border bg-background/60 p-4 transition hover:border-accent sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{g.name}</p>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${g.confirmed ? "bg-success text-success-foreground" : "bg-secondary text-secondary-foreground"}`}>
                    {g.confirmed ? "Confirmado" : "Pendente"}
                  </span>
                </div>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><Gift className="size-3.5" /> {g.gift}</p>
                <p className="mt-1 truncate font-mono text-xs text-muted-foreground">{linkFor(g)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => copy(g)} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:bg-secondary">
                  <Copy className="size-4" /> Copiar Link
                </button>
                <button onClick={() => share(g)} aria-label="Enviar pelo WhatsApp" className={`${iconBtn} text-success`}><MessageCircle className="size-4" /></button>
                <button onClick={() => remove(g.id)} aria-label="Remover" className={`${iconBtn} text-muted-foreground hover:text-destructive`}><Trash2 className="size-4" /></button>
              </div>
            </li>
          ))}
          {guests.length === 0 && <p className="text-center text-muted-foreground">Nenhum convidado ainda.</p>}
        </ul>
      </section>
    </main>
  );
}
