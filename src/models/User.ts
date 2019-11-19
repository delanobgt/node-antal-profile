import mongoose from "mongoose";

export type UserDocument = mongoose.Document & {
    email: string;
};

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
