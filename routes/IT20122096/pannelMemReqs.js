const express = require("express");
const Topic = require("../../models/IT20122614/RegisterTopic");
const router = express.Router();

router.get("/", async (req, res) => {
  const requests = (await Topic.find()).filter(
    (req) => req.status === "pending"
  );
  if (requests.length===0) return res.status(400).send("No requests found");
  res.send(requests)
})

module.exports = router;