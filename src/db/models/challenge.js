const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  "start": {
    "type": String,
    "required": true
  },
  "cutoff": {
    "type": String,
    "required": true
  },
  "end": {
    "type": String,
    "required": true
  },
  "metrics": {
    "type": String,
    "required": true
  },
  "teams": {
    "type": Boolean,
    "required": false
  },
  "isPrivate": {
    "type": Boolean,
    "required": false
  },
  "deleted": {
    "type": Boolean,
    "required": false
  },
  "owner": {
    "type": mongoose.Schema.Types.ObjectId,
    "ref": "User",
    "required": true
  }
}, {
  "timestamps": true  /* createdAt and updatedAt */
});
const Challenge = mongoose.model("Challenge", challengeSchema);

module.exports = Challenge;
