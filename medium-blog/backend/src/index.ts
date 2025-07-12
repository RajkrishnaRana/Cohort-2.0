import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
    };
}>();

app.post("/api/v1/users/signup", async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        await prisma.user.create({
            data: {
                userName: body.username,
                password: body.password,
                name: body.name,
            },
        });

        return c.text("Success");
    } catch (error) {
        c.status(403);
        return c.text("Error");
    }
});

app.post("/api/v1/users/signin", (c) => {
    return c.text("Hello Hono!");
});

app.post("/api/v1/blog", (c) => {
    return c.text("Hello Hono!");
});

app.put("/api/v1/blog", (c) => {
    return c.text("Hello Hono!");
});

app.get("/api/v1/blog", (c) => {
    return c.text("Hello Hono! 2");
});

app.get("/api/v1/blog/bulk", (c) => {
    return c.text("Hello Hono!");
});

export default app;
