const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");
const { default: mongoose } = require("mongoose");

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });

    return res.status(200).json({
        message: "Balance Fetched Successfully",
        balance: account.balance,
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const body = req.body;
    const myAccount = await Account.findOne({ userId: req.userId });

    const transferSchema = zod.object({
        to: zod.string(),
        amount: zod.string(),
    });

    const { success, error } = transferSchema.safeParse(body);

    error && console.log(error);

    if (!success) {
        await session.abortTransaction();
        return res.status(411).json({ message: "Please Check Your Input" });
    }

    const toUser = await User.findOne({ firstName: body.to });

    if (!toUser || !myAccount) {
        await session.abortTransaction();
        return res.status(400).json({ message: "Invalid Account" });
    }

    const amount = parseInt(body.amount);

    if (amount <= 0) {
        await session.abortTransaction();
        return res.status(411).json({ message: "Invalid amount" });
    }

    // console.log(myAccount);
    if (amount > myAccount.balance) {
        await session.abortTransaction();
        return res.status(411).json({ message: "Insufficient balance" });
    }

    await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } }
    );
    await Account.updateOne(
        { userId: toUser._id },
        { $inc: { balance: amount } }
    );

    await session.commitTransaction();
    return res.status(200).json({ message: "Transfer successful" });
});

module.exports = router;
