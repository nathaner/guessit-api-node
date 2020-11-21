const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, validateUser } = require("../models/user");

router.get("/me", (req, res) => {
  //   const user = await;

  res.send({ test: "ok" });
});

router.post("/", async (req, res) => {
  //   return res.send();
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(
    (({ fullName, email, password }) => ({
      fullName,
      email,
      password,
    }))(req.body)
  );

  await user.save();

  res.send((({ _id, fullName, email }) => ({ _id, fullName, email }))(user));
});

module.exports = router;
