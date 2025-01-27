import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {PrismaClient} from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth, {NextAuthOptions} from "next-auth";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
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

                const user = await prisma.usuario.findFirst({
                    where: {email: credentials.email, senha: credentials.password}
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
        async session({session, token}) {  // Changed from {session, user}
            if (token) {
                session.user.id = token.uid as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }

            console.log(session);
            return session;
        },
        async jwt({token, user}) {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        signIn: async () => {
            return true;
        }
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST,};