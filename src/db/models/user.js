const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  "username": {
    "type": String,
    "required": true,
    "index": { "unique": true }
  },
  "displayName": {
    "type": String,
    "required": true,
    "index": { "unique": true }
  },
  "email": {
    "type": String,
    "required": true,
    "index": { "unique": true }
  },
  "password": {
    "type": String,
    "required": true
  },
  "challenges": {
    "type": [ String ]
  },
  "groups": {
    "type": [ String ]
  }
}, {
  "timestamps": true  /* createdAt and updatedAt */
});
const User = mongoose.model("User", userSchema);

module.exports = { User };
