import express from 'express';
import mongoose from 'mongoose';
import connectDB from "./database/db";
import dotenv from 'dotenv';
import { User } from './model/userInterface';
import { Order } from './model/orderInterface';
import { Spin } from './model/spinInterface';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.listen(PORT, async () => {
//   await connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});

app.post("/order", async (req, res) => {
   
  const { id, userId } = req.body;
  
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
});
