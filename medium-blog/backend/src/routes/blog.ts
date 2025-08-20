import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWTSECRET: string;
    };
    Variables: {
        userId: number;
    };
}>();

blogRouter.use("*/", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader, c.env.JWTSECRET);

    if (user) {
        c.set("userId", user.id as number);
        next();
    } else {
        c.status(401);
        return c.text("Unauthorized");
    }
});

blogRouter.post("/", async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: 1,
            },
        });

        return c.json({
            id: blog.id,
        });
    } catch (error) {
        c.status(411);
        return c.text("Failed to create blog");
    }
});

blogRouter.put("/", async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            },
        });

        return c.json({
            id: blog.id,
        });
    } catch (error) {
        c.status(411);
        return c.text("Failed to update blog");
    }
});

blogRouter.get("/", async (c) => {
    const body = await c.req.json();

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: body.id,
            },
        });

        return c.json({
            blog,
        });
    } catch (error) {
        c.status(411);
        return c.text("Failed to find the requested blog");
    }
});

// Need to do pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.blog.findMany();

        return c.json({
            blogs,
        });
    } catch (error) {
        c.status(411);
        return c.text("Failed to fetch blogs");
    }
});
