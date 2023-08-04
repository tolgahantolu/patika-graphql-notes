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
  createComment: async (_, { data }, context) => {
    const newComment = new context._db.Comment(data);
    const comment = await newComment.save();

    const post = await context._db.Post.findById(
      new mongoose.Types.ObjectId(data.post)
    );
    const user = await context._db.User.findById(
      new mongoose.Types.ObjectId(data.user)
    );

    user.comments.push(comment.id);
    post.comments.push(comment.id);

    await user.save();
    await post.save();

    return comment;
  },
  updateComment: async (_, { id, data }, context) => {
    const isCommentExist = await context._db.Comment.findById(id);

    if (!isCommentExist) throw new Error("Comment not found!");

    const updatedComment = await context._db.Comment.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
      }
    );

    return updatedComment;
  },
  deleteComment: async (_, { id }, context) => {
    const isCommentExist = await context._db.Comment.findById(id);

    if (!isCommentExist) throw new Error("Comment not found!");

    const deletedComment = await context._db.Comment.findByIdAndDelete(id);

    const user = await context._db.User.findById(
      new mongoose.Types.ObjectId(deletedComment.user)
    );
    const post = await context._db.Post.findById(
      new mongoose.Types.ObjectId(deletedComment.post)
    );

    user.comments.pop(id);
    post.comments.pop(id);
    user.save();
    post.save();

    return deletedComment;
  },
  deleteAllComments: async (_, __, context) => {
    const deleteComments = await context._db.Comment.deleteMany({});

    return {
      count: deleteComments.deletedCount,
    };
  },
};
