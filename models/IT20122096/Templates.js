const mongoose = require("mongoose");


const templateSchema = new mongoose.Schema({
  type: { type: String, required: true },
  file: { type: String, required: true },
});

const Template = mongoose.model("templates", templateSchema);

exports.Template = Template;