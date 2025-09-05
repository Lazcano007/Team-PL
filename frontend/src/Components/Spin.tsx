import { useState } from "react";
import Button from "./Button";

type SpinResult = {
  message: string;
  spinsLeft: number;
  amount?: number;
};

export default function Spin() {
  const [spinsLeft, setSpinsLeft] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
