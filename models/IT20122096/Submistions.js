const mongoose = require("mongoose");

const submisionsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now() },
});

const Submision = mongoose.model("submisions", submisionsSchema);

exports.Submision = Submision;