import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWTSECRET: string;
    };
}>();

app.post("/api/v1/users/signup", async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.create({
            data: {
                userName: body.username,
                password: body.password,
                name: body.name,
            },
        });

        const jwt = await sign({ id: user.id }, c.env.JWTSECRET);

        return c.text(jwt);
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
