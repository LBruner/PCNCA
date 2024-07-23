import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {PrismaClient} from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth";

const prisma = new PrismaClient();

const handler = NextAuth({
        secret: process.env.AUTH_SECRET,
        providers: [
            CredentialsProvider({
                name: 'Credentials',
                credentials: {
                    email: {label: "Email", type: "text"},
                    password: {label: "Password", type: "password"}
                },
                authorize: async (credentials) => {
                    if (!credentials?.email || !credentials?.password) {
                        return null;
                    }

                    //TODO: Hash das senhas antes de conferir

                    const user = await prisma.user.findUnique({
                        where: {email: credentials.email, password: credentials.password}
                    });
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                }
            })
        ],
        adapter: PrismaAdapter(prisma),
        session: {
            strategy: 'jwt',
        },
        pages: {
            signIn: '/auth/login',
            signOut: '/auth/logout',
            error: '/auth/error', // Ensure this route exists and is correctly defined
            verifyRequest: '/auth/verify-request',
            newUser: '/auth/register',
        },
        callbacks: {
            async session({session, user}: any) {
                if (session && user) {
                    session.user.id = user.id;
                }
                return session;
            },
            jwt: async ({user, token}) => {
                if (user) {
                    token.uid = user.id;
                }
                return token;
            },
            signIn: async () => {
                return true;
            }
        },

    })
;

export {handler as GET, handler as POST,};