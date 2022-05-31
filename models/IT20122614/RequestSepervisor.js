const mongoose = require("mongoose");

const requestTopic = new mongoose.Schema({
  uId: {
    type: String,
    required: true,
  },

  field: {
    type: String,
  },
  topic: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  groupid: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  userRole: {
    type: String,
    required: true,
  },
});

const RequestSepervisor = mongoose.model("request_toics", requestTopic);
module.exports = RequestSepervisor;
