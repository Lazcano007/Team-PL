import { useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function OrderForm() {
  const [item, setItem] = useState("Boll");
  const [color, setColor] = useState("Röd");
  const [quantity, setQuantity] = useState(12);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [spins, setSpins] = useState<number | null>(null);

  // Spara/hämta userId i localStorage
  const userId = useMemo(() => {
    let uid = localStorage.getItem("userId");
    if (!uid) {
      uid = "user-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("userId", uid);
    }
    return uid;
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    // enkel validering
    if (!quantity || Number.isNaN(quantity) || quantity < 1) {
      setStatus("Ange ett giltigt antal (minst 1).");
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      if (!API_URL) throw new Error("Saknar VITE_API_URL i frontend/.env");

      const id = Date.now().toString(); // enkelt order-id

      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Backend kräver { id, userId }. Vi skickar även dina fält.
        body: JSON.stringify({ id, userId, item, color, quantity }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Kunde inte skapa order");

      setStatus(data.message ?? "Order skapad! Du fick ett spinn.");
      if (typeof data.spins === "number") setSpins(data.spins);
    } catch (err: any) {
      setStatus(err?.message || "Något gick fel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-shade-50 cursor-default">
      <section className="flex flex-col gap-8 p-20 mx-auto max-w-6xl px-4">
        <h1 className="text-center text-4xl font-extrabold">Lägg en order</h1>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 mx-auto w-full max-w-md rounded-xl p-6 shadow-[0_5px_4px_0_#00000040] border-1 border-[#c6bfbf]"
        >
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Vara</label>
            <input
              className="w-full rounded-xl border-1 border-[#c6bfbf] px-3 py-2 outline-none shadow-[0_5px_4px_0_#00000040]"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Färg</label>
            <input
              className="w-full rounded-xl border-1 border-[#c6bfbf] px-3 py-2 outline-none shadow-[0_5px_4px_0_#00000040]"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Antal</label>
            <input
              type="number"
              min={1}
              className="w-full rounded-xl border-1 border-[#c6bfbf] px-3 py-2 outline-none shadow-[0_5px_4px_0_#00000040]"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          {/* 👇 fix: mellanslag före de conditionella klasserna */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl px-4 py-2 font-bold cursor-pointer ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-indigo-200 hover:bg-indigo-300"
            }`}
          >
            {loading ? "Skickar..." : "Lägg order"}
          </button>

          <p className="text-xs text-center text-zinc-400">
            userId: <span className="font-mono">{userId}</span>
          </p>
        </form>

        {status && (
          <p className="text-center italic text-zinc-800">
            {status}{" "}
            {spins !== null && (
              <span>
                (Du har nu <b>{spins}</b> spin/s)
              </span>
            )}
          </p>
        )}
      </section>
    </main>
  );
}
