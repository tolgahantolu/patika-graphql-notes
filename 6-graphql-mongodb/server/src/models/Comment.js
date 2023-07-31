import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
});

export default model("Comment", CommentSchema);
