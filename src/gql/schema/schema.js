const { gql } = require("apollo-server-express");

module.exports = gql`

  scalar DateTime

  type Challenge {
    id: ID!
    owner: User!
    teams: Boolean
    isPrivate: Boolean
    start: String!
    cutoff: String!
    end: String!
    metrics: String!
    deleted: Boolean
    createdAt: DateTime!
    updatedAt: DateTime!
    participants: [ User! ]
    participantCount: Int!
  }

  type User {
    id: ID!
    displayName: String!
    username: String!
    email: String
    challenges: [ String ]
    groups: [ String ]
  }

  type Query {
    challenges: [ Challenge! ]!
    challenge(id: ID!): Challenge!
    users: [ User! ]!
    user(id: ID!): User!
    me: User!
  }

  type Mutation {
    newChallenge(start: String!, end: String!, cutoff: String!, metrics: String!): Challenge!
    updateChallenge(id: ID!, start: String!): Challenge!
    deleteChallenge(id: ID!): Boolean!
    registerUser(username: String!, displayName: String!, email: String!, password: String!): String!
    authenticateUser(username: String, email: String, password: String!): String!
  }

`;
