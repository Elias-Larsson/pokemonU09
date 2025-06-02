import mongoose, { Schema } from "mongoose";

export const googleSchema = new mongoose.Schema({
  googleId: { type: Schema.Types.String },
  displayName: { type: Schema.Types.String },
  email: { type: Schema.Types.String },
  profilePhoto: { type: Schema.Types.String },
});

const GoogleUser = mongoose.model("GoogleUser", googleSchema);

export default GoogleUser;
