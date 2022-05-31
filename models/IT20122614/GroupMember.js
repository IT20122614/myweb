const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupmembersSchema = new Schema({
  groupid: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isLeader: {
    type: Boolean,
    required: true,
  },
});

const GroupMembers = mongoose.model("groupmembers", groupmembersSchema);
module.exports = GroupMembers;
