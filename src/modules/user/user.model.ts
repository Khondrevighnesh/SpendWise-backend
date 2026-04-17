import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  isPersonal: boolean;
  groupId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },

    isPersonal: {
      type: Boolean,
      default: true
    },

    groupId: {
      type: Schema.Types.ObjectId,
      ref: "Group",
      default: null
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);