import { useState, useEffect, useRef } from "react";
import Button from "./Button";

type SpinResult = {
  message: string;
  spinsLeft: number;
  amount?: number;
};

const USER_ID = "user123"; // test-user

// Priser med färg, matchar med backend
const prizes = [
  { amount: 500, color: "#f87171" },
  { amount: 100, color: "#fbbf24" },
  { amount: 50, color: "#34d399" },
  { amount: 20, color: "#60a5fa" },
  { amount: 10, color: "#a78bfa" },
];

// Visa belopp på wheel
const displayAmounts = [10, 20, 50, 100, 500];

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

export default function Spin() {
  const [spinsLeft, setSpinsLeft] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

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

      {/* Hjulet */}
      <div className="relative size-96">
        <div
          ref={wheelRef}
          className="w-full h-full rounded-full overflow-hidden relative"
          style={{
            background: `conic-gradient(${prizes.map((p, i) =>
              `${p.color} ${i * (100 / prizes.length)}% ${(i + 1) * (100 / prizes.length)}%`
            ).join(",")})`
          }}
        >
          {displayAmounts.map((amount, i) => {
            const angle = (360 / prizes.length) * i + 360 / prizes.length / 2;
            return (
              <div
                key={i}
                className="absolute text-sm font-bold text-white"
                style={{
                  top: "45%",
                  left: "45%",
                  transform: `rotate(${angle}deg) translate(0, -600%)`,
                  transformOrigin: "center bottom",
                }}
              >
                {amount}kr
              </div>
            );
          })}
        </div>
      </div>

      <Button onClick={() => {}}>Snurra</Button>
      {result && (
        <p className="mt-4 text-center italic text-zinc-700">{result}</p>
      )}
    </div>
  );
}
