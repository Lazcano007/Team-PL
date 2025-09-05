import express from "express";
import mongoose from "mongoose";
import connectDB from "./database/db";
import dotenv from "dotenv";
import { User } from "./model/userModel";
import { Order } from "./model/orderModel";
import { Spin } from "./model/spinModel";
import { wheelSpin } from "./utils/wheelSpin";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.listen(PORT, async () => {
  //   await connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Endpoint för att skapa en order och tilldela användaren ett spinn
app.post("/order", async (req, res) => {
  const { id, userId } = req.body;
  try {
    if (!id || !userId)
      return res.status(400).json({ error: "id och userId krävs" });

    let user = await User.findOne({ id: userId });

    if (!user) {
      user = new User({ id: userId, name: `User ${userId}`, spins: 0 }); // Skapa en ny användare om den inte finns
      await user.save();
    }

    const order = new Order({ id, userId, createdAt: new Date() }); // Skapa en ny order
    await order.save();

    user.spins += 1; // Spinn tilldelas
    await user.save();

    res.json({ message: "Bra jobbat, du fick ett spinn", spins: user.spins });
  } catch (err) {
    console.error("POST /order error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint för att göra ett spin
app.post("/spin", async (req, res) => {
  const { id, userId } = req.body;
  if (!id || !userId)
    return res.status(400).json({ error: "id och userId krävs" });

  const user = await User.findOne({ id: userId });
  if (!user || user.spins <= 0)
    return res
      .status(400)
      .json({ error: "Du har inga spins, skapa en order för att få en" });

  user.spins -= 1; // Spinn försvinner
  await user.save();

  const amount = wheelSpin();
  const spin = new Spin({ id, userId, amount, createdAt: new Date() });
  await spin.save();

  res.json({
    message: `Grattis, du vann ${amount} kr!`,
    amount: amount,
    spinsLeft: user.spins,
  });
});

// Endpoint för att visa antal spinns som är kvar
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ id: userId });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ spins: user.spins });
});

// Endpoint för att hämta historik
app.get("/history/:userId", async (req, res) => {
  const { userId } = req.params;
  const spinHistory = await Spin.find({ userId }).sort({ createdAt: -1 }); // Nyast spinn är först

  res.json(spinHistory);
});
