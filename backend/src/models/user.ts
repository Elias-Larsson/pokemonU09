import mongoose, { Schema } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    id: Number,
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    victoryCount: { type: Number, default: 0 },
    defeatCount: { type: Number, default: 0 },
    favoritePakaman: { type: String, default: null },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model(
  "User", 
  userSchema
);

export default User;
