const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");
app.use("/api/v1", mainRouter);

const accountRouter = require("./routes/account");
app.use("/api/v1", accountRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
