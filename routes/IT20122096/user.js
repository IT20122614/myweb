const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const {User,validateUser,validateUpdateUser} = require("../../models/IT20122096/user");
const Validator = require("../../middleware/validator");
const auth = require("../../middleware/auth");
const IsAdmin = require("../../middleware/IsAdmin");

router.get("/", [auth], async (req, res) => {
  const users = await User.find();
  res.send(users);
});
router.get("/:id", [auth], async (req, res) => {
  const users = await User.findById(req.params.id);
  res.send(users);
});

router.post("/", Validator(validateUser), async (req, res) => {
  //check user already registered
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already Registerd.");

  user = new User(
    _.pick(req.body, ["userRole","userId","researchField","name","email","password"])
  );
  //hasing the password
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateAuthToken();
  res.setHeader("x-auth-token", token).send(token);
});

router.put(
  "/:id",
  [auth, IsAdmin, Validator(validateUpdateUser)],
  async (req, res) => {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        researchField: req.body.researchField,
      },
      { new: true }
    );
    if (!user) return res.status(400).send("no user found");
    res.send(user);
  }
);

router.delete("/:id", [auth, IsAdmin], async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(400).send("delete user by id");
  res.send(user);
});

module.exports = router;
