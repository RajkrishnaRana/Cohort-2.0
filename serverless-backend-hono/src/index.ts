import { Hono } from "hono";

const app = new Hono();

async function authMiddleware(c: any, next: any) {
    if (c.req.header("Authorization")) {
        await next();
    } else {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }
}

app.get("/", (c) => {
    return c.text("Hello Hono!");
});

app.post("/", authMiddleware, async (c) => {
    const body = c.req.json();

    console.log(body);
    console.log(c.req.header("Authorization"));
    console.log(c.req.query("params"));

    return c.text("Hello world");
});

export default app;
