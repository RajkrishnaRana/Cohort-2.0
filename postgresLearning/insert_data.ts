import { getClient } from "./utils";

async function insertData() {
    try {
        const client = await getClient();
        const insertUserText =
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id";
        const userValues = ["raj@gmail.com", "hashed_password_here"];

        let response = await client.query(insertUserText, userValues);
        const insertIntoTodos =
            "INSERT INTO todos (title, description, user_id, done) VALUES ($1, $2, $3, $4) RETURNING id";
        const todoValues = [
            "buy groceries",
            "Milk, eggs, & bread",
            response.rows[0].id,
            false,
        ];
        await client.query(insertIntoTodos, todoValues);

        console.log("Entries created successfully");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
}

insertData();
