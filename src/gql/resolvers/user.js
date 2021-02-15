module.exports = {
  // challenges owned by a user
  // User.challengesOwned
  "challengesOwned": async (user, args, { models }) => {
    return await models.Challenge.find({ "owner": user._id }).sort({ "_id": -1 });
  },
  // challenges in which the user is participating
  // User.challengesParticipating
  "challengesParticipating": async (user, args, { models }) => {
    return await models.Challenge.find({ "participants": user._id }).sort({ "_id": -1 });
  }
};
