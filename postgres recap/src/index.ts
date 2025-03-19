const { Client } = require("pg");

const connectionString =
    "postgresql://postgres:mysecretpassword@localhost:5432/postgres";

const client = new Client({
    connectionString: connectionString,
});

async function createUserTable() {
    try {
        await client.connect();
        console.log("connection built successfully");
        const result = await client.query(
            `
            CREATE TABLE USERS (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
            `
        );
        console.log(result);
    } catch (error) {
        console.error("Error creating table:", error);
    } finally {
        await client.end();
    }
}

async function insertData(username: string, email: string, password: string) {
    try {
        await client.connect();

        // Here we use this $1, $2, $3 placeholders, because if we use ${username} like this, there is a comming vector attack that if any user gives username as a sql query, then the database might impact
        const result = await client.query(
            `
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3) 
            `,
            [username, email, password]
        );
        console.log(result);
    } catch (error) {
        console.error(error);
    } finally {
        client.end();
    }
}

insertData("Raj", "rajkrishna@email.com", "123456");
