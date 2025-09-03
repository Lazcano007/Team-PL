import Button from "./Button";

export default function Spin() {
    function handleClick() {
        alert("Nu snurrar vi");
    }

return (

    <main className="min-h-screen bg-zinc-50 flex items-center justify-center py-20">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow">
        <h1 className="text-2xl font-semibold mb-4 text-center">Snurra hjul</h1>
        <Button onClick={handleClick}>Snurra</Button>
      </div>
    </main>
  );


}