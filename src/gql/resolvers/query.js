// query object for gql resolvers (only return data, NEVER modifies it)

module.exports = {
  "challenges": async (parent, args, { models }) => {
    return await models.Challenge.find().limit(100);
  },
  "challenge": async (parent, args, { models }) => {
    return await models.Challenge.findById(args.id);
  },
  "challengeList": async (parent, { cursor }, { models }) => {
    const pageSize = 10;
    let continued = false;

    let defaultCursor = {};

    if ((cursor !== "") && (cursor !== undefined)) {
      defaultCursor = { "_id": { "$lt": cursor }};
    }

    let challenges = await models.Challenge.find(defaultCursor)
      .sort({ "_id": -1 })
      .limit(pageSize + 1);

    if (challenges.length > pageSize) {
      continued = true;
      challenges = challenges.slice(0, -1);
    /*
    TODO: handle erroneous request if cursor is last id
    } else if (challenges.length === 0) {
      challenges = [];
      */
    }

    const newCursor = challenges[challenges.length - 1]._id;
    return { challenges, "cursor": newCursor, continued };
  },

  "me": async (parent, args, { models, user }) => {
    return await models.User.findById(user.id);
  },
  "users": async (parent, args, { models }) => {
    return await models.User.find({}).limit(100);
  },
  "user": async (parent, args, { models }) => {
    // TODO: support username and email lookup as well
    // eg:  let { username } = args.username; -> .findOne({ username });
    return await models.User.findById(args.id);
  }
};
