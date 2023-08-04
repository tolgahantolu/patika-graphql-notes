import { nanoid } from "nanoid";
import mongoose from "mongoose";

export const Mutation = {
  createUser: async (_, { data }, context) => {
    const newUser = new context._db.User({
      ...data,
    });

    const user = await newUser.save();

    context.pubsub.publish("userCreated", { userCreated: user });
    return user;
  },
  updateUser: async (_, { id, data }, context) => {
    const isUserExist = await context._db.User.findById(id);

    if (!isUserExist) throw new Error("User not found!");

    const updatedUser = await context._db.User.findByIdAndUpdate(id, data, {
      new: true,
    });

    context.pubsub.publish("userUpdated", { userUpdated: updatedUser });

    return updatedUser;
  },
  deleteUser: async (_, { id }, context) => {
    const isUserExist = await context._db.User.findById(id);

    if (!isUserExist) throw new Error("User not found!");

    const deletedUser = await context._db.User.findByIdAndDelete(id);

    context.pubsub.publish("userDeleted", { userDeleted: deletedUser });

    return deletedUser;
  },
  deleteAllUsers: async (_, __, context) => {
    const deleteUsers = await context._db.User.deleteMany({});

    return {
      count: deleteUsers.deletedCount,
    };
  },
  createPost: async (_, { data }, context) => {
    const newPost = new context._db.Post({ ...data });
    const post = await newPost.save();

    const user = await context._db.User.findById(
      new mongoose.Types.ObjectId(data.user)
    );
    user.posts.push(post.id);
    user.save();

    return post;
  },
  updatePost: async (_, { id, data }, context) => {
    const isPostExist = await context._db.Post.findById(id);

    if (!isPostExist) throw new Error("Post not found!");

    const updatedPost = await context._db.Post.findByIdAndUpdate(id, data, {
      new: true,
    });

    return updatedPost;
  },
  deletePost: async (_, { id }, context) => {
    const isPostExist = await context._db.Post.findById(id);

    if (!isPostExist) throw new Error("Post not found!");

    const deletedPost = await context._db.Post.findByIdAndDelete(id);
    const user = await context._db.User.findById(
      new mongoose.Types.ObjectId(deletedPost.user)
    );
    user.posts.pop(id);
    user.save();

    return deletedPost;
  },
  deleteAllPosts: async (_, __, context) => {
    const deleteUsers = await context._db.Post.deleteMany({});

    return {
      count: deleteUsers.deletedCount,
    };
  },
  createComment: (_, { data }, context) => {
    const comment = { id: nanoid(), ...data };
    context.db.comments.push(comment);
    return comment;
  },
  updateComment: (_, { id, data }, context) => {
    const commentIndex = context.db.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) throw new Error("Comment not found!");
    const updatedComment = (context.db.comments[commentIndex] = {
      ...context.db.comments[commentIndex],
      ...data,
    });

    return updatedComment;
  },
  deleteComment: (_, { id }, context) => {
    const commentIndex = context.db.comments.findIndex(
      (comment) => comment.id === id
    );
    if (commentIndex === -1) throw new Error("Comment not found!");
    const deletedComment = context.db.comments[commentIndex];
    context.db.comments.splice(commentIndex, 1);
    return deletedComment;
  },
  deleteAllComments: () => {
    const length = context.db.comments.length;
    context.db.comments.splice(0, length);

    return {
      count: length,
    };
  },
};
