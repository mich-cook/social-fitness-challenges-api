const express = require("express");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config();

// database setup
const db = require("./db/mongodb.js");
const models = require("./db/models/challenge.js");
const DB_HOST = process.env.MONGO_WRITER_URI;

// graphql setup
const typeDefs = require("./gql/schema/schema.js");
const resolvers = require("./gql/resolvers/index.js");

// app setup
const app = express();
const PORT = process.env.PORT || 3030;

db.connect(DB_HOST);

app.get("/", (req, res) => res.send(`Hello World!`));

const server = new ApolloServer({ typeDefs, resolvers, context: () => { return { models }; } });
server.applyMiddleware({ app, "path": "/api" });

app.listen(PORT, () => console.log(`GraphQL listening on port ${PORT}!`));
