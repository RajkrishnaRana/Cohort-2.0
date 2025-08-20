import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const app = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWTSECRET: string;
    };
}>();

app.route("/api/v1/users", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
