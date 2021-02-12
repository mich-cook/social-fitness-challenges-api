const express = require("express");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config();

const typeDefs = require("./gql/schema/schema.js");
const resolvers = require("./gql/resolvers/index.js");

const app = express();
const PORT = process.env.PORT || 3030;

app.get("/", (req, res) => res.send(`Hello World!`));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, "path": "/api" });

app.listen(PORT, () => console.log(`GraphQL listening on port ${PORT}!`));
