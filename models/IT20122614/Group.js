const { boolean } = require("joi");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  groupid: {
    type: String,
    required: true,
  },
  supercisorid: {
    type: String,
  },
  cosupercisorid: {
    type: String,
  },
  panelmember: {
    type: String,
  },

  report: String,
  presentation: String,
  proposal: String,
  Finalthesis: String,
  isOngoing: {
    type: Boolean,
  },
  isMarked: {
    type: Boolean,
  }
});

const Group = mongoose.model("researchgroups", groupSchema);
module.exports = Group;
