import mongoose, { Schema, Document } from "mongoose";

export interface googleUserType extends Document {
  _id: string;
  googleId: string;
  displayName: string;
  email: string;
  profilePhoto: string;
  username?: string | null;
}

export const googleSchema = new mongoose.Schema({
  googleId: { type: Schema.Types.String },
  displayName: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  profilePhoto: { type: Schema.Types.String },
  username: { type: String, default: null },
  victoryCount: { type: Number, default: 0},
  defeatCount: { type: Number, default: 0},
});

const GoogleUser = mongoose.model("GoogleUser", googleSchema);

export default GoogleUser;
