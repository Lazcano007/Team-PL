import OrderForm from "../Components/OrderForm";

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-shade-50 cursor-default">
      <section className="flex flex-col gap-8 p-20 mx-auto max-w-6xl px-4">
        <h1 className="text-center text-4xl font-extrabold">Lägg en order</h1>

        <OrderForm />
      </section>
    </main>
  );
}
