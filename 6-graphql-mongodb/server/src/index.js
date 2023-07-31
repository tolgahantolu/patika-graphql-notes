import { GraphQLServer, PubSub } from "graphql-yoga";
import resolvers from "@resolvers";
import typeDefs from "@typeDefs";

const pubsub = new PubSub(); // websocket'e bunun sayesinde erişiyoruz

// MONGODB
import db from "./db";
db();

// DUMMY DATA
import data from "./data";

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: { pubsub, db: data },
});

server.start(() => console.log("Server is running on localhost:4000"));
