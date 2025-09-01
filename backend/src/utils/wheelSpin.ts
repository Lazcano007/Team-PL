export const prizes = [
    { amount: 10, chance: 50 },
    { amount: 20, chance: 30 },
    { amount: 50, chance: 15 },
    { amount: 100, chance: 4 },
    { amount: 500, chance: 1 },
];

export function wheelSpin(): number {
    const totalChance = prizes.reduce((sum, p) => sum + p.chance, 0);
    let rand = Math.random() * totalChance;
    for (const prize of prizes) {
        if (rand < prize.chance) return prize.amount;
        rand -= prize.chance;
    }
    return prizes[0]?.amount ?? 0;
}
