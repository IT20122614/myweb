const express = require("express");
const auth = require("../../middleware/auth");
const IsAdmin = require("../../middleware/IsAdmin");
const router = express.Router();
const Group = require("../../models/IT20122614/Group");
const GroupMembers = require("../../models/IT20122614/GroupMember");

router.get("/",[auth],async (req, res) => {
  const groups = await Group.find();
  if (groups.length===0) return res.status(400).send("There are no groups");

  res.send(groups);
});

router.put("/addPannelMember/:id", [auth,IsAdmin], async (req, res) => {
  const group = await Group.findByIdAndUpdate(
    req.params.id,
    {
      panelmember: req.body.panelmember,
    },
    { new: true }
  );
  if (!group) return res.status(400).send("no group found");
  res.send(group);
});

router.get("/groupMembers", [auth], async (req, res) => {
  const groups = await GroupMembers.find();
  if (groups.length === 0)
    return res.status(400).send("There are no group members");

  res.send(groups);
});
router.get("/getGroupMemberById/:id", [auth], async (req, res) => {
  const member = await GroupMembers.findById(req.params.id);
  if (!member) return res.status(400).send("There is no group member");

  res.send(member);
});

router.put("/UpdateGroupMembers/:id", [auth,IsAdmin], async (req, res) => {
  const member = await GroupMembers.findByIdAndUpdate(
    req.params.id,
    {
      groupid: req.body.groupid,
      userId: req.body.userId,
      name: req.body.name,
      email: req.body.email,
    },
    { new: true }
  );
  if (!member) return res.status(400).send("Can't find member for given Id");

  res.send(member);
});
router.delete("/DeleteGroupMember/:id", [auth,IsAdmin], async (req, res) => {
  const member = await GroupMembers.findByIdAndDelete(req.params.id);
  if (!member) return res.status(400).send("Can't find member for given Id");
  res.send(member);
});

module.exports = router;
