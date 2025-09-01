export const prizes = [
    { amount: 10, weight: 50 },
    { amount: 20, weight: 30 },
    { amount: 50, weight: 15 },
    { amount: 100, weight: 4 },
    { amount: 500, weight: 1 },
];

export function wheelSpin(): number {
    const totalWeight = prizes.reduce((sum, p) => sum + p.weight, 0);
    let rand = Math.random() * totalWeight;
    for (const prize of prizes) {
        if (rand < prize.weight) return prize.amount;
        rand -= prize.weight;
    }
    return prizes[0]?.amount ?? 0;
}
