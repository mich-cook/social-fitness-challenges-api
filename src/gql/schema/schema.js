const { gql } = require("apollo-server-express");

module.exports = gql`

  type Challenge {
    id: ID!
    teams: Boolean
    isPrivate: Boolean
    start: String!
    cutoff: String!
    end: String!
    metrics: String!
  }

  type Query {
    challenges: [ Challenge! ]!
    challenge(id: ID!): Challenge!
  }

  type Mutation {
    newChallenge(start: String!, end: String!, cutoff: String!, metrics: String!): Challenge!
  }

`;
