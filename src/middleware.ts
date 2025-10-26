import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import paths from "@/paths";

export default withAuth(

    function middleware(req) {
        const token = req.nextauth.token;

        if (token?.alterarSenha && !req.nextUrl.pathname.startsWith(paths.alterarSenha())) {
            return NextResponse.redirect(
                new URL(paths.alterarSenha(), req.url)
            );
        }

        if (req.nextUrl.pathname.startsWith('/auth/alterar-senha') && !token?.alterarSenha) {
            return NextResponse.redirect(
                new URL(paths.noticias(), req.url)
            );
        }

        // if (req.nextUrl.pathname.startsWith('/auth') && token && !req.nextUrl.pathname.startsWith('/auth/alterar-senha')) {
        //     return NextResponse.redirect(
        //         new URL(paths.noticias(), req.url)
        //     );
        // }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;
                const publicRoutes: string[] = ['/noticias', '/cotacoes/commodities', '/producao-internacional', paths.login(), paths.cadastro()];
                if (publicRoutes.some(route => path.startsWith(route))) {
                    return true;
                }
                return !!token;
            }
        }
    }
);

export const config = {
    matcher: [
        "/noticias/:path*",
        "/estoque/:path*",
        "/pessoas/:path*",
        "/producao-internacional/:path*",
        "/vendas/:path*",
        "/adm/:path*",
        '/auth/alterar-senha',
        '/auth/:path*'
    ],
};