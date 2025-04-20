import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string;
            name: string;
            role: string;
            access_token?: string;
        } & DefaultSession["user"];
        access_token: string;
    }

    interface User extends DefaultUser {
        id: string;
        email: string;
        name: string;
        role: string;
        access_token?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        email?: string;
        name?: string;
        role: string;
        access_token?: string;
    }
}