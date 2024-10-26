import {db} from "@/db";

export const getCategoryById = async (id: number) => {
    return db.category.findUnique({
        where: {
            id: id
        }
    })
}

export const getCategorias = async () => {
    return [
        {
            "id": 6,
            "name": "Café",
            "description": "O café é uma das culturas mais populares e economicamente significativas no mundo",
            "url": "/images/cafe.jpg"
        },
        {
            "id": 12,
            "name": "Bovinos",
            "description": "A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais",
            "url": "/images/bovinos.jpg"
        },
        {
            "id": 2,
            "name": "Milho",
            "description": "O milho é uma das principais culturas de grãos do mundo",
            "url": "/images/corn.jpg"
        },
        {
            "id": 13,
            "name": "Aves",
            "description": "A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais",
            "url": "/images/aves.jpg"
        },
        {
            "id": 3,
            "name": "Soja",
            "description": "A soja é uma cultura leguminosa altamente valorizada",
            "url": "/images/graos.jpg"
        },
        {
            "id": 7,
            "name": "Cana-de-açúcar",
            "description": "A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais",
            "url": "/images/cana.jpg"
        }
    ]

    return db.category.findMany();
}