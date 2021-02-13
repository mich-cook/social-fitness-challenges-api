// mutate data and return the result

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { AuthenticationError, ForbiddenError } = require("apollo-server-express");

require("dotenv").config();

module.exports = {
  "newChallenge": async (parent, args, { models }) => {
    return await models.Challenge.create({
      "start": args.start,
      "cutoff": args.cutoff,
      "end": args.end,
      "metrics": args.metrics
    });
  },

  /* just updating the start date for now, but we'll get back to the rest */
  "updateChallenge": async (parent, args, { models }) => {
    return await models.Challenge.findOneAndUpdate(
      { "_id": args.id },
      { "$set": { "start": args.start }},
      { "new": true }
    );
  },

  "deleteChallenge": async (parent, args, { models }) => {
    try {
      await models.Challenge.findOneAndUpdate(
        { "_id": args.id },
        { "$set": { "deleted": true }},
        { "new": true }
      );
      return true;
    } catch(e) {
      console.log(e);
      return false;
    }
  },

  // (username: String!, displayName: String!, email: String!, password: String!): String!
  "registerUser": async (parent, args, { models }) => {
    let { username, email, password, displayName } = args;
    email = email.trim().toLowerCase();
    const passhash = await bcrypt.hash(password, 10);
    try {
      const user = await models.User.create({
        username,
        email,
        displayName,
        "password": passhash
      });
      console.log(user);
      return jwt.sign({ "id": user._id, "displayName": displayName }, process.env.JWT_SECRET);
    } catch(e) {
      console.log(e);
      throw new Error("ERROR: Could not create account.");
    }
  },

  // (username: String, email: String, password: String!): String!
  "authenticateUser": async (parent, args, { models }) => {
    let { username, email, password } = args;

    // normalize the email address for fetch the same way it was stored
    if (email !== undefined) { email = email.trim().toLowerCase(); }

    // attempt to get user from data store
    const user = await models.User.findOne({
      "$or": [ { email }, { username } ]
    });

    if (user === null) {
      console.log(`Couldn't find user with username: ${username} or email: ${email}`);
      throw new AuthenticationError(`ERROR: Could not authenticate user.`)
    }

    if (await bcrypt.compare(password, user.password) === false) {
      console.log(`Password was invalid for user: ${username} / ${email}`);
      throw new AuthenticationError(`ERROR: Could not authenticate user.`)
    }

    return jwt.sign({ "id": user._id, "displayName": user.displayName }, process.env.JWT_SECRET);
  }
};
