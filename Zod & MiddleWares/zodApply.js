const express = require("express");
const zod = require("zod");
const app = express();

// Middlewares to parse json bodies
app.use(express.json());

const schema = zod.array(zod.number());

app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys;
  const response = schema.safeParse(kidneys);

  if (!response.success) {
    res.status(411).json({
      msg: "Wrong input here",
    });
  } else {
    res.send({
      response,
    });
  }
});

app.listen(3000);
