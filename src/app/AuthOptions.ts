import {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.usuario.findFirst({
                    where: { email: credentials.email }
                });

                if (user?.alterarSenha) {
                    return user;
                }

                if (user && user.senha === credentials.password) {
                    return user;
                }

                return null;
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
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
        newUser: '/auth/register',
    },
    callbacks: {
        async session({ session, token }: { session: any; token: any }) {
            if (token) {
                session.user.id = token.uid;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
                session.user.alterarSenha = token.alterarSenha;
            }
            return session;
        },
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.uid = user.id;
                token.alterarSenha = user.alterarSenha;
            }
            return token;
        },
        async signIn() {
            return true;
        }
    }
};