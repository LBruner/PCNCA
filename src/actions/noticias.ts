'use server';

import {db} from "@/db";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";
import {NoticiasComAutorEstoque} from "@/components/adm/noticias/adm-noticias-table";

interface CreateNoticiaArgs {
    id?: string;
    title: string;
    subtitle: string;
    content: string;
    imageUrl: string;
    categoryName: string;
    authorId?: number;
    categoryId?: number;
    thumbnailSubtitle?: string,
    status?: string;
}

export const createNoticia = async (
    {
        title,
        subtitle,
        content,
        imageUrl,
        categoryName,
        thumbnailSubtitle,
        authorId = 2,
        categoryId = 1,
        status = 'Publicado'
    }: CreateNoticiaArgs) => {
    const novaNoticia = await db.article.create({
        data: {
            title: title,
            subtitle: subtitle,
            content: content,
            publishedAt: new Date(),
            authorId: authorId,
            categoryId: categoryId,
            imageUrl: imageUrl,
            thumbnailText: thumbnailSubtitle || categoryName,
            status: status,
        }
    });

    revalidatePath(paths.noticias());
    redirect(paths.showNoticia(novaNoticia.id))
};

export type getNoticiasArgs = {
    categoryId?: string;
}

export const editNoticia = async (
    {
        id,
        title,
        subtitle,
        content,
        imageUrl,
        categoryName,
        thumbnailSubtitle,
        authorId = 2,
        categoryId = 1,
        status = 'Publicado'
    }: CreateNoticiaArgs) => {
    const noticiaEditada = await db.article.update({
        where: {id: parseInt(id!)},
        data: {
            title: title,
            subtitle: subtitle,
            content: content,
            authorId: authorId,
            categoryId: categoryId,
            imageUrl: imageUrl,
            thumbnailText: thumbnailSubtitle || categoryName,
            status: status,
        }
    });

    revalidatePath(paths.noticias());
    revalidatePath(paths.showNoticia(noticiaEditada.id));
    redirect(paths.showNoticia(noticiaEditada.id))
};

export const deleteNoticia = async (noticiaId: number) => {
    await db.article.delete({
        where: {
            id: noticiaId,
        },
    })

    revalidatePath(paths.noticias());
};


export const getNoticiaById = async (noticiaId: string): Promise<NoticiasComAutorEstoque | null> => {
    return db.article.findUnique({
        where: {
            id: parseInt(noticiaId),
        },
        include: {
            author: true,
            category: true,
        }
    });
}

export const getNoticia = async (noticiaId: string) => {
    return db.article.findUnique({
        where: {
            id: parseInt(noticiaId),
        }
    });
}

