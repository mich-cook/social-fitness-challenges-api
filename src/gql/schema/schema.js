const { gql } = require("apollo-server-express");

module.exports = gql`

  scalar DateTime

  type Challenge {
    id: ID!
    teams: Boolean
    isPrivate: Boolean
    start: String!
    cutoff: String!
    end: String!
    metrics: String!
    deleted: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    challenges: [ Challenge! ]!
    challenge(id: ID!): Challenge!
  }

  type Mutation {
    newChallenge(start: String!, end: String!, cutoff: String!, metrics: String!): Challenge!
    updateChallenge(id: ID!, start: String!): Challenge!
    deleteChallenge(id: ID!): Boolean!
  }

`;
