module.exports = {
  // owner info for a challenge
  // Challenge.owner
  "owner": async (challenge, args, { models }) => {
    return await models.User.findById(challenge.owner);
  },

  // participants for a challenge
  // Challenge.participants
  "participants": async (challenge, args, { models }) => {
    return await models.User.find({ "_id": { "$in": challenge.participants}});
  }
};
