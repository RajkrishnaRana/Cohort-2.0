import { getClient } from "./utils";

export async function updateTodo(todoId: number) {
    const client = await getClient();

    const query = "UPDATE todos SET done = $1 WHERE id = $2";
    await client.query(query, [true, todoId]);

    console.log(`Todo with id: ${todoId} updated to done`);
}

updateTodo(3);
