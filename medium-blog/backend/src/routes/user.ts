import { Hono } from "hono";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { signupInput, signinInput } from "@rkrana001/medium-blog-types";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWTSECRET: string;
    };
}>();

userRouter.post("/signup", async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Inputs aren't in correct format");
    }

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

userRouter.post("/signin", async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Inputs aren't in correct format");
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                userName: body.username,
                password: body.password,
            },
        });

        if (!user) {
            c.status(403);
            return c.text("Invalid Credentials");
        }

        const jwt = await sign({ id: user.id }, c.env.JWTSECRET);
        return c.text(jwt);
    } catch (error) {
        c.status(403);
        return c.text("Error");
    }
});
