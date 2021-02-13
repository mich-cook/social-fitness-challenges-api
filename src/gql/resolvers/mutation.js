// mutate data and return the result

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
  }
};