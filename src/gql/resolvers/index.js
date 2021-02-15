const Query = require("./query.js");
const Mutation = require("./mutation.js");
const Challenge = require("./challenge.js");
const User = require("./user.js");

const { GraphQLDateTime } = require("graphql-iso-date");
  
module.exports = {
  Query,
  Mutation,
  Challenge,
  User,
  "DateTime": GraphQLDateTime
};
