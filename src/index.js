const express = require("express");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config();

const db = require("./db/mongodb.js");
const models = require("./db/models/challenge.js");

const typeDefs = require("./gql/schema/schema.js");
const resolvers = require("./gql/resolvers/index.js");

const app = express();
const PORT = process.env.PORT || 3030;
const DB_HOST = process.env.MONGO_WRITER_URI;

db.connect(DB_HOST);

app.get("/", (req, res) => res.send(`Hello World!`));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, "path": "/api" });

app.listen(PORT, () => console.log(`GraphQL listening on port ${PORT}!`));
