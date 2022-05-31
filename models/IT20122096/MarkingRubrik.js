const  mongoose  = require("mongoose");

const markingSchema = mongoose.Schema({
  
  name: { type: String, required: true },
  date:{type:Date, default:Date.now()}
});

const MarkingRubrik = mongoose.model("MarkingRubrik", markingSchema);
exports.MarkingRubrik = MarkingRubrik;