const { ApolloServer, gql } = require("apollo-server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const { authors, books } = require("./data");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    surname: String!
    age: Int
    books(filter: String): [Book!]
  }

  type Book {
    id: ID!
    title: String!
    author: Author
    author_id: String!
    rate: Float
    isPublished: Boolean
  }

  type Query {
    getBooks: [Book!]
    getBook(id: ID!): Book!
    getAuthors: [Author!]
    getAuthor(id: ID!): Author!
  }
`;

const resolvers = {
  Query: {
    getBooks: () => books,
    getBook: (parent, args) => books.find((book) => book.id === args.id),
    getAuthors: () => authors,
    getAuthor: (_, { id }) => authors.find((author) => author.id === id),
  },
  Book: {
    author: (parent, args) =>
      authors.find((author) => author.id === parent.author_id),
  },
  Author: {
    books: (parent, args) => {
      let filtered = books.filter((book) => book.author_id === parent.id);

      if (args.filter) {
        filtered = filtered.filter(
          (book) => book.title.toLowerCase().startsWith(args.filter) // bu "filter" type Author'dan geliyor
        );
      }

      return filtered;
    },
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
