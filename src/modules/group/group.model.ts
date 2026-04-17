import mongoose, { Schema } from "mongoose";

const groupSchema = new Schema({
  name: String,

  admin: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

export default mongoose.model("Group", groupSchema);