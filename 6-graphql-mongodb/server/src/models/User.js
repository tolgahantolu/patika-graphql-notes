import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  fullname: { type: String, required: true },
  age: { type: Number, required: true },
  profilePhoto: String,
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

export default model("User", UserSchema);
