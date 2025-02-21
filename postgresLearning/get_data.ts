import { getClient } from "./utils";

async function getUsers() {
    const client = await getClient();
    const query = "SELECT * FROM users";
    const result = await client.query(query);

    console.log("Users : ");
    for (const user of result.rows) {
        console.log(`ID : ${user.id} Email : ${user.email}`);
    }
}

async function getUserFromEmail(email: string) {
    const client = await getClient();

    const query = "SELECT * FROM users WHERE email = $1";
    const result = await client.query(query, [email]);

    console.log("Single User Details : ");
    for (const user of result.rows) {
        console.log(`ID : ${user.id} Email : ${user.email}`);
    }
}

async function getTodosForUser(userId: number) {
    const client = await getClient();

    const query = "SELECT * FROM todos WHERE user_id = $1";
    const result = await client.query(query, [userId]);

    console.log("Todos : ");
    for (const todo of result.rows) {
        console.log(
            `ID : ${todo.id} Title : ${todo.title} Description : ${todo.description}`
        );
    }
}

getTodosForUser(3);
