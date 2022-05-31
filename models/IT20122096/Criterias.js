const mongoose = require("mongoose");

const criteriaSchema = mongoose.Schema({
  name: { type: String, reqired: true },
  value: { type: Number, reqired: true },
  markingRubrikId: { type: String, reqired: true },
});

const Criterias = mongoose.model("Criterias", criteriaSchema);
exports.Criterias = Criterias;