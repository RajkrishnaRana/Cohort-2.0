const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const User = require("../db");
const JWT_SECRET = require("../config");

const router = express.Router();

router.post("/signUp", async (req, res) => {
  const body = req.body;

  const signUpBody = zod.object({
    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
  });

  const { success, error } = signUpBody.safeParse(body);

  if (!success) {
    return res.status(411).json({ message: error.message });
  }

  const existingUser = await User.findOne({ userName: body.userName });

  if (existingUser)
    return res.status(411).json({ message: "User already exists" });

  const dbUser = await User.create(body);

  const token = jwt.sign({ userId: dbUser._id }, JWT_SECRET);

  res.status(200).json({
    message: "User Created Successfully",
    token: token,
  });
});

module.exports = router;
