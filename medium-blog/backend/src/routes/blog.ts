import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import { createBlogInput, updateBlogInput } from "@rkrana001/medium-blog-types";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWTSECRET: string;
    };
    Variables: {
        userId: string;
    };
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";

    try {
        const user = await verify(authHeader, c.env.JWTSECRET);
        if (user) {
            c.set("userId", user.id as string);
            await next();
        } else {
            c.status(401);
            return c.text("Unauthorized");
        }
    } catch (error) {
        c.status(403);
        return c.text("Server Error");
    }
});

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Inputs aren't in correct format");
    }

    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId),
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
    const { success } = updateBlogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.text("Inputs aren't in correct format");
    }

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

// Need to do pagination
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return c.json({
            blogs,
        });
    } catch (error) {
        c.status(411);
        return c.text("Failed to fetch blogs");
    }
});

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id),
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                    },
                },
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
