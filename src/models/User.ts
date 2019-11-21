import mongoose from "mongoose";
export type UserDocument = mongoose.Document & {
    email: string;
    vouchers: {
        value: number;
    }[];
};

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    vouchers: [
        {
            value: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true });

export const User = mongoose.model<UserDocument>("User", userSchema);
