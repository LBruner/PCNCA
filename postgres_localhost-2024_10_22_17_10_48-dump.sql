--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pcnca; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE pcnca WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE pcnca OWNER TO postgres;

\connect pcnca

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "providerType" text NOT NULL,
    "providerId" text NOT NULL,
    "providerAccountId" text NOT NULL,
    "refreshToken" text,
    "accessToken" text,
    "accessTokenExpires" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO postgres;

--
-- Name: Article; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Article" (
    id integer NOT NULL,
    title text NOT NULL,
    subtitle text NOT NULL,
    content text NOT NULL,
    "publishedAt" timestamp(3) without time zone NOT NULL,
    "authorId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "imageUrl" text,
    status text NOT NULL,
    "thumbnailText" text NOT NULL
);


ALTER TABLE public."Article" OWNER TO postgres;

--
-- Name: Article_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Article_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Article_id_seq" OWNER TO postgres;

--
-- Name: Article_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Article_id_seq" OWNED BY public."Article".id;


--
-- Name: Author; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Author" (
    id integer NOT NULL,
    name text NOT NULL,
    bio text,
    profile_picture_url text
);


ALTER TABLE public."Author" OWNER TO postgres;

--
-- Name: Author_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Author_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Author_id_seq" OWNER TO postgres;

--
-- Name: Author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Author_id_seq" OWNED BY public."Author".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Media" (
    id integer NOT NULL,
    url text NOT NULL,
    type text NOT NULL,
    "articleId" integer NOT NULL
);


ALTER TABLE public."Media" OWNER TO postgres;

--
-- Name: Media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Media_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Media_id_seq" OWNER TO postgres;

--
-- Name: Media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Media_id_seq" OWNED BY public."Media".id;


--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    id integer NOT NULL,
    name text NOT NULL,
    description text,
    price double precision NOT NULL,
    "imageUrl" text,
    weight double precision,
    dimensions text,
    "dateAdded" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    category text NOT NULL,
    stock double precision NOT NULL,
    status text NOT NULL,
    unity text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "supplierId" text DEFAULT 'clydofcr8000oh3tdxqhk1rqb'::text NOT NULL,
    "tipoCommoditie" text DEFAULT 'Agrícola'::text NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: Sale; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Sale" (
    id integer NOT NULL,
    date timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "totalPrice" double precision NOT NULL,
    discount double precision,
    "paymentMethod" text NOT NULL,
    status text NOT NULL,
    "customerName" text NOT NULL,
    "deliveryAddress" text,
    "sellerId" text NOT NULL
);


ALTER TABLE public."Sale" OWNER TO postgres;

--
-- Name: SaleItem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SaleItem" (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    "saleId" integer NOT NULL,
    quantity double precision NOT NULL,
    "unitPrice" double precision NOT NULL,
    "totalPrice" double precision NOT NULL
);


ALTER TABLE public."SaleItem" OWNER TO postgres;

--
-- Name: SaleItem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SaleItem_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SaleItem_id_seq" OWNER TO postgres;

--
-- Name: SaleItem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SaleItem_id_seq" OWNED BY public."SaleItem".id;


--
-- Name: Sale_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Sale_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Sale_id_seq" OWNER TO postgres;

--
-- Name: Sale_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Sale_id_seq" OWNED BY public."Sale".id;


--
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "userId" text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "sessionToken" text NOT NULL,
    "accessToken" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- Name: Tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tag" (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Tag" OWNER TO postgres;

--
-- Name: Tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tag_id_seq" OWNER TO postgres;

--
-- Name: Tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tag_id_seq" OWNED BY public."Tag".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text,
    email text,
    "emailVerified" timestamp(3) without time zone,
    image text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    password text NOT NULL,
    cpf text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: VerificationRequest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationRequest" (
    id text NOT NULL,
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationRequest" OWNER TO postgres;

--
-- Name: _ArticleTags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."_ArticleTags" (
    "A" integer NOT NULL,
    "B" integer NOT NULL
);


ALTER TABLE public."_ArticleTags" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Article id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article" ALTER COLUMN id SET DEFAULT nextval('public."Article_id_seq"'::regclass);


--
-- Name: Author id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Author" ALTER COLUMN id SET DEFAULT nextval('public."Author_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Media id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Media" ALTER COLUMN id SET DEFAULT nextval('public."Media_id_seq"'::regclass);


--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: Sale id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sale" ALTER COLUMN id SET DEFAULT nextval('public."Sale_id_seq"'::regclass);


--
-- Name: SaleItem id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem" ALTER COLUMN id SET DEFAULT nextval('public."SaleItem_id_seq"'::regclass);


