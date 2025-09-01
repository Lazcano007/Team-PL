import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
    id: string;
    name: string;
    spins: number;
}

const userSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    spins: { type: Number, default: 0 },
});

export const User = mongoose.model<IUser>("User", userSchema);
