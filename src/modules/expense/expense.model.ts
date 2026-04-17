import mongoose, { Schema, Document } from "mongoose";

export interface IExpense extends Document {
  userId: mongoose.Types.ObjectId;
  groupId?: mongoose.Types.ObjectId;

  amount: number;
  category: string;
  description?: string;

  status: "pending" | "approved" | "rejected" | "auto";

  approvedBy?: mongoose.Types.ObjectId;
  rejectedBy?: mongoose.Types.ObjectId;

  signature?: string; // base64 or text signature

  createdAt: Date;
  updatedAt: Date;
}

const expenseSchema = new Schema<IExpense>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null
    },

    amount: { type: Number, required: true },

    category: { type: String, required: true },

    description: { type: String },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "auto"],
      default: "auto"
    },

    // 👑 Who approved
    approvedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // ❌ Who rejected
    rejectedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    // ✍️ Digital signature
    signature: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IExpense>("Expense", expenseSchema);