--
-- Name: Tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag" ALTER COLUMN id SET DEFAULT nextval('public."Tag_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", "providerType", "providerId", "providerAccountId", "refreshToken", "accessToken", "accessTokenExpires", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Article; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Article" (id, title, subtitle, content, "publishedAt", "authorId", "categoryId", "imageUrl", status, "thumbnailText") FROM stdin;
107	Benefícios cosméticos dos ovos	A clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele	Os ovos, além de serem amplamente utilizados na culinária, têm ganhado reconhecimento por seus benefícios cosméticos. Sua composição rica em proteínas, vitaminas e ácidos graxos os torna aliados naturais em tratamentos para a pele e cabelos, promovendo resultados surpreendentes. Na rotina de beleza, os ovos podem ser utilizados de diversas maneiras, oferecendo soluções caseiras eficazes e acessíveis. Um exemplo é a máscara facial feita com clara de ovo, que ajuda a tonificar e firmar a pele. Combinada com iogurte, fonte de ácido láctico, essa mistura esfolia suavemente o rosto, deixando a pele macia e renovada, além de reduzir a aparência de poros dilatados.\r\n\r\n\r\n\r\nA gema do ovo, por sua vez, é uma excelente aliada para os cabelos, especialmente os danificados. Rica em ácidos graxos e vitaminas, a gema restaura a hidratação e o brilho dos fios, transformando cabelos secos e sem vida em madeixas mais saudáveis e luminosas. Para quem sofre com oleosidade no couro cabeludo, a clara do ovo pode ser aplicada como um tratamento eficaz, controlando a produção de óleo e deixando os cabelos mais leves e com aspecto limpo por mais tempo. A clara de ovo também pode ser utilizada em um esfoliante facial, combinado com açúcar, para remover células mortas e revitalizar a pele, promovendo uma aparência renovada e fresca.\r\n\r\nAlém disso, a clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele e uniformizar o tom, deixando-a mais radiante e luminosa. Aplicar a clara sob os olhos também pode ajudar a reduzir olheiras e inchaços, proporcionando uma aparência descansada. No cuidado com as unhas, a gema do ovo é ideal para ser utilizada como um condicionador para cutículas, hidratando e fortalecendo-as, o que promove unhas mais saudáveis e evita a quebra. Uma máscara capilar feita com ovos, azeite e mel pode proporcionar hidratação profunda aos cabelos, aumentando o brilho e a resistência dos fios.\r\n\r\n\r\n\r\nOutro benefício interessante da clara de ovo é sua propriedade antimicrobiana, devido à presença da enzima lisozima. Essa enzima ajuda a reduzir o tamanho dos poros da pele, prevenindo o acúmulo de sujeira e poeira, o que pode contribuir para a redução da acne. Além disso, a clara de ovo possui propriedades anti-inflamatórias, tornando-se uma opção eficaz para acalmar a pele irritada. Incorporar os ovos na rotina de cuidados pessoais, seja na pele ou nos cabelos, pode ser uma maneira natural e econômica de obter uma aparência mais saudável e radiante.	2024-09-18 23:37:42.122	3	13	https://www.agrolink.com.br/upload/imagens-resizes/33f430c0c10c470f9b69f05d25388dc2_858x483.jpg	Publicado	Saúde
110	Frangos tipo resfriado é opção prática para refeição de brasileiros	O frango é o alimento de origem animal mais consumido no Brasil	O frango é o alimento de origem animal mais consumido no Brasil. Seu elevado valor nutricional, com baixo teor de gordura e alto nível de vitaminas, leva a população a consumi-lo cada vez mais. "Saboroso, versátil e extremamente nutritivo, o frango pode ser servido de diversas formas e faz parte de múltiplas composições culinárias, o que amplia ainda mais sua importância gastronômica em nossas vidas", comenta Mariana Nagata, diretora de marketing da Korin Alimentos. \r\n\r\n\r\n\r\nO consumo per capita de carne de frangos no Estado de São Paulo é de cerca de 45 quilos anuais. A produção supera 14,8 milhões de toneladas por ano em todo o Brasil. Além disso, as exportações atingiram 5,14 milhões de toneladas, em 2023. Com esses números, o Brasil é líder em exportação e um dos maiores produtores de frangos do mundo, de acordo com a Associação Brasileira de Proteína Animal (ABPA). \r\n\r\nA Korin Alimentos participa desse mercado em expansão. A empresa oferece o Frango tipo Resfriado Korin Boa Pedida - fresco e ideal para preparo rápido. Único no mercado na categoria sustentável, um importante diferencial do produto da Korin é oferecer mais praticidade na hora do preparo, já que não é necessário aguardar o processo de descongelamento para o início do cozimento. Basta retirar da embalagem e preparar. Além disso, está sempre fresco nos supermercados à disposição dos consumidores. \r\n\r\n\r\n\r\n"As pessoas ajustam seus hábitos alimentares em busca de praticidade. Dessa forma, optam por alimentos mais fáceis de preparar e de rápido cozimento", ressalta a diretora de marketing. "O frango é o prato ideal para quem não tem muito tempo a perder e quer qualidade". \r\n\r\nCom presença majoritária nos mercados de São Paulo e Rio de Janeiro, os Frangos Resfriados Korin Boa Pedida têm rastreabilidade e preocupação com o bem-estar animal. A criação não recebe antibióticos nem anticoccidianos. "Esse sistema faz parte do princípio da Agricultura Natural, preconizado pelo pensador japonês Mokiti Okada (1882-1955), que tem como objetivo resgatar a pureza do solo e dos alimentos e preservar a diversidade e o equilíbrio biológico, contribuindo para a elevação da qualidade da vida humana", informa Mariana. \r\n\r\n\r\n\r\nOs Frangos Resfriados Korin Boa Pedida são oferecidos nas versões com bandejas de 600 gramas e inteiro. Os cortes disponíveis são: coração, coxa com sobrecoxa sem osso, coxa, coxinha da asa, fígado, filé de coxa com sobrecoxa sem pele, filé de peito, filé sassami, meio da asa, moela, sobrecoxa, sobrecoxa sem pele, sobrecoxa sem osso e frango inteiro.	2024-09-18 23:41:32.881	3	13	https://www.agrolink.com.br/upload/imagens-resizes/ffb6701390b3421aa1be8c8368a8b425_858x483.jpg	Publicado	Gastronomia
111	Mercado de açúcar cai 2,4% na semana	Outro fator que pressionou os preços foram os bons níveis de chuvas na Índia	Segundo informações da StoneX, o mercado de açúcar e etanol registrou quedas significativas na última semana, influenciado por fatores climáticos e econômicos. Os preços do açúcar bruto em Nova Iorque encerraram a semana com uma retração consolidada de 2,4%, situando-se em US¢ 18,03 por libra-peso. Essa queda foi reflexo da divulgação dos dados da safra do Centro-Sul na segunda metade de julho de 2024, além do aumento da aversão ao risco nos mercados financeiros globais.\r\n\r\n\r\n\r\nOutro fator que pressionou os preços do açúcar foram os bons níveis de chuvas na Índia durante a temporada de monções. Esses elementos contribuíram para uma tendência geral de baixa, apesar de uma alta pontual de 0,84% na sexta-feira (16). A combinação desses fatores adversos resultou em um movimento baixista consolidado no mercado.\r\n\r\nNo mercado de etanol, os dados do CEPEA revelam uma desvalorização de 1,4% no etanol hidratado (média São Paulo) entre os dias 08 e 16 de julho, com o preço ficando em R$ 2,5977 por litro, sem impostos. Essa queda foi influenciada pela desaceleração da demanda em função dos preços elevados. As usinas, ainda em pico de safra, ajustaram seus preços, como mostra o indicador da StoneX para o etanol base PVU Ribeirão Preto-SP, que registrou uma queda de 1,6%, retornando ao patamar de R$ 3,10 por litro.\r\n\r\n\r\n\r\nMesmo com a estabilidade dos preços entre R$ 3,05 e R$ 3,10 por litro desde o final de julho, as perspectivas para o etanol seguem otimistas, impulsionadas pela robusta demanda. As vendas das usinas do Centro-Sul em julho totalizaram 1,77 milhão de metros cúbicos no mercado interno, o maior volume desde 2019. A continuidade dessa demanda forte sugere que, apesar das recentes quedas, o mercado de etanol pode manter uma tendência altista no curto prazo.	2024-09-18 23:42:11.67	3	7	https://www.agrolink.com.br/upload/imagens-resizes/372fb1c5170f4d328581722abc49303d_858x483.jpg	Publicado	Mercado
106	Potencial da carne bovina no México	A Abiec apresentou dados sobre a evolução dos embarques	A Associação Brasileira das Indústrias Exportadoras de Carne (Abiec) divulgou uma nota informando sua participação em um evento realizado na Embaixada do Brasil no México, na quinta-feira (29). A iniciativa, organizada em parceria com a Associação Brasileira de Proteína Animal (ABPA), fez parte de uma missão oficial promovida pelo Ministério da Agricultura e Pecuária (Mapa) ao país. O México, um dos mercados mais recentes abertos à carne bovina brasileira, tem registrado um crescimento expressivo nas exportações, fato destacado pela Abiec durante o encontro.\r\n\r\n\r\n\r\nSegundo a nota, a Abiec apresentou dados sobre a evolução dos embarques de carne bovina para o México, que tiveram um salto significativo entre janeiro e julho de 2024, comparado ao mesmo período de 2023. O volume exportado passou de 288 toneladas em 2023 para impressionantes 23.108 toneladas em 2024. A diretora de Relações Internacionais da Abiec, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.\r\n\r\n\r\n\r\nA associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México.	2024-09-18 23:50:38.587	3	12	https://www.agrolink.com.br/upload/imagens-resizes/95ab384ea6a44cb69ae5ea6001e40917_858x483.jpg	Publicado	Internacional
109	Carne de frango ganha competitividade com alta nos preços	Valorização mais suave torna a proteína avícola uma opção mais acessível	A carne de frango tem se destacado no mercado, ampliando sua competitividade em relação às carnes bovina e suína, que apresentam altas mais acentuadas. Essa valorização mais suave torna a proteína avícola uma opção mais acessível para os consumidores no início de setembro.\r\n\r\n\r\n\r\nSegundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida.	2024-09-18 23:59:14.577	3	13	https://www.agrolink.com.br/upload/imagens-resizes/5ae27991230742b1a435da57bf753ae5_858x483.jpg	Publicado	Mercado
86	EUA: 65% da safra de milho está em boas a excelentes condições	Safra de milho alcança 9% dos EUA	O relatório do Weekly Weather and Crop Bulletin, publicado pelo Departamento de Comércio dos EUA em parceria com a Administração Oceânica e Atmosférica Nacional (NOAA) e o Departamento de Agricultura (USDA) apontou que 85% da área de milho nos Estados Unidos já estava amassada até 15 de setembro. Esse índice está 3 pontos percentuais abaixo do registrado no ano passado, mas 1 ponto à frente da média dos últimos cinco anos. Quanto à maturidade da safra, 45% da área de milho do país já alcançou esse estágio, um número que é 3 pontos percentuais inferior ao de 2023, mas 7 pontos à frente da média.\r\n\r\n\r\n\r\nEm relação à colheita, 9% da área plantada foi colhida até o fim da semana, o que representa 1 ponto percentual à frente do mesmo período do ano passado e 3 pontos à frente da média histórica. A colheita está em andamento em 15 dos 18 estados produtores estimados.\r\n\r\n\r\n\r\nAlém disso, 65% da área de milho do país foi classificada como estando em condições de boas a excelentes, uma melhora de 1 ponto percentual em comparação à semana anterior e 14 pontos acima do registrado no ano passado. No estado de Iowa, maior produtor de milho do país, 77% da safra foi classificada nessas condições favoráveis.	2024-09-18 22:52:01.439	3	2	https://www.agrolink.com.br/upload/imagens-resizes/7b0572e203584a089ebeb0c2b772fc65_858x483.jpg	Publicado	Mundo
88	Custo de produção do milho supera preço do cereal, aponta Imea	Ciclo futuro do milho em Mato Grosso continua sendo um desafio	Segundo dados do Instituto Mato-grossense de Economia Agropecuária (Imea), o ponto de equilíbrio dos indicadores de custo de produção para a próxima temporada de milho em Mato Grosso revela um cenário desafiador para os produtores. Os custos de produção para o custeio, COE (Custo Operacional Efetivo), COT (Custo Operacional Total) e CT (Custo Total) foram estimados em R$ 28,96/sc, R$ 41,17/sc, R$ 45,99/sc e R$ 54,38/sc, respectivamente. Esses valores indicam que o preço do milho no estado Cobre apenas as despesas relacionadas ao custeio da temporada.\r\n\r\n\r\n\r\nOs cálculos de ponto de equilíbrio (P.E) utilizaram dados do custo de produção do projeto Acapa-MT, divulgados em setembro de 2024, e a produtividade média das últimas três safras. Com isso, o ciclo futuro do milho em Mato Grosso continua sendo um desafio, exigindo que os produtores mantenham uma gestão rigorosa dos custos, aproveitem as oportunidades de valorização do cereal e otimizem as relações de troca com os insumos.\r\n\r\n\r\n\r\nAlém disso, a produtividade permanece como um fator fundamental e indefinido que pode impactar a rentabilidade, desempenhando um papel fundamental na definição das margens dos produtores.	2024-09-18 22:58:45.317	3	2	https://www.agrolink.com.br/upload/imagens-resizes/4f78c51a69ea40879b7eadfba5c7a3eb_858x483.jpg	Publicado	Produção
92	Café robusta atinge recordes históricos e supera R$ 1.500 por saca	Valorização é de 100%	Os preços do café robusta no Brasil continuam a atingir novos recordes, com a saca de 60 kg fechando acima de R$ 1.500,00 pela primeira vez desde o final da semana passada. O movimento de alta nas cotações, que já era observado desde o último trimestre de 2023, representa uma valorização de 100% em comparação ao preço de R$ 740/sc registrado no período.\r\n\r\n\r\n\r\nSegundo informações do Cepea (Centro de Estudos Avançados em Economia Aplicada), o aumento expressivo nos preços do robusta é atribuído a uma série de fatores. O clima adverso prejudicou a safra brasileira e deve impactar também a produção do Vietnã, maior produtor mundial da variedade. Além disso, dificuldades no fluxo global de mercadorias, que elevaram os custos de frete, têm atrapalhado os envios da Ásia para a Europa.\r\n\r\n\r\n\r\nO clima seco e quente nas principais regiões produtoras também gera preocupações quanto à safra brasileira de 2025/26, tanto para o robusta quanto para o arábica.	2024-09-18 23:03:12.732	3	6	https://www.agrolink.com.br/upload/imagens-resizes/2d0457adbba34d0eb7314f3850c7f3ae_858x483.jpg	Publicado	Mercado
87	Milho tem negócios pontuais	No Paraná se viu um mercado com poucos lotes	No mercado do milho do estado do Rio Grande do Sul foram vistos negócios pontuais ao sul do estado, de acordo com informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 63,00; Não-Me-Toque a R$ 64,00; Marau e Gaurama R$ 64,50; Arroio do Meio, Lajeado e Frederico Westphalen a R$ 66,00 e Montenegro a R$ 67,00. Vendedores a partir de R$ 63,00 no FOB interior. Negócios pontuais em Panambi, onde 700 tons rodaram a R$ 64,00 no CIF indústria, entrega imediata”, comenta.\r\n\r\n\r\n\r\nSanta Catarina tem diferença entre R$ 2,00 a R$ 3,00 e vendedores com pouco prazo travam negócios. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 60,00 no interior e R$ 63,00/64,00 CIF fábricas. Rumores de negócios a R$ 64,00/64,50 no CIF oeste. Nas indicações, Chapecó a R$ 62,00; Campos Novos R$ 64,00; Rio do Sul a R$ 64,00; Videira R$ 63,00. Não ouvimos negócios nesta segunda-feira”, completa.\r\n\r\nNo Paraná se viu um mercado com poucos lotes. “Mercado com negócios pontuais reportados. No porto, indicações a R$ 63,00 set/64,00 nov/65,00 dez. No norte, indicações a R$ 58,00 (+1,00); Cascavel a R$ 57,00 (+1,00); Campos Gerais R$ 58,00 (-1,00); Guarapuava a R$ 58,00; Londrina R$ 57,50. Preços balcão no sudoeste a R$ 52,00; norte a R$ 54,00; oeste R$ 54,00 e centro-oeste R$ 55,00. Rumores de novos negócios na ferrovia Maringá, a R$ 62,00 outubro, onde teriam rodado pelo menos 5 mil toneladas”, indica.\r\n\r\n\r\n\r\nNo Mato Grosso do Sul, a maioria dos preços subiu. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Não ouvimos sobre negócios nesta segunda-feira”, conclui.	2024-09-18 22:57:46.511	3	2	https://www.agrolink.com.br/upload/imagens-resizes/f0b749daba5a4fc1a60b1842c376bbac_858x483.jpg	Publicado	Produtividade
89	China reduz importações de milho, afetando mercado brasileiro	Plantio da safra de verão avança no Sul	A análise do Grão Direto indica que a produção de milho nos EUA teve um leve aumento, de 384,74 para 385,73 milhões de toneladas. No entanto, a produção mundial caiu de 1.219,82 para 1.218,57 bilhões de toneladas, afetando os estoques globais. O USDA informou que os EUA venderam 1,561 milhão de toneladas, superando as expectativas de 700 mil a 1,6 milhão de toneladas.\r\n\r\n\r\n\r\nSegundo a análise produzida pelo Grão Direto, o Departamento de Agricultura dos Estados Unidos (USDA) revisou para baixo suas projeções de importação de milho pela China, de 23 para 21 milhões de toneladas. Essa redução pode ser um indicativo de que o país asiático está se aproximando da autossuficiência na produção de milho, o que pode impactar diretamente a demanda pelo produto brasileiro.\r\n\r\nNo Brasil, os produtores têm mostrado resistência a novas vendas após a quitação de dívidas com vendas anteriores, pressionando os compradores a oferecer preços mais atrativos. No entanto, há ainda grande volume de milho para ser negociado, enquanto a colheita norte-americana avança, oferecendo concorrência no mercado internacional.\r\n\r\n\r\n\r\nO plantio da safra de verão segue em ritmo moderado nos estados do Sul, com o Rio Grande do Sul registrando 37% da área total plantada, abaixo dos 44% do ano anterior. O clima instável em outras regiões do Brasil, contudo, gera incertezas sobre o avanço do plantio do cereal.\r\n\r\nNas exportações, o USDA reduziu a projeção brasileira de 50 para 48 milhões de toneladas, em função da menor produção e do ritmo mais lento de exportações. Mesmo assim, o número ainda está acima da estimativa da Conab, de 36 milhões de toneladas, com o mercado prevendo um patamar entre 40 e 42 milhões de toneladas, cerca de 30% abaixo do previsto inicialmente. Esse cenário pode manter as cotações em alta pelo terceiro mês consecutivo.	2024-09-18 22:59:18.767	3	2	https://www.agrolink.com.br/upload/imagens-resizes/6b0d3abbd6884b828203b793a22aff0c_858x483.jpg	Publicado	Mundo
90	Preços do milho sob pressão	Esses movimentos indicam a necessidade de atenção	De acordo com a TF Agroeconômica, a recente resistência nos preços do milho na B3 acendeu um alerta para investidores e agricultores. Caso essa resistência seja superada na próxima semana, o ideal é manter a posição; caso contrário, pode ser o momento de sair das posições compradas. Embora os preços do milho tenham subido ao longo do mês, o relatório da Conab trouxe um impacto negativo no dia ao registrar aumento nos estoques finais, gerando pressão de queda nos preços.\r\n\r\n\r\n\r\nEntre os fatores de alta, destacam-se o atraso na colheita nos Estados Unidos, causado pelo furacão Francine, e o aumento das exportações brasileiras de milho. A ANEC revisou para cima suas projeções de embarques para setembro, o que elevou os prêmios de exportação no Brasil, impulsionados pela necessidade dos exportadores de cumprir compromissos. Além disso, o aumento da seca em regiões dos EUA, conforme relatório do USDA, segue afetando o mercado, com 18% da área agrícola americana sofrendo algum nível de seca.\r\n\r\n\r\n\r\nPor outro lado, os fatores de baixa incluem o aumento dos estoques finais de milho no Brasil, que passaram de 4,97 milhões para 5,05 milhões de toneladas, segundo a Conab, e a queda de 5,36% nos preços do suíno, um grande consumidor de milho. Além disso, a entrada da safra comercial brasileira no mercado de exportação exerce pressão adicional sobre os preços, mesmo com uma previsão de exportações menor do que no ciclo anterior. Esses movimentos indicam a necessidade de atenção ao comportamento do mercado, pois, apesar dos aumentos recentes, as flutuações de oferta e demanda podem impactar os preços de maneira significativa nos próximos dias.	2024-09-18 23:00:46.319	3	2	https://www.agrolink.com.br/upload/imagens-resizes/ad3fdec02f5c45d19ae948046fc567bd_858x483.jpg	Publicado	Mercado
99	Inflação em queda nos EUA e seca no Brasil impulsionam preços do açúcar	O mercado de açúcar iniciou a semana passada de forma cautelosa	O mercado de açúcar iniciou a semana passada de forma cautelosa, com os participantes aguardando o relatório da União da Indústria de Cana-de-Açúcar (UNICA) enquanto a seca severa no Centro-Sul do Brasil continuava a dar suporte aos preços. A análise da Hedgepoint Global Markets destacou que a combinação da seca prolongada e a queda da inflação nos Estados Unidos fortaleceram o mercado de açúcar, elevando os preços do produto.\r\n\r\n\r\n\r\nLívea Coda, analista de Açúcar e Etanol da Hedgepoint, explicou que, apesar da fraqueza geral no complexo de energia, o açúcar mostrou resiliência, especialmente com as condições climáticas adversas que a principal região produtora do Brasil enfrentou na primeira quinzena de setembro. "As altas temperaturas e a baixa umidade relativa do ar aumentaram o risco de incêndios nos [canaviais](https://www.agrolink.com.br/culturas/cana-de-acucar/?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos)", acrescentou.\r\n\r\nO relatório da UNICA revelou um mix de açúcar de 48,85%, abaixo das expectativas de mercado, que previa um índice acima de 49%. Esse resultado surpreendeu os analistas, reforçando ainda mais o movimento de alta no mercado.\r\n\r\nNo campo legislativo, a aprovação do projeto de lei "Combustíveis do Futuro" pelo Senado brasileiro trouxe perspectivas de aumento na demanda por biocombustíveis, como o etanol. Entre as principais disposições, o aumento da mistura de biogás no gás natural e as metas para biocombustíveis até 2031 foram destacados. "Se o mandato de mistura de etanol na gasolina for fixado em 30% para 2025, a demanda por etanol anidro terá um crescimento significativo, gerando oportunidades no setor de biocombustíveis", afirmou Coda.\r\n\r\n\r\n\r\nEntretanto, a Hedgepoint destacou que o mercado de açúcar permanece atento à paridade das exportações indianas, com a participação do país no comércio internacional sendo restrita a preços acima de 20-21 c/lb. No mercado de açúcar branco, a entrega de outubro foi robusta, com 544,6 mil toneladas sendo entregues, a segunda maior já registrada em Londres.\r\n\r\nEmbora o cenário seja positivo para os preços do açúcar, os biocombustíveis ainda têm um longo caminho a percorrer antes de impactarem diretamente esse mercado. Até lá, o mix de fatores climáticos e macroeconômicos deverá continuar a definir o rumo dos preços, especialmente à medida que a seca no Centro-Sul brasileiro persiste.	2024-09-18 23:30:22.309	3	7	https://www.agrolink.com.br/upload/imagens-resizes/1c06c98d2c724a269450333e388ebd11_858x483.jpg	Publicado	EUA
115	Milho fecha semana em alta na B3	Na Bolsa de Chicago, o milho fechou dia e semana em alta	Na Bolsa de Mercadorias de São Paulo, o milho fechou a semana em alta, acompanhado do mercado norte-americano nesta sexta-feira, de acordo com informações divulgadas pela TF Agroeconômica. “Os contratos futuros de grãos registraram alta acompanhado o mercado americano. Apesar dos relatórios de oferta e demanda do USDA e da Conab apresentarem dados baixistas, os dois mercados seguraram as cotações. Na Bolsa de Chicago, o vencimento setembro/24 fechou cotado a US$ 3,94, em uma valorização de 7,75 pontos”, comenta.\r\n\r\n\r\n\r\n“Diante deste quadro, as cotações futuras fecharam variações em alta no dia: o vencimento de setembro/24 foi de R$ 63,91 apresentando alta de R$ 0,13 no dia, alta de R$ 1,09 na semana; novembro/24 fechou a R$ 67,82, alta de R$ 1,21 no dia, alta de R$ 1,70 na semana; o vencimento janeiro/25 fechou a R$ 70,60, alta de R$ 0,90 no dia e alta de R$ 1,31 na semana”, completa.\r\n\r\nNa Bolsa de Chicago, o milho fechou dia e semana em alta com fundos recomprando posições. “A cotação de dezembro24, referência para a nossa safra de inverno, fechou em alta de 1,79 % ou $ 7,25 cents/bushel a $ 413,25. A cotação para março25, fechou em alta de 1,53 % ou $ 6,50 cents/bushel a $ 431,00”, indica.\r\n\r\n\r\n\r\n“O mercado voltou a cobrir posições em aberto do milho, movimento que transbordou do trigo para o cereal. A melhora da paridade para o Dólar em relação ao Real também deu suporte para milho. Segundo o USDA o México e a Europa devem aumentar as suas importações de milho. Ao longo da semana, as condições secas no Brasil, no começo do plantio do milho de primeira safra deram suporte aos preços. Com isso o milho fechou o acumulado da semana em alta de 1,72% ou $7,00 cents/bushel”, conclui.	2024-09-18 22:47:13.31	3	2	https://www.agrolink.com.br/upload/imagens-resizes/efe634a1e2564f26a6bf53f00d828b5b_858x483.jpg	Publicado	Produção
91	Milho lento no Sul	O mercado do Paraná, enquanto isso, segue sem negócios	No mercado de milho do estado do Rio Grande do Sul o mercado ainda está lento, segundo informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 63,00; Não-Me-Toque a R$ 64,00; Marau e Gaurama R$ 64,50; Arroio do Meio, Lajeado e Frederico Westphalen a R$ 66,00 e Montenegro a R$ 67,00. Vendedores a partir de R$ 63,00 no FOB interior. Não ouvimos negócios nesta quinta-feira”, comenta.\r\n\r\n\r\n\r\nEm Santa Catarina as indicações foram mantidas. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 60,00 no interior e R$ 63,00/64,00 CIF fábricas. Rumores de negócios a R$ 64,00/64,50 no CIF oeste. Nas indicações, Chapecó a R$ 62,00; Campos Novos R$ 64,00; Rio do Sul a R$ 64,00; Videira R$ 63,00. Em negócios ao oeste, viu-se milho sendo negociado entre R$ 63,00 até 64,00 CIF, a depender do vencimento, onde corretores relatam negócios em pelo menos 5 mil toneladas”, completa.\r\n\r\nO mercado do Paraná, enquanto isso, segue sem negócios. “Mercado com negócios pontuais reportados. No porto, indicações a R$ 63,00 set/64,00 nov/65,00 dez. No norte, indicações a R$ 57,00 (+1,00); Cascavel a R$ 56,00 (+2,00); Campos Gerais R$ 59,00 (+1,00); Guarapuava a R$ 58,00; Londrina R$ 57,50. Preços balcão no sudoeste a R$ 52,00; norte a R$ 54,00; oeste R$ 54,00 e centro-oeste R$ 55,00. Rumores de novos negócios na ferrovia Maringá, a R$ 62,00 outubro”, indica.\r\n\r\n\r\n\r\nNo Mato Grosso do Sul os preços subiram. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios pontuais em Naviraí, onde uma indústria levou 2 mil tons entrega setembro/pgto final do mês a R$ 54,00”, conclui.	2024-09-18 23:01:42.13	3	2	https://www.agrolink.com.br/upload/imagens-resizes/44c7a8418c8843dd81abe850d4635a08_858x483.jpg	Publicado	Mercado brasileiro
93	Estoques de café no Japão caem, mas demanda mantém projeção estável	Demanda aparente no Japão sofreu reduções nos últimos anos	Segundo informações divulgadas pela Hedgepoint Global Markets, os estoques de café no Japão continuam em queda. De acordo com os dados mais recentes da Japan Coffee Association (JCA), houve uma redução de 3,3% entre maio e julho, levando o volume para 2,42 milhões de sacas, um nível estável em relação ao ano passado, mas ainda abaixo da média histórica de 2,8 milhões de sacas. Essa diminuição é acompanhada por uma estabilização na demanda aparente para a temporada de 2023/24 (outubro de 2023 a junho de 2024), que já se aproxima dos níveis de 2022/23.\r\n\r\n\r\n\r\nLaleska Moda, analista de café da Hedgepoint, destaca que, apesar dos menores estoques oferecerem suporte para as cotações, a demanda aparente no Japão sofreu reduções nos últimos anos. No entanto, ela ressalta que o consumo está estabilizado, e a expectativa é que a demanda total da temporada 23/24 atinja 6,2 milhões de sacas, o que seria praticamente o mesmo volume de 2022/23.\r\n\r\n**Exportações brasileiras batem recorde**\r\n\r\nEnquanto o Japão lida com a queda dos estoques, o Brasil registra recordes nas exportações de café. Em agosto, o país exportou 3,73 milhões de sacas, um aumento de 0,7% em relação ao mesmo período do ano passado, segundo dados do Cecafé. Esse crescimento foi impulsionado principalmente pelo conilon, cujas exportações subiram 31,4% e atingiram um novo recorde histórico de 924,6 mil sacas.\r\n\r\n\r\n\r\nA participação do conilon no mercado internacional vem crescendo, especialmente devido à restrição de oferta em países como o Vietnã. "O conilon brasileiro está ganhando força em destinos como a Europa, Japão e outros países asiáticos, e esperamos que essa tendência continue forte em 2024/25", destaca a Hedgepoint.\r\n\r\n**Tendências** \r\n\r\nA participação do Brasil nas importações japonesas também aumentou, enquanto países como Vietnã e outros da América Latina perderam espaço. Segundo a Hedgepoint, a oferta limitada no Sudeste Asiático e os problemas climáticos têm impulsionado o café brasileiro, especialmente o conilon, que continua a ser uma escolha preferida por conta do seu preço competitivo.\r\n\r\n\r\n\r\nCom a oferta global de robusta restrita, as exportações brasileiras devem permanecer em níveis elevados, consolidando o país como o principal fornecedor global de café, enquanto os outros produtores lidam com dificuldades de produção.	2024-09-18 23:50:08.947	3	6	https://www.agrolink.com.br/upload/imagens-resizes/697d512ae68a48f3b4330d4177f5cf6e_858x483.jpg	Publicado	Internacional
113	EUA: milho registra crescimento de produção	EUA: milho registra crescimento apesar de área colhida reduzida	De acordo com a análise semanal do Instituto Mato-grossense de Economia Agropecuária (Imea), segundo dados divulgados pelo Departamento de Agricultura dos Estados Unidos (USDA) em setembro de 2024, a área colhida para a safra 2024/25 de [milho](https://www.agrolink.com.br/culturas/milho?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos) manteve-se em 33,47 milhões de hectares, uma queda de 4,4% em relação à temporada anterior.\r\n\r\n\r\n\r\nNo entanto, a produção apresentou um leve aumento de 0,26% em comparação ao relatório de agosto, totalizando 385,73 milhões de toneladas.\r\n\r\nEsse crescimento na produção reflete o bom desempenho das lavouras, com 65% delas classificadas como em condições boas ou excelentes, 9 pontos percentuais acima da média das últimas cinco safras no mesmo período. A colheita começou na semana anterior e, até o dia 15 de setembro, alcançou 9% da área total estimada, o que representa um avanço de 3 pontos percentuais em relação à média histórica.	2024-09-18 23:39:51.382	3	2	https://www.agrolink.com.br/upload/imagens-resizes/df4cec1fdf0a44c3b6cc78fba2aceb13_858x483.jpg	Publicado	Internacional
112	Açúcar fecha em baixa nos mercados internacionais	Datagro reduz estimativa de produção	Os contratos futuros do açúcar fecharam a quarta-feira (4) em baixa nos mercados internacionais, com os comerciantes, segundo analistas ouvidos pela Reuters, destacando que “o mercado ficou tecnicamente fraco depois de não conseguir atingir novos picos de dois meses nesta semana. Na semana passada, ele se recuperou, impulsionado pelos incêndios nos canaviais do Brasil”.\r\n \r\n“No entanto, eles disseram que o açúcar continua sustentado pela situação de seca no Brasil e pela decisão da Índia de permitir que as usinas de açúcar usem o caldo de cana para produzir etanol”, destacou a Agência Internacional de Notícias.\r\n \r\nOntem a Consultoria Datagro reduziu para 39,3 milhões de toneladas a projeção de produção de açúcar no Centro-Sul do Brasil na atual temporada. A redução leva em conta os impactos das condições climáticas desfavoráveis atuais.\r\n \r\nNova York\r\n \r\nNa ICE Futures de Nova York, o açúcar bruto fechou contratado ontem, no lote outubro/24, a 19,24 centavos de dólar por libra-peso, baixa de 25 pontos, ou 1,3%, no comparativo com os preços da véspera. Já a tela março/25 caiu 25 pontos, contratada a 19,56 cts/lb. Os demais contratos recuaram entre 1 e 20 pontos, com a exceção do lote julho/26 que subiu 4 pontos.\r\n \r\nLondres\r\n \r\nJá o açúcar branco listado na ICE Futures Europe de Londres fechou no vermelho em todos os lotes. O vencimento outubro/24 foi contratado a US$ 539,10 a tonelada, recuo de 2,70 dólares no comparativo com os preços da véspera. A tela dezembro/24 caiu 3,30 dólares, contratada a US$ 528,80 a tonelada. Os demais lotes recuaram entre 2,40 e 4,20 dólares.\r\n \r\nMercado doméstico\r\n \r\nNo mercado interno a quarta-feira foi de alta nas cotações do açúcar cristal medidas pelo Indicador Cepea/Esalq, da USP. A saca de 50 quilos foi comercializada ontem a R$ 136,94 contra R$ 135,97 de terça-feira, valorização de 0,71% no comparativo.\r\n \r\nEtanol hidratado\r\n \r\nJá o etanol hidratado fechou pelo terceiro dia seguido em queda pelo Indicador Diário Paulínia. O biocombustível foi negociado ontem a R$ 2.607,00 o m³, contra R$ 2.631,00 o m³ praticado na véspera, desvalorização de 0,91% no comparativo entre os dias.	2024-09-18 23:43:31.9	3	7	https://www.agrolink.com.br/upload/imagens-resizes/9a35558ae78843f09b0283d7edaf085a_858x483.jpg	Publicado	Importação
94	Qualidade da soja mantém-se elevada nos EUA	64% das lavouras estão em boas condições	O mais recente relatório do Weekly Weather, divulgado pelo Departamento de Comércio dos EUA em parceria com a Administração Oceânica e Atmosférica Nacional (NOAA) e o Departamento de Agricultura (USDA), indicou que 44% da queda de folhas das lavouras de soja foi concluída até 15 de setembro. Esse número está 3 pontos percentuais atrás do registrado no ano passado, mas 7 pontos à frente da média de cinco anos.\r\n\r\n\r\n\r\nA colheita de soja alcançou 6% de sua área plantada até a mesma data, um avanço de 2 pontos percentuais em relação a 2023 e 3 pontos à frente da média de cinco anos. A colheita já estava em andamento em 17 dos 18 estados estimados.\r\n\r\nEm termos de qualidade, 64% das plantações de soja foram classificadas como boas a excelentes em 15 de setembro, um leve recuo de 1 ponto percentual em relação à semana anterior, mas ainda 12 pontos percentuais acima do índice registrado no mesmo período do ano passado.	2024-09-18 23:22:23.163	3	3	https://www.agrolink.com.br/upload/imagens-resizes/5ea92573f29343e192d278c2d3300f4a_858x483.jpg	Publicado	Internacional
95	Oferta mundial de soja afeta mercado brasileiro	Demanda cresce por óleo de soja	De acordo com dados da edição de setembro do boletim Agro em Dado da Secretaria de Estado de Agricultura, Pecuária e Abastecimento (Seapa), a oferta mundial recorde de soja na temporada 2023/24 e as projeções de alta disponibilidade para 2024/25, juntamente com variação negativa do dólar frente ao real em agosto, resultaram na desvalorização das cotações da soja tanto no mercado brasileiro quanto no internacional na primeira quinzena do mês.\r\n\r\n\r\n\r\nNo acumulado de exportações de janeiro a julho, o Brasil registrou um aumento de 3,0% no volume exportado de produtos do complexo soja em comparação ao mesmo período de 2023. No entanto, o valor arrecadado caiu 15,4%, refletindo a desvalorização da oleaginosa no mercado externo.\r\n\r\nO óleo de soja, por sua vez, teve valorização no mercado nacional em julho, impulsionado pela maior demanda de indústrias de biodiesel. Esse foi o mês com maior volume de embarques em 2024, totalizando 207,7 mil toneladas, um aumento de 48,9% em relação a junho, com receita de US$196,7 milhões.\r\n\r\n\r\n\r\nEm Goiás, terceiro maior exportador de óleo de soja do Brasil, foram embarcadas 106,8 mil toneladas entre janeiro e julho de 2024, somando US$97,7 milhões, representando quedas de 22,1% no volume e 32,2% no valor em relação ao mesmo período do ano anterior. Abril foi o mês de destaque, com 25,5 mil toneladas exportadas e faturamento de US$22,5 milhões, impulsionado pela valorização do dólar.\r\n\r\nO farelo de soja também teve impacto. De janeiro a julho, o Brasil exportou 13,3 milhões de toneladas, com um aumento de 3,6% em volume, mas uma queda de 14,3% no valor, totalizando US$5,7 bilhões. Goiás, quarto no ranking nacional, embarcou 1,5 milhão de toneladas, ao valor de US$668,9 milhões, recuando 15,8%.	2024-09-18 23:22:59.013	3	3	https://www.agrolink.com.br/upload/imagens-resizes/59b6f442c49746cb8b0dcd39754853e9_858x483.jpg	Publicado	Mercado
96	Falta de chuvas atra semeadura da soja em Mato Grosso	No mesmo período do ano passado, 1,82% da área já havia sido cultivada no estado	Desde o dia 7 de setembro, os produtores de Mato Grosso estão autorizados a iniciar a semeadura da safra de soja 2024/25. No entanto, segundo dados do Instituto Mato-grossense de Economia Agropecuária (Imea), os trabalhos no campo têm ocorrido de forma pontual, restritos a áreas irrigadas por pivô central. A razão para o avanço limitado nessas regiões se deve ao baixo volume de água nos reservatórios.\r\n\r\n\r\n\r\nO Imea atribui esse cenário de seca à mudança nas temperaturas do Oceano Pacífico, que passou de um fenômeno El Niño para uma condição de neutralidade no início de 2024. Essa alteração climática tem retardado as primeiras chuvas em Mato Grosso, complicando o início do plantio.\r\n\r\n\r\n\r\nDe acordo com projeções do Instituto Nacional de Meteorologia (Inmet), o estado deve receber entre 1 e 3 mm de precipitação nos próximos sete dias, volume considerado insuficiente para a semeadura adequada. No mesmo período do ano passado, 1,82% da área já havia sido cultivada no estado, cenário que deve se repetir com atraso em 2024.\r\n\r\n\r\n\r\nCom a previsão de chuvas aquém do necessário, o setor agropecuário de Mato Grosso aguarda com apreensão a evolução climática nas próximas semanas para evitar impactos negativos na produtividade da safra.	2024-09-18 23:23:33.624	3	3	https://www.agrolink.com.br/upload/imagens-resizes/e93429e3193e4c5a9d14e4f495000039_858x483.jpg	Publicado	Mercado nacional
97	Mercado da soja “desanimado”	Em Santa Catarina, os negócios continuam estagnados	O mercado da soja do estado do Rio Grande do Sul continuou desanimado devido à valorização do real frente ao dólar, o que resultou em poucos negócios reportados, segundo informações divulgadas pela TF Agroeconômica. Os preços de hoje para entrega em outubro e pagamento em 15/10 foram: R$ 139,00 no Porto. No interior, os valores seguiram conforme as praças: R$ 131,50 em Cruz Alta, R$ 132,00 em Passo Fundo, R$ 131,00 em Ijuí e R$ 130,50 em Santa Rosa/São Luiz (pagamento em 04/10).\r\n\r\n\r\n\r\nEm Santa Catarina, os negócios continuam estagnados. Segundo o Epagri, Santa Catarina deve colher cerca de 3 milhões de toneladas de soja, um aumento de 12,77% em relação à safra passada. “Os negócios continuam estagnados, refletindo a ausência de movimentação nos preços. O preço no porto foi de R$ 126,00, Chapecó a R$ 117,00”, comenta.\r\n\r\nNo Paraná também não houve muitas alterações no preço. “No porto, Paranaguá vai a R$ 141,00. No interior, em relação à soja da safra 2023/24, a ideia de compra girava em torno de R$ 136,00 por saca CIF Ponta Grossa, com entrega no começo de setembro e pagamento no fim de setembro. No balcão, os preços em Ponta Grossa ficaram em R$ 128,00”, completa.\r\n\r\n\r\n\r\nPreços parados e negócios apenas pontuais no Mato Grosso do Sul. “O plantio no estado segue atrasado, segundo a CONAB, que não indicou o começo da semeadura no Brasil. O vazio sanitário acabou neste dia 15 para o estado. Dourados R$ 132,00. Campo Grande: R$ 131,00. Maracaju: R$ 131,00. Chapadão do Sul: R$ 129,00. Sidrolândia: R$ 129,00”, indica.\r\n\r\nNo Mato Grosso, mais especificamente em Sorriso, os preços subiram para R$ 128 por saca FOB, com retirada em outubro e pagamento em novembro, após estarem a R$ 126 na véspera. “Rodaram volumes pontuais. Preços praticados: Campo Verde: R$ 127,10, Lucas do Rio Verde: R$ 125,60. Nova Mutum: R$ 125,90. Primavera do Leste: R$ 128,00. Rondonópolis: R$ 1330. Sorriso: R$ 125,00”, conclui.	2024-09-18 23:24:16.257	3	3	https://www.agrolink.com.br/upload/imagens-resizes/4ef974c1892344c3bc0876ae6e260fe7_858x483.jpg	Publicado	Produção
98	Compras de oportunidade elevam soja em Chicago	A valorização de uma cesta de commodities também influenciou	# Escreva aqui sua notícia	2024-09-18 23:26:03.844	3	3	https://www.agrolink.com.br/upload/imagens-resizes/e7646f0bc57a442ab8d1acc6cfb88886_858x483.jpg	Publicado	Internacional
100	Queimadas afetam colheita de cana e pressionam setor	Incêndios impactam lavouras de cana	Segundo informações divulgadas pela UNICA, a segunda quinzena de agosto trouxe uma leve redução na moagem de cana-de-açúcar no Centro-Sul do Brasil. As unidades produtoras processaram 45,07 milhões de toneladas, registrando uma queda de 3,25% em comparação ao mesmo período da safra 2023/2024. No entanto, o acumulado da safra 2024/2025 até o início de setembro apresenta crescimento, com 422,61 milhões de toneladas moídas, 3,93% a mais que na safra anterior.\r\n\r\n\r\n\r\nAtualmente, 258 unidades estão em operação no Centro-Sul, sendo 239 focadas no processamento de cana-de-açúcar, nove dedicadas à produção de etanol de milho e dez usinas flex. Em relação à qualidade da matéria-prima, o nível de Açúcares Totais Recuperáveis (ATR) alcançou 155,34 kg por tonelada na segunda quinzena de agosto, um aumento de 0,92% em relação à safra anterior.\r\n\r\nA produção de açúcar, no entanto, registrou queda. Foram produzidas 3,26 milhões de toneladas de açúcar, uma redução de 6,02% em relação ao mesmo período da safra passada. Já o etanol apresentou desempenho mais robusto, com um total de 2,45 bilhões de litros produzidos na segunda metade de agosto, sendo 1,56 bilhão de litros de etanol hidratado, representando um crescimento de 10,27%.\r\n\r\n\r\n\r\nApesar desses números, a UNICA alerta para os efeitos das queimadas, especialmente em São Paulo. Segundo a entidade, incêndios afetaram mais de 231 mil hectares de cana-de-açúcar na segunda quinzena de agosto, o que pode impactar tanto a qualidade da matéria-prima quanto o cronograma de colheita.\r\n\r\nNas vendas de etanol, agosto registrou alta de 3,76%, com destaque para o etanol hidratado, que aumentou 6,81% no período.	2024-09-18 23:30:59.264	3	7	https://www.agrolink.com.br/upload/imagens-resizes/e4ee32da53ef4717808b32ed01bb2de9_858x483.jpg	Publicado	Brasil
101	São Paulo: calor no fim de agosto aumenta risco de incêndios no campo	Queimadas provocaram prejuízos de mais de R$ 1 bilhão ao agro de SP	A previsão de aumento das temperaturas e de tempo seco no fim de semana eleva o alerta para o alto risco de incêndios nas lavouras do Estado de São Paulo. Nos últimos dias, uma frente fria que atingiu a Região Sudeste ajudou no combate aos focos de incêndio, mas o cenário deve mudar nos próximos dias, trazendo novos desafios para o setor agropecuário, conforme os dados da Secretaria de Agricultura e Abastecimento de São Paulo (SAA).\r\n\r\n\r\n\r\nDe acordo com dados da SSA, as queimadas registradas no último fim de semana impactaram fortemente as atividades agrícolas, especialmente a pecuária, cana-de-açúcar, fruticultura, heveicultura e apicultura. Os danos causados pelo fogo nas lavouras, pastagens e até a morte de animais já geraram prejuízos superiores a R$ 1 bilhão.\r\n\r\nGabriel Rodrigues, meteorologista do Agrolink destacou que a expectativa de que o tempo seco persista até pelo menos 12 de setembro. "O final de agosto ainda é marcado pela estação seca no estado de São Paulo, que tem início na segunda metade de maio, e historicamente, a estação chuvosa começa a partir da segunda quinzena de setembro. O cenário nas projeções de médio prazo ainda indicam uma condição de tempo seco no estado paulista até pelo menos o dia 12 de setembro. De certa forma, esta previsão está de acordo com os registros históricos", explica o especialista. \r\n\r\n[Veja mais informações sobre o clima em Agrotempo](https://www.agrolink.com.br/agrotempo?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos)\r\n\r\nAs chuvas ficaram abaixo da média em São Paulo refletindo um inverno ainda mais seco. "No entanto, vale ressaltar que nos últimos 120 dias, as chuvas ficaram abaixo da média no estado, indicando um inverno ainda mais seco. Além disso, a influência de vários episódios de bloqueios atmosféricos ao longo desta estação, contribuíram com a intensificação do calor e o impedimento do avanço das frentes frias sobre o estado. Condição que estamos vendo, agora no final do mês de agosto, mesmo após a chegada de uma massa de ar mais frio, continua Rodrigues. \r\n\r\n\r\n\r\nCom o aumento das temperaturas previsto para os últimos dias de agosto, a Defesa Civil do Estado de São Paulo emitiu um alerta para o alto risco de queimadas nas regiões produtivas. Para evitar novos focos de incêndio, é fundamental que a população colabore, adotando medidas como evitar queimar lixo, não acender fogueiras, não soltar balões (prática considerada crime ambiental), e manter aceiros limpos em volta das propriedades.\r\n\r\n"A presença de um bloqueio atmosférico, que atuará nas próximas semanas. Esse bloqueio, além de impedir a formação das nuvens carregadas e o avanço das chuvas das frentes frias, contribui com a redução dos índices de umidade, favorecendo então um ambiente altamente propício para o alastramento dos incêndios e queimadas no estado. Contudo, as projeções de longo prazo, estão mostrando um cenário mais úmido entre a última semana de setembro e primeira semana de outubro. Condição que pode aliviar, momentaneamente, as condições secas no estado de São Paulo" finaliza o meteorologista.\r\n\r\nPara mitigar esses prejuízos, a SAA destinou R$ 110 milhões aos produtores rurais paulistas afetados pelas queimadas, por meio do Fundo de Expansão do Agronegócio Paulista (FEAP). Os produtores interessados em acessar esse crédito devem procurar a Casa da Agricultura de seus municípios, conforme as informações da Secretaria de Agricultura e São Paulo.\r\n\r\n\r\n\r\nConforme o informado pela Secretaria de Agricultura e Abastecimento de São Paulo, em caso de emergência, a Defesa Civil (199) e o Corpo de Bombeiros (193) estão disponíveis para atendimento. As regiões sob alerta incluem Andradina, Araçatuba, Assis, Barretos, Bauru, Campinas, Campos do Jordão, Franca, Guaratinguetá, Iperó, Itapeva, Jales, Jaú, Jundiaí, Marília, Ourinhos, Presidente Prudente, Ribeirão Preto, São Carlos, São José do Rio Preto, Sorocaba e Votuporanga.	2024-09-18 23:32:10.795	3	7	https://www.agrolink.com.br/upload/imagens-resizes/3cd974ea0a724522b78b6c5d17adb406_858x483.jpg	Publicado	Produção
102	Preços do frango vivo sobem em setembro	Exportações de carne de frango caem consideravelmente	Segundo a análise da edição de setembro do Boletim Agropecuário produzido pela Empresa de Pesquisa Agropecuária e Extensão Rural de Santa Catarina (Epagri) divulgado pelo Observatório Agro Catarinense, nas duas primeiras semanas de setembro, os preços do frango vivo apresentaram leve alta nos dois principais estados produtores. No Paraná, houve um aumento de 0,5% em comparação com o mês anterior, enquanto em Santa Catarina o crescimento foi de 0,4%. Quando comparados aos preços de setembro do ano passado, as altas foram de 4,5% no Paraná e 2,9% em Santa Catarina, considerando os valores nominais.\r\n\r\n\r\n\r\nEm relação às variações regionais, os preços nas duas primeiras semanas de setembro mantiveram-se estáveis nas regiões Meio Oeste e Litoral Sul. No entanto, a região Oeste registrou uma alta de 1,2% no período. Comparado a setembro de 2023, o Meio Oeste viu um aumento de 3,1%, e o Litoral Sul, de 0,7%, enquanto o Oeste sofreu uma queda de 6,6%, todos os valores corrigidos pelo IGP-DI.\r\n\r\nNo mercado atacadista, os preços da carne de frango mostraram variações distintas no início de setembro. O peito com osso e o filé de peito apresentaram altas de 1,7% e 0,8%, respectivamente. Por outro lado, a coxa/sobrecoxa e o frango inteiro congelado tiveram variações negativas de -0,8% e -0,1%. A variação média dos quatro cortes foi de 0,4%, com um aumento acumulado de 18,6% no ano, conforme dados do Boletim Agropecuária.\r\n\r\nQuando comparados aos preços de setembro de 2023, os valores atuais apresentam aumentos em todos os cortes: 34,2% para o filé de peito, 30,8% para o peito com osso, 10,3% para o frango inteiro e 3,9% para a coxa/sobrecoxa. A variação média dos quatro cortes foi de 19,8%.\r\n\r\n\r\n\r\nDe acordo com a Embrapa Suínos e Aves, o custo de produção de frangos em aviário climatizado positivo em Santa Catarina foi de R$ 4,85/kg em agosto, refletindo uma alta de 2,1% em relação ao mês anterior e 4,0% acima do custo de agosto de 2023, corrigido pelo IGP-DI. No acumulado do ano, o aumento é de 5,2%. A relação de troca insumo-produto caiu levemente nas duas primeiras semanas de setembro, com uma redução de 0,5% devido ao aumento no preço do frango vivo na região Oeste, parcialmente compensado pela alta no preço do [milho](https://www.agrolink.com.br/culturas/milho?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos).\r\n\r\nNo setor de exportações, o Brasil enviou 318,5 mil toneladas de carne de frango em agosto, o que representa uma queda de 29,6% em relação ao mês anterior e de 24,4% na comparação com agosto de 2023. As receitas caíram para US$ 609,0 milhões, uma redução de 30,3% em relação ao mês anterior e de 25,2% na comparação anual. A Associação Brasileira de Proteína Animal (ABPA) atribui essa queda ao surto de doença de Newcastle no Rio Grande do Sul, que afetou especialmente os embarques para a China e o México.\r\n\r\nNo acumulado de janeiro a agosto, o Brasil exportou 3,30 milhões de toneladas de carne de frango, gerando receitas de US$ 6,04 bilhões, o que representa uma queda de 3,2% em quantidade e 10,2% em valor em comparação com o mesmo período do ano passado. Santa Catarina exportou 69,9 mil toneladas em agosto, com uma queda de 32,3% em relação ao mês anterior e de 28,8% na comparação anual. As receitas foram de US$ 141,0 milhões, com uma redução de 31,5% em relação ao mês anterior e de 31,9% na comparação anual.\r\n\r\n\r\n\r\nApesar das quedas recentes, o valor médio da carne de frango in natura exportada por Santa Catarina foi de US$ 1.934,82 por tonelada em agosto, uma pequena queda de 0,1% em relação ao mês anterior, mas 3,8% abaixo do valor de agosto de 2023. No acumulado do ano, o estado exportou 736,4 mil toneladas, com receitas de US$ 1,42 bilhão, apresentando um aumento de 0,5% em quantidade, mas uma queda de 10,5% em valor, comparado ao mesmo período do ano anterior. Santa Catarina foi responsável por 23,5% das receitas geradas pelas exportações brasileiras de carne de frango nos primeiros oito meses de 2024.	2024-09-18 23:34:00.23	3	13	https://www.agrolink.com.br/upload/imagens-resizes/f0d1448d1c614b63a00ed60510e4fdf6_858x483.jpg	Publicado	Mercado
103	Exportações de ovos caem pelo segundo mês consecutivo	Brasil exportou 1,239 mil toneladas de ovos in natura e processados no último mês	As exportações de ovos comerciais do Brasil registraram nova queda em agosto, consolidando o segundo mês consecutivo de recuo. Esse desempenho negativo foi impulsionado, sobretudo, pela redução nos embarques de produtos processados, como ovalbumina e ovos secos ou cozidos, setores que apresentaram baixa expressiva.\r\n\r\n\r\n\r\nSegundo dados informados pelo Cepea, com base nas estatísticas da Secex, o Brasil exportou 1,239 mil toneladas de ovos in natura e processados no último mês, o que representa uma queda de 4,7% em relação a julho e uma redução significativa de 42% em comparação a agosto de 2023. Destas exportações, apenas 24,6% (equivalente a 305 toneladas) foram de produtos processados, o menor índice registrado desde dezembro de 2022.	2024-09-18 23:34:30.741	3	13	https://www.agrolink.com.br/upload/imagens-resizes/2e67af479dc24df9ae6983f5fc124bc2_858x483.jpg	Publicado	Exportação
104	Preços da carne de frango recuperam em agosto após queda	O aumento dos preços é impulsionado pela demanda aquecida	De acordo com informações divulgadas pelo Centro de Estudos Avançados em Economia Aplicada (Cepea), os preços médios da carne de frango, que enfrentaram queda em julho, apresentaram sinais de recuperação ao final de agosto. O aumento dos preços é impulsionado pela demanda aquecida, especialmente na primeira quinzena do mês, coincidente com o pagamento de salários, e pela oferta interna mais restrita.\r\n\r\n\r\n\r\nO mercado de frango vivo também experimentou um aumento nos preços devido à combinação de demanda elevada pela carne e oferta reduzida do animal. No entanto, enquanto o mercado interno mostra sinais de recuperação, as exportações brasileiras de carne de frango in natura continuam enfraquecidas.	2024-09-18 23:35:02.027	3	13	https://www.agrolink.com.br/upload/imagens-resizes/827426b4de864e86b90671cdce04eaa1_858x483.jpg	Publicado	Mercado
105	Captação do leite cai 6,16% no Brasil	Queda na captação de leite no Sul e Centro-Oeste impacta produção nacional	A captação de leite no Brasil registrou uma queda de 6,16% no segundo trimestre de 2024 em relação ao trimestre anterior, de acordo com a análise semanal do Instituto Mato-grossense de Economia Agropecuária (Imea) e dados do IBGE. O volume total captado no período somou 5,83 bilhões de litros. A principal responsável por essa redução foi a região Sul, que sofreu uma retração de 5,30%, sendo puxada principalmente pelo Rio Grande do Sul, onde as enchentes resultaram em uma queda de 10,08% no volume captado em relação ao primeiro trimestre de 2024.\r\n\r\n\r\n\r\nSegundo a análise, na região Centro-Oeste, a entrada do período seco também impactou a produção, com uma queda de 10,77%, resultando em um total de 0,62 bilhão de litros captados. Mato Grosso do Sul e Mato Grosso lideraram as retrações, com reduções de 23,21% e 18,43%, respectivamente.\r\n\r\n\r\n\r\nPara o terceiro trimestre de 2024, a continuidade do período seco na região Centro-Oeste pode continuar a limitar a captação de leite, enquanto as pastagens de inverno na região Sul devem proporcionar uma recuperação, sustentando um leve aumento na captação a nível nacional, conforme os dados do Imea.	2024-09-18 23:36:03.394	3	12	https://www.agrolink.com.br/upload/imagens-resizes/8c91bc5aca8344c4841291e37d8435fa_858x483.jpg	Publicado	Produção
\.


--
-- Data for Name: Author; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Author" (id, name, bio, profile_picture_url) FROM stdin;
2	Mariana Dias	Jornalista especializada em agronegócio, com 10 anos de experiência em reportagens sobre clima e agricultura. Formada em Comunicação Social, é apaixonada por agricultura sustentável e inovação no campo.	https://placehold.co/600x400.png
3	Pedro Alves	Analista de mercado agropecuário, com foco em commodities agrícolas como café e açúcar. Mestre em Economia Rural, Pedro escreve sobre tendências de mercado e estratégias de exportação.	https://placehold.co/600x400.png
4	João Silva	Economista especializado em agronegócios, com vasta experiência em análise de mercado e câmbio. João é autor de diversos artigos sobre exportação de grãos e políticas agrícolas.	https://placehold.co/600x400.png
5	Ana Pereira	Engenheira agrônoma com especialização em culturas de cereais, como trigo e milho. Ana compartilha suas experiências de campo e análises técnicas em artigos e seminários.	https://placehold.co/600x400.png
6	Carlos Mendes	Jornalista agro especializado em análises de mercado e previsões climáticas. Com mais de 15 anos no setor, Carlos é referência em notícias sobre produção agrícola e demanda.	https://placehold.co/600x400.png
7	Maria Souza	Consultora agrícola com foco em bioenergia e produção de cana-de-açúcar. Maria possui ampla experiência em desenvolvimento sustentável e políticas de incentivo ao etanol.	https://placehold.co/600x400.png
8	Fernanda Oliveira	Agrônoma e pesquisadora com ênfase em algodão e fibras naturais. Fernanda escreve sobre práticas agrícolas inovadoras e o impacto das mudanças climáticas na produção.	https://placehold.co/600x400.png
9	Lucas Rocha	Jornalista especializado em mercados internacionais, com foco em culturas tropicais como cacau e café. Lucas é conhecido por sua cobertura detalhada de crises climáticas e suas implicações econômicas.	https://placehold.co/600x400.png
10	Ricardo Lima	Economista e pesquisador agrícola, com interesse especial em leguminosas como feijão e soja. Ricardo analisa tendências de mercado e desenvolve estudos sobre eficiência produtiva.	https://placehold.co/600x400.png
11	Beatriz Moreira	Jornalista agro com experiência em cobertura de eventos climáticos e seus efeitos no setor agrícola. Beatriz é formada em Jornalismo e possui uma especialização em Mudanças Climáticas.	https://placehold.co/600x400.png
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, description) FROM stdin;
2	Milho	O milho é uma das principais culturas de grãos do mundo
3	Soja	A soja é uma cultura leguminosa altamente valorizada
6	Café	O café é uma das culturas mais populares e economicamente significativas no mundo
7	Cana-de-açúcar	A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais
12	Bovinos	A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais
13	Aves	A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Media" (id, url, type, "articleId") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (id, name, description, price, "imageUrl", weight, dimensions, "dateAdded", category, stock, status, unity, "userId", "createdAt", "supplierId", "tipoCommoditie") FROM stdin;
3743	fas	fasf	21	https://cdn-icons-png.flaticon.com/512/684/684809.png	\N	\N	2024-10-14 01:17:12.409	Fruits	2	Ativo	Toneladas (t)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-14 01:17:12.409	clydofcr8000oh3tdxqhk1rqb	Agrícola
3744	fas	fasf	21	https://cdn-icons-png.flaticon.com/512/684/684809.png	\N	\N	2024-10-14 01:17:12.56	Fruits	2	Ativo	Toneladas (t)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-14 01:17:12.56	clydofcr8000oh3tdxqhk1rqb	Agrícola
3745	sfas	fasfa	12	https://cdn-icons-png.flaticon.com/512/684/684809.png	\N	\N	2024-10-14 01:44:50.077	Fruits	12	Ativo	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-14 01:44:50.077	clydofcr8000oh3tdxqhk1rqb	Agrícola
3432	Macadâmia	Macadâmia from our finest poultry collection.	95	https://picsum.photos/seed/82PgXAVi5/640/480	27	89x13x01	2024-06-15 18:42:58.216	Poultry	69	Ativo	Galão (gal)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3433	Leite	Leite from our finest seafood collection.	486	https://loremflickr.com/640/480?lock=867143430176768	5	36x47x56	2024-07-22 05:24:35.823	Seafood	82	Desativado	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3746	214141	fsafsa	124	https://cdn-icons-png.flaticon.com/512/684/684809.png	\N	\N	2024-10-14 01:48:02.294	Fruits	21	Desativado	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-14 01:48:02.294	clydofcr8000oh3tdxqhk1rqb	Agrícola
3435	Centeio	Centeio from our finest poultry collection.	227	https://picsum.photos/seed/wob4QOYyZ/640/480	94	63x79x56	2023-08-13 06:58:18.233	Poultry	98	Em espera	Arrobas (arroba)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3436	Farinha de Milho	Farinha de Milho from our finest dairy products collection.	476	https://loremflickr.com/640/480?lock=3815414846980096	58	13x32x84	2023-11-11 18:37:56.147	Dairy Products	45	Desativado	Sacas (sc)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3437	Castanha-de-Caju	Castanha-de-Caju from our finest vegetables collection.	312	https://loremflickr.com/640/480?lock=8536938971660288	50	51x92x07	2024-04-24 14:06:37.792	Vegetables	60	Ativo	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3438	Castanha-de-Caju	Castanha-de-Caju from our finest dairy products collection.	329	https://loremflickr.com/640/480?lock=2741445955944448	51	12x06x72	2023-11-06 03:00:45.592	Dairy Products	97	Em espera	Caixas (cx)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3439	Carne de Coelho	Carne de Coelho from our finest processed foods collection.	685	https://picsum.photos/seed/XRpr70bY/640/480	78	65x12x16	2024-03-05 10:18:28.82	Processed Foods	36	Em espera	Hectolitros (hL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3440	Sementes de Chia	Sementes de Chia from our finest other collection.	523	https://loremflickr.com/640/480?lock=8894831891841024	22	22x41x76	2024-03-17 06:12:08.79	Other	76	Desativado	Caixas (cx)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3441	Peito de Frango	Peito de Frango from our finest other collection.	160	https://picsum.photos/seed/oxAfp/640/480	76	86x82x73	2023-10-22 19:37:16.575	Other	87	Em espera	Fardos (fd)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3442	Leite de Cabra	Leite de Cabra from our finest seafood collection.	295	https://picsum.photos/seed/l7CWrSbi/640/480	11	00x20x75	2024-05-19 14:33:52.838	Seafood	94	Desativado	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3443	Amido de Milho	Amido de Milho from our finest poultry collection.	646	https://picsum.photos/seed/pEMjXqoHap/640/480	49	52x06x32	2024-06-02 13:01:48.458	Poultry	73	Em espera	Quilogramas (kg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3444	Óleo de Amendoim	Óleo de Amendoim from our finest grains collection.	734	https://picsum.photos/seed/90lWQ046i/640/480	53	42x97x15	2023-10-28 13:59:48.045	Grains	30	Ativo	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3445	Azeite de Oliva	Azeite de Oliva from our finest beverages collection.	611	https://loremflickr.com/640/480?lock=7347403575263232	66	38x70x27	2024-06-01 21:01:50.873	Beverages	60	Ativo	Quilogramas (kg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3446	Carne de Coelho	Carne de Coelho from our finest seafood collection.	115	https://picsum.photos/seed/pRerfF/640/480	79	03x35x12	2024-01-02 11:36:21.77	Seafood	23	Em espera	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3447	Bacon	Bacon from our finest seafood collection.	719	https://picsum.photos/seed/4tQBWiYVYp/640/480	66	73x52x49	2024-07-06 23:42:00.544	Seafood	77	Em espera	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3448	Carne de Cordeiro	Carne de Cordeiro from our finest poultry collection.	764	https://loremflickr.com/640/480?lock=7312769246298112	42	02x60x37	2024-04-09 12:07:58.807	Poultry	62	Ativo	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3449	Carne de Porco	Carne de Porco from our finest processed foods collection.	887	https://loremflickr.com/640/480?lock=8594605167607808	66	44x42x60	2023-11-26 20:49:53.23	Processed Foods	59	Em espera	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3450	Banana	Banana from our finest seafood collection.	242	https://picsum.photos/seed/jNgK7R/640/480	32	66x67x27	2023-12-30 18:34:28.399	Seafood	17	Ativo	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3451	Linguiça	Linguiça from our finest poultry collection.	53	https://loremflickr.com/640/480?lock=4963799798906880	74	22x03x03	2023-07-28 18:23:39.866	Poultry	92	Desativado	Litros (L)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3452	Aveia	Aveia from our finest grains collection.	533	https://picsum.photos/seed/YuLlWbDFJ/640/480	59	37x57x45	2024-03-16 01:51:05.914	Grains	64	Em espera	Fardos (fd)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3453	Polenta	Polenta from our finest poultry collection.	311	https://loremflickr.com/640/480?lock=5620067047833600	58	72x23x52	2024-06-13 05:01:22.883	Poultry	73	Em espera	Hectolitros (hL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3454	Lombo de Porco	Lombo de Porco from our finest grains collection.	845	https://picsum.photos/seed/wTa1G/640/480	22	19x45x45	2024-06-01 07:22:40.577	Grains	62	Ativo	Centímetro cúbico (cm³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3455	Amêndoa	Amêndoa from our finest seafood collection.	417	https://picsum.photos/seed/T3DHIFohGH/640/480	41	99x20x42	2024-04-21 22:00:29.085	Seafood	21	Em espera	Toneladas (t)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3456	Cevada	Cevada from our finest livestock collection.	795	https://picsum.photos/seed/cj1NJ2SWRM/640/480	20	49x32x14	2024-04-17 19:36:00.67	Livestock	44	Desativado	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3457	Sementes de Girassol	Sementes de Girassol from our finest poultry collection.	261	https://loremflickr.com/640/480?lock=1445185235976192	59	90x50x73	2023-08-24 09:40:45.826	Poultry	15	Em espera	Hectolitros (hL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3458	Tomates	Tomates from our finest seafood collection.	35	https://loremflickr.com/640/480?lock=5496585993584640	63	83x84x45	2023-08-17 22:01:10.95	Seafood	48	Desativado	Quilogramas (kg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3459	Castanha-do-Pará	Castanha-do-Pará from our finest vegetables collection.	333	https://loremflickr.com/640/480?lock=3671225352060928	97	40x61x84	2024-07-17 16:15:49.41	Vegetables	38	Desativado	Polegada cúbica (in³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3460	Peixe	Peixe from our finest dairy products collection.	205	https://picsum.photos/seed/YzVwko/640/480	43	48x52x03	2024-03-28 01:18:08.34	Dairy Products	9	Em espera	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3461	Milheto	Milheto from our finest poultry collection.	672	https://picsum.photos/seed/jJOVMdwx/640/480	33	42x63x53	2024-05-12 05:13:50.704	Poultry	19	Em espera	Sacas (sc)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3462	Quinoa	Quinoa from our finest beverages collection.	613	https://picsum.photos/seed/XhMTXLr/640/480	32	84x59x05	2023-09-20 10:30:11.504	Beverages	33	Desativado	Caixas (cx)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3464	Biscoitos	Biscoitos from our finest fruits collection.	590	https://picsum.photos/seed/p8sn0Bh5/640/480	81	62x94x09	2023-09-24 17:30:39.461	Fruits	92	Ativo	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3466	Amido de Milho	Amido de Milho from our finest processed foods collection.	99	https://picsum.photos/seed/fE7tDK6/640/480	92	31x82x60	2023-08-28 02:46:34.422	Processed Foods	57	Em espera	Pé cúbico (ft³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3467	Noz	Noz from our finest fruits collection.	129	https://picsum.photos/seed/GvC7tKNzr/640/480	91	63x33x79	2024-06-28 12:08:06.889	Fruits	1	Em espera	Sacas (sc)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3468	Frango	Frango from our finest livestock collection.	283	https://loremflickr.com/640/480?lock=8253523519078400	90	44x46x91	2023-12-11 14:56:22.769	Livestock	87	Ativo	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3469	Trigo	Trigo from our finest processed foods collection.	659	https://picsum.photos/seed/S03hhGraE/640/480	47	70x85x92	2023-12-30 03:06:50.641	Processed Foods	96	Em espera	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3470	Soja	Soja from our finest dairy products collection.	844	https://loremflickr.com/640/480?lock=6799294470291456	80	29x98x65	2023-10-05 07:26:28.907	Dairy Products	79	Ativo	Pé cúbico (ft³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3472	Patos	Patos from our finest vegetables collection.	88	https://picsum.photos/seed/G1LNR2z/640/480	81	63x08x44	2023-08-25 17:40:50.788	Vegetables	95	Em espera	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3473	Óleo de Soja	Óleo de Soja from our finest processed foods collection.	915	https://loremflickr.com/640/480?lock=7055087448883200	27	51x21x89	2024-01-17 09:15:21.611	Processed Foods	7	Ativo	Litros (L)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3474	Melancia	Melancia from our finest grains collection.	942	https://loremflickr.com/640/480?lock=6634980088217600	82	33x25x16	2023-12-14 00:39:23.498	Grains	74	Ativo	Miligramas (mg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3476	Amêndoa	Amêndoa from our finest poultry collection.	290	https://loremflickr.com/640/480?lock=4033259579113472	82	52x07x78	2024-05-07 22:37:16.679	Poultry	78	Desativado	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3477	Sorgo	Sorgo from our finest other collection.	984	https://picsum.photos/seed/b1Xi6XsKoU/640/480	38	50x52x86	2024-05-10 13:02:42.207	Other	75	Ativo	Galão (gal)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3478	Abacaxi	Abacaxi from our finest seafood collection.	826	https://picsum.photos/seed/HUZxr/640/480	48	59x37x61	2024-01-20 05:11:10.608	Seafood	30	Ativo	Polegada cúbica (in³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3471	Açúcar	Açúcar from our finest vegetables collection.	53	https://loremflickr.com/640/480?lock=4435542391390208	97	94x36x80	2024-04-12 12:13:02.571	Vegetables	43	Desativado	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3479	Amido de Milho	Amido de Milho from our finest grains collection.	124	https://picsum.photos/seed/SPu0QujJj/640/480	66	76x24x27	2023-11-11 14:05:29.41	Grains	34	Ativo	Galão (gal)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3480	Macadâmia	Macadâmia from our finest other collection.	160	https://picsum.photos/seed/GWAz60r/640/480	98	59x49x45	2023-10-24 17:44:28.651	Other	27	Ativo	Miligramas (mg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3481	Chocolate	Chocolate from our finest grains collection.	445	https://picsum.photos/seed/vH4eTOufBN/640/480	80	04x69x15	2024-02-23 12:12:48.093	Grains	47	Em espera	Arrobas (arroba)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3482	Suco	Suco from our finest vegetables collection.	736	https://picsum.photos/seed/D37q0V/640/480	42	72x90x70	2024-04-14 14:13:31.909	Vegetables	83	Desativado	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3483	Limão	Limão from our finest beverages collection.	193	https://loremflickr.com/640/480?lock=1223262453366784	45	26x87x85	2023-10-22 11:40:34.664	Beverages	30	Ativo	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3484	Sementes de Girassol	Sementes de Girassol from our finest livestock collection.	892	https://loremflickr.com/640/480?lock=3764967316652032	6	60x23x88	2024-06-06 08:59:52.065	Livestock	3	Em espera	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3485	Óleo de Amendoim	Óleo de Amendoim from our finest beverages collection.	737	https://loremflickr.com/640/480?lock=7416147225870336	3	31x31x68	2024-05-21 20:25:33.852	Beverages	22	Desativado	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3486	Trigo	Trigo from our finest vegetables collection.	251	https://picsum.photos/seed/iMa4Q8j/640/480	29	51x24x13	2024-06-01 04:36:48.735	Vegetables	88	Desativado	Fardos (fd)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3487	Óleo de Palma	Óleo de Palma from our finest seafood collection.	298	https://loremflickr.com/640/480?lock=5783704716705792	65	98x20x23	2024-06-08 04:48:36.748	Seafood	78	Ativo	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3488	Milho	Milho from our finest livestock collection.	356	https://picsum.photos/seed/7AkNF/640/480	11	83x12x94	2023-08-14 15:15:04.44	Livestock	63	Em espera	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3489	Mel	Mel from our finest other collection.	722	https://loremflickr.com/640/480?lock=1059142930268160	96	89x01x33	2024-03-26 22:56:13.953	Other	10	Em espera	Fardos (fd)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3490	Presunto	Presunto from our finest vegetables collection.	766	https://picsum.photos/seed/OORq3tS5/640/480	50	66x58x18	2024-03-09 15:52:18.486	Vegetables	18	Ativo	Pé cúbico (ft³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3491	Chocolate	Chocolate from our finest processed foods collection.	764	https://picsum.photos/seed/4EdZU/640/480	18	88x97x68	2024-01-05 13:41:03.254	Processed Foods	78	Ativo	Galão (gal)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3492	Leite de Cabra	Leite de Cabra from our finest poultry collection.	796	https://loremflickr.com/640/480?lock=3842986349690880	94	21x98x02	2024-01-31 21:04:05.368	Poultry	43	Desativado	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3493	Linhaça	Linhaça from our finest grains collection.	206	https://loremflickr.com/640/480?lock=6691525981372416	36	35x26x64	2024-04-08 15:37:32.108	Grains	73	Desativado	Hectolitros (hL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3494	Biscoitos	Biscoitos from our finest livestock collection.	826	https://loremflickr.com/640/480?lock=958803631669248	51	03x70x34	2024-05-12 03:28:47.326	Livestock	31	Em espera	Caixas (cx)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3495	Chocolate	Chocolate from our finest dairy products collection.	310	https://picsum.photos/seed/KgGAXDS/640/480	29	49x85x50	2024-06-03 05:08:49.786	Dairy Products	93	Desativado	Miligramas (mg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3496	Mamão	Mamão from our finest beverages collection.	948	https://loremflickr.com/640/480?lock=5111702251110400	67	00x01x42	2024-01-14 00:17:19.062	Beverages	60	Em espera	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3497	Creme de Leite	Creme de Leite from our finest livestock collection.	651	https://loremflickr.com/640/480?lock=6466202975076352	60	30x95x87	2024-05-09 11:27:34.063	Livestock	53	Em espera	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3498	Sorvete	Sorvete from our finest livestock collection.	245	https://loremflickr.com/640/480?lock=523478648225792	41	13x80x94	2023-09-27 03:02:41.527	Livestock	11	Em espera	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3499	Limão	Limão from our finest livestock collection.	880	https://picsum.photos/seed/WqXZD/640/480	46	46x57x97	2024-06-26 07:12:53.394	Livestock	84	Ativo	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3500	Sementes de Abóbora	Sementes de Abóbora from our finest fruits collection.	392	https://picsum.photos/seed/mrr9x0sS8/640/480	1	38x50x90	2024-06-18 16:43:13.181	Fruits	59	Ativo	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3501	Óleo de Milho	Óleo de Milho from our finest other collection.	73	https://picsum.photos/seed/ZLxzc/640/480	50	49x81x82	2024-03-04 16:11:41.515	Other	46	Desativado	Caixas (cx)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3502	Gengibre	Gengibre from our finest grains collection.	748	https://loremflickr.com/640/480?lock=7792244700479488	92	91x86x30	2023-10-16 18:48:17.845	Grains	68	Em espera	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3503	Asa de Frango	Asa de Frango from our finest fruits collection.	431	https://picsum.photos/seed/OGCPPZINq/640/480	17	84x35x41	2023-10-31 06:55:30.423	Fruits	37	Ativo	Hectolitros (hL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3504	Amêndoa	Amêndoa from our finest seafood collection.	945	https://loremflickr.com/640/480?lock=1612941579255808	41	87x91x07	2024-01-18 11:24:30.404	Seafood	87	Desativado	Arrobas (arroba)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3505	Arroz	Arroz from our finest fruits collection.	798	https://loremflickr.com/640/480?lock=4729620196753408	4	29x94x94	2024-01-07 14:31:24.824	Fruits	51	Em espera	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3506	Linhaça	Linhaça from our finest fruits collection.	90	https://loremflickr.com/640/480?lock=6546658489794560	53	53x48x28	2024-01-04 14:24:51.225	Fruits	32	Em espera	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3507	Creme de Leite	Creme de Leite from our finest fruits collection.	361	https://picsum.photos/seed/yRjv5ct/640/480	14	43x45x28	2024-02-07 02:52:27.061	Fruits	32	Em espera	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3509	Leite	Leite from our finest seafood collection.	543	https://picsum.photos/seed/2MQWOS/640/480	81	48x06x09	2024-01-16 17:12:35.006	Seafood	13	Em espera	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3510	Amido de Milho	Amido de Milho from our finest poultry collection.	485	https://picsum.photos/seed/FLv1f4Ja/640/480	86	81x26x88	2024-01-24 00:02:34.427	Poultry	39	Em espera	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3511	Carne de Coelho	Carne de Coelho from our finest poultry collection.	541	https://picsum.photos/seed/p7L36Z/640/480	84	61x71x06	2024-01-31 00:55:00.43	Poultry	31	Em espera	Quilogramas (kg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3512	Algodão	Algodão from our finest other collection.	464	https://picsum.photos/seed/rJUmtDf/640/480	29	47x98x44	2023-10-13 18:58:33.899	Other	54	Desativado	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3513	Perus	Perus from our finest poultry collection.	60	https://picsum.photos/seed/q7Xv0H6rE/640/480	72	53x37x11	2024-04-11 23:32:04.928	Poultry	85	Desativado	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3514	Carne de Coelho	Carne de Coelho from our finest fruits collection.	817	https://loremflickr.com/640/480?lock=4098769830281216	0	47x02x52	2023-10-22 21:26:01.773	Fruits	47	Desativado	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3515	Leite de Cabra	Leite de Cabra from our finest vegetables collection.	456	https://loremflickr.com/640/480?lock=4283818982768640	26	06x05x44	2024-04-11 09:16:30.819	Vegetables	50	Desativado	Unidades (un)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3516	Cenouras	Cenouras from our finest livestock collection.	700	https://picsum.photos/seed/IdlERu/640/480	82	17x98x86	2024-05-28 03:29:36.851	Livestock	22	Em espera	Pé cúbico (ft³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3517	Leite	Leite from our finest beverages collection.	66	https://loremflickr.com/640/480?lock=1864835524460544	6	71x42x49	2024-03-05 07:25:12.378	Beverages	78	Ativo	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3519	Macarrão	Macarrão from our finest livestock collection.	775	https://loremflickr.com/640/480?lock=319608697389056	25	29x57x52	2024-01-24 23:40:05.384	Livestock	22	Desativado	Unidades (un)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3520	Sorvete	Sorvete from our finest fruits collection.	687	https://picsum.photos/seed/qLJ412ICJ7/640/480	12	85x42x68	2023-09-05 12:29:35.714	Fruits	51	Em espera	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3521	Macadâmia	Macadâmia from our finest beverages collection.	686	https://picsum.photos/seed/S6Ub3oGx/640/480	34	98x98x41	2024-03-14 11:17:30.94	Beverages	96	Ativo	Toneladas (t)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3523	Carne de Cabrito	Carne de Cabrito from our finest livestock collection.	288	https://loremflickr.com/640/480?lock=6085563866152960	2	34x23x70	2023-11-24 08:06:36.727	Livestock	81	Ativo	Polegada cúbica (in³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3524	Carne de Boi	Carne de Boi from our finest other collection.	110	https://loremflickr.com/640/480?lock=6543933584703488	5	47x91x32	2024-03-28 18:15:24.343	Other	49	Ativo	Pé cúbico (ft³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3525	Amêndoa	Amêndoa from our finest beverages collection.	472	https://picsum.photos/seed/VXEd1X23f/640/480	47	47x76x02	2024-02-09 20:23:23.688	Beverages	68	Desativado	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3526	Óleo de Milho	Óleo de Milho from our finest poultry collection.	577	https://loremflickr.com/640/480?lock=1370629351669760	44	66x43x45	2023-07-30 18:29:41.716	Poultry	28	Ativo	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3527	Cebola	Cebola from our finest fruits collection.	606	https://loremflickr.com/640/480?lock=8479005439164416	1	15x06x26	2024-06-14 09:56:18.765	Fruits	1	Em espera	Arrobas (arroba)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3528	Sorvete	Sorvete from our finest seafood collection.	21	https://picsum.photos/seed/6fT6QT/640/480	47	41x69x73	2024-01-11 22:07:08.697	Seafood	31	Ativo	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3529	Milheto	Milheto from our finest beverages collection.	381	https://loremflickr.com/640/480?lock=551989863776256	53	58x34x04	2024-05-15 10:29:38.918	Beverages	14	Desativado	Dúzias (dz)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3530	Queijo	Queijo from our finest seafood collection.	721	https://loremflickr.com/640/480?lock=7283754582147072	15	52x63x31	2024-03-09 01:47:36.581	Seafood	56	Em espera	Unidades (un)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3531	Sorgo	Sorgo from our finest fruits collection.	128	https://loremflickr.com/640/480?lock=8784929242480640	33	62x91x88	2024-02-24 12:10:32.55	Fruits	97	Em espera	Pé cúbico (ft³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3532	Sementes de Abóbora	Sementes de Abóbora from our finest vegetables collection.	889	https://loremflickr.com/640/480?lock=2225487050964992	2	06x81x50	2023-10-30 12:59:18.195	Vegetables	11	Ativo	Unidades (un)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3533	Farinha de Trigo	Farinha de Trigo from our finest fruits collection.	530	https://loremflickr.com/640/480?lock=7062993971970048	28	85x42x00	2024-04-10 02:15:14.436	Fruits	71	Ativo	Fardos (fd)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3534	Banana	Banana from our finest grains collection.	778	https://picsum.photos/seed/9mRA9zio/640/480	41	08x69x50	2023-08-09 04:39:20.625	Grains	39	Ativo	Sacas (sc)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3535	Amendoim	Amendoim from our finest livestock collection.	939	https://picsum.photos/seed/Z7QejPsre/640/480	45	64x05x23	2023-09-14 21:15:37.059	Livestock	89	Em espera	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3536	Linhaça	Linhaça from our finest beverages collection.	829	https://loremflickr.com/640/480?lock=1012831654772736	28	56x15x88	2023-09-03 09:41:30.406	Beverages	31	Desativado	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3537	Macadâmia	Macadâmia from our finest seafood collection.	215	https://loremflickr.com/640/480?lock=3425928745058304	24	34x53x66	2024-01-25 13:10:00.416	Seafood	31	Desativado	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3538	Macadâmia	Macadâmia from our finest vegetables collection.	77	https://loremflickr.com/640/480?lock=94771519422464	49	93x51x10	2024-05-17 21:42:54.886	Vegetables	55	Ativo	Quilolitros (kL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3539	Cenouras	Cenouras from our finest other collection.	521	https://picsum.photos/seed/LcClZmcpD/640/480	28	80x22x47	2024-06-30 13:57:25.507	Other	61	Ativo	Sacas (sc)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3540	Cenouras	Cenouras from our finest dairy products collection.	515	https://picsum.photos/seed/QOUZI/640/480	75	97x66x57	2024-07-15 16:47:29.823	Dairy Products	23	Em espera	Mililitros (mL)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3541	Perus	Perus from our finest grains collection.	188	https://loremflickr.com/640/480?lock=7167816352399360	8	06x84x13	2024-04-04 22:33:28.229	Grains	94	Desativado	Caixas (cx)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3542	Sorvete	Sorvete from our finest dairy products collection.	660	https://picsum.photos/seed/r8SOIZ/640/480	93	42x12x46	2024-02-21 21:11:01.595	Dairy Products	37	Ativo	Metro cúbico (m³)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3543	Amêndoa	Amêndoa from our finest other collection.	72	https://loremflickr.com/640/480?lock=6050698175184896	96	74x79x05	2024-04-09 14:26:31.766	Other	93	Ativo	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3544	Óleo de Soja	Óleo de Soja from our finest seafood collection.	952	https://loremflickr.com/640/480?lock=7829963558354944	32	66x75x59	2023-08-22 01:12:37.884	Seafood	66	Em espera	Pacotes (pct)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3545	Farinha de Trigo	Farinha de Trigo from our finest dairy products collection.	130	https://picsum.photos/seed/QoYMCCm/640/480	39	60x17x87	2024-04-30 13:14:31.222	Dairy Products	7	Ativo	Gramas (g)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3546	Milho	Milho from our finest dairy products collection.	763	https://picsum.photos/seed/zCRNTvZ/640/480	12	35x83x78	2023-11-26 19:12:55.72	Dairy Products	81	Desativado	Galão (gal)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3547	Farinha de Milho	Farinha de Milho from our finest other collection.	782	https://picsum.photos/seed/TQaxW4ilV/640/480	26	95x92x52	2024-05-15 19:13:01.462	Other	78	Em espera	Toneladas (t)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3518	No céu tem Pão?	Pão from our finest processed foods collection.	22	https://loremflickr.com/640/480?lock=1912182434430976	4	71x11x57	2023-09-29 01:32:27.78	Processed Foods	98	Ativo	Quilogramas (kg)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3508	Mel	Mel from our finest vegetables collection.	249	https://picsum.photos/seed/5rhAQzMta/640/480	87	02x30x07	2023-08-07 19:31:49.807	Vegetables	48	Ativo	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
3548	quejo	QQR COISA	7	https://www.agrolink.com.br/upload/imagens-resizes/d9b0de8e3ae2489496ae0d43a05445ab_858x483.jpg	\N	\N	2024-08-30 21:52:49.95	Beverages	5	Ativo	Barril (bbl)	cly7x8ymz0000ptxy8r3tcfjk	2024-10-13 19:46:13.986	clydofcr8000oh3tdxqhk1rqb	Agrícola
\.


--
-- Data for Name: Sale; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Sale" (id, date, "totalPrice", discount, "paymentMethod", status, "customerName", "deliveryAddress", "sellerId") FROM stdin;
118	2024-09-20 00:00:00	320	10	Cash	Completed	Victor Gold	\N	cm13th44m00005ht6j5uay2ac
117	2024-09-20 00:00:00	380	20	Credit Card	Completed	Uma Silver	1212 Oak Ln	cm13th44m00005ht6j5uay2ac
115	2024-08-10 00:00:00	340	30	Credit Card	Completed	Sam Purple	1110 Chestnut Ave	cm13th44m00005ht6j5uay2ac
111	2024-05-12 00:00:00	270	0	Debit Card	Completed	Oscar Lime	888 Poplar Dr	cm13th44m00005ht6j5uay2ac
113	2024-06-05 00:00:00	260	10	Cash	Completed	Quinn Blue	999 Elm St	cm13th44m00005ht6j5uay2ac
112	2024-06-29 00:00:00	320	25	Credit Card	Completed	Paul Red	\N	cm13th44m00005ht6j5uay2ac
114	2024-07-20 00:00:00	310	5	Debit Card	Completed	Rose Green	\N	cm13th44m00005ht6j5uay2ac
102	2024-04-21 00:00:00	190	5	Debit Card	Completed	Frank Black	333 Birch Rd	cm13th44m00005ht6j5uay2ac
96	2024-01-25 00:00:00	200	15	Credit Card	Completed	Jane Smith	456 Maple Ave	cm13th44m00005ht6j5uay2ac
98	2024-02-20 00:00:00	300	0	Credit Card	Completed	Bob White	789 Oak St	cm13th44m00005ht6j5uay2ac
108	2024-07-25 00:00:00	220	10	Cash	Completed	Leo Gray	\N	cm13th44m00005ht6j5uay2ac
97	2024-02-05 00:00:00	120	5	Cash	Completed	Alice Brown	\N	cm13th44m00005ht6j5uay2ac
95	2024-01-10 00:00:00	150	10	Credit Card	Completed	John Doe	123 Main St	cm13th44m00005ht6j5uay2ac
110	2024-08-22 00:00:00	350	20	Credit Card	Completed	Nina Cyan	\N	cm13th44m00005ht6j5uay2ac
100	2024-03-18 00:00:00	180	10	Cash	Completed	Diane Blue	222 Pine St	cm13th44m00005ht6j5uay2ac
109	2024-08-05 00:00:00	280	15	Debit Card	Completed	Mona Pink	777 Willow St	cm13th44m00005ht6j5uay2ac
116	2024-08-25 00:00:00	290	0	Debit Card	Completed	Tina Black	\N	cm13th44m00005ht6j5uay2ac
106	2024-06-29 00:00:00	230	10	Debit Card	Completed	Jack Purple	\N	cm13th44m00005ht6j5uay2ac
99	2024-03-03 00:00:00	250	20	Debit Card	Completed	Charlie Green	\N	cm13th44m00005ht6j5uay2ac
107	2024-07-08 00:00:00	260	0	Credit Card	Completed	Kara White	666 Ash St	cm13th44m00005ht6j5uay2ac
103	2024-05-10 00:00:00	240	0	Credit Card	Completed	Grace Silver	444 Cedar Ln	cm13th44m00005ht6j5uay2ac
105	2024-06-12 00:00:00	310	20	Credit Card	Completed	Ivy Orange	555 Spruce Dr	cm13th44m00005ht6j5uay2ac
104	2024-05-28 00:00:00	270	15	Cash	Completed	Henry Gold	\N	cm13th44m00005ht6j5uay2ac
101	2024-04-07 00:00:00	220	10	Credit Card	Completed	Eva Yellow	\N	cm13th44m00005ht6j5uay2ac
\.


--
-- Data for Name: SaleItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SaleItem" (id, "productId", "saleId", quantity, "unitPrice", "totalPrice") FROM stdin;
133	3505	95	2	50	100
134	3470	95	1	50	50
135	3471	96	4	40	160
136	3505	97	2	20	40
137	3470	97	3	30	90
139	3505	98	5	60	300
140	3471	99	2	80	160
141	3470	100	1	90	90
142	3505	100	3	60	180
143	3471	101	4	55	220
144	3470	101	1	25	25
145	3505	101	2	95	190
146	3470	101	2	20	40
147	3505	102	3	50	150
148	3471	103	2	45	90
149	3505	104	2	100	200
150	3470	105	1	90	90
151	3471	105	3	70	210
152	3505	106	2	100	200
153	3470	107	4	50	200
154	3471	108	3	60	180
155	3505	109	5	70	350
156	3471	110	2	85	170
157	3505	111	3	90	270
158	3470	112	2	55	110
159	3471	113	2	50	100
160	3505	114	3	75	225
161	3471	115	2	85	170
162	3470	116	1	90	90
163	3505	117	4	95	380
164	3471	118	2	60	120
138	3433	97	1	30	30
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "userId", expires, "sessionToken", "accessToken", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tag" (id, name) FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "emailVerified", image, "createdAt", "updatedAt", password, cpf) FROM stdin;
cly7x8ymz0000ptxy8r3tcfjk	Maria Clara	te@gmail.com	\N	\N	2024-07-04 23:52:34.139	2024-07-04 23:52:34.139	123456	141.412.421-41
cm13th44m00005ht6j5uay2ac	João Vendedor	joao.vendedor@example.com	\N	\N	2024-09-15 16:54:58.34	2024-09-15 16:54:58.34	senha123	123.456.789-10
cm15e4d9300005b9o0juoa5fm	João Silva	joao@example.com	\N	\N	2024-09-16 19:20:41.75	2024-09-16 19:20:41.75	$2a$10$6HxbZx2mhlcoOsSTwUqo1.432FclGW.pCB9FZ0jvH.B/zbRXkbBwS	123.456.789-00
clydofcr8000oh3tdxqhk1rqb	Fornecedor Padrão	14241124124@gmail.com	\N	\N	2024-07-09 00:32:12.884	2024-07-09 00:32:12.884	214141241	412.412.412-41
\.


--
-- Data for Name: VerificationRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationRequest" (id, identifier, token, expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _ArticleTags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ArticleTags" ("A", "B") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f4746aa5-e25e-41fa-99e6-79ee79fdb2f8	370400fe770d235c7f54b60b5a84ecdf30a3d3311c47b2fa711a8c9b90ad6f89	2024-10-13 19:49:07.243951-03	20241013224907_add_new_fields	\N	\N	2024-10-13 19:49:07.237469-03	1
41f8f413-e661-4457-995b-3470771b1474	db741c543e70e42c16e1c4116e76873e5a9cfff2b5f6c74df8aa6ff2bfb58edb	2024-07-01 19:18:37.920544-03	20240701221837_init	\N	\N	2024-07-01 19:18:37.882897-03	1
26033cc7-bfe8-495e-8044-df93ca14446b	eb7b8daec0ee36044749897ffa29c96c41df26fac64762d6285882b2cbf3c99d	2024-07-01 20:02:51.227826-03	20240701230251_add_password	\N	\N	2024-07-01 20:02:51.221741-03	1
f1767c22-1eb7-4c14-8bd1-4a14af150622	22e856392e126865172b3f466b435f7ef3837310fb4588556e6cecbe10ce295b	2024-07-04 20:49:38.841378-03	20240704234938_	\N	\N	2024-07-04 20:49:38.81419-03	1
f7d85210-e697-4be8-8451-e405578d6b49	a81d40da38e7d1df2e9bf4548a559c1acc8a8fac4e02f07de56d423b7c18cb05	2024-10-13 22:05:53.748808-03	20241014010553_reformat_fields	\N	\N	2024-10-13 22:05:53.693276-03	1
7601f3ee-3d3d-4838-bb82-b0a30290d023	99a85b1f99c5b2bb80cdc4d634a58e2bc73f82e25f0a1f8ced4cd5cc1f9c8d14	2024-07-04 20:52:06.545031-03	20240704235206_	\N	\N	2024-07-04 20:52:06.542367-03	1
5efc3359-6567-4a58-9304-2053eb64bd0a	7cac4d46e6ff65a86aa81e8fef83113e9949a03617a49692856063b92bd44b7d	2024-07-11 22:21:32.106884-03	20240712012132_add_product	\N	\N	2024-07-11 22:21:32.063273-03	1
c663c103-d416-42cc-8dab-8f9226126cec	e6baf94e21ecebd37d645a87b33324a5884bba8bcea5a08206a970c199055759	2024-07-17 18:46:24.307143-03	20240717214624_add_category_field	\N	\N	2024-07-17 18:46:24.299155-03	1
385850e0-ee8f-4b40-8ac9-a4cf951ba759	cb3ccc2fabd06a0e52927fb243b6594c700b928cfcd5e0d59b5452152d042d45	2024-07-17 21:12:28.944411-03	20240718001228_add_status_field	\N	\N	2024-07-17 21:12:28.941522-03	1
0d7c0e64-ee96-4452-beec-1e5bdfe42034	3d5aa360446c61fb52ca43de0273df662abcc40603bf936c284936393d218cc4	2024-07-21 22:43:02.520401-03	20240722014302_add_new_fields	\N	\N	2024-07-21 22:43:02.484956-03	1
78a2e2a9-49b0-4a52-8d30-213369a23838	bf2c388f82e5d96680e959f3f4ce81f43fe06a251336a28688d97cef4a7de521	2024-08-11 16:53:38.955719-03	20240811195338_add_noticias_fields	\N	\N	2024-08-11 16:53:38.878481-03	1
9b3ac504-fc70-4b8a-828d-8c62e4ba00b0	7dc055dd4d25d1393a224482453c9f91cb181e72900884bbd0706cbaa75a49db	2024-08-24 13:25:17.006983-03	20240824162516_	\N	\N	2024-08-24 13:25:16.982435-03	1
e9b31c3a-0eab-4aba-9cce-8a9edbaf955d	144bf8079efffd813c98281d1a4d53166782c56b01ec9b96c1e41f84d94f413f	2024-08-24 13:50:46.670561-03	20240824165046_change_field_name	\N	\N	2024-08-24 13:50:46.660469-03	1
645f4490-3553-4931-972d-98ebe57bf216	e9db57569345e33e4af4359c6fff6e04c0f574e439614d2e064b4102b6a72912	2024-09-15 13:53:36.486383-03	20240915165336_novos_campos	\N	\N	2024-09-15 13:53:36.422183-03	1
666f310c-d162-435a-8589-eab71381eaa7	425564cb819f5c12f3190d6d9ce83598047992515a61417cede447b2dbb51433	2024-10-13 19:46:14.032763-03	20241013224613_add_commodity_type_talbe	\N	\N	2024-10-13 19:46:13.982578-03	1
\.


--
-- Name: Article_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Article_id_seq"', 115, true);


--
-- Name: Author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Author_id_seq"', 11, true);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 13, true);


--
-- Name: Media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Media_id_seq"', 1, false);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 3748, true);


--
-- Name: SaleItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SaleItem_id_seq"', 164, true);


--
-- Name: Sale_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Sale_id_seq"', 118, true);


--
-- Name: Tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tag_id_seq"', 1, false);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Article Article_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_pkey" PRIMARY KEY (id);


--
-- Name: Author Author_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Author"
    ADD CONSTRAINT "Author_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: SaleItem SaleItem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_pkey" PRIMARY KEY (id);


--
-- Name: Sale Sale_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Tag Tag_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tag"
    ADD CONSTRAINT "Tag_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationRequest VerificationRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VerificationRequest"
    ADD CONSTRAINT "VerificationRequest_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Account_providerId_providerAccountId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Account_providerId_providerAccountId_key" ON public."Account" USING btree ("providerId", "providerAccountId");


--
-- Name: Category_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Category_name_key" ON public."Category" USING btree (name);


--
-- Name: Session_accessToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_accessToken_key" ON public."Session" USING btree ("accessToken");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: Tag_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Tag_name_key" ON public."Tag" USING btree (name);


--
-- Name: User_cpf_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_cpf_key" ON public."User" USING btree (cpf);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: VerificationRequest_identifier_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON public."VerificationRequest" USING btree (identifier, token);


--
-- Name: VerificationRequest_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationRequest_token_key" ON public."VerificationRequest" USING btree (token);


--
-- Name: _ArticleTags_AB_unique; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "_ArticleTags_AB_unique" ON public."_ArticleTags" USING btree ("A", "B");


--
-- Name: _ArticleTags_B_index; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "_ArticleTags_B_index" ON public."_ArticleTags" USING btree ("B");


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Article Article_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."Author"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Article Article_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Article"
    ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Media Media_articleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES public."Article"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_supplierId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_supplierId_fkey" FOREIGN KEY ("supplierId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Product Product_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SaleItem SaleItem_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SaleItem SaleItem_saleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SaleItem"
    ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES public."Sale"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Sale Sale_sellerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sale"
    ADD CONSTRAINT "Sale_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _ArticleTags _ArticleTags_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ArticleTags"
    ADD CONSTRAINT "_ArticleTags_A_fkey" FOREIGN KEY ("A") REFERENCES public."Article"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ArticleTags _ArticleTags_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."_ArticleTags"
    ADD CONSTRAINT "_ArticleTags_B_fkey" FOREIGN KEY ("B") REFERENCES public."Tag"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

