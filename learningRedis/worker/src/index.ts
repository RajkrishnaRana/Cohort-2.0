import { createClient } from "redis";

const client = createClient();

async function processSubmission(submissions: string) {
    const { problemId, code, language } = JSON.parse(submissions);

    console.log(`Processing submission for problem ${problemId}`);
    console.log(`Code ${code}`);
    console.log(`language ${language}`);
    // add processing logic

    //Simulate the processing delays
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Finish processing of the problem ${problemId}`);
}

async function startWorker() {
    try {
        await client.connect();
        console.log("Connected to Redis client");
        // Main Loop
        while (true) {
            try {
                const submissions = await client.brPop("submissions", 0);
                console.log("Problem submissions", submissions);
                await processSubmission(submissions.element);
            } catch (error) {
                console.error("Error processing the submission", error);
            }
        }
    } catch (error) {
        console.error("Failed to connect to the Redis", error);
    }
}

startWorker();
