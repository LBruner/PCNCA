import paths from "@/paths";
import {Estoque} from "@prisma/client";

export const shouldHideFooterPaths = [
    paths.adm(),
    '/editar',
    '/auth',
    '/configuracoes',
    '/vendas/criar'
]

export const mainList: Estoque[] = [
    {
        produto: 'Vegetable Seeds',
        imagemLink: 'https://www.parkseed.com/cdn/shop/files/Product_MediaImage_53110_2.jpg?v=1753891919&width=720',
        tipo: 'A',
        quantidade: 1,
        preco: 4,
        unidadeMedida: '',
        ativo: true,
        foiUtilizado: true,
        id: 1,
        categoriaculturaId: null,
        descricao: ""
    },
    {
        produto: 'Flower Seeds',
        imagemLink: 'https://www.parkseed.com/cdn/shop/files/Product_MediaImage_04930-PK-P1_1.jpg?v=1753891718&width=720',
        tipo: 'A',
        quantidade: 1,
        preco: 4,
        unidadeMedida: '',
        ativo: true,
        foiUtilizado: true,
        id: 2,
        categoriaculturaId: null,
        descricao: ""
    },
    {
        produto: 'Herb Seeds',
        imagemLink: 'https://www.parkseed.com/cdn/shop/files/pesto-appetizers.jpg?v=1750789246&width=533',
        tipo: 'A',
        quantidade: 1,
        preco: 4,
        unidadeMedida: '',
        ativo: true,
        foiUtilizado: true,
        id: 3,
        categoriaculturaId: null,
        descricao: ""
    },
    {
        produto: 'Seed Colections',
        imagemLink: 'https://www.parkseed.com/cdn/shop/files/Product_MediaImage_29220_1.jpg?v=1753891769&width=533',
        tipo: 'A',
        quantidade: 1,
        preco: 4,
        unidadeMedida: '',
        ativo: true,
        foiUtilizado: true,
        id: 4,
        categoriaculturaId: null,
        descricao: ""
    },
]

export const seedsList = [
    {
        label: 'Vegetable Seeds',
        imageUrl: 'https://www.parkseed.com/cdn/shop/files/Product_MediaImage_53110_2.jpg?v=1753891919&width=720',
    },
    {
        label: 'Flower Seeds',
        imageUrl: 'https://www.parkseed.com/cdn/shop/files/Product_MediaImage_04930-PK-P1_1.jpg?v=1753891718&width=720',
    },
    {
        label: 'Herb Seeds',
        imageUrl: 'https://www.parkseed.com/cdn/shop/files/pesto-appetizers.jpg?v=1750789246&width=533',
    },
    {
        label: 'Seed Colections',
        imageUrl: 'https://www.parkseed.com/cdn/shop/files/Product_MediaImage_29220_1.jpg?v=1753891769&width=533',
    },
]