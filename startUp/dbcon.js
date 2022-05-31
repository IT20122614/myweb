const config = require("config");
const { MongoClient } = require("mongodb");
const Db =config.get("db")
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (database, callback) {
    client.connect(function (err, db) {
      _db = db.db(database);
      return callback(err);
    });
  },

  getDb: function () {
    return _db;
  },
};
