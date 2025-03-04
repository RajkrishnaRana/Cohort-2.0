import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    await prisma.post.update({
        where: {
            id: 1,
        },
        data: {
            published: true,
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
