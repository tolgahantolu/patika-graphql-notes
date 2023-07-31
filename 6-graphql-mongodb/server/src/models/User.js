import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  profilePhoto: String,
});

export default model("User", UserSchema);
