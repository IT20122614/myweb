const express = require("express");
const auth = require("../../middleware/auth");
const IsAdmin = require("../../middleware/IsAdmin");
const { MarkingRubrik } = require("../../models/IT20122096/MarkingRubrik");
const router = express.Router();

router.post("/", [auth, IsAdmin], async (req, res) => {
  let Marking = req.body.name;
  if (!Marking) return res.status(400).send("No name");

  Marking = new MarkingRubrik({ name: req.body.name });
  await Marking.save();

  res.send(Marking);
});

router.get("/",[auth], async (req, res) => {
  const Markings = await MarkingRubrik.find();
  if (Markings.length===0) return res.status(400).send("Cant find any");
  res.send(Markings)

});
router.get("/:id",[auth], async (req, res) => {
  const Marking = await MarkingRubrik.findById(req.params.id);
  if (!Marking) return res.status(400).send("Cant find any");
  res.send(Marking);
});

router.delete("/:id",[auth,IsAdmin], async (req,res) => {
  
  const marking = await MarkingRubrik.findByIdAndDelete(req.params.id);
  if (!marking) return res.status(400).send("No Marking");
  res.send(marking);


})

module.exports = router;