import { useState, useEffect } from "react";
import Button from "./Button";

type SpinResult = {
  message: string;
  spinsLeft: number;
  amount?: number;
};

const USER_ID = "user123"; // test-user för projektet
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export default function Spin() {
  const [spinsLeft, setSpinsLeft] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Hämta spins från backend
  useEffect(() => {
    async function fetchSpins() {
      try {
        const res = await fetch(`${API_URL}user/${USER_ID}`);
        const data = await res.json();
        if (data.spins !== undefined) setSpinsLeft(data.spins);
      } catch (err) {
        console.error("Kunde inte hämta spins:", err);
      }
    }
    fetchSpins();
  }, []);

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6">
      <p className="text-center text-zinc-600">Spins kvar: {spinsLeft}</p>
      <Button onClick={() => {}}>Snurra</Button>
      {result && (
        <p className="mt-4 text-center italic text-zinc-700">{result}</p>
      )}
    </div>
  );
}
