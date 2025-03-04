import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.post.create({
        data: {
            title: "MY FIRST POST",
            content: "Learning Prisma with postgres",
            published: true,
            authorId: 1,
        },
    });
}

main()
    .then(async () => {
        console.log("done with the query");
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
