import { useEffect, useState } from "react";

type HistoryItem = {
  spin: number;
  amount: number;
  date: string;
};

const MOCK: HistoryItem[] = [
  { spin: 5, amount: 10, date: "2025-09-02" },
  { spin: 4, amount: 100, date: "2025-09-02" },
  { spin: 3, amount: 50, date: "2025-09-01" },
  { spin: 2, amount: 20, date: "2025-08-30" },
  { spin: 1, amount: 10, date: "2025-08-28" },
];

export default function History() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    // simulera API-anrop med mock
    setTimeout(() => {
      setItems(MOCK);
      setLoading(false);
    }, 300);
  }, []);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-zinc-50">
      <section className="mx-auto max-w-6xl px-4">
        <h1 className="pt-16 text-center text-4xl font-semibold">Historik</h1>

        <div className="mx-auto mt-8 w-full max-w-md rounded-xl border bg-white p-5 shadow-sm">
          {loading && <p className="text-xl text-zinc-500">Laddar historik…</p>}
          {err && <p className="text-sm text-red-600">Fel: {err}</p>}

          {!loading && !err && (
            <ul className="space-y-2 text-xl text-zinc-600">
              {items.map((it, i) => (
                <li key={i} className="leading-5">
                  <span className="italic">Spin: {it.spin}, Vinst: {it.amount} kr — {it.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
