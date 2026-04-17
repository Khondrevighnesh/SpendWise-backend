import mongoose, { Schema, Document } from "mongoose";

export interface IBudget extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  month: string; // "2026-04"
}

const budgetSchema = new Schema<IBudget>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    month: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IBudget>("Budget", budgetSchema);