import History from "../Components/History";

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-shade-50 cursor-default flex flex-col gap-6 p-8 items-center">
      <h1 className="text-center text-4xl font-extrabold">Historik</h1>
      <History />
    </div>
  );
}
