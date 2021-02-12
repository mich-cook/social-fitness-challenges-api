const mongoose = require("mongoose");

module.exports = {

  "connect": DB_HOST => {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose.set("useFindAndModify", false);  // use findOneAndUpdate() instead
    mongoose.set("useCreateIndex", true);  // instead of ensureIndex()

    mongoose.connect(DB_HOST);
    mongoose.connection.on("error", err => {
      console.error(err);
      console.log(`Mongoose had a problem connecting to MongoDB server.`);
      process.exit();
    });
  },

  "close": () => {
    mongoose.connection.close();
  }

};
