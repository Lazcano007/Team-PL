export const prizes = [
  { amount: 10, chance: 50 },
  { amount: 20, chance: 30 },
  { amount: 50, chance: 15 },
  { amount: 100, chance: 4 },
  { amount: 500, chance: 1 },
];

export function wheelSpin(): number {
  const totalChance = prizes.reduce((sum, p) => sum + p.chance, 0); // summerara alla chanser
  let rand = Math.random() * totalChance;  // väljer en slumpmässig siffra mellan 0 och totalChange

    for (const prize of prizes) {
      rand -= prize.chance;  //Om rand blir mindre än 0, returneras det prisets belopp.
      if (rand < 0) return prize.amount;
    }

  return prizes[0]?.amount ?? 0;  //Returnerar det första prisets belopp 
}
