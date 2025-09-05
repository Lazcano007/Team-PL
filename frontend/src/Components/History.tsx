import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type SpinRow = {
  _id?: string;
  id?: string;
  userId: string;
  amount: number;
  createdAt: string;
};

export default function History() {
  const [items, setItems] = useState<SpinRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const userId = useMemo(() => {
    let uid = localStorage.getItem("userId");
    if (!uid) {
      uid = "user-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("userId", uid);
    }
    return uid;
  }, []);

  async function load() {
    try {
      setLoading(true);
      setErr(null);

      if (!API_URL) throw new Error("Saknar VITE_API_URL i frontend/.env");

      const res = await fetch(
        `${API_URL}/history/${encodeURIComponent(userId)}`
      );
      const text = await res.text(); // robust parse
      let data: SpinRow[];
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Servern returnerade inte JSON");
      }
      if (!res.ok)
        throw new Error((data as any)?.error || "Kunde inte hämta historik");

      // förväntas redan vara sorterad nyast först i backend
      setItems(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setErr(e?.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [userId]);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-zinc-50">
      <section className="mx-auto max-w-6xl px-4">
        <h1 className="pt-16 text-center text-4xl font-semibold">Historik</h1>

        <div className="mx-auto mt-8 w-full max-w-md rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-400">
              userId: <span className="font-mono">{userId}</span>
            </p>
            <button
              onClick={load}
              className="rounded-lg bg-indigo-200 px-3 py-1.5 text-sm font-semibold hover:bg-indigo-300"
            >
              Uppdatera
            </button>
          </div>

          {loading && <p className="text-xl text-zinc-500">Laddar historik…</p>}
          {err && <p className="text-sm text-red-600">Fel: {err}</p>}

          {!loading && !err && items.length === 0 && (
            <p className="text-zinc-600">
              Inga spins ännu. Lägg en order och snurra hjulet!
            </p>
          )}

          {!loading && !err && items.length > 0 && (
            <ul className="space-y-2 text-xl text-zinc-600">
              {items.map((it, i) => {
                const d = new Date(it.createdAt);
                const date = d.toLocaleDateString("sv-SE");
                const time = d.toLocaleTimeString("sv-SE", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <li key={it._id || it.id || i} className="leading-5">
                    <span className="italic">
                      Vinst: {it.amount} kr — {date} {time}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
