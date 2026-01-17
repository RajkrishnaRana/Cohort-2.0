import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());
const client = createClient();

app.post("/submit", async (req, res) => {
    const { problemId, userId, code, language } = req.body;
    // push this to a database
    try {
        await client.lPush("submissions", JSON.stringify({ problemId, userId, code, language }));
        res.json({
            message: "Submission received",
        });
    } catch (error) {
        console.error(error);
        res.json({
            message: "Submission Failed",
        });
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to redis");

        app.listen(3000, () => {
            console.log("Server started on port 3000");
        });
    } catch (error) {
        console.error(error);
    }
}

startServer();
