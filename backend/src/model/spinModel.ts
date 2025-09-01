import mongoose, { Document, Schema } from "mongoose";

export interface ISpin extends Document {
    id: string;
    userId: string;
    amount: number;
    createdAt: Date;
}

const spinSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});


export const Spin = mongoose.model<ISpin>("Spin", spinSchema);