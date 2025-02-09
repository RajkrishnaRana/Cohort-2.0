const mongoose = require("mongoose");

const { Schema } = mongoose;

// Connect mongoose schema
mongoose.connect(
    "mongodb+srv://rkrana001:Test-123@cluster0.mmemhxm.mongodb.net/paytmClone1"
);

// Define mongoose schema
const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        minLength: 3,
        maxLength: 50,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
});

const accountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
});

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
    User,
    Account,
};
