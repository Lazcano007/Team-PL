import mongoose, { Document, Schema } from "mongoose";

export interface Iorder extends Document {
    id: string;
    userId: string;
    createdAt: Date;
}

const orderSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<Iorder>("Order", orderSchema);