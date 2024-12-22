const mongoose = require("mongoose");

const { Schema } = mongoose;

// Connect mongoose schema
mongoose.connect(
  "mongodb+srv://rkrana001:Test-123@cluster0.mmemhxm.mongodb.net/paytmClone1"
);

// Define mongoose schema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  userName: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
