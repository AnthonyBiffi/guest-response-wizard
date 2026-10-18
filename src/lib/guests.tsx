import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { toast } from "sonner";
import { supabase, isSupabaseConfigured } from "./supabase";

export type Guest = {
  id: string;
  name: string;
  gift: string;
  confirmed: boolean;
};

export const EVENT = {
  date: "domingo, 6 de dezembro",
  time: "às 15h",
  address: "Avenida André Cavanha, 16 – Itapevi, SP",
  mapsUrl: "https://share.google/V2G9czDnSQPjfrNW0",
  motherWhatsApp: "5511924554495",
  giftListUrl: "https://www.amazon.com.br/baby-reg",
};

const MOCK: Guest[] = []; // Inicia vazio para não misturar mock com banco real
const KEY = "cha-bebe-guests";

// Só usado se o Supabase não estiver configurado
const genId = () => Math.random().toString(36).slice(2, 7);

type Ctx = {
  guests: Guest[];
  isLoading: boolean;
  isUsingSupabase: boolean;
  addGuest: (name: string, gift: string) => Promise<Guest | null>;
  confirm: (id: string) => Promise<boolean>;
  remove: (id: string) => Promise<boolean>;
  refresh: () => Promise<void>;
};

const GuestsCtx = createContext<Ctx | null>(null);

export function GuestsProvider({ children }: { children: ReactNode }) {
  const [guests, setGuests] = useState<Guest[]>(MOCK);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [localLoaded, setLocalLoaded] = useState(false);

  const fetchSupabaseGuests = useCallback(async () => {
    if (!supabase) return;
    try {
      const { data, error } = await supabase
        .from("guests")
        .select("id, name, gift, confirmed")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar do Supabase:", error);
      } else if (data) {
        setGuests(data as Guest[]);
      }
    } catch (err) {
      console.error("Erro ao buscar convidados:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Inicialização
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      fetchSupabaseGuests();

      // Inscrição em tempo real para atualizações automáticas
      const channel = client
        .channel("guests_channel")
        .on("postgres_changes", { event: "*", schema: "public", table: "guests" }, () => {
          fetchSupabaseGuests();
        })
        .subscribe();

      return () => {
        client.removeChannel(channel);
      };
    }

    // Fallback local se o Supabase não estiver configurado ainda
    const raw = localStorage.getItem(KEY);
    if (raw) {
      try {
        setGuests(JSON.parse(raw));
      } catch {
        // ignore parsing error
      }
    }
    setLocalLoaded(true);
    setIsLoading(false);
    return () => {};
  }, [fetchSupabaseGuests]);

  // Salvar no localStorage quando não estiver usando Supabase
  useEffect(() => {
    if (!isSupabaseConfigured && localLoaded) {
      localStorage.setItem(KEY, JSON.stringify(guests));
    }
  }, [guests, localLoaded]);

  const addGuest = async (name: string, gift: string): Promise<Guest | null> => {
    
    if (isSupabaseConfigured && supabase) {
      try {
        // CRÍTICO: Não enviamos o 'id'. Deixamos o Supabase criar o UUID sozinho!
        const { data, error } = await supabase
          .from("guests")
          .insert([{ name, gift, confirmed: false }])
          .select("id, name, gift, confirmed")
          .single();

        if (error || !data) {
          console.error("Erro ao salvar convidado no Supabase:", error);
          toast.error("Erro ao salvar convidado no Supabase.");
          return null;
        }

        const created = data as Guest;
        setGuests((prev) => [created, ...prev]);
        return created;

      } catch (err) {
        console.error("Erro ao conectar ao Supabase:", err);
        toast.error("Falha ao salvar no banco de dados.");
        return null;
      }
    } else {
      // Criação APENAS local (se o Supabase falhar as chaves)
      const newLocalGuest: Guest = { id: genId(), name, gift, confirmed: false };
      setGuests((prev) => [newLocalGuest, ...prev]);
      return newLocalGuest;
    }
  };

  const confirm = async (id: string): Promise<boolean> => {
    // Atualização otimista imediata na UI
    setGuests((prev) => prev.map((g) => (g.id === id ? { ...g, confirmed: true } : g)));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("guests").update({ confirmed: true }).eq("id", id);

        if (error) {
          console.error("Erro ao confirmar no Supabase:", error);
          toast.error("Erro ao salvar confirmação no banco.");
          return false;
        }
      } catch (err) {
        console.error("Erro ao conectar ao Supabase:", err);
        return false;
      }
    }
    return true;
  };

  const remove = async (id: string): Promise<boolean> => {
    const previous = guests;
    setGuests((prev) => prev.filter((g) => g.id !== id));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from("guests").delete().eq("id", id);
        if (error) {
          console.error("Erro ao excluir no Supabase:", error);
          toast.error("Erro ao excluir do banco de dados.");
          setGuests(previous);
          return false;
        }
      } catch (err) {
        console.error("Erro ao conectar ao Supabase:", err);
        setGuests(previous);
        return false;
      }
    }
    return true;
  };

  return (
    <GuestsCtx.Provider
      value={{
        guests,
        isLoading,
        isUsingSupabase: isSupabaseConfigured,
        addGuest,
        confirm,
        remove,
        refresh: fetchSupabaseGuests,
      }}
    >
      {children}
    </GuestsCtx.Provider>
  );
}

export function useGuests() {
  const c = useContext(GuestsCtx);
  if (!c) throw new Error("useGuests must be inside GuestsProvider");
  return c;
}