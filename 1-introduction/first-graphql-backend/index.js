const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");

const author = {
  id: "1",
  name: "Albert",
  surname: "Camus",
  age: 62,
  books: [
    {
      id: "4445asdasd8874fbf4j",
      title: "Test Title",
      rate: 4.7,
      isPublished: false,
    },
    {
      id: "8aad774ngfyd4",
      title: "Deneme Yap",
      rate: 5.9,
      isPublished: true,
    },
  ],
};
const books = [
  {
    id: "as2asd15475fer4ad",
    title: "Yabancı",
    author: author,
    rate: 6.4,
    isPublished: true,
  },
];

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    surname: String!
    age: Int
    books: [Book!]
  }

  type Book {
    id: ID!
    title: String!
    author: Author!
    rate: Float
    isPublished: Boolean
  }

  type Query {
    getBooks: [Book]
    getAuthor: Author
  }
`;

const resolvers = {
  Query: {
    getBooks: () => books,
    getAuthor: () => author,
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

server.listen().then(() => console.log("Apollo server is up!"));