export const getRelatedArticles = async (currentArticleId: string, quantity: number) => {
    // if (quantity <= 0) {
    //     throw new Error('Quantity must be greater than 0');
    // }
    //
    // const count = await db.article.count(); // Get total count of articles
    //
    // if (count === 0) {
    //     return [];
    // }
    //
    // const limit = Math.min(quantity, count);
    //
    // const skip = Math.floor(Math.random() * (count - limit + 1));
    //
    // return db.article.findMany({
    //     skip,
    //     take: limit,
    //     where: {
    //         id: {
    //             not: parseInt(currentArticleId),
    //         },
    //     },
    // });

    return [
        {
            "id": 107,
            "title": "Benefícios cosméticos dos ovos",
            "subtitle": "A clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele",
            "content": "Os ovos, além de serem amplamente utilizados na culinária, têm ganhado reconhecimento por seus benefícios cosméticos. Sua composição rica em proteínas, vitaminas e ácidos graxos os torna aliados naturais em tratamentos para a pele e cabelos, promovendo resultados surpreendentes. Na rotina de beleza, os ovos podem ser utilizados de diversas maneiras, oferecendo soluções caseiras eficazes e acessíveis. Um exemplo é a máscara facial feita com clara de ovo, que ajuda a tonificar e firmar a pele. Combinada com iogurte, fonte de ácido láctico, essa mistura esfolia suavemente o rosto, deixando a pele macia e renovada, além de reduzir a aparência de poros dilatados.\n\n\n\nA gema do ovo, por sua vez, é uma excelente aliada para os cabelos, especialmente os danificados. Rica em ácidos graxos e vitaminas, a gema restaura a hidratação e o brilho dos fios, transformando cabelos secos e sem vida em madeixas mais saudáveis e luminosas. Para quem sofre com oleosidade no couro cabeludo, a clara do ovo pode ser aplicada como um tratamento eficaz, controlando a produção de óleo e deixando os cabelos mais leves e com aspecto limpo por mais tempo. A clara de ovo também pode ser utilizada em um esfoliante facial, combinado com açúcar, para remover células mortas e revitalizar a pele, promovendo uma aparência renovada e fresca.\n\nAlém disso, a clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele e uniformizar o tom, deixando-a mais radiante e luminosa. Aplicar a clara sob os olhos também pode ajudar a reduzir olheiras e inchaços, proporcionando uma aparência descansada. No cuidado com as unhas, a gema do ovo é ideal para ser utilizada como um condicionador para cutículas, hidratando e fortalecendo-as, o que promove unhas mais saudáveis e evita a quebra. Uma máscara capilar feita com ovos, azeite e mel pode proporcionar hidratação profunda aos cabelos, aumentando o brilho e a resistência dos fios.\n\n\n\nOutro benefício interessante da clara de ovo é sua propriedade antimicrobiana, devido à presença da enzima lisozima. Essa enzima ajuda a reduzir o tamanho dos poros da pele, prevenindo o acúmulo de sujeira e poeira, o que pode contribuir para a redução da acne. Além disso, a clara de ovo possui propriedades anti-inflamatórias, tornando-se uma opção eficaz para acalmar a pele irritada. Incorporar os ovos na rotina de cuidados pessoais, seja na pele ou nos cabelos, pode ser uma maneira natural e econômica de obter uma aparência mais saudável e radiante.",
            "publishedAt": "2024-09-18 23:37:42.122",
            "authorId": 3,
            "categoryId": 13,
            "imageUrl": "https://www.agrolink.com.br/upload/imagens-resizes/33f430c0c10c470f9b69f05d25388dc2_858x483.jpg",
            "status": "Publicado",
            "thumbnailText": "Saúde"
        },
        {
            "id": 110,
            "title": "Frangos tipo resfriado é opção prática para refeição de brasileiros",
            "subtitle": "O frango é o alimento de origem animal mais consumido no Brasil",
            "content": "O frango é o alimento de origem animal mais consumido no Brasil. Seu elevado valor nutricional, com baixo teor de gordura e alto nível de vitaminas, leva a população a consumi-lo cada vez mais. \"Saboroso, versátil e extremamente nutritivo, o frango pode ser servido de diversas formas e faz parte de múltiplas composições culinárias, o que amplia ainda mais sua importância gastronômica em nossas vidas\", comenta Mariana Nagata, diretora de marketing da Korin Alimentos. \n\n\n\nO consumo per capita de carne de frangos no Estado de São Paulo é de cerca de 45 quilos anuais. A produção supera 14,8 milhões de toneladas por ano em todo o Brasil. Além disso, as exportações atingiram 5,14 milhões de toneladas, em 2023. Com esses números, o Brasil é líder em exportação e um dos maiores produtores de frangos do mundo, de acordo com a Associação Brasileira de Proteína Animal (ABPA). \n\nA Korin Alimentos participa desse mercado em expansão. A empresa oferece o Frango tipo Resfriado Korin Boa Pedida - fresco e ideal para preparo rápido. Único no mercado na categoria sustentável, um importante diferencial do produto da Korin é oferecer mais praticidade na hora do preparo, já que não é necessário aguardar o processo de descongelamento para o início do cozimento. Basta retirar da embalagem e preparar. Além disso, está sempre fresco nos supermercados à disposição dos consumidores. \n\n\n\n\"As pessoas ajustam seus hábitos alimentares em busca de praticidade. Dessa forma, optam por alimentos mais fáceis de preparar e de rápido cozimento\", ressalta a diretora de marketing. \"O frango é o prato ideal para quem não tem muito tempo a perder e quer qualidade\". \n\nCom presença majoritária nos mercados de São Paulo e Rio de Janeiro, os Frangos Resfriados Korin Boa Pedida têm rastreabilidade e preocupação com o bem-estar animal. A criação não recebe antibióticos nem anticoccidianos. \"Esse sistema faz parte do princípio da Agricultura Natural, preconizado pelo pensador japonês Mokiti Okada (1882-1955), que tem como objetivo resgatar a pureza do solo e dos alimentos e preservar a diversidade e o equilíbrio biológico, contribuindo para a elevação da qualidade da vida humana\", informa Mariana. \n\n\n\nOs Frangos Resfriados Korin Boa Pedida são oferecidos nas versões com bandejas de 600 gramas e inteiro. Os cortes disponíveis são: coração, coxa com sobrecoxa sem osso, coxa, coxinha da asa, fígado, filé de coxa com sobrecoxa sem pele, filé de peito, filé sassami, meio da asa, moela, sobrecoxa, sobrecoxa sem pele, sobrecoxa sem osso e frango inteiro.",
            "publishedAt": "2024-09-18 23:41:32.881",
            "authorId": 3,
            "categoryId": 13,
            "imageUrl": "https://www.agrolink.com.br/upload/imagens-resizes/ffb6701390b3421aa1be8c8368a8b425_858x483.jpg",
            "status": "Publicado",
            "thumbnailText": "Gastronomia"
        },
        {
            "id": 111,
            "title": "Mercado de açúcar cai 2,4% na semana",
            "subtitle": "Outro fator que pressionou os preços foram os bons níveis de chuvas na Índia",
            "content": "Segundo informações da StoneX, o mercado de açúcar e etanol registrou quedas significativas na última semana, influenciado por fatores climáticos e econômicos. Os preços do açúcar bruto em Nova Iorque encerraram a semana com uma retração consolidada de 2,4%, situando-se em US¢ 18,03 por libra-peso. Essa queda foi reflexo da divulgação dos dados da safra do Centro-Sul na segunda metade de julho de 2024, além do aumento da aversão ao risco nos mercados financeiros globais.\n\n\n\nOutro fator que pressionou os preços do açúcar foram os bons níveis de chuvas na Índia durante a temporada de monções. Esses elementos contribuíram para uma tendência geral de baixa, apesar de uma alta pontual de 0,84% na sexta-feira (16). A combinação desses fatores adversos resultou em um movimento baixista consolidado no mercado.\n\nNo mercado de etanol, os dados do CEPEA revelam uma desvalorização de 1,4% no etanol hidratado (média São Paulo) entre os dias 08 e 16 de julho, com o preço ficando em R$ 2,5977 por litro, sem impostos. Essa queda foi influenciada pela desaceleração da demanda em função dos preços elevados. As usinas, ainda em pico de safra, ajustaram seus preços, como mostra o indicador da StoneX para o etanol base PVU Ribeirão Preto-SP, que registrou uma queda de 1,6%, retornando ao patamar de R$ 3,10 por litro.\n\n\n\nMesmo com a estabilidade dos preços entre R$ 3,05 e R$ 3,10 por litro desde o final de julho, as perspectivas para o etanol seguem otimistas, impulsionadas pela robusta demanda. As vendas das usinas do Centro-Sul em julho totalizaram 1,77 milhão de metros cúbicos no mercado interno, o maior volume desde 2019. A continuidade dessa demanda forte sugere que, apesar das recentes quedas, o mercado de etanol pode manter uma tendência altista no curto prazo.",
            "publishedAt": "2024-09-18 23:42:11.670",
            "authorId": 3,
            "categoryId": 7,
            "imageUrl": "https://www.agrolink.com.br/upload/imagens-resizes/372fb1c5170f4d328581722abc49303d_858x483.jpg",
            "status": "Publicado",
            "thumbnailText": "Mercado"
        },
        {
            "id": 106,
            "title": "Potencial da carne bovina no México",
            "subtitle": "A Abiec apresentou dados sobre a evolução dos embarques",
            "content": "A Associação Brasileira das Indústrias Exportadoras de Carne (Abiec) divulgou uma nota informando sua participação em um evento realizado na Embaixada do Brasil no México, na quinta-feira (29). A iniciativa, organizada em parceria com a Associação Brasileira de Proteína Animal (ABPA), fez parte de uma missão oficial promovida pelo Ministério da Agricultura e Pecuária (Mapa) ao país. O México, um dos mercados mais recentes abertos à carne bovina brasileira, tem registrado um crescimento expressivo nas exportações, fato destacado pela Abiec durante o encontro.\n\n\n\nSegundo a nota, a Abiec apresentou dados sobre a evolução dos embarques de carne bovina para o México, que tiveram um salto significativo entre janeiro e julho de 2024, comparado ao mesmo período de 2023. O volume exportado passou de 288 toneladas em 2023 para impressionantes 23.108 toneladas em 2024. A diretora de Relações Internacionais da Abiec, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.\n\n\n\nA associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México.",
            "publishedAt": "2024-09-18 23:50:38.587",
            "authorId": 3,
            "categoryId": 12,
            "imageUrl": "https://www.agrolink.com.br/upload/imagens-resizes/95ab384ea6a44cb69ae5ea6001e40917_858x483.jpg",
            "status": "Publicado",
            "thumbnailText": "Internacional"
        },

    ];
}