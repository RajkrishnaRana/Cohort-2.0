import { getClient } from "./utils";

async function getTodosForUser(userId: number) {
    const client = await getClient();

    const query = `
        SELECT todos.*, users.email AS user_email
        FROM todos
        FULL JOIN users ON todos.user_id = users.id 
        WHERE todos.user_id = $1
    `;

    // Also there are Left Join, Inner Join, and Right Join(Default join is Inner Join)

    const result = await client.query(query, [userId]);

    console.log("Todos : ", result.rows);
}

getTodosForUser(3);
