const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World from router");
});

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;
