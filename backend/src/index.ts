import express from 'express';
import mongoose from 'mongoose';
import connectDB from "./database/db";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());

app.listen(PORT, async () => {
//   await connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});
