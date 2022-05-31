const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const topicRegister = new Schema({
  groupid: {
    type: String,
  },
  topic: {
    type: String,
  },
  message: {
    type: String,
  },
  file: {
    type: String,
  },
  field: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Topic = mongoose.model("registertopics", topicRegister);
module.exports = Topic;
