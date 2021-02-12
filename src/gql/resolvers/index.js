// until we hook up to real data storage
let challenges = [
  { "id": "1", "start": "2020-01-01", "end": "2020-12-31", "cutoff": "2020-01-15", "metrics": "metric placeholder 1" },
  { "id": "2", "start": "2020-01-01", "end": "2020-01-31", "cutoff": "2020-01-05", "metrics": "metric placeholder 2", "teams": true },
  { "id": "3", "start": "2020-02-01", "end": "2020-02-15", "cutoff": "2020-02-10", "metrics": "metric placeholder 3", "isPrivate": false }
];

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
    "newChallenge": (parent, args) => {
      let challenge = {
        "id": String(challenges.length + 1),
        "start": args.start,
        "cutoff": args.cutoff,
        "end": args.end,
        "metrics": args.metrics 
      };
      challenges.push(challenge);
      return challenge;
    }
  }
};

