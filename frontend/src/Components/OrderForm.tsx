import { useState } from "react";

export default function OrderForm() {
  const [item, setItem] = useState("Boll");
  const [color, setColor] = useState("Röd");
  const [quantity, setQuantity] = useState(12);
  const [status, setStatus] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // här kan du senare anropa din backend
    // ex: await postJSON("/api/orders", { item, color, quantity })
    setStatus("Du fick ett spin!");
  }

  return (
    <main className="min-h-screen bg-shade-50 cursor-default">
      <section className="flex flex-col gap-8 p-20 mx-auto max-w-6xl px-4">
        <h1 className="text-center text-4xl font-extrabold">Lägg en order</h1>

        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-6 mx-auto w-full max-w-md rounded-xl p-6 
     shadow-[0_5px_4px_0_#00000040] 
     border-1 border-[#c6bfbf]"
        >
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Vara</label>

            <input
              className="w-full rounded-xl border-1 border-[#c6bfbf] 
             px-3 py-2 outline-none 
             shadow-[0_5px_4px_0_#00000040]"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Färg</label>
            <input
              className="w-full rounded-xl border-1 border-[#c6bfbf] 
             px-3 py-2 outline-none 
             shadow-[0_5px_4px_0_#00000040]"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold">Antal</label>
            <input
              type="number"
              className="w-full rounded-xl border-1 border-[#c6bfbf] 
             px-3 py-2 outline-none 
             shadow-[0_5px_4px_0_#00000040]"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min={1}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-200 px-4 py-2 font-bold hover:bg-indigo-300 cursor-pointer"
          >
            Lägg order
          </button>
        </form>
        {status && <p className="text-center italic text-zinc-800">{status}</p>}
      </section>
    </main>
  );
}
