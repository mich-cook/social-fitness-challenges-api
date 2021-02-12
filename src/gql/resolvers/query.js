// query object for gql resolvers (only return data, NEVER modifies it)

module.exports = {
  "challenges": async (parent, args, { models }) => {
    return await models.Challenge.find();
  },
  "challenge": async (parent, args, { models }) => {
    return await models.Challenge.findById(args.id);
  }
};
