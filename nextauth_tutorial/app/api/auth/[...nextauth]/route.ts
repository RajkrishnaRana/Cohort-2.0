import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "text", placeholder: "Enter your Email" },
                password: { label: "Password", type: "password", placeholder: "Enter your Password" },
            },
            async authorize(credentials: any) {
                return {
                    id: "user1",
                    name: "Rajkrishna Rana",
                    email: "sMwvD@example.com",
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
