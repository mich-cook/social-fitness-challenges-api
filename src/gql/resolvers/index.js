module.exports = {
  "Query": {
    "challenges": async (parent, args, { models }) => {
      return await models.Challenge.find();
    },
    "challenge": async (parent, args, { models }) => {
      return await models.Challenge.findById(args.id);
    }
  },
  "Mutation": {
    "newChallenge": async (parent, args, { models }) => {
      return await models.Challenge.create({
        "start": args.start,
        "cutoff": args.cutoff,
        "end": args.end,
        "metrics": args.metrics
      });
    }
  }
};

