const express = require("express");
const helmet = require("helmet");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");

require("dotenv").config();

// database setup
const db = require("./db/mongodb.js");
const models = require("./db/models/index.js");
const DB_HOST = process.env.MONGO_WRITER_URI;

// graphql setup
const typeDefs = require("./gql/schema/schema.js");
const resolvers = require("./gql/resolvers/index.js");

// app setup
const PORT = process.env.PORT || 3030;
const app = express();
app.use(helmet());  // default config for common security practices


// get user info from jwt
const getUser = token => {
  if (token === undefined) {
    return;
  }
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch(e) {
    // if token doesn't verify, we get INTERNAL_SERVER_ERROR
    // "Context creation failed: Invalid session."
    // this may not be the way we want to handle an invalid token
    throw new Error(`Invalid session.`);
  }
};

db.connect(DB_HOST);

app.get("/", (req, res) => res.send(`Hello World!`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  }
});
server.applyMiddleware({ app, "path": "/api" });

app.listen(PORT, () => console.log(`GraphQL listening on port ${PORT}!`));
