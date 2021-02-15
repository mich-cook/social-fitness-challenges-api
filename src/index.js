const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { ApolloServer } = require("apollo-server-express");
const depthLimit = require("graphql-depth-limit");
const { createComplexityLimitRule } = require("graphql-validation-complexity");

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
// TODO: configure helmet so it can be used with gql playground
// app.use(helmet());  // default config for common security practices
app.use(cors());  // currently wide open, but we'll update for production


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
  "validationRules": [ depthLimit(5), createComplexityLimitRule(1000) ],
  "context": ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    return { models, user };
  }
});
server.applyMiddleware({ app, "path": "/api" });

app.listen(PORT, () => console.log(`GraphQL listening on port ${PORT}!`));
