const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PresentationMarks = new Schema({
  groupid: {type: String},
  panelmember: {type: String},
  markingname: {type: String},
  totalmarks: {type: String},
});

const presentationMarks = mongoose.model("presentationMarks", PresentationMarks);
module.exports = presentationMarks;