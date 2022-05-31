const express = require("express");
const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../../models/IT20122096/User");;
const Validator = require("../../middleware/validator");
const router = express.Router();

router.post("/", Validator(validateLogin), async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordValid)
    return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  
  res.header("x-auth-token", token);
  res.send(token);
});

module.exports = router;
