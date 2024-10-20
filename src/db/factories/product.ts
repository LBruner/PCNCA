import {PrismaClient} from '@prisma/client';
import {faker} from '@faker-js/faker';
import {db} from "@/db";

const prisma = new PrismaClient();

 export const agribusinessCategories = [
    'Grains',
    'Fruits',
    'Vegetables',
    'Livestock',
    'Dairy Products',
    'Poultry',
    'Seafood',
    'Beverages',
    'Processed Foods',
    'Other'
];

export const unidadesDeMedida = [
    "Quilogramas (kg)",
    "Toneladas (t)",
    "Gramas (g)",
    "Miligramas (mg)",
    "Litros (L)",
    "Mililitros (mL)",
    "Barril (bbl)",
    "Galão (gal)",
    "Metro cúbico (m³)",
    "Centímetro cúbico (cm³)",
    "Pé cúbico (ft³)",
    "Polegada cúbica (in³)",
    "Hectolitros (hL)",
    "Quilolitros (kL)",
    "Sacas (sc)",
    "Arrobas (arroba)",
    "Caixas (cx)",
    "Fardos (fd)",
    "Pacotes (pct)",
    "Unidades (un)",
    "Dúzias (dz)"
];

export const tipoCommodities = [
    'Agrícola',
    'Agropecuária',
];

const agribusinessProductNames = [
    'Milho',
    'Trigo',
    'Soja',
    'Maçãs',
    'Laranjas',
    'Cenouras',
    'Tomates',
    'Carne de Boi',
    'Frango',
    'Leite',
    'Queijo',
    'Peixe',
    'Camarão',
    'Vinho',
    'Suco',
    'Feijão Enlatado',
    'Arroz',
    'Café',
    'Algodão',
    'Cacau',
    'Açúcar',
    'Batata',
    'Cebola',
    'Alface',
    'Banana',
    'Uva',
    'Melancia',
    'Melão',
    'Abacate',
    'Abacaxi',
    'Manga',
    'Mamão',
    'Morango',
    'Limão',
    'Coco',
    'Pimenta',
    'Pimentão',
    'Couve-flor',
    'Brócolis',
    'Espinafre',
    'Alho',
    'Gengibre',
    'Azeitona',
    'Óleo de Soja',
    'Óleo de Milho',
    'Óleo de Girassol',
    'Óleo de Palma',
    'Óleo de Amendoim',
    'Azeite de Oliva',
    'Açafrão',
    'Mel',
    'Ovos',
    'Carne de Porco',
    'Carne de Cordeiro',
    'Carne de Cabrito',
    'Carne de Coelho',
    'Patos',
    'Codornas',
    'Perus',
    'Peito de Frango',
    'Coxa de Frango',
    'Asa de Frango',
    'Lombo de Porco',
    'Bacon',
    'Presunto',
    'Linguiça',
    'Salame',
    'Salsicha',
    'Leite de Cabra',
    'Iogurte',
    'Manteiga',
    'Creme de Leite',
    'Sorvete',
    'Chocolate',
    'Pão',
    'Biscoitos',
    'Bolachas',
    'Macarrão',
    'Farinha de Trigo',
    'Farinha de Milho',
    'Amido de Milho',
    'Polenta',
    'Quinoa',
    'Aveia',
    'Cevada',
    'Centeio',
    'Milheto',
    'Sorgo',
    'Linhaça',
    'Sementes de Girassol',
    'Sementes de Abóbora',
    'Sementes de Chia',
    'Amendoim',
    'Castanha-do-Pará',
    'Noz',
    'Amêndoa',
    'Pistache',
    'Caju',
    'Avelã',
    'Macadâmia',
    'Castanha-de-Caju'
];

const statuses = [
    'Ativo',
    'Desativado',
    'Em espera'
]

export async function main() {
    const numberOfProducts = 116;

    for (let i = 0; i < numberOfProducts; i++) {
        const category = faker.helpers.arrayElement(agribusinessCategories);
        const name = faker.helpers.arrayElement(agribusinessProductNames);
        const status = faker.helpers.arrayElement(statuses);
        const unity = faker.helpers.arrayElement(unidadesDeMedida);

        await db.product.create({
            data: {
                name: name,
                description: `${name} from our finest ${category.toLowerCase()} collection.`,
                price: parseFloat(faker.commerce.price()),
                userId: 'cly7x8ymz0000ptxy8r3tcfjk',
                category: category,
                status: status,
                unity: unity,
                stock: parseInt(faker.string.numeric(2)),
                imageUrl: faker.image.url(),
                weight: parseFloat(faker.string.numeric(2)),
                dimensions: `${faker.string.numeric(2)}x${faker.string.numeric(2)}x${faker.string.numeric(2)}`,
                dateAdded: faker.date.past(),
            },
        });
    }
}

// main()
//     .catch((e) => {
//         console.error(e);
//         process.exit(1);
//     })
//     .finally(async () => {
//         await prisma.$disconnect();
//     });
