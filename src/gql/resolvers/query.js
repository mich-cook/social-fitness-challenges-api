// query object for gql resolvers (only return data, NEVER modifies it)

module.exports = {
  "challenges": async (parent, args, { models }) => {
    return await models.Challenge.find();
  },
  "challenge": async (parent, args, { models }) => {
    return await models.Challenge.findById(args.id);
  },

  "users": async (parent, args, { models }) => {
    return await models.User.find();
  },
  "user": async (parent, args, { models }) => {
    // TODO: support username and email lookup as well
    return await models.User.findById(args.id);
  }
};
