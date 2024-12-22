const express = require("express");
const userRouter = require("./user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello World from router");
});

router.use("/user", userRouter);

module.exports = router;
