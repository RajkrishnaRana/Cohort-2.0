//mongodb url
//mongodb+srv://rkrana001:<db_password>@cluster0.mmemhxm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://rkrana001:Test-123@cluster0.mmemhxm.mongodb.net/myTodoApp"
);

const todoScema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoScema);

module.exports = { todo };
