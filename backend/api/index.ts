import express from 'express';
import mongoose from 'mongoose';
import connectDB from "../database/db";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
connectDB();
app.use(express.json());