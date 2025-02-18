import { Client } from "pg";

export async function getClient() {
    const client = new Client(
        "postgresql://postgres:Default@54321@db.vintecwmptpgimxwkcys.supabase.co:5432/postgres"
    );
    await client.connect();
    return client;
}
