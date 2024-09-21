const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

// connect the mongoDB database
mongoose.connect(
  "mongodb+srv://rkrana001:Test-123@cluster0.mmemhxm.mongodb.net/cohortFirstDatabase"
);

//define mongoose schema
const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

//Initialize express
const app = express();
app.use(express.json());

function userExists(username, password) {
  // should check in the database
}

app.post("/signUp", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const name = req.body.name;

  const existingUser = await User.findOne({ email: username });

  if (existingUser) {
    return res.status(400).send("User already exist");
  }

  const user = new User({
    name: name,
    username: username,
    password: password,
  });

  user.save().then(() => {
    res.json({
      msg: "User created successfully",
    });
  });
});

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesnt exist in our in memory db",
    });
  }

  var token = jwt.sign({ username: username }, "shhhhh");
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    // return a list of users other than this username from the database
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.listen(3000);
