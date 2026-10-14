import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Mock data layer — swap these functions for a real database later.
export type Guest = { id: string; name: string; gift: string; confirmed: boolean };

export const EVENT = {
  date: "Sábado, 15 de Novembro",
  time: "às 15h",
  address: "Rua das Cerejeiras, 123 - São Paulo",
  mapsUrl: "https://maps.google.com/?q=Rua+das+Cerejeiras+123+São+Paulo",
  motherWhatsApp: "5511999999999",
  giftListUrl: "https://www.amazon.com.br/baby-reg",
};

const MOCK: Guest[] = [
  { id: "123", name: "Maria", gift: "Pacote de fraldas tamanho P", confirmed: false },
  { id: "a7k2p", name: "João e Ana", gift: "Kit de body branco (RN)", confirmed: true },
  { id: "x9m4q", name: "Tia Lúcia", gift: "Manta de algodão", confirmed: false },
];

const KEY = "cha-bebe-guests";
const genId = () => Math.random().toString(36).slice(2, 7);

type Ctx = {
  guests: Guest[];
  addGuest: (name: string, gift: string) => Guest;
  confirm: (id: string) => void;
  remove: (id: string) => void;
};
const GuestsCtx = createContext<Ctx | null>(null);

export function GuestsProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>(MOCK);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(KEY);
    if (raw) setGuests(JSON.parse(raw));
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(guests));
  }, [guests, loaded]);

  const addGuest = (name: string, gift: string) => {
    const g = { id: genId(), name, gift, confirmed: false };
    setGuests((p) => [g, ...p]);
    return g;
  };
  const confirm = (id: string) =>
    setGuests((p) => p.map((g) => (g.id === id ? { ...g, confirmed: true } : g)));
  const remove = (id: string) => setGuests((p) => p.filter((g) => g.id !== id));

  return (
    <GuestsCtx.Provider value={{ guests, addGuest, confirm, remove }}>{children}</GuestsCtx.Provider>
  );
}

export function useGuests() {
  const c = useContext(GuestsCtx);
  if (!c) throw new Error("useGuests must be inside GuestsProvider");
  return c;
}
