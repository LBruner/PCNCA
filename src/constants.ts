import paths from "@/paths";
import { Estoque } from "@prisma/client";

export const shouldHideFooterPaths = [
    paths.adm(),
    '/editar',
    '/auth',
    '/configuracoes',
    '/vendas/criar'
]

export const mainList = [
    {
        produto: 'Sementes Agrícolas',
        url: paths.ecommerceCategoria('Agricola'),
        imagemLink: '/images/corn-plantation.png',
    },
    {
        produto: 'Sementes de Horticultura',
        url: paths.ecommerceCategoria('Horta'),
        imagemLink: '/images/1.jpg',
    },
    {
        produto: 'Sementes de Frutíferas',
        url: paths.ecommerceCategoria('Frutifera'),
        imagemLink: '/images/image.jpg',
    },
    {
        produto: 'Sementes de Flores',
        url: paths.ecommerceCategoria('Flor'),
        imagemLink: 'https://assets.eflorist.com/site/EF-5303/Homepage/event%20flowers.jpg',
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