const express = require("express");
const auth = require("../../middleware/auth");
const IsAdmin = require("../../middleware/IsAdmin");
const { Criterias } = require("../../models/IT20122096/Criterias");
const router = express.Router();

router.post("/", [auth,IsAdmin], async (req, res) => {
  let criterias = req.body.markingRubrikId;
  if (!criterias) return res.status(400).send("No marking provided");

  criterias = new Criterias({
    name: req.body.name,
    value: req.body.value,
    markingRubrikId: req.body.markingRubrikId,
  });
  criterias.save();

  res.send("create new criteria");
});

router.get("/:id", [auth], async (req, res) => {
  const criterias = await Criterias.find({ markingRubrikId: req.params.id });

  if (criterias.length === 0)
    return res.status(400).send("Criterias for given id is not found.");

  res.send(criterias);
});

module.exports = router;
