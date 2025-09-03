import {useState} from "react";


export default function OrderForm() {
  const [item, setItem] = useState("Boll");
  const [color, setColor] = useState("Röd");
  const [quantity, setQuantity] = useState(12);
  const [status, setStatus] = useState<string | null>(null);


  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // här kan du senare anropa din backend
    // ex: await postJSON("/api/orders", { item, color, quantity })
    setStatus("Order lagd! (mock)");
  }


  return (
    <main className="min-h-screen bg-zinc-50">
      <section className="mx-auto max-w-6xl px-4">
        <h1 className="pt-20 text-center text-4xl font-semibold">Lägg en order</h1>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-8 w-full max-w-md rounded-2xl border bg-white p-6 shadow">
          <label className="block text-sm font-semibold">Vara</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 outline-none"value={item}onChange={(e) => setItem(e.target.value)}/>

          <label className="mt-4 block text-sm font-semibold">Färg</label>
          <input className="mt-1 w-full rounded-md border px-3 py-2 outline-none"value={color}onChange={(e) => setColor(e.target.value)}/>

          <label className="mt-4 block text-sm font-semibold">Antal</label>
          <input type="number" className="mt-1 w-full rounded-md border px-3 py-2 outline-none"value={quantity}onChange={(e) => setQuantity(Number(e.target.value))}min={1}/>

          <button type="submit" className="mt-6 w-full rounded-xl bg-indigo-200 px-4 py-2 text-sm font-semibold hover:bg-indigo-300">Lägg order</button>

          {status && ( <p className="mt-6 text-center text-sm italic text-zinc-600">{status}</p>)}
        </form>
      </section>
    </main>
  );
}