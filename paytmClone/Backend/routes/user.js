const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");

const { User } = require("../db");
const { JWT_SECRET } = require("../config");

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

    error && console.log(error);

    if (!success) {
        return res.status(411).json({ message: "Give All the details" });
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

router.post("/signIn", async (req, res) => {
    const body = req.body;

    const signInBody = zod.object({
        userName: zod.string().email(),
        password: zod.string(),
    });

    const { success, error } = signInBody.safeParse(body);

    if (!success) {
        return res.status(411).json({ message: error.message });
    }

    const existingUser = await User.findOne({ userName: body.userName });

    if (!existingUser)
        return res
            .status(411)
            .json({ message: "User not exists, please sign up" });

    const isPasswordCorrect = existingUser.password === body.password;

    if (!isPasswordCorrect)
        return res.status(411).json({ message: "Incorrect Password" });

    const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET);

    res.status(200).json({
        message: "User Signed In Successfully",
        token: token,
    });
});

router.put("/", async (req, res) => {
    const body = req.body;

    const updateBody = zod.object({
        password: zod.string().optional(),
        firstName: zod.string().optional(),
        lastName: zod.string().optional(),
    });

    const { success, error } = updateBody.safeParse(body);

    if (!success) {
        return res.status(411).json({ message: error.message });
    }

    const updatedUser = await User.updateOne(req.body, {
        id: req.userId,
    });

    return res.status(200).json({
        message: "User Updated Successfully",
        updatedUser: updatedUser,
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                },
            },
            {
                lastName: {
                    $regex: filter,
                },
            },
        ],
    });

    res.json({
        user: users.map((user) => ({
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user.userName,
            _id: user._id,
        })),
    });
});

module.exports = router;
