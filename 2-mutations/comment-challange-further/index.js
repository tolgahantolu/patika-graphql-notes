const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { nanoid } = require("nanoid");
const { users, posts, comments } = require("./data");

const typeDefs = gql`
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
    createPost(data: CreatePostInput!): Post!
    updatePost(id: ID!, data: UpdatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
    updateComment(id: ID!, data: UpdateCommentInput!): Comment!
  }
`;

const resolvers = {
  Mutation: {
    createUser: (parent, { data }) => {
      const user = { id: nanoid(), ...data };
      users.push(user);
      return user;
    },
    updateUser: (_, { id, data }) => {
      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) throw new Error("User not found!");

      const updatedUser = (users[userIndex] = {
        ...users[userIndex],
        ...data,
      });

      return updatedUser;
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      // options
    }),
  ],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
