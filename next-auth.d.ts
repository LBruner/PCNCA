import {DefaultSession} from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {

    interface Session {
        user: {
            id?: string;
        } & DefaultSession["user"];
    }
}

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation

declare module "next-auth/jwt" {
    interface JWT {
        /** The user's role. */
        userRole?: "admin";
    }
}