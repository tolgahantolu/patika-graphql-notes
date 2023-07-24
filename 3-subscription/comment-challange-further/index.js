const { GraphQLServer, PubSub, withFilter } = require("graphql-yoga");
const { nanoid } = require("nanoid");
const { users, posts, comments } = require("./data");

const typeDefs = `
  type User {
    id: ID!
    fullname: String!
    age: Int!
    posts: [Post!]!
    comments: [Comment!]
  }

  input CreateUserInput {
    fullname: String!
    age: Int!
  }

  input UpdateUserInput {
    fullname: String
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    user_id: ID!
    user: User!
    comments: [Comment!]
  }

  input CreatePostInput {
    title: String!
    user_id: ID!
  }

  input UpdatePostInput {
    title: String
    user_id: ID
  }

  type Comment {
    id: ID!
    text: String!
    post_id: ID!
    user: User!
    post: Post!
  }

  input CreateCommentInput {
    text: String!
    post_id: ID!
    user_id: ID!
  }

  input UpdateCommentInput {
    text: String
    post_id: ID
    user_id: ID
  }

  type DeleteAllOutput {
    count: Int!
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User!
    getPosts: [Post!]!
    getPost(id: ID!): Post!
    getComments: [Comment!]!
    getComment(id: ID!): Comment!
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    updateUser(id: ID!, data: UpdateUserInput!): User!
    deleteUser(id: ID!): User!
    deleteAllUsers: DeleteAllOutput!

    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    deletePost(id: ID!): Post!
    deleteAllPosts: DeleteAllOutput!

    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
    deleteComment(id: ID!): Comment!
    deleteAllComments: DeleteAllOutput!
  }

  type Subscription {
	userCreated: User!
	userUpdated: User!
	userDeleted: User!

	postCreated(user_id: ID): Post!
}
`;

const resolvers = {
  Subscription: {
    userCreated: {
      subscribe: (_, __, context) =>
        context.pubsub.asyncIterator("userCreated"),
    },
    userUpdated: {
      subscribe: (_, __, context) =>
        context.pubsub.asyncIterator("userUpdated"),
    },
    userDeleted: {
      subscribe: (_, __, context) =>
        context.pubsub.asyncIterator("userDeleted"),
    },

    postCreated: {
      subscribe: withFilter(
        (_, __, context) => context.pubsub.asyncIterator("userCreated"),
        (payload, variables) => {
          console.log("payload", payload);
          console.log("variables", variables);

          return variables.user_id
            ? payload.postCreated.user_id === variables.user_id
            : true;
        }
      ),
    },
  },
  Mutation: {
    createUser: (parent, { data }, context) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      context.pubsub.publish("userCreated", { userCreated: user });
      return user;
    },
    updateUser: (_, { id, data }, context) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error("User not found!");

      const updatedUser = (users[userIndex] = {
        ...users[userIndex],
        ...data,
      });

      context.pubsub.publish("userUpdated", { userUpdated: updatedUser });

      return updatedUser;
    },
    deleteUser: (_, { id }, context) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error("User not found!");
      const deletedUser = users[userIndex];
      users.splice(userIndex, 1);

      context.pubsub.publish("userDeleted", { userDeleted: deletedUser });

      return deletedUser;
    },
    deleteAllUsers: () => {
      const length = users.length;
      users.splice(0, length);

      return {
        count: length,
      };
    },
    createPost: (_, { data }) => {
      const post = { id: nanoid(), ...data };
      posts.push(post);
      return post;
    },
    updatePost: (_, { id, data }) => {
      const postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) throw new Error("Post not found!");
      const updatedPost = (posts[postIndex] = {
        ...posts[postIndex],
        ...data,
      });

      return updatedPost;
    },
    deletePost: (_, { id }) => {
      const postIndex = posts.findIndex((post) => post.id === id);
      if (postIndex === -1) throw new Error("Post not found!");
      const deletedPost = posts[postIndex];
      posts.splice(postIndex, 1);
      return deletedPost;
    },
    deleteAllPosts: () => {
      const length = posts.length;
      posts.splice(0, length);

      return {
        count: length,
      };
    },
    createComment: (_, { data }) => {
      const comment = { id: nanoid(), ...data };
      comments.push(comment);
      return comment;
    },
    updateComment: (_, { id, data }) => {
      const commentIndex = comments.findIndex((comment) => comment.id === id);
      if (commentIndex === -1) throw new Error("Comment not found!");
      const updatedComment = (comments[commentIndex] = {
        ...comments[commentIndex],
        ...data,
      });

      return updatedComment;
    },
    deleteComment: (_, { id }) => {
      const commentIndex = comments.findIndex((comment) => comment.id === id);
      if (commentIndex === -1) throw new Error("Comment not found!");
      const deletedComment = comments[commentIndex];
      comments.splice(commentIndex, 1);
      return deletedComment;
    },
    deleteAllComments: () => {
      const length = comments.length;
      comments.splice(0, length);

      return {
        count: length,
      };
    },
  },
  Query: {
    getUsers: () => users,
    getUser: (_, { id }) => users.find((user) => user.id === id),
    getPosts: () => posts,
    getPost: (_, { id }) => posts.find((post) => post.id === id),
    getComments: () => comments,
    getComment: (_, { id }) => comments.find((comment) => comment.id === id),
  },
  User: {
    posts: (parent, args) => posts.filter((post) => post.user_id === parent.id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.user_id === parent.id),
  },
  Post: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    comments: (parent, args) =>
      comments.filter((comment) => comment.post_id === parent.id),
  },
  Comment: {
    user: (parent, args) => users.find((user) => user.id === parent.user_id),
    post: (parent, args) => posts.find((post) => post.id === parent.post_id),
  },
};

const pubsub = new PubSub(); // websocket'e bunun sayesinde erişiyoruz
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log("Server is running on localhost:4000"));
