--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


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
-- Name: Autor; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Autor" (
    autor_id integer NOT NULL,
    nome_autor character varying(100) NOT NULL
);


ALTER TABLE public."Autor" OWNER TO postgres;

--
-- Name: CategoriaPessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CategoriaPessoa" (
    categ_pessoa_id integer NOT NULL,
    codigo integer NOT NULL,
    descricao character varying(50) NOT NULL
);


ALTER TABLE public."CategoriaPessoa" OWNER TO postgres;

--
-- Name: CategoriaPessoa_categ_pessoa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CategoriaPessoa_categ_pessoa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CategoriaPessoa_categ_pessoa_id_seq" OWNER TO postgres;

--
-- Name: CategoriaPessoa_categ_pessoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CategoriaPessoa_categ_pessoa_id_seq" OWNED BY public."CategoriaPessoa".categ_pessoa_id;


--
-- Name: ComercioInternacional; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioInternacional" (
    com_int_id integer NOT NULL,
    nome character varying(50),
    valor double precision,
    dt_valor timestamp(3) without time zone,
    categoria character varying(1),
    "descrição" character varying(300),
    link_com character varying(300)
);


ALTER TABLE public."ComercioInternacional" OWNER TO postgres;

--
-- Name: ComercioInternacionalNoticia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioInternacionalNoticia" (
    cint_id integer NOT NULL,
    com_int_com_int_id integer NOT NULL,
    not_not_id integer NOT NULL
);


ALTER TABLE public."ComercioInternacionalNoticia" OWNER TO postgres;

--
-- Name: ComercioInternacionalProduto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioInternacionalProduto" (
    cipi_id integer NOT NULL,
    prd_inac_prd_inac_id integer NOT NULL,
    com_int_com_int_id integer NOT NULL
);


ALTER TABLE public."ComercioInternacionalProduto" OWNER TO postgres;

--
-- Name: Cultura; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cultura" (
    id_cultura integer NOT NULL,
    nome character varying(100) NOT NULL,
    descricao character varying(500),
    imagem_link character varying(300)
);


ALTER TABLE public."Cultura" OWNER TO postgres;

--
-- Name: Cultura_id_cultura_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Cultura_id_cultura_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Cultura_id_cultura_seq" OWNER TO postgres;

--
-- Name: Cultura_id_cultura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Cultura_id_cultura_seq" OWNED BY public."Cultura".id_cultura;


--
-- Name: Empresa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Empresa" (
    empresa_id integer NOT NULL,
    nome character varying(100) NOT NULL,
    serial bigint NOT NULL
);


ALTER TABLE public."Empresa" OWNER TO postgres;

--
-- Name: Empresa_empresa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Empresa_empresa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Empresa_empresa_id_seq" OWNER TO postgres;

--
-- Name: Empresa_empresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Empresa_empresa_id_seq" OWNED BY public."Empresa".empresa_id;


--
-- Name: Endereco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Endereco" (
    endereco_id integer NOT NULL,
    logradouro character varying(100) NOT NULL,
    numero integer NOT NULL,
    bairro character varying(100) NOT NULL,
    complemento character varying(100) NOT NULL,
    cidade character varying(100) NOT NULL,
    estado character varying(2),
    cep integer,
    pais character varying(100) NOT NULL,
    pessoa_pess_pessoa_id integer NOT NULL
);


ALTER TABLE public."Endereco" OWNER TO postgres;

--
-- Name: Endereco_endereco_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Endereco_endereco_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Endereco_endereco_id_seq" OWNER TO postgres;

--
-- Name: Endereco_endereco_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Endereco_endereco_id_seq" OWNED BY public."Endereco".endereco_id;


--
-- Name: Estoque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Estoque" (
    estoque_id integer NOT NULL,
    produto character varying(50) NOT NULL,
    "categoriaculturaId" integer,
    tipo character varying(1) NOT NULL,
    descricao character varying(2000) NOT NULL,
    qtd double precision NOT NULL,
    preco double precision NOT NULL,
    unidade_medida character varying(5) NOT NULL,
    imagem_link character varying(300)
);


ALTER TABLE public."Estoque" OWNER TO postgres;

--
-- Name: Estoque_estoque_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Estoque_estoque_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Estoque_estoque_id_seq" OWNER TO postgres;

--
-- Name: Estoque_estoque_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Estoque_estoque_id_seq" OWNED BY public."Estoque".estoque_id;


--
-- Name: FormaPagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."FormaPagamento" (
    form_pag_id integer NOT NULL,
    codigo integer NOT NULL,
    tipo character varying(30) NOT NULL
);


ALTER TABLE public."FormaPagamento" OWNER TO postgres;

--
-- Name: HistoricoEstoque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HistoricoEstoque" (
    hist_estq_id integer NOT NULL,
    dt_alter timestamp(3) without time zone NOT NULL,
    hora_alter character varying(5) NOT NULL,
    valor_alter double precision NOT NULL,
    estoque_estoque_id integer NOT NULL,
    venda_venda_id integer NOT NULL,
    usuario_usuario_id text NOT NULL,
    comprador boolean DEFAULT false NOT NULL
);


ALTER TABLE public."HistoricoEstoque" OWNER TO postgres;

--
-- Name: HistoricoEstoque_hist_estq_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."HistoricoEstoque_hist_estq_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."HistoricoEstoque_hist_estq_id_seq" OWNER TO postgres;

--
-- Name: HistoricoEstoque_hist_estq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."HistoricoEstoque_hist_estq_id_seq" OWNED BY public."HistoricoEstoque".hist_estq_id;


--
-- Name: HistoricoValores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."HistoricoValores" (
    hist_valores_id integer NOT NULL,
    valor double precision NOT NULL,
    dt_valor_hist timestamp(3) without time zone NOT NULL,
    com_int_com_int_id integer NOT NULL
);


ALTER TABLE public."HistoricoValores" OWNER TO postgres;

--
-- Name: Imagem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Imagem" (
    imagem_id integer NOT NULL,
    imagem character varying(200) NOT NULL
);


ALTER TABLE public."Imagem" OWNER TO postgres;

--
-- Name: Mensagem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Mensagem" (
    mensagem_id integer NOT NULL,
    descricao character varying(100) NOT NULL
);


ALTER TABLE public."Mensagem" OWNER TO postgres;

--
-- Name: Moeda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Moeda" (
    sigla character varying(10) NOT NULL,
    nome character varying(40) NOT NULL,
    codigo_bandeira character varying(40) NOT NULL
);


ALTER TABLE public."Moeda" OWNER TO postgres;

--
-- Name: Noticia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Noticia" (
    titulo character varying(200) NOT NULL,
    subtitulo character varying(1000) NOT NULL,
    corpo text NOT NULL,
    data_publicacao timestamp(3) without time zone NOT NULL,
    descricao character varying(1000),
    id_autor integer NOT NULL,
    id_cultura integer NOT NULL,
    imagem_link character varying(300) NOT NULL,
    "notId" integer NOT NULL
);


ALTER TABLE public."Noticia" OWNER TO postgres;

--
-- Name: Noticia_notId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Noticia_notId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Noticia_notId_seq" OWNER TO postgres;

--
-- Name: Noticia_notId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Noticia_notId_seq" OWNED BY public."Noticia"."notId";


--
-- Name: Pessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Pessoa" (
    pess_pessoa_id integer NOT NULL,
    pess_email character varying(50) NOT NULL,
    imagem_link character varying(300),
    categ_pess_categ_pessoa_id integer NOT NULL
);


ALTER TABLE public."Pessoa" OWNER TO postgres;

--
-- Name: PessoaFisica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PessoaFisica" (
    pess_pessoa_id integer NOT NULL,
    pepf_nome character varying(100) NOT NULL,
    pepf_cpf bigint NOT NULL,
    pepf_dt_nascimento timestamp(3) without time zone NOT NULL,
    pepf_rg bigint
);


ALTER TABLE public."PessoaFisica" OWNER TO postgres;

--
-- Name: PessoaFisica_pess_pessoa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PessoaFisica_pess_pessoa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PessoaFisica_pess_pessoa_id_seq" OWNER TO postgres;

--
-- Name: PessoaFisica_pess_pessoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PessoaFisica_pess_pessoa_id_seq" OWNED BY public."PessoaFisica".pess_pessoa_id;


--
-- Name: PessoaJuridica; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PessoaJuridica" (
    pess_pessoa_id integer NOT NULL,
    psjr_razao_social character varying(100) NOT NULL,
    psjr_cnpj bigint NOT NULL,
    psjr_insc_esta bigint NOT NULL,
    psjr_nome_fant character varying(100)
);


ALTER TABLE public."PessoaJuridica" OWNER TO postgres;

--
-- Name: PessoaJuridica_pess_pessoa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PessoaJuridica_pess_pessoa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PessoaJuridica_pess_pessoa_id_seq" OWNER TO postgres;

--
-- Name: PessoaJuridica_pess_pessoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PessoaJuridica_pess_pessoa_id_seq" OWNED BY public."PessoaJuridica".pess_pessoa_id;


--
-- Name: Pessoa_pess_pessoa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Pessoa_pess_pessoa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Pessoa_pess_pessoa_id_seq" OWNER TO postgres;

--
-- Name: Pessoa_pess_pessoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Pessoa_pess_pessoa_id_seq" OWNED BY public."Pessoa".pess_pessoa_id;


--
-- Name: ProdutoInac; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProdutoInac" (
    prd_inac_id integer NOT NULL,
    pais character varying(30) NOT NULL,
    peso double precision NOT NULL,
    valor double precision NOT NULL,
    total_exp_val_pais double precision
);


ALTER TABLE public."ProdutoInac" OWNER TO postgres;

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
-- Name: Telefone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Telefone" (
    telefone_id integer NOT NULL,
    tipo character varying(30) NOT NULL,
    numero character varying(30) NOT NULL,
    pessoa_pess_pessoa_id integer NOT NULL
);


ALTER TABLE public."Telefone" OWNER TO postgres;

--
-- Name: Telefone_telefone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Telefone_telefone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Telefone_telefone_id_seq" OWNER TO postgres;

--
-- Name: Telefone_telefone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Telefone_telefone_id_seq" OWNED BY public."Telefone".telefone_id;


--
-- Name: TipoPessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TipoPessoa" (
    id integer NOT NULL,
    nome text NOT NULL
);


ALTER TABLE public."TipoPessoa" OWNER TO postgres;

--
-- Name: TipoPessoa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."TipoPessoa_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."TipoPessoa_id_seq" OWNER TO postgres;

--
-- Name: TipoPessoa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."TipoPessoa_id_seq" OWNED BY public."TipoPessoa".id;


--
-- Name: Usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Usuario" (
    id text NOT NULL,
    nome character varying(100) NOT NULL,
    cpf character varying(14) NOT NULL,
    senha character varying(14) NOT NULL,
    imagem_link character varying(300),
    email character varying(300),
    esp1 character varying(20),
    esp2 character varying(20),
    empresa_empresa_id integer NOT NULL,
    admin boolean DEFAULT false NOT NULL,
    "alterarSenha" boolean DEFAULT false NOT NULL,
    inativado boolean DEFAULT false NOT NULL
);


ALTER TABLE public."Usuario" OWNER TO postgres;

--
-- Name: Venda; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Venda" (
    venda_id integer NOT NULL,
    dt_venda timestamp(3) without time zone NOT NULL,
    valor_venda double precision NOT NULL,
    qtd_venda double precision NOT NULL,
    desconto double precision
);


ALTER TABLE public."Venda" OWNER TO postgres;

--
-- Name: VendaEstoque; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendaEstoque" (
    vest_id integer NOT NULL,
    prc_prop double precision NOT NULL,
    estoque_estoque_id integer NOT NULL,
    venda_venda_id integer NOT NULL
);


ALTER TABLE public."VendaEstoque" OWNER TO postgres;

--
-- Name: VendaFormaPagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendaFormaPagamento" (
    venda_venda_id integer NOT NULL,
    forma_pagamento_form_pag_id integer NOT NULL,
    vfpag_id integer NOT NULL
);


ALTER TABLE public."VendaFormaPagamento" OWNER TO postgres;

--
-- Name: VendaFormaPagamento_vfpag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VendaFormaPagamento_vfpag_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VendaFormaPagamento_vfpag_id_seq" OWNER TO postgres;

--
-- Name: VendaFormaPagamento_vfpag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VendaFormaPagamento_vfpag_id_seq" OWNED BY public."VendaFormaPagamento".vfpag_id;


--
-- Name: VendaPessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendaPessoa" (
    vpes_id integer NOT NULL,
    venda_venda_id integer NOT NULL,
    pessoa_pess_pessoa_id integer NOT NULL,
    tipo_pessoa character varying(15) NOT NULL
);


ALTER TABLE public."VendaPessoa" OWNER TO postgres;

--
-- Name: Venda_venda_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Venda_venda_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Venda_venda_id_seq" OWNER TO postgres;

--
-- Name: Venda_venda_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Venda_venda_id_seq" OWNED BY public."Venda".venda_id;


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
-- Name: vendaestoque_vest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendaestoque_vest_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vendaestoque_vest_id_seq OWNER TO postgres;

--
-- Name: vendaestoque_vest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendaestoque_vest_id_seq OWNED BY public."VendaEstoque".vest_id;


--
-- Name: vendapessoa_vpes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vendapessoa_vpes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vendapessoa_vpes_id_seq OWNER TO postgres;

--
-- Name: vendapessoa_vpes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vendapessoa_vpes_id_seq OWNED BY public."VendaPessoa".vpes_id;


--
-- Name: CategoriaPessoa categ_pessoa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoriaPessoa" ALTER COLUMN categ_pessoa_id SET DEFAULT nextval('public."CategoriaPessoa_categ_pessoa_id_seq"'::regclass);


--
-- Name: Cultura id_cultura; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cultura" ALTER COLUMN id_cultura SET DEFAULT nextval('public."Cultura_id_cultura_seq"'::regclass);


--
-- Name: Empresa empresa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Empresa" ALTER COLUMN empresa_id SET DEFAULT nextval('public."Empresa_empresa_id_seq"'::regclass);


--
-- Name: Endereco endereco_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Endereco" ALTER COLUMN endereco_id SET DEFAULT nextval('public."Endereco_endereco_id_seq"'::regclass);


--
-- Name: Estoque estoque_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Estoque" ALTER COLUMN estoque_id SET DEFAULT nextval('public."Estoque_estoque_id_seq"'::regclass);


--
-- Name: HistoricoEstoque hist_estq_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoEstoque" ALTER COLUMN hist_estq_id SET DEFAULT nextval('public."HistoricoEstoque_hist_estq_id_seq"'::regclass);


--
-- Name: Noticia notId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Noticia" ALTER COLUMN "notId" SET DEFAULT nextval('public."Noticia_notId_seq"'::regclass);


--
-- Name: Pessoa pess_pessoa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pessoa" ALTER COLUMN pess_pessoa_id SET DEFAULT nextval('public."Pessoa_pess_pessoa_id_seq"'::regclass);


--
-- Name: PessoaFisica pess_pessoa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PessoaFisica" ALTER COLUMN pess_pessoa_id SET DEFAULT nextval('public."PessoaFisica_pess_pessoa_id_seq"'::regclass);


--
-- Name: PessoaJuridica pess_pessoa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PessoaJuridica" ALTER COLUMN pess_pessoa_id SET DEFAULT nextval('public."PessoaJuridica_pess_pessoa_id_seq"'::regclass);


--
-- Name: Telefone telefone_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Telefone" ALTER COLUMN telefone_id SET DEFAULT nextval('public."Telefone_telefone_id_seq"'::regclass);


--
-- Name: TipoPessoa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoPessoa" ALTER COLUMN id SET DEFAULT nextval('public."TipoPessoa_id_seq"'::regclass);


--
-- Name: Venda venda_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Venda" ALTER COLUMN venda_id SET DEFAULT nextval('public."Venda_venda_id_seq"'::regclass);


--
-- Name: VendaEstoque vest_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaEstoque" ALTER COLUMN vest_id SET DEFAULT nextval('public.vendaestoque_vest_id_seq'::regclass);


--
-- Name: VendaFormaPagamento vfpag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaFormaPagamento" ALTER COLUMN vfpag_id SET DEFAULT nextval('public."VendaFormaPagamento_vfpag_id_seq"'::regclass);


--
-- Name: VendaPessoa vpes_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaPessoa" ALTER COLUMN vpes_id SET DEFAULT nextval('public.vendapessoa_vpes_id_seq'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", "providerType", "providerId", "providerAccountId", "refreshToken", "accessToken", "accessTokenExpires", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Autor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Autor" (autor_id, nome_autor) FROM stdin;
2	Mariana Dias
3	Pedro Alves
4	João Silva
5	Ana Pereira
6	Carlos Mendes
7	Maria Souza
8	Fernanda Oliveira
9	Lucas Rocha
10	Ricardo Lima
11	Beatriz Moreira
\.


--
-- Data for Name: CategoriaPessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CategoriaPessoa" (categ_pessoa_id, codigo, descricao) FROM stdin;
1	421	Fornecedor
2	5654	Cliente
\.


--
-- Data for Name: ComercioInternacional; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ComercioInternacional" (com_int_id, nome, valor, dt_valor, categoria, "descrição", link_com) FROM stdin;
\.


--
-- Data for Name: ComercioInternacionalNoticia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ComercioInternacionalNoticia" (cint_id, com_int_com_int_id, not_not_id) FROM stdin;
\.


--
-- Data for Name: ComercioInternacionalProduto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ComercioInternacionalProduto" (cipi_id, prd_inac_prd_inac_id, com_int_com_int_id) FROM stdin;
\.


--
-- Data for Name: Cultura; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cultura" (id_cultura, nome, descricao, imagem_link) FROM stdin;
6	Café	O café é uma das culturas mais populares e economicamente significativas no mundo	/images/cafe.jpg
12	Bovinos	A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais	/images/bovinos.jpg
13	Aves	A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais	/images/aves.jpg
7	Cana-de-açúcar	A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais	/images/cana.jpg
3	Soja	A soja é uma cultura leguminosa altamente valorizada	/images/graos.jpg
2	Milho	O milho é uma das principais culturas de grãos do mundo	/images/corn.jpg
1	Agronegócio 	Todos os outros	/images/agricola.jpg
5	Pecuária 	Todas outras categorias da pecuária	/images/pecuaria.jpg
\.


--
-- Data for Name: Empresa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Empresa" (empresa_id, nome, serial) FROM stdin;
1	Apple	12121
2	Google	124141241
3	Microsoft	241412
\.


--
-- Data for Name: Endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Endereco" (endereco_id, logradouro, numero, bairro, complemento, cidade, estado, cep, pais, pessoa_pess_pessoa_id) FROM stdin;
1	Rua	54	Vila Maria	Nenhum	Goiania	GO	19894	Brasil	1
2	Rua	42	Itamarati	Nenhum	São Paulo	SP	18798	Brasil	2
3	Rua	65	Barra Funda	Nenhum	Rio 	RJ	12414	Brasil	3
\.


--
-- Data for Name: Estoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Estoque" (estoque_id, produto, "categoriaculturaId", tipo, descricao, qtd, preco, unidade_medida, imagem_link) FROM stdin;
11	Café	6	A	Café	99	55	t	https://rehagro.com.br/blog/wp-content/uploads/2019/04/capa-producao-cafe-brasil.jpg
9	Açucar	7	P	sugar	2480	150	saco	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfexWVz_GYi6n0LL4XvSGLz6pJK-575sQTA&s
14	tesste	13	P	faf	125	12	m³	https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=
7	Milho	7	A	fasfas	6	15	gal	https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=
8	Pão	13	A	faafsas	2	53	ml	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhTz5eGb4-9pmt1ycLIXvQc3kGgs7UjuV1Q&s
10	Trigo	3	A	Trigo	200	40	t	https://www.indupropil.com.br/media/catalog/product/cache/1/image/900x/9df78eab33525d08d6e5fb8d27136e95/5/5/55.jpg
12	Laranja	3	P	Laranja	590	5	ml	https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6RgR0LEHqaVoUKC7d2XkK8CfxMu-tWMdpw&s
13	Soja	7	P	fsafas	211	15	ml	https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRf9O8IOiodDs3f4_15kCGHfdnIsuJCMuP2dKj4p0Fn1z2Fc4NPK2qEJCB1Htyho1bxUpPz6Hx4hYACUUpFAjp8Zw
\.


--
-- Data for Name: FormaPagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."FormaPagamento" (form_pag_id, codigo, tipo) FROM stdin;
1	1	Boleto
\.


--
-- Data for Name: HistoricoEstoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HistoricoEstoque" (hist_estq_id, dt_alter, hora_alter, valor_alter, estoque_estoque_id, venda_venda_id, usuario_usuario_id, comprador) FROM stdin;
21	2025-02-25 13:22:03.259	13:22	15	7	17	cm76ce4pf0001idjyz4blg9sa	t
22	2025-02-25 13:22:27.241	13:22	50	8	18	cm76ce4pf0001idjyz4blg9sa	t
24	2025-02-25 13:24:47.709	13:24	3	7	20	cm76ce4pf0001idjyz4blg9sa	f
26	2025-02-25 19:30:56.667	19:30	1	7	21	cm76ce4pf0001idjyz4blg9sa	f
27	2025-02-26 12:47:15.155	12:47	40	8	22	cm76ce4pf0001idjyz4blg9sa	f
28	2025-02-26 12:48:41.582	12:48	3	8	23	cm76ce4pf0001idjyz4blg9sa	f
29	2025-02-26 14:47:54.315	14:47	2500	9	24	cm76ce4pf0001idjyz4blg9sa	t
31	2025-02-26 14:49:08.022	14:49	15	9	26	cm76ce4pf0001idjyz4blg9sa	f
30	2025-01-26 14:48:43.325	14:48	300	10	25	cm76ce4pf0001idjyz4blg9sa	t
32	2025-01-26 14:49:25.024	14:49	100	10	27	cm76ce4pf0001idjyz4blg9sa	f
25	2025-02-25 13:24:47.715	13:24	75	8	20	cm76ce4pf0001idjyz4blg9sa	f
23	2024-09-25 13:22:45.633	13:22	450	7	19	cm76ce4pf0001idjyz4blg9sa	f
33	2025-02-26 21:45:37.993	21:45	165	11	28	cm76ce4pf0001idjyz4blg9sa	t
34	2025-02-26 21:46:03.008	21:46	65	11	29	cm76ce4pf0001idjyz4blg9sa	f
35	2025-02-26 21:46:49.284	21:46	600	12	30	cm76ce4pf0001idjyz4blg9sa	t
36	2025-02-26 21:47:01.424	21:47	10	12	31	cm76ce4pf0001idjyz4blg9sa	f
37	2025-02-26 21:58:28.754	21:58	215	13	32	cm76ce4pf0001idjyz4blg9sa	t
38	2025-02-26 21:58:43.356	21:58	4	13	33	cm76ce4pf0001idjyz4blg9sa	f
39	2025-02-26 23:26:09.869	23:26	3	9	34	cm76ce4pf0001idjyz4blg9sa	f
40	2025-02-26 23:26:09.881	23:26	1	11	34	cm76ce4pf0001idjyz4blg9sa	f
41	2025-02-27 01:21:12.475	01:21	2	9	35	cm76ce4pf0001idjyz4blg9sa	f
42	2025-02-27 01:21:41.728	01:21	125	14	36	cm76ce4pf0001idjyz4blg9sa	t
\.


--
-- Data for Name: HistoricoValores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."HistoricoValores" (hist_valores_id, valor, dt_valor_hist, com_int_com_int_id) FROM stdin;
\.


--
-- Data for Name: Imagem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Imagem" (imagem_id, imagem) FROM stdin;
\.


--
-- Data for Name: Mensagem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Mensagem" (mensagem_id, descricao) FROM stdin;
\.


--
-- Data for Name: Moeda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Moeda" (sigla, nome, codigo_bandeira) FROM stdin;
USD	Dólar Americano	us
BRL	Real Brasileiro	br
EUR	Euro	eu
JPY	Iene Japonês	jp
GBP	Libra Esterlina	gb
AUD	Dólar Australiano	au
CAD	Dólar Canadense	ca
CHF	Franco Suíço	ch
CNY	Yuan Chinês	cn
HKD	Dólar de Hong Kong	hk
NZD	Dólar Neozelandês	nz
SEK	Coroa Sueca	se
KRW	Won Sul-Coreano	kr
SGD	Dólar de Singapura	sg
NOK	Coroa Norueguesa	no
MXN	Peso Mexicano	mx
INR	Rupia Indiana	in
RUB	Rublo Russo	ru
ZAR	Rand Sul-Africano	za
TRY	Lira Turca	tr
\.


--
-- Data for Name: Noticia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Noticia" (titulo, subtitulo, corpo, data_publicacao, descricao, id_autor, id_cultura, imagem_link, "notId") FROM stdin;
Compras de oportunidade elevam soja em Chicago	A valorização de uma cesta de commodities também influenciou	# Escreva aqui sua notícia	2024-09-18 23:26:03.844	Internacional	3	3	https://www.agrolink.com.br/upload/imagens-resizes/e7646f0bc57a442ab8d1acc6cfb88886_858x483.jpg	98
Queimadas afetam colheita de cana e pressionam setor	Incêndios impactam lavouras de cana	Segundo informações divulgadas pela UNICA, a segunda quinzena de agosto trouxe uma leve redução na moagem de cana-de-açúcar no Centro-Sul do Brasil. As unidades produtoras processaram 45,07 milhões de toneladas, registrando uma queda de 3,25% em comparação ao mesmo período da safra 2023/2024. No entanto, o acumulado da safra 2024/2025 até o início de setembro apresenta crescimento, com 422,61 milhões de toneladas moídas, 3,93% a mais que na safra anterior.\r\n\r\n\r\n\r\nAtualmente, 258 unidades estão em operação no Centro-Sul, sendo 239 focadas no processamento de cana-de-açúcar, nove dedicadas à produção de etanol de milho e dez usinas flex. Em relação à qualidade da matéria-prima, o nível de Açúcares Totais Recuperáveis (ATR) alcançou 155,34 kg por tonelada na segunda quinzena de agosto, um aumento de 0,92% em relação à safra anterior.\r\n\r\nA produção de açúcar, no entanto, registrou queda. Foram produzidas 3,26 milhões de toneladas de açúcar, uma redução de 6,02% em relação ao mesmo período da safra passada. Já o etanol apresentou desempenho mais robusto, com um total de 2,45 bilhões de litros produzidos na segunda metade de agosto, sendo 1,56 bilhão de litros de etanol hidratado, representando um crescimento de 10,27%.\r\n\r\n\r\n\r\nApesar desses números, a UNICA alerta para os efeitos das queimadas, especialmente em São Paulo. Segundo a entidade, incêndios afetaram mais de 231 mil hectares de cana-de-açúcar na segunda quinzena de agosto, o que pode impactar tanto a qualidade da matéria-prima quanto o cronograma de colheita.\r\n\r\nNas vendas de etanol, agosto registrou alta de 3,76%, com destaque para o etanol hidratado, que aumentou 6,81% no período.	2024-09-18 23:30:59.264	Brasil	3	7	https://www.agrolink.com.br/upload/imagens-resizes/e4ee32da53ef4717808b32ed01bb2de9_858x483.jpg	100
Preços do frango vivo sobem em setembro	Exportações de carne de frango caem consideravelmente	Segundo a análise da edição de setembro do Boletim Agropecuário produzido pela Empresa de Pesquisa Agropecuária e Extensão Rural de Santa Catarina (Epagri) divulgado pelo Observatório Agro Catarinense, nas duas primeiras semanas de setembro, os preços do frango vivo apresentaram leve alta nos dois principais estados produtores. No Paraná, houve um aumento de 0,5% em comparação com o mês anterior, enquanto em Santa Catarina o crescimento foi de 0,4%. Quando comparados aos preços de setembro do ano passado, as altas foram de 4,5% no Paraná e 2,9% em Santa Catarina, considerando os valores nominais.\r\n\r\n\r\n\r\nEm relação às variações regionais, os preços nas duas primeiras semanas de setembro mantiveram-se estáveis nas regiões Meio Oeste e Litoral Sul. No entanto, a região Oeste registrou uma alta de 1,2% no período. Comparado a setembro de 2023, o Meio Oeste viu um aumento de 3,1%, e o Litoral Sul, de 0,7%, enquanto o Oeste sofreu uma queda de 6,6%, todos os valores corrigidos pelo IGP-DI.\r\n\r\nNo mercado atacadista, os preços da carne de frango mostraram variações distintas no início de setembro. O peito com osso e o filé de peito apresentaram altas de 1,7% e 0,8%, respectivamente. Por outro lado, a coxa/sobrecoxa e o frango inteiro congelado tiveram variações negativas de -0,8% e -0,1%. A variação média dos quatro cortes foi de 0,4%, com um aumento acumulado de 18,6% no ano, conforme dados do Boletim Agropecuária.\r\n\r\nQuando comparados aos preços de setembro de 2023, os valores atuais apresentam aumentos em todos os cortes: 34,2% para o filé de peito, 30,8% para o peito com osso, 10,3% para o frango inteiro e 3,9% para a coxa/sobrecoxa. A variação média dos quatro cortes foi de 19,8%.\r\n\r\n\r\n\r\nDe acordo com a Embrapa Suínos e Aves, o custo de produção de frangos em aviário climatizado positivo em Santa Catarina foi de R$ 4,85/kg em agosto, refletindo uma alta de 2,1% em relação ao mês anterior e 4,0% acima do custo de agosto de 2023, corrigido pelo IGP-DI. No acumulado do ano, o aumento é de 5,2%. A relação de troca insumo-produto caiu levemente nas duas primeiras semanas de setembro, com uma redução de 0,5% devido ao aumento no preço do frango vivo na região Oeste, parcialmente compensado pela alta no preço do [milho](https://www.agrolink.com.br/culturas/milho?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos).\r\n\r\nNo setor de exportações, o Brasil enviou 318,5 mil toneladas de carne de frango em agosto, o que representa uma queda de 29,6% em relação ao mês anterior e de 24,4% na comparação com agosto de 2023. As receitas caíram para US$ 609,0 milhões, uma redução de 30,3% em relação ao mês anterior e de 25,2% na comparação anual. A Associação Brasileira de Proteína Animal (ABPA) atribui essa queda ao surto de doença de Newcastle no Rio Grande do Sul, que afetou especialmente os embarques para a China e o México.\r\n\r\nNo acumulado de janeiro a agosto, o Brasil exportou 3,30 milhões de toneladas de carne de frango, gerando receitas de US$ 6,04 bilhões, o que representa uma queda de 3,2% em quantidade e 10,2% em valor em comparação com o mesmo período do ano passado. Santa Catarina exportou 69,9 mil toneladas em agosto, com uma queda de 32,3% em relação ao mês anterior e de 28,8% na comparação anual. As receitas foram de US$ 141,0 milhões, com uma redução de 31,5% em relação ao mês anterior e de 31,9% na comparação anual.\r\n\r\n\r\n\r\nApesar das quedas recentes, o valor médio da carne de frango in natura exportada por Santa Catarina foi de US$ 1.934,82 por tonelada em agosto, uma pequena queda de 0,1% em relação ao mês anterior, mas 3,8% abaixo do valor de agosto de 2023. No acumulado do ano, o estado exportou 736,4 mil toneladas, com receitas de US$ 1,42 bilhão, apresentando um aumento de 0,5% em quantidade, mas uma queda de 10,5% em valor, comparado ao mesmo período do ano anterior. Santa Catarina foi responsável por 23,5% das receitas geradas pelas exportações brasileiras de carne de frango nos primeiros oito meses de 2024.	2024-09-18 23:34:00.23	Mercado	3	13	https://www.agrolink.com.br/upload/imagens-resizes/f0d1448d1c614b63a00ed60510e4fdf6_858x483.jpg	102
Preços da carne de frango recuperam em agosto após queda	O aumento dos preços é impulsionado pela demanda aquecida	De acordo com informações divulgadas pelo Centro de Estudos Avançados em Economia Aplicada (Cepea), os preços médios da carne de frango, que enfrentaram queda em julho, apresentaram sinais de recuperação ao final de agosto. O aumento dos preços é impulsionado pela demanda aquecida, especialmente na primeira quinzena do mês, coincidente com o pagamento de salários, e pela oferta interna mais restrita.\r\n\r\n\r\n\r\nO mercado de frango vivo também experimentou um aumento nos preços devido à combinação de demanda elevada pela carne e oferta reduzida do animal. No entanto, enquanto o mercado interno mostra sinais de recuperação, as exportações brasileiras de carne de frango in natura continuam enfraquecidas.	2024-09-18 23:35:02.027	Mercado	3	13	https://www.agrolink.com.br/upload/imagens-resizes/827426b4de864e86b90671cdce04eaa1_858x483.jpg	104
Captação do leite cai 6,16% no Brasil	Queda na captação de leite no Sul e Centro-Oeste impacta produção nacional	A captação de leite no Brasil registrou uma queda de 6,16% no segundo trimestre de 2024 em relação ao trimestre anterior, de acordo com a análise semanal do Instituto Mato-grossense de Economia Agropecuária (Imea) e dados do IBGE. O volume total captado no período somou 5,83 bilhões de litros. A principal responsável por essa redução foi a região Sul, que sofreu uma retração de 5,30%, sendo puxada principalmente pelo Rio Grande do Sul, onde as enchentes resultaram em uma queda de 10,08% no volume captado em relação ao primeiro trimestre de 2024.\r\n\r\n\r\n\r\nSegundo a análise, na região Centro-Oeste, a entrada do período seco também impactou a produção, com uma queda de 10,77%, resultando em um total de 0,62 bilhão de litros captados. Mato Grosso do Sul e Mato Grosso lideraram as retrações, com reduções de 23,21% e 18,43%, respectivamente.\r\n\r\n\r\n\r\nPara o terceiro trimestre de 2024, a continuidade do período seco na região Centro-Oeste pode continuar a limitar a captação de leite, enquanto as pastagens de inverno na região Sul devem proporcionar uma recuperação, sustentando um leve aumento na captação a nível nacional, conforme os dados do Imea.	2024-09-18 23:36:03.394	Produção	3	12	https://www.agrolink.com.br/upload/imagens-resizes/8c91bc5aca8344c4841291e37d8435fa_858x483.jpg	105
China reduz importações de milho, afetando mercado brasileiro	Plantio da safra de verão avança no Sul	A análise do Grão Direto indica que a produção de milho nos EUA teve um leve aumento, de 384,74 para 385,73 milhões de toneladas. No entanto, a produção mundial caiu de 1.219,82 para 1.218,57 bilhões de toneladas, afetando os estoques globais. O USDA informou que os EUA venderam 1,561 milhão de toneladas, superando as expectativas de 700 mil a 1,6 milhão de toneladas.\r\n\r\n\r\n\r\nSegundo a análise produzida pelo Grão Direto, o Departamento de Agricultura dos Estados Unidos (USDA) revisou para baixo suas projeções de importação de milho pela China, de 23 para 21 milhões de toneladas. Essa redução pode ser um indicativo de que o país asiático está se aproximando da autossuficiência na produção de milho, o que pode impactar diretamente a demanda pelo produto brasileiro.\r\n\r\nNo Brasil, os produtores têm mostrado resistência a novas vendas após a quitação de dívidas com vendas anteriores, pressionando os compradores a oferecer preços mais atrativos. No entanto, há ainda grande volume de milho para ser negociado, enquanto a colheita norte-americana avança, oferecendo concorrência no mercado internacional.\r\n\r\n\r\n\r\nO plantio da safra de verão segue em ritmo moderado nos estados do Sul, com o Rio Grande do Sul registrando 37% da área total plantada, abaixo dos 44% do ano anterior. O clima instável em outras regiões do Brasil, contudo, gera incertezas sobre o avanço do plantio do cereal.\r\n\r\nNas exportações, o USDA reduziu a projeção brasileira de 50 para 48 milhões de toneladas, em função da menor produção e do ritmo mais lento de exportações. Mesmo assim, o número ainda está acima da estimativa da Conab, de 36 milhões de toneladas, com o mercado prevendo um patamar entre 40 e 42 milhões de toneladas, cerca de 30% abaixo do previsto inicialmente. Esse cenário pode manter as cotações em alta pelo terceiro mês consecutivo.	2024-09-18 22:59:18.767	Mundo	3	2	https://www.agrolink.com.br/upload/imagens-resizes/6b0d3abbd6884b828203b793a22aff0c_858x483.jpg	89
São Paulo: calor no fim de agosto aumenta risco de incêndios no campo	Queimadas provocaram prejuízos de mais de R$ 1 bilhão ao agro de SP	A previsão de aumento das temperaturas e de tempo seco no fim de semana eleva o alerta para o alto risco de incêndios nas lavouras do Estado de São Paulo. Nos últimos dias, uma frente fria que atingiu a Região Sudeste ajudou no combate aos focos de incêndio, mas o cenário deve mudar nos próximos dias, trazendo novos desafios para o setor agropecuário, conforme os dados da Secretaria de Agricultura e Abastecimento de São Paulo (SAA).\r\n\r\n\r\n\r\nDe acordo com dados da SSA, as queimadas registradas no último fim de semana impactaram fortemente as atividades agrícolas, especialmente a pecuária, cana-de-açúcar, fruticultura, heveicultura e apicultura. Os danos causados pelo fogo nas lavouras, pastagens e até a morte de animais já geraram prejuízos superiores a R$ 1 bilhão.\r\n\r\nGabriel Rodrigues, meteorologista do Agrolink destacou que a expectativa de que o tempo seco persista até pelo menos 12 de setembro. "O final de agosto ainda é marcado pela estação seca no estado de São Paulo, que tem início na segunda metade de maio, e historicamente, a estação chuvosa começa a partir da segunda quinzena de setembro. O cenário nas projeções de médio prazo ainda indicam uma condição de tempo seco no estado paulista até pelo menos o dia 12 de setembro. De certa forma, esta previsão está de acordo com os registros históricos", explica o especialista. \r\n\r\n[Veja mais informações sobre o clima em Agrotempo](https://www.agrolink.com.br/agrotempo?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos)\r\n\r\nAs chuvas ficaram abaixo da média em São Paulo refletindo um inverno ainda mais seco. "No entanto, vale ressaltar que nos últimos 120 dias, as chuvas ficaram abaixo da média no estado, indicando um inverno ainda mais seco. Além disso, a influência de vários episódios de bloqueios atmosféricos ao longo desta estação, contribuíram com a intensificação do calor e o impedimento do avanço das frentes frias sobre o estado. Condição que estamos vendo, agora no final do mês de agosto, mesmo após a chegada de uma massa de ar mais frio, continua Rodrigues. \r\n\r\n\r\n\r\nCom o aumento das temperaturas previsto para os últimos dias de agosto, a Defesa Civil do Estado de São Paulo emitiu um alerta para o alto risco de queimadas nas regiões produtivas. Para evitar novos focos de incêndio, é fundamental que a população colabore, adotando medidas como evitar queimar lixo, não acender fogueiras, não soltar balões (prática considerada crime ambiental), e manter aceiros limpos em volta das propriedades.\r\n\r\n"A presença de um bloqueio atmosférico, que atuará nas próximas semanas. Esse bloqueio, além de impedir a formação das nuvens carregadas e o avanço das chuvas das frentes frias, contribui com a redução dos índices de umidade, favorecendo então um ambiente altamente propício para o alastramento dos incêndios e queimadas no estado. Contudo, as projeções de longo prazo, estão mostrando um cenário mais úmido entre a última semana de setembro e primeira semana de outubro. Condição que pode aliviar, momentaneamente, as condições secas no estado de São Paulo" finaliza o meteorologista.\r\n\r\nPara mitigar esses prejuízos, a SAA destinou R$ 110 milhões aos produtores rurais paulistas afetados pelas queimadas, por meio do Fundo de Expansão do Agronegócio Paulista (FEAP). Os produtores interessados em acessar esse crédito devem procurar a Casa da Agricultura de seus municípios, conforme as informações da Secretaria de Agricultura e São Paulo.\r\n\r\n\r\n\r\nConforme o informado pela Secretaria de Agricultura e Abastecimento de São Paulo, em caso de emergência, a Defesa Civil (199) e o Corpo de Bombeiros (193) estão disponíveis para atendimento. As regiões sob alerta incluem Andradina, Araçatuba, Assis, Barretos, Bauru, Campinas, Campos do Jordão, Franca, Guaratinguetá, Iperó, Itapeva, Jales, Jaú, Jundiaí, Marília, Ourinhos, Presidente Prudente, Ribeirão Preto, São Carlos, São José do Rio Preto, Sorocaba e Votuporanga.	2024-09-18 23:32:10.795	Produção	3	7	https://www.agrolink.com.br/upload/imagens-resizes/3cd974ea0a724522b78b6c5d17adb406_858x483.jpg	101
Potencial da carne bovina no México	A Abiec apresentou dados sobre a evolução dos embarques	A Associação Brasileira das Indústrias Exportadoras de Carne (Abiec) divulgou uma nota informando sua participação em um evento realizado na Embaixada do Brasil no México, na quinta-feira (29). A iniciativa, organizada em parceria com a Associação Brasileira de Proteína Animal (ABPA), fez parte de uma missão oficial promovida pelo Ministério da Agricultura e Pecuária (Mapa) ao país. O México, um dos mercados mais recentes abertos à carne bovina brasileira, tem registrado um crescimento expressivo nas exportações, fato destacado pela Abiec durante o encontro.\r\n\r\n\r\n\r\nSegundo a nota, a Abiec apresentou dados sobre a evolução dos embarques de carne bovina para o México, que tiveram um salto significativo entre janeiro e julho de 2024, comparado ao mesmo período de 2023. O volume exportado passou de 288 toneladas em 2023 para impressionantes 23.108 toneladas em 2024. A diretora de Relações Internacionais da Abiec, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.\r\n\r\n\r\n\r\nA associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México.	2024-09-18 23:50:38.587	Internacional	3	12	https://www.agrolink.com.br/upload/imagens-resizes/95ab384ea6a44cb69ae5ea6001e40917_858x483.jpg	106
Custo de produção do milho supera preço do cereal, aponta Imea	Ciclo futuro do milho em Mato Grosso continua sendo um desafio	Segundo dados do Instituto Mato-grossense de Economia Agropecuária (Imea), o ponto de equilíbrio dos indicadores de custo de produção para a próxima temporada de milho em Mato Grosso revela um cenário desafiador para os produtores. Os custos de produção para o custeio, COE (Custo Operacional Efetivo), COT (Custo Operacional Total) e CT (Custo Total) foram estimados em R$ 28,96/sc, R$ 41,17/sc, R$ 45,99/sc e R$ 54,38/sc, respectivamente. Esses valores indicam que o preço do milho no estado Cobre apenas as despesas relacionadas ao custeio da temporada.\r\n\r\n\r\n\r\nOs cálculos de ponto de equilíbrio (P.E) utilizaram dados do custo de produção do projeto Acapa-MT, divulgados em setembro de 2024, e a produtividade média das últimas três safras. Com isso, o ciclo futuro do milho em Mato Grosso continua sendo um desafio, exigindo que os produtores mantenham uma gestão rigorosa dos custos, aproveitem as oportunidades de valorização do cereal e otimizem as relações de troca com os insumos.\r\n\r\n\r\n\r\nAlém disso, a produtividade permanece como um fator fundamental e indefinido que pode impactar a rentabilidade, desempenhando um papel fundamental na definição das margens dos produtores.	2024-09-18 22:58:45.317	Produção	3	2	https://www.agrolink.com.br/upload/imagens-resizes/4f78c51a69ea40879b7eadfba5c7a3eb_858x483.jpg	88
Café robusta atinge recordes históricos e supera R$ 1.500 por saca	Valorização é de 100%	Os preços do café robusta no Brasil continuam a atingir novos recordes, com a saca de 60 kg fechando acima de R$ 1.500,00 pela primeira vez desde o final da semana passada. O movimento de alta nas cotações, que já era observado desde o último trimestre de 2023, representa uma valorização de 100% em comparação ao preço de R$ 740/sc registrado no período.\r\n\r\n\r\n\r\nSegundo informações do Cepea (Centro de Estudos Avançados em Economia Aplicada), o aumento expressivo nos preços do robusta é atribuído a uma série de fatores. O clima adverso prejudicou a safra brasileira e deve impactar também a produção do Vietnã, maior produtor mundial da variedade. Além disso, dificuldades no fluxo global de mercadorias, que elevaram os custos de frete, têm atrapalhado os envios da Ásia para a Europa.\r\n\r\n\r\n\r\nO clima seco e quente nas principais regiões produtoras também gera preocupações quanto à safra brasileira de 2025/26, tanto para o robusta quanto para o arábica.	2024-09-18 23:03:12.732	Mercado	3	6	https://www.agrolink.com.br/upload/imagens-resizes/2d0457adbba34d0eb7314f3850c7f3ae_858x483.jpg	92
Milho tem negócios pontuais	No Paraná se viu um mercado com poucos lotes	No mercado do milho do estado do Rio Grande do Sul foram vistos negócios pontuais ao sul do estado, de acordo com informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 63,00; Não-Me-Toque a R$ 64,00; Marau e Gaurama R$ 64,50; Arroio do Meio, Lajeado e Frederico Westphalen a R$ 66,00 e Montenegro a R$ 67,00. Vendedores a partir de R$ 63,00 no FOB interior. Negócios pontuais em Panambi, onde 700 tons rodaram a R$ 64,00 no CIF indústria, entrega imediata”, comenta.\r\n\r\n\r\n\r\nSanta Catarina tem diferença entre R$ 2,00 a R$ 3,00 e vendedores com pouco prazo travam negócios. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 60,00 no interior e R$ 63,00/64,00 CIF fábricas. Rumores de negócios a R$ 64,00/64,50 no CIF oeste. Nas indicações, Chapecó a R$ 62,00; Campos Novos R$ 64,00; Rio do Sul a R$ 64,00; Videira R$ 63,00. Não ouvimos negócios nesta segunda-feira”, completa.\r\n\r\nNo Paraná se viu um mercado com poucos lotes. “Mercado com negócios pontuais reportados. No porto, indicações a R$ 63,00 set/64,00 nov/65,00 dez. No norte, indicações a R$ 58,00 (+1,00); Cascavel a R$ 57,00 (+1,00); Campos Gerais R$ 58,00 (-1,00); Guarapuava a R$ 58,00; Londrina R$ 57,50. Preços balcão no sudoeste a R$ 52,00; norte a R$ 54,00; oeste R$ 54,00 e centro-oeste R$ 55,00. Rumores de novos negócios na ferrovia Maringá, a R$ 62,00 outubro, onde teriam rodado pelo menos 5 mil toneladas”, indica.\r\n\r\n\r\n\r\nNo Mato Grosso do Sul, a maioria dos preços subiu. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Não ouvimos sobre negócios nesta segunda-feira”, conclui.	2024-09-18 22:57:46.511	Produtividade	3	2	https://www.agrolink.com.br/upload/imagens-resizes/f0b749daba5a4fc1a60b1842c376bbac_858x483.jpg	87
Preços do milho sob pressão	Esses movimentos indicam a necessidade de atenção	De acordo com a TF Agroeconômica, a recente resistência nos preços do milho na B3 acendeu um alerta para investidores e agricultores. Caso essa resistência seja superada na próxima semana, o ideal é manter a posição; caso contrário, pode ser o momento de sair das posições compradas. Embora os preços do milho tenham subido ao longo do mês, o relatório da Conab trouxe um impacto negativo no dia ao registrar aumento nos estoques finais, gerando pressão de queda nos preços.\r\n\r\n\r\n\r\nEntre os fatores de alta, destacam-se o atraso na colheita nos Estados Unidos, causado pelo furacão Francine, e o aumento das exportações brasileiras de milho. A ANEC revisou para cima suas projeções de embarques para setembro, o que elevou os prêmios de exportação no Brasil, impulsionados pela necessidade dos exportadores de cumprir compromissos. Além disso, o aumento da seca em regiões dos EUA, conforme relatório do USDA, segue afetando o mercado, com 18% da área agrícola americana sofrendo algum nível de seca.\r\n\r\n\r\n\r\nPor outro lado, os fatores de baixa incluem o aumento dos estoques finais de milho no Brasil, que passaram de 4,97 milhões para 5,05 milhões de toneladas, segundo a Conab, e a queda de 5,36% nos preços do suíno, um grande consumidor de milho. Além disso, a entrada da safra comercial brasileira no mercado de exportação exerce pressão adicional sobre os preços, mesmo com uma previsão de exportações menor do que no ciclo anterior. Esses movimentos indicam a necessidade de atenção ao comportamento do mercado, pois, apesar dos aumentos recentes, as flutuações de oferta e demanda podem impactar os preços de maneira significativa nos próximos dias.	2024-09-18 23:00:46.319	Mercado	3	2	https://www.agrolink.com.br/upload/imagens-resizes/ad3fdec02f5c45d19ae948046fc567bd_858x483.jpg	90
Inflação em queda nos EUA e seca no Brasil impulsionam preços do açúcar	O mercado de açúcar iniciou a semana passada de forma cautelosa	O mercado de açúcar iniciou a semana passada de forma cautelosa, com os participantes aguardando o relatório da União da Indústria de Cana-de-Açúcar (UNICA) enquanto a seca severa no Centro-Sul do Brasil continuava a dar suporte aos preços. A análise da Hedgepoint Global Markets destacou que a combinação da seca prolongada e a queda da inflação nos Estados Unidos fortaleceram o mercado de açúcar, elevando os preços do produto.\r\n\r\n\r\n\r\nLívea Coda, analista de Açúcar e Etanol da Hedgepoint, explicou que, apesar da fraqueza geral no complexo de energia, o açúcar mostrou resiliência, especialmente com as condições climáticas adversas que a principal região produtora do Brasil enfrentou na primeira quinzena de setembro. "As altas temperaturas e a baixa umidade relativa do ar aumentaram o risco de incêndios nos [canaviais](https://www.agrolink.com.br/culturas/cana-de-acucar/?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos)", acrescentou.\r\n\r\nO relatório da UNICA revelou um mix de açúcar de 48,85%, abaixo das expectativas de mercado, que previa um índice acima de 49%. Esse resultado surpreendeu os analistas, reforçando ainda mais o movimento de alta no mercado.\r\n\r\nNo campo legislativo, a aprovação do projeto de lei "Combustíveis do Futuro" pelo Senado brasileiro trouxe perspectivas de aumento na demanda por biocombustíveis, como o etanol. Entre as principais disposições, o aumento da mistura de biogás no gás natural e as metas para biocombustíveis até 2031 foram destacados. "Se o mandato de mistura de etanol na gasolina for fixado em 30% para 2025, a demanda por etanol anidro terá um crescimento significativo, gerando oportunidades no setor de biocombustíveis", afirmou Coda.\r\n\r\n\r\n\r\nEntretanto, a Hedgepoint destacou que o mercado de açúcar permanece atento à paridade das exportações indianas, com a participação do país no comércio internacional sendo restrita a preços acima de 20-21 c/lb. No mercado de açúcar branco, a entrega de outubro foi robusta, com 544,6 mil toneladas sendo entregues, a segunda maior já registrada em Londres.\r\n\r\nEmbora o cenário seja positivo para os preços do açúcar, os biocombustíveis ainda têm um longo caminho a percorrer antes de impactarem diretamente esse mercado. Até lá, o mix de fatores climáticos e macroeconômicos deverá continuar a definir o rumo dos preços, especialmente à medida que a seca no Centro-Sul brasileiro persiste.	2024-09-18 23:30:22.309	EUA	3	7	https://www.agrolink.com.br/upload/imagens-resizes/1c06c98d2c724a269450333e388ebd11_858x483.jpg	99
Exportações de ovos caem pelo segundo mês consecutivo	Brasil exportou 1,239 mil toneladas de ovos in natura e processados no último mês	As exportações de ovos comerciais do Brasil registraram nova queda em agosto, consolidando o segundo mês consecutivo de recuo. Esse desempenho negativo foi impulsionado, sobretudo, pela redução nos embarques de produtos processados, como ovalbumina e ovos secos ou cozidos, setores que apresentaram baixa expressiva.\r\n\r\n\r\n\r\nSegundo dados informados pelo Cepea, com base nas estatísticas da Secex, o Brasil exportou 1,239 mil toneladas de ovos in natura e processados no último mês, o que representa uma queda de 4,7% em relação a julho e uma redução significativa de 42% em comparação a agosto de 2023. Destas exportações, apenas 24,6% (equivalente a 305 toneladas) foram de produtos processados, o menor índice registrado desde dezembro de 2022.	2024-09-18 23:34:30.741	Exportação	3	13	https://www.agrolink.com.br/upload/imagens-resizes/2e67af479dc24df9ae6983f5fc124bc2_858x483.jpg	103
Milho fecha semana em alta na B3	Na Bolsa de Chicago, o milho fechou dia e semana em alta	Na Bolsa de Mercadorias de São Paulo, o milho fechou a semana em alta, acompanhado do mercado norte-americano nesta sexta-feira, de acordo com informações divulgadas pela TF Agroeconômica. “Os contratos futuros de grãos registraram alta acompanhado o mercado americano. Apesar dos relatórios de oferta e demanda do USDA e da Conab apresentarem dados baixistas, os dois mercados seguraram as cotações. Na Bolsa de Chicago, o vencimento setembro/24 fechou cotado a US$ 3,94, em uma valorização de 7,75 pontos”, comenta.\r\n\r\n\r\n\r\n“Diante deste quadro, as cotações futuras fecharam variações em alta no dia: o vencimento de setembro/24 foi de R$ 63,91 apresentando alta de R$ 0,13 no dia, alta de R$ 1,09 na semana; novembro/24 fechou a R$ 67,82, alta de R$ 1,21 no dia, alta de R$ 1,70 na semana; o vencimento janeiro/25 fechou a R$ 70,60, alta de R$ 0,90 no dia e alta de R$ 1,31 na semana”, completa.\r\n\r\nNa Bolsa de Chicago, o milho fechou dia e semana em alta com fundos recomprando posições. “A cotação de dezembro24, referência para a nossa safra de inverno, fechou em alta de 1,79 % ou $ 7,25 cents/bushel a $ 413,25. A cotação para março25, fechou em alta de 1,53 % ou $ 6,50 cents/bushel a $ 431,00”, indica.\r\n\r\n\r\n\r\n“O mercado voltou a cobrir posições em aberto do milho, movimento que transbordou do trigo para o cereal. A melhora da paridade para o Dólar em relação ao Real também deu suporte para milho. Segundo o USDA o México e a Europa devem aumentar as suas importações de milho. Ao longo da semana, as condições secas no Brasil, no começo do plantio do milho de primeira safra deram suporte aos preços. Com isso o milho fechou o acumulado da semana em alta de 1,72% ou $7,00 cents/bushel”, conclui.	2024-09-18 22:47:13.31	Produção	10	2	https://www.agrolink.com.br/upload/imagens-resizes/efe634a1e2564f26a6bf53f00d828b5b_858x483.jpg	115
Açúcar fecha em baixa nos mercados internacionais	Datagro reduz estimativa de produção	Os contratos futuros do açúcar fecharam a quarta-feira (4) em baixa nos mercados internacionais, com os comerciantes, segundo analistas ouvidos pela Reuters, destacando que “o mercado ficou tecnicamente fraco depois de não conseguir atingir novos picos de dois meses nesta semana. Na semana passada, ele se recuperou, impulsionado pelos incêndios nos canaviais do Brasil”.\r\n \r\n“No entanto, eles disseram que o açúcar continua sustentado pela situação de seca no Brasil e pela decisão da Índia de permitir que as usinas de açúcar usem o caldo de cana para produzir etanol”, destacou a Agência Internacional de Notícias.\r\n \r\nOntem a Consultoria Datagro reduziu para 39,3 milhões de toneladas a projeção de produção de açúcar no Centro-Sul do Brasil na atual temporada. A redução leva em conta os impactos das condições climáticas desfavoráveis atuais.\r\n \r\nNova York\r\n \r\nNa ICE Futures de Nova York, o açúcar bruto fechou contratado ontem, no lote outubro/24, a 19,24 centavos de dólar por libra-peso, baixa de 25 pontos, ou 1,3%, no comparativo com os preços da véspera. Já a tela março/25 caiu 25 pontos, contratada a 19,56 cts/lb. Os demais contratos recuaram entre 1 e 20 pontos, com a exceção do lote julho/26 que subiu 4 pontos.\r\n \r\nLondres\r\n \r\nJá o açúcar branco listado na ICE Futures Europe de Londres fechou no vermelho em todos os lotes. O vencimento outubro/24 foi contratado a US$ 539,10 a tonelada, recuo de 2,70 dólares no comparativo com os preços da véspera. A tela dezembro/24 caiu 3,30 dólares, contratada a US$ 528,80 a tonelada. Os demais lotes recuaram entre 2,40 e 4,20 dólares.\r\n \r\nMercado doméstico\r\n \r\nNo mercado interno a quarta-feira foi de alta nas cotações do açúcar cristal medidas pelo Indicador Cepea/Esalq, da USP. A saca de 50 quilos foi comercializada ontem a R$ 136,94 contra R$ 135,97 de terça-feira, valorização de 0,71% no comparativo.\r\n \r\nEtanol hidratado\r\n \r\nJá o etanol hidratado fechou pelo terceiro dia seguido em queda pelo Indicador Diário Paulínia. O biocombustível foi negociado ontem a R$ 2.607,00 o m³, contra R$ 2.631,00 o m³ praticado na véspera, desvalorização de 0,91% no comparativo entre os dias.	2024-09-18 23:43:31.9	Importação	3	7	https://www.agrolink.com.br/upload/imagens-resizes/9a35558ae78843f09b0283d7edaf085a_858x483.jpg	112
Oferta mundial de soja afeta mercado brasileiro	Demanda cresce por óleo de soja	De acordo com dados da edição de setembro do boletim Agro em Dado da Secretaria de Estado de Agricultura, Pecuária e Abastecimento (Seapa), a oferta mundial recorde de soja na temporada 2023/24 e as projeções de alta disponibilidade para 2024/25, juntamente com variação negativa do dólar frente ao real em agosto, resultaram na desvalorização das cotações da soja tanto no mercado brasileiro quanto no internacional na primeira quinzena do mês.\r\n\r\n\r\n\r\nNo acumulado de exportações de janeiro a julho, o Brasil registrou um aumento de 3,0% no volume exportado de produtos do complexo soja em comparação ao mesmo período de 2023. No entanto, o valor arrecadado caiu 15,4%, refletindo a desvalorização da oleaginosa no mercado externo.\r\n\r\nO óleo de soja, por sua vez, teve valorização no mercado nacional em julho, impulsionado pela maior demanda de indústrias de biodiesel. Esse foi o mês com maior volume de embarques em 2024, totalizando 207,7 mil toneladas, um aumento de 48,9% em relação a junho, com receita de US$196,7 milhões.\r\n\r\n\r\n\r\nEm Goiás, terceiro maior exportador de óleo de soja do Brasil, foram embarcadas 106,8 mil toneladas entre janeiro e julho de 2024, somando US$97,7 milhões, representando quedas de 22,1% no volume e 32,2% no valor em relação ao mesmo período do ano anterior. Abril foi o mês de destaque, com 25,5 mil toneladas exportadas e faturamento de US$22,5 milhões, impulsionado pela valorização do dólar.\r\n\r\nO farelo de soja também teve impacto. De janeiro a julho, o Brasil exportou 13,3 milhões de toneladas, com um aumento de 3,6% em volume, mas uma queda de 14,3% no valor, totalizando US$5,7 bilhões. Goiás, quarto no ranking nacional, embarcou 1,5 milhão de toneladas, ao valor de US$668,9 milhões, recuando 15,8%.	2024-09-18 23:22:59.013	Mercado	3	3	https://www.agrolink.com.br/upload/imagens-resizes/59b6f442c49746cb8b0dcd39754853e9_858x483.jpg	95
Mercado do milho sente impacto de menor demanda	Interrupção da valorização ocorreu devido à redução no interesse de compra	O movimento de alta nos preços do milho, observado desde agosto, perdeu força na última semana em algumas regiões monitoradas pelo Cepea (Centro de Estudos Avançados em Economia Aplicada). De acordo com o boletim informativo da entidade, a interrupção da valorização ocorreu devido à redução no interesse de compra por parte dos consumidores.\r\n\r\n\r\n\r\nPor outro lado, os produtores, especialmente no estado de São Paulo, estão menos ativos no mercado. Segundo pesquisadores do Cepea, esse comportamento reflete a atenção voltada ao desenvolvimento da safra verão, que vem sendo impulsionado por condições climáticas favoráveis na maioria das regiões.\r\n\r\n\r\n\r\nNo Sul do Brasil, a semeadura da safra verão 2024/25 avança rapidamente e já se aproxima de sua reta final. Essa perspectiva traz otimismo, mas também contribui para a menor disponibilidade de grãos no mercado imediato.\r\n\r\nA estabilidade nos preços do milho pode continuar nos próximos dias, dependendo da evolução da safra e da demanda dos compradores.	2024-11-25 22:21:28.863	Mercado	3	2	https://www.agrolink.com.br/upload/imagens-resizes/00ea6e85b06348679521d3c8fce074c9_858x483.jpg	130
Falta de chuvas atra semeadura da soja em Mato Grosso	No mesmo período do ano passado, 1,82% da área já havia sido cultivada no estado	Desde o dia 7 de setembro, os produtores de Mato Grosso estão autorizados a iniciar a semeadura da safra de soja 2024/25. No entanto, segundo dados do Instituto Mato-grossense de Economia Agropecuária (Imea), os trabalhos no campo têm ocorrido de forma pontual, restritos a áreas irrigadas por pivô central. A razão para o avanço limitado nessas regiões se deve ao baixo volume de água nos reservatórios.\r\n\r\n\r\n\r\nO Imea atribui esse cenário de seca à mudança nas temperaturas do Oceano Pacífico, que passou de um fenômeno El Niño para uma condição de neutralidade no início de 2024. Essa alteração climática tem retardado as primeiras chuvas em Mato Grosso, complicando o início do plantio.\r\n\r\n\r\n\r\nDe acordo com projeções do Instituto Nacional de Meteorologia (Inmet), o estado deve receber entre 1 e 3 mm de precipitação nos próximos sete dias, volume considerado insuficiente para a semeadura adequada. No mesmo período do ano passado, 1,82% da área já havia sido cultivada no estado, cenário que deve se repetir com atraso em 2024.\r\n\r\n\r\n\r\nCom a previsão de chuvas aquém do necessário, o setor agropecuário de Mato Grosso aguarda com apreensão a evolução climática nas próximas semanas para evitar impactos negativos na produtividade da safra.	2024-09-18 23:23:33.624	Mercado nacional	3	3	https://www.agrolink.com.br/upload/imagens-resizes/e93429e3193e4c5a9d14e4f495000039_858x483.jpg	96
Mercado da soja “desanimado”	Em Santa Catarina, os negócios continuam estagnados	O mercado da soja do estado do Rio Grande do Sul continuou desanimado devido à valorização do real frente ao dólar, o que resultou em poucos negócios reportados, segundo informações divulgadas pela TF Agroeconômica. Os preços de hoje para entrega em outubro e pagamento em 15/10 foram: R$ 139,00 no Porto. No interior, os valores seguiram conforme as praças: R$ 131,50 em Cruz Alta, R$ 132,00 em Passo Fundo, R$ 131,00 em Ijuí e R$ 130,50 em Santa Rosa/São Luiz (pagamento em 04/10).\r\n\r\n\r\n\r\nEm Santa Catarina, os negócios continuam estagnados. Segundo o Epagri, Santa Catarina deve colher cerca de 3 milhões de toneladas de soja, um aumento de 12,77% em relação à safra passada. “Os negócios continuam estagnados, refletindo a ausência de movimentação nos preços. O preço no porto foi de R$ 126,00, Chapecó a R$ 117,00”, comenta.\r\n\r\nNo Paraná também não houve muitas alterações no preço. “No porto, Paranaguá vai a R$ 141,00. No interior, em relação à soja da safra 2023/24, a ideia de compra girava em torno de R$ 136,00 por saca CIF Ponta Grossa, com entrega no começo de setembro e pagamento no fim de setembro. No balcão, os preços em Ponta Grossa ficaram em R$ 128,00”, completa.\r\n\r\n\r\n\r\nPreços parados e negócios apenas pontuais no Mato Grosso do Sul. “O plantio no estado segue atrasado, segundo a CONAB, que não indicou o começo da semeadura no Brasil. O vazio sanitário acabou neste dia 15 para o estado. Dourados R$ 132,00. Campo Grande: R$ 131,00. Maracaju: R$ 131,00. Chapadão do Sul: R$ 129,00. Sidrolândia: R$ 129,00”, indica.\r\n\r\nNo Mato Grosso, mais especificamente em Sorriso, os preços subiram para R$ 128 por saca FOB, com retirada em outubro e pagamento em novembro, após estarem a R$ 126 na véspera. “Rodaram volumes pontuais. Preços praticados: Campo Verde: R$ 127,10, Lucas do Rio Verde: R$ 125,60. Nova Mutum: R$ 125,90. Primavera do Leste: R$ 128,00. Rondonópolis: R$ 1330. Sorriso: R$ 125,00”, conclui.	2024-09-18 23:24:16.257	Produção	3	3	https://www.agrolink.com.br/upload/imagens-resizes/4ef974c1892344c3bc0876ae6e260fe7_858x483.jpg	97
Milho lento no Sul	O mercado do Paraná, enquanto isso, segue sem negócios	No mercado de milho do estado do Rio Grande do Sul o mercado ainda está lento, segundo informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 63,00; Não-Me-Toque a R$ 64,00; Marau e Gaurama R$ 64,50; Arroio do Meio, Lajeado e Frederico Westphalen a R$ 66,00 e Montenegro a R$ 67,00. Vendedores a partir de R$ 63,00 no FOB interior. Não ouvimos negócios nesta quinta-feira”, comenta.\r\n\r\n\r\n\r\nEm Santa Catarina as indicações foram mantidas. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 60,00 no interior e R$ 63,00/64,00 CIF fábricas. Rumores de negócios a R$ 64,00/64,50 no CIF oeste. Nas indicações, Chapecó a R$ 62,00; Campos Novos R$ 64,00; Rio do Sul a R$ 64,00; Videira R$ 63,00. Em negócios ao oeste, viu-se milho sendo negociado entre R$ 63,00 até 64,00 CIF, a depender do vencimento, onde corretores relatam negócios em pelo menos 5 mil toneladas”, completa.\r\n\r\nO mercado do Paraná, enquanto isso, segue sem negócios. “Mercado com negócios pontuais reportados. No porto, indicações a R$ 63,00 set/64,00 nov/65,00 dez. No norte, indicações a R$ 57,00 (+1,00); Cascavel a R$ 56,00 (+2,00); Campos Gerais R$ 59,00 (+1,00); Guarapuava a R$ 58,00; Londrina R$ 57,50. Preços balcão no sudoeste a R$ 52,00; norte a R$ 54,00; oeste R$ 54,00 e centro-oeste R$ 55,00. Rumores de novos negócios na ferrovia Maringá, a R$ 62,00 outubro”, indica.\r\n\r\n\r\n\r\nNo Mato Grosso do Sul os preços subiram. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios pontuais em Naviraí, onde uma indústria levou 2 mil tons entrega setembro/pgto final do mês a R$ 54,00”, conclui.	2024-09-18 23:01:42.13	Mercado brasileiro	3	2	https://www.agrolink.com.br/upload/imagens-resizes/44c7a8418c8843dd81abe850d4635a08_858x483.jpg	91
EUA: 65% da safra de milho está em boas a excelentes condições	Safra de milho alcança 9% dos EUA	O relatório do Weekly Weather and Crop Bulletin, publicado pelo Departamento de Comércio dos EUA em parceria com a Administração Oceânica e Atmosférica Nacional (NOAA) e o Departamento de Agricultura (USDA) apontou que 85% da área de milho nos Estados Unidos já estava amassada até 15 de setembro. Esse índice está 3 pontos percentuais abaixo do registrado no ano passado, mas 1 ponto à frente da média dos últimos cinco anos. Quanto à maturidade da safra, 45% da área de milho do país já alcançou esse estágio, um número que é 3 pontos percentuais inferior ao de 2023, mas 7 pontos à frente da média.\r\n\r\n\r\n\r\nEm relação à colheita, 9% da área plantada foi colhida até o fim da semana, o que representa 1 ponto percentual à frente do mesmo período do ano passado e 3 pontos à frente da média histórica. A colheita está em andamento em 15 dos 18 estados produtores estimados.\r\n\r\n\r\n\r\nAlém disso, 65% da área de milho do país foi classificada como estando em condições de boas a excelentes, uma melhora de 1 ponto percentual em comparação à semana anterior e 14 pontos acima do registrado no ano passado. No estado de Iowa, maior produtor de milho do país, 77% da safra foi classificada nessas condições favoráveis.	2024-09-18 22:52:01.439	Mundo	3	2	https://www.agrolink.com.br/upload/imagens-resizes/7b0572e203584a089ebeb0c2b772fc65_858x483.jpg	86
Impacto das chuvas no cinturão cafeeiro	Mês de outubro trouxe boas notícias para os cafeicultores	O cultivo de café conilon enfrenta os mais diversos desafios relacionados ao clima, principalmente em relação à gestão da água. A variação diária das necessidades de irrigação, causada pelas mudanças climáticas, exige uma abordagem rigorosa para evitar perdas de produtividade. Nesse cenário, a adoção de tecnologias de irrigação de precisão se tornam indispensáveis. \r\n\r\n\r\n\r\nQuando as tecnologias de monitoramento são utilizadas, elas permitem que o produtor possa ajustar em tempo real, a quantidade de água aplicada à lavoura. “A aplicação precisa de água resulta em melhor absorção dos nutrientes pelas plantas, o que, além de reduzir o uso de fertilizantes, promove uma colheita mais saudável e produtiva,” explica Elídio Torezani, diretor da Hydra Irrigações.\r\n\r\nO monitoramento é utilizado para que o produtor tenha acessa acesso a dados detalhados sobre umidade do solo, clima e outras variáveis importantes. “Com essas informações, o manejo é ajustado com precisão para atender às necessidades diárias da planta, evitando desperdícios de água e insumos,” detalha Torezani.\r\n\r\n\r\n\r\nE assim, com essas práticas de irrigação inteligente , é possível que uso de fertilizantes seja otimizado. Segundo Torezani, “ao aplicar a quantidade ideal de água, o café absorve melhor os nutrientes, o que reduz a necessidade de adubação e os custos de produção.” Com isso, o produtor de café conilon pode alcançar uma produtividade maior, reduzindo a pegada ambiental e maximizando a eficiência dos recursos. Estudos mostram que práticas de irrigação de precisão podem aumentar em até 30% a produtividade do café conilon. Em um mercado cada vez mais competitivo e consciente, essa eficiência é fundamental para os produtores que buscam reduzir custos e atender a demanda por práticas sustentáveis.	2024-11-25 22:19:00.423	Expectativa	3	6	https://www.agrolink.com.br/upload/imagens-resizes/f3977dc78530492ca5dd02e788fde134_858x483.jpg	128
Benefícios cosméticos dos ovos	A clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele	Os ovos, além de serem amplamente utilizados na culinária, têm ganhado reconhecimento por seus benefícios cosméticos. Sua composição rica em proteínas, vitaminas e ácidos graxos os torna aliados naturais em tratamentos para a pele e cabelos, promovendo resultados surpreendentes. Na rotina de beleza, os ovos podem ser utilizados de diversas maneiras, oferecendo soluções caseiras eficazes e acessíveis. Um exemplo é a máscara facial feita com clara de ovo, que ajuda a tonificar e firmar a pele. Combinada com iogurte, fonte de ácido láctico, essa mistura esfolia suavemente o rosto, deixando a pele macia e renovada, além de reduzir a aparência de poros dilatados.\r\n\r\n\r\n\r\nA gema do ovo, por sua vez, é uma excelente aliada para os cabelos, especialmente os danificados. Rica em ácidos graxos e vitaminas, a gema restaura a hidratação e o brilho dos fios, transformando cabelos secos e sem vida em madeixas mais saudáveis e luminosas. Para quem sofre com oleosidade no couro cabeludo, a clara do ovo pode ser aplicada como um tratamento eficaz, controlando a produção de óleo e deixando os cabelos mais leves e com aspecto limpo por mais tempo. A clara de ovo também pode ser utilizada em um esfoliante facial, combinado com açúcar, para remover células mortas e revitalizar a pele, promovendo uma aparência renovada e fresca.\r\n\r\nAlém disso, a clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele e uniformizar o tom, deixando-a mais radiante e luminosa. Aplicar a clara sob os olhos também pode ajudar a reduzir olheiras e inchaços, proporcionando uma aparência descansada. No cuidado com as unhas, a gema do ovo é ideal para ser utilizada como um condicionador para cutículas, hidratando e fortalecendo-as, o que promove unhas mais saudáveis e evita a quebra. Uma máscara capilar feita com ovos, azeite e mel pode proporcionar hidratação profunda aos cabelos, aumentando o brilho e a resistência dos fios.\r\n\r\n\r\n\r\nOutro benefício interessante da clara de ovo é sua propriedade antimicrobiana, devido à presença da enzima lisozima. Essa enzima ajuda a reduzir o tamanho dos poros da pele, prevenindo o acúmulo de sujeira e poeira, o que pode contribuir para a redução da acne. Além disso, a clara de ovo possui propriedades anti-inflamatórias, tornando-se uma opção eficaz para acalmar a pele irritada. Incorporar os ovos na rotina de cuidados pessoais, seja na pele ou nos cabelos, pode ser uma maneira natural e econômica de obter uma aparência mais saudável e radiante.	2024-09-18 23:37:42.122	Saúde	3	13	https://www.agrolink.com.br/upload/imagens-resizes/33f430c0c10c470f9b69f05d25388dc2_858x483.jpg	107
Qualidade da soja mantém-se elevada nos EUA	64% das lavouras estão em boas condições	O mais recente relatório do Weekly Weather, divulgado pelo Departamento de Comércio dos EUA em parceria com a Administração Oceânica e Atmosférica Nacional (NOAA) e o Departamento de Agricultura (USDA), indicou que 44% da queda de folhas das lavouras de soja foi concluída até 15 de setembro. Esse número está 3 pontos percentuais atrás do registrado no ano passado, mas 7 pontos à frente da média de cinco anos.\r\n\r\n\r\n\r\nA colheita de soja alcançou 6% de sua área plantada até a mesma data, um avanço de 2 pontos percentuais em relação a 2023 e 3 pontos à frente da média de cinco anos. A colheita já estava em andamento em 17 dos 18 estados estimados.\r\n\r\nEm termos de qualidade, 64% das plantações de soja foram classificadas como boas a excelentes em 15 de setembro, um leve recuo de 1 ponto percentual em relação à semana anterior, mas ainda 12 pontos percentuais acima do índice registrado no mesmo período do ano passado.	2024-09-18 23:22:23.163	Internacional	3	3	https://www.agrolink.com.br/upload/imagens-resizes/5ea92573f29343e192d278c2d3300f4a_858x483.jpg	94
EUA: milho registra crescimento de produção	EUA: milho registra crescimento apesar de área colhida reduzida	De acordo com a análise semanal do Instituto Mato-grossense de Economia Agropecuária (Imea), segundo dados divulgados pelo Departamento de Agricultura dos Estados Unidos (USDA) em setembro de 2024, a área colhida para a safra 2024/25 de [milho](https://www.agrolink.com.br/culturas/milho?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos) manteve-se em 33,47 milhões de hectares, uma queda de 4,4% em relação à temporada anterior.\r\n\r\n\r\n\r\nNo entanto, a produção apresentou um leve aumento de 0,26% em comparação ao relatório de agosto, totalizando 385,73 milhões de toneladas.\r\n\r\nEsse crescimento na produção reflete o bom desempenho das lavouras, com 65% delas classificadas como em condições boas ou excelentes, 9 pontos percentuais acima da média das últimas cinco safras no mesmo período. A colheita começou na semana anterior e, até o dia 15 de setembro, alcançou 9% da área total estimada, o que representa um avanço de 3 pontos percentuais em relação à média histórica.	2024-09-18 23:39:51.382	Internacional	4	2	https://www.agrolink.com.br/upload/imagens-resizes/df4cec1fdf0a44c3b6cc78fba2aceb13_858x483.jpg	113
Mercado de açúcar cai 2,4% na semana	Outro fator que pressionou os preços foram os bons níveis de chuvas na Índia	Segundo informações da StoneX, o mercado de açúcar e etanol registrou quedas significativas na última semana, influenciado por fatores climáticos e econômicos. Os preços do açúcar bruto em Nova Iorque encerraram a semana com uma retração consolidada de 2,4%, situando-se em US¢ 18,03 por libra-peso. Essa queda foi reflexo da divulgação dos dados da safra do Centro-Sul na segunda metade de julho de 2024, além do aumento da aversão ao risco nos mercados financeiros globais.\r\n\r\n\r\n\r\nOutro fator que pressionou os preços do açúcar foram os bons níveis de chuvas na Índia durante a temporada de monções. Esses elementos contribuíram para uma tendência geral de baixa, apesar de uma alta pontual de 0,84% na sexta-feira (16). A combinação desses fatores adversos resultou em um movimento baixista consolidado no mercado.\r\n\r\nNo mercado de etanol, os dados do CEPEA revelam uma desvalorização de 1,4% no etanol hidratado (média São Paulo) entre os dias 08 e 16 de julho, com o preço ficando em R$ 2,5977 por litro, sem impostos. Essa queda foi influenciada pela desaceleração da demanda em função dos preços elevados. As usinas, ainda em pico de safra, ajustaram seus preços, como mostra o indicador da StoneX para o etanol base PVU Ribeirão Preto-SP, que registrou uma queda de 1,6%, retornando ao patamar de R$ 3,10 por litro.\r\n\r\n\r\n\r\nMesmo com a estabilidade dos preços entre R$ 3,05 e R$ 3,10 por litro desde o final de julho, as perspectivas para o etanol seguem otimistas, impulsionadas pela robusta demanda. As vendas das usinas do Centro-Sul em julho totalizaram 1,77 milhão de metros cúbicos no mercado interno, o maior volume desde 2019. A continuidade dessa demanda forte sugere que, apesar das recentes quedas, o mercado de etanol pode manter uma tendência altista no curto prazo.	2024-09-18 23:42:11.67	Mercado	4	7	https://www.agrolink.com.br/upload/imagens-resizes/372fb1c5170f4d328581722abc49303d_858x483.jpg	111
Carne de frango ganha competitividade com alta nos preços	Valorização mais suave torna a proteína avícola uma opção mais acessível	A carne de frango tem se destacado no mercado, ampliando sua competitividade em relação às carnes bovina e suína, que apresentam altas mais acentuadas. Essa valorização mais suave torna a proteína avícola uma opção mais acessível para os consumidores no início de setembro.\r\n\r\n\r\n\r\nSegundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida.	2024-09-18 23:59:14.577	Mercado	10	13	https://www.agrolink.com.br/upload/imagens-resizes/5ae27991230742b1a435da57bf753ae5_858x483.jpg	109
Congresso de café foca em controle de broca	O inseticida Afiado se destaca pela sua ação de choque rápida	A cidade de Franca (SP) sedia entre os dias 22 e 25 de outubro de 2024 o Congresso Brasileiro de Pesquisas Cafeeiras, organizado pela Fundação Procafé. O evento reúne especialistas e empresas do setor para discutir inovações em tecnologia, produtividade e controle de pragas no cultivo do café. Entre os destaques, está a participação da Albaugh, multinacional com raízes norte-americanas, reconhecida por seu portfólio robusto em proteção de cultivos. Durante o congresso, a empresa Albaugh traz inovações com o inseticida Afiado e o fungicida Recop. Segundo Fábio Arantes Porto, gerente de marketing da Albaugh, um dos focos será o controle da broca-do-café (Hypothenemus hampei), praga que afeta todas as regiões produtoras de café. \r\n\r\nO inseticida Afiado se destaca pela sua ação de choque rápida e pelo residual prolongado, características que o tornam uma escolha eficaz no combate a pragas. Além disso, sua fórmula é projetada para não interferir nas populações de inimigos naturais, preservando o equilíbrio ecológico do ambiente agrícola. A nova formulação líquida do produto não apenas facilita sua dosagem e aplicação, mas também garante maior eficiência no manejo, permitindo que os agricultores alcancem resultados consistentes e sustentáveis em suas lavouras.\r\n\r\n\r\n\r\nOutro destaque é o fungicida Recop, que vem sendo utilizado no controle de doenças importantes do cafeeiro, como a ferrugem-do-cafeeiro, antracnose e mancha-do-olho-pardo. De acordo com a Albaugh, Recop tem um papel preventivo e auxilia na maturação uniforme dos frutos, aumentando a qualidade e a rentabilidade da colheita. Fundada em 1979 por Dennis Albaugh, a empresa opera globalmente com fábricas próprias para garantir a qualidade e o fornecimento de seus defensivos agrícolas, consolidando-se como uma das líderes no mercado de proteção de cultivos.	2024-11-25 22:20:08.626	Inovação	3	6	https://www.agrolink.com.br/upload/imagens-resizes/136d7afd37f64c7cbf8518eb0165bb12_858x483.jpg	129
Frangos tipo resfriado é opção prática para refeição de brasileiros	O frango é o alimento de origem animal mais consumido no Brasil	O frango é o alimento de origem animal mais consumido no Brasil. Seu elevado valor nutricional, com baixo teor de gordura e alto nível de vitaminas, leva a população a consumi-lo cada vez mais. "Saboroso, versátil e extremamente nutritivo, o frango pode ser servido de diversas formas e faz parte de múltiplas composições culinárias, o que amplia ainda mais sua importância gastronômica em nossas vidas", comenta Mariana Nagata, diretora de marketing da Korin Alimentos. \r\n\r\n\r\n\r\nO consumo per capita de carne de frangos no Estado de São Paulo é de cerca de 45 quilos anuais. A produção supera 14,8 milhões de toneladas por ano em todo o Brasil. Além disso, as exportações atingiram 5,14 milhões de toneladas, em 2023. Com esses números, o Brasil é líder em exportação e um dos maiores produtores de frangos do mundo, de acordo com a Associação Brasileira de Proteína Animal (ABPA). \r\n\r\nA Korin Alimentos participa desse mercado em expansão. A empresa oferece o Frango tipo Resfriado Korin Boa Pedida - fresco e ideal para preparo rápido. Único no mercado na categoria sustentável, um importante diferencial do produto da Korin é oferecer mais praticidade na hora do preparo, já que não é necessário aguardar o processo de descongelamento para o início do cozimento. Basta retirar da embalagem e preparar. Além disso, está sempre fresco nos supermercados à disposição dos consumidores. \r\n\r\n\r\n\r\n"As pessoas ajustam seus hábitos alimentares em busca de praticidade. Dessa forma, optam por alimentos mais fáceis de preparar e de rápido cozimento", ressalta a diretora de marketing. "O frango é o prato ideal para quem não tem muito tempo a perder e quer qualidade". \r\n\r\nCom presença majoritária nos mercados de São Paulo e Rio de Janeiro, os Frangos Resfriados Korin Boa Pedida têm rastreabilidade e preocupação com o bem-estar animal. A criação não recebe antibióticos nem anticoccidianos. "Esse sistema faz parte do princípio da Agricultura Natural, preconizado pelo pensador japonês Mokiti Okada (1882-1955), que tem como objetivo resgatar a pureza do solo e dos alimentos e preservar a diversidade e o equilíbrio biológico, contribuindo para a elevação da qualidade da vida humana", informa Mariana. \r\n\r\n\r\n\r\nOs Frangos Resfriados Korin Boa Pedida são oferecidos nas versões com bandejas de 600 gramas e inteiro. Os cortes disponíveis são: coração, coxa com sobrecoxa sem osso, coxa, coxinha da asa, fígado, filé de coxa com sobrecoxa sem pele, filé de peito, filé sassami, meio da asa, moela, sobrecoxa, sobrecoxa sem pele, sobrecoxa sem osso e frango inteiro.	2024-09-18 23:41:32.881	Gastronomia	3	13	https://www.agrolink.com.br/upload/imagens-resizes/ffb6701390b3421aa1be8c8368a8b425_858x483.jpg	122
TESTE Estoques de café no Japão caem, mas demanda mantém projeção estável	Demanda aparente no Japão sofreu reduções nos últimos anos	TESTESegundo informações divulgadas pela Hedgepoint Global Markets, os estoques de café no Japão continuam em queda. De acordo com os dados mais recentes da Japan Coffee Association (JCA), houve uma redução de 3,3% entre maio e julho, levando o volume para 2,42 milhões de sacas, um nível estável em relação ao ano passado, mas ainda abaixo da média histórica de 2,8 milhões de sacas. Essa diminuição é acompanhada por uma estabilização na demanda aparente para a temporada de 2023/24 (outubro de 2023 a junho de 2024), que já se aproxima dos níveis de 2022/23.\r\n\r\nLaleska Moda, analista de café da Hedgepoint, destaca que, apesar dos menores estoques oferecerem suporte para as cotações, a demanda aparente no Japão sofreu reduções nos últimos anos. No entanto, ela ressalta que o consumo está estabilizado, e a expectativa é que a demanda total da temporada 23/24 atinja 6,2 milhões de sacas, o que seria praticamente o mesmo volume de 2022/23.\r\n\r\n**Exportações brasileiras batem recorde**\r\n\r\nEnquanto o Japão lida com a queda dos estoques, o Brasil registra recordes nas exportações de café. Em agosto, o país exportou 3,73 milhões de sacas, um aumento de 0,7% em relação ao mesmo período do ano passado, segundo dados do Cecafé. Esse crescimento foi impulsionado principalmente pelo conilon, cujas exportações subiram 31,4% e atingiram um novo recorde histórico de 924,6 mil sacas.\r\n\r\nA participação do conilon no mercado internacional vem crescendo, especialmente devido à restrição de oferta em países como o Vietnã. "O conilon brasileiro está ganhando força em destinos como a Europa, Japão e outros países asiáticos, e esperamos que essa tendência continue forte em 2024/25", destaca a Hedgepoint.\r\n\r\n**Tendências** \r\n\r\nA participação do Brasil nas importações japonesas também aumentou, enquanto países como Vietnã e outros da América Latina perderam espaço. Segundo a Hedgepoint, a oferta limitada no Sudeste Asiático e os problemas climáticos têm impulsionado o café brasileiro, especialmente o conilon, que continua a ser uma escolha preferida por conta do seu preço competitivo.\r\n\r\nCom a oferta global de robusta restrita, as exportações brasileiras devem permanecer em níveis elevados, consolidando o país como o principal fornecedor global de café, enquanto os outros produtores lidam com dificuldades de produção.	2024-10-25 11:55:26.958	Internacional	3	6	https://www.agrolink.com.br/upload/imagens-resizes/697d512ae68a48f3b4330d4177f5cf6e_858x483.jpg	93
Soja em queda: alta do dólar segura perdas no mercado interno	Movimento de baixa é atribuído ao término da colheita nos Estados Unidos	Os preços da soja, tanto no mercado interno quanto no externo, registraram queda na última semana, de acordo com o boletim informativo do Cepea (Centro de Estudos Avançados em Economia Aplicada). O movimento de baixa é atribuído ao término da colheita nos Estados Unidos, ao avanço acelerado das semeaduras no Brasil e na Argentina, além da menor demanda global pelo grão.\r\n\r\n\r\n\r\nNo Brasil, a desvalorização foi limitada pela alta do dólar frente ao Real, fator que aumenta a competitividade da soja brasileira no mercado internacional. Mesmo assim, compradores, especialmente indústrias nacionais, reduziram o ritmo de aquisição após semanas de compras intensas, segundo os pesquisadores do Cepea.\r\n\r\n\r\n\r\nDo lado dos vendedores, observa-se uma resistência nas negociações do remanescente da safra 2023/24. Muitos produtores, em posição confortável de caixa, optam por segurar o produto à espera de melhores preços no futuro.\r\n\r\nAs perspectivas para o mercado permanecem voláteis, com atenção voltada à evolução do clima nas regiões de plantio e ao comportamento da demanda global. Para os produtores brasileiros, o câmbio pode continuar sendo um fator crucial para os preços internos.	2024-11-25 22:23:43.682	Mercado	3	3	https://www.agrolink.com.br/upload/imagens-resizes/8ad5d2e0e76d4e6ba970901316a0f59b_858x483.jpg	132
Bahia: exportações do agronegócio batem recorde em outubro	Produtos baianos conquistam mais de 100 mercados internacionais	De acordo com dados divulgados pela Secretaria da Agricultura, Pecuária, Irrigação, Pesca e Aquicultura (Seagri BA), as exportações do agronegócio da Bahia alcançaram um novo recorde em outubro de 2024, totalizando US$ 745 milhões. O valor representa um crescimento de 14,7% em comparação ao mesmo período de 2023, quando foram registrados US$ 635 milhões. O montante é o maior da série histórica para o mês, de acordo com dados do Ministério da Agricultura e Pecuária (Mapa).\r\n\r\nO complexo do cacau foi um dos motores do desempenho. Em outubro de 2023, o setor havia exportado US$ 19,8 milhões, mas em 2024, esse valor mais que dobrou, atingindo US$ 48,1 milhões, impulsionado pela valorização global das cotações da amêndoa, conforme informou a Secretaria de Agricultura.\r\n\r\nO café também se destacou, com um crescimento expressivo. As exportações passaram de US$ 15,4 milhões em outubro de 2023 para US$ 29,3 milhões no mesmo período deste ano, quase dobrando de valor.\r\n\r\nOutros produtos como fibras, têxteis e o complexo soja também tiveram impacto positivo no recorde de exportações. O setor de produtos florestais, especialmente a celulose, registrou um salto, passando de US$ 101,9 milhões em outubro de 2023 para US$ 155 milhões no mesmo mês de 2024.\r\n\r\n\r\n\r\nOs produtos agrícolas baianos chegaram a mais de 100 destinos internacionais, incluindo mercados estratégicos como China, Europa e Estados Unidos. Esse desempenho reforça a liderança da Bahia nas exportações do agronegócio no Nordeste, com um portfólio diversificado e de alta qualidade, segundo a Seagri BA.	2024-11-25 22:15:23.551	Produção	3	6	https://www.agrolink.com.br/upload/imagens-resizes/4895c329130443f487d947572fe41b03_858x483.jpg	125
Escassez e alta demanda disparam preços do café no Brasil	Alta é impulsionada por oferta limitada e demanda aquecida	Os preços dos cafés arábica e robusta seguem em alta no mercado brasileiro, impulsionados por fatores como oferta limitada e demanda aquecida. Segundo o Boletim Informativo do Cepea (Centro de Estudos Avançados em Economia Aplicada), o Indicador CEPEA/ESALQ do robusta tipo 6, peneira 13 acima, a retirar no Espírito Santo, renovou recordes reais da série histórica iniciada em novembro de 2001. No acumulado de 2024, a valorização ultrapassa 100%, reflexo direto da restrição de oferta no Brasil e no Vietnã, somada aos elevados preços do arábica.\r\n\r\nJá o Indicador CEPEA/ESALQ do arábica tipo 6, bebida dura para melhor, posto na capital paulista, atingiu valores acima de R$ 1.800 por saca de 60 kg, o maior patamar real desde 1998. No ano, a alta acumulada é de quase 80%, atribuindo-se este cenário à baixa oferta, ao alto percentual de café já comercializado pelos produtores e à safra 2024/25 menos volumosa.\r\n\r\nPesquisadores do Cepea destacam ainda que as condições debilitadas das plantas podem comprometer a produção da safra 2025/26, elevando a atenção de agentes do setor para o desenvolvimento da próxima temporada.	2024-11-25 22:16:05.476	Crise	3	6	https://www.agrolink.com.br/upload/imagens-resizes/23d61fdfe61b49658e6868ca9fe6e4c6_858x483.jpg	126
Fertilizantes podem garantir sabor diferenciados no café	Cafeicultores estão adotando tecnologias inovadoras	O Brasil, líder mundial na produção e exportação de café, não se destaca apenas pela quantidade – cerca de 69,9 milhões de sacas estimadas para a safra 2024/25 – mas também pela qualidade dos grãos. Cada vez mais, a busca por uma produção sustentável tem incentivado cafeicultores a adotarem tecnologias inovadoras, como os fertilizantes organominerais, que prometem melhorar o manejo do solo e elevar a qualidade final do produto.\r\n\r\n\r\n\r\nMaycon Cardoso, produtor de Brejetuba, na região serrana do Espírito Santo, é um exemplo de como esses insumos estão revolucionando a cafeicultura. Brejetuba, reconhecida como a maior produtora de café arábica do estado, também lidera em inovações. "Os fertilizantes químicos funcionam bem, mas são menos sustentáveis. Por isso, optei pelos organominerais, que trazem benefícios não só para a planta, mas também para a preservação do solo", afirma Maycon.\r\n\r\nMaycon começou a utilizar fertilizantes à base de matéria orgânica, como a proveniente de camas de aves, para preparar o solo antes do plantio. Trinta dias depois, aplicou bioorganominerais no manejo de cobertura. "São nutrientes essenciais para o café, e acredito que esse manejo sustentável pode até mesmo resultar em grãos com aroma e sabor diferenciados, o que o mercado valoriza muito", projeta.\r\n\r\nA tecnologia por trás dos fertilizantes organominerais combina nutrientes orgânicos e minerais, melhorando as propriedades químicas, físicas e biológicas do solo. Além disso, essa prática está alinhada à economia circular, já que reutiliza resíduos como as camas de aves, que poderiam ser descartados.\r\n\r\nNilton Rezende Junior, consultor de cafeicultura, explica que a utilização de fertilizantes organominerais reduz a necessidade de insumos químicos, o que beneficia tanto o meio ambiente quanto a competitividade do café brasileiro no mercado internacional. "O consumidor busca cada vez mais produtos com baixa pegada ambiental, e certificações que garantem isso são valorizadas", destaca.	2024-11-25 22:17:22.004	Inovação	3	6	https://www.agrolink.com.br/upload/imagens-resizes/cef8cfa5ebf64341bfee8b7e13e02c5a_858x483.jpg	127
Mercado de milho segue lento	No Paraná as tradings miram em vencimentos mais longos	O mercado de milho do estado do Rio Grande do Sul segue lento, segundo informações divulgadas pela TF Agroeconômica. “Nas indicações, manutenção: Santa Rosa a R$ 73,00; Não-Me-Toque a R$ 74,00; Marau e Gaurama R$ 74;00 Arroio do Meio, Lajeado e Frederico Westphalen a R$ 75,00 e Montenegro a R$ 77,00. Vendedores a partir de R$ 80,00 no FOB interior e R$ 82,00 CIF fábricas. Negócios pontuais em Palmeira das Missões e Erechim, onde 300 toneladas foram negociadas a R$ 75,00, e 500 toneladas rodaram a R$ 75,50, respectivamente, na entrega imediata”, comenta.\r\n\r\n\r\n\r\nEm Santa Catarina, o produtor não vem à mesa de negócios e o milho diferido está praticamente finalizado. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 72,00 no interior e R$ 73,00/75,00 CIF fábricas. Negócios aR$ 75,00/76,00 no CIF meio oeste, em pelo menos 2 mil tons. Nas indicações, Chapecó a R$ 74,00; Campos Novos R$ 75,00; Rio do Sul a R$ 76,00; Videira R$ 73,00. Porto indicando R$ 67 outubro/R$ 69 novembro. Sem negócios neste retorno de feriado”, completa.\r\n\r\nNo Paraná as tradings miram em vencimentos mais longos e praticamente não trabalham mais o dez/24. “No porto, indicações a R$ 68,00 nov/69,00 dez.No norte, indicações a R$ 67,00 (+1,00); Cascavel a R$ 68,00; Campos Gerais R$ 69,00; Guarapuava a R$ 70,00; Londrina R$ 71,00 (+1,00). Preços balcão no sudoeste e oeste a R$ 58,00, e norte a R$ 57,00. Produtores com pedidas a partir de R$ 77,00 no norte e oeste; e R$ 79,00 Campos Gerais. Negócios ao oeste, onde se pagou R$ 73,00 FOB por 2 mil toneladas, retirada imediata e pagamento em 30 dias”, indica.\r\n\r\n\r\n\r\nEnquanto isso, os negócios se arrastam no estado do Mato Grosso do Sul. “Em Maracaju, indicações de R$53,00 (+1,00);Dourados aR$ 54,00 (+R$1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios em ritmo lento, com produtores iniciando pedidas a R$ 58,00 no FOB, e indicações nos portos a partir de R$ 60,00”, conclui.	2024-11-25 22:22:20.763	Mercado	3	2	https://www.agrolink.com.br/upload/imagens-resizes/db1ed13edad74ab796b4be7c4d6d27a8_858x483.jpg	131
Brasil deve alcançar recorde na produção de soja	Preço da soja recua no Brasil	De acordo com a Central Internacional de Análises Econômicas e de Estudos de Mercado Agropecuário (Ceema), os preços da soja no Brasil apresentaram leve queda na última semana, com o câmbio oscilando entre R$ 5,70 e R$ 5,80 por dólar. No Rio Grande do Sul, o preço médio foi de R$ 128,87 por saca, enquanto em outras praças variou entre R$ 120,00 e R$ 146,00 por saca.\r\n\r\n\r\n\r\nO relatório trouxe uma retração nos preços, a produção brasileira de soja para 2025 deve atingir 167,7 milhões de toneladas, segundo a Abiove, e 166,1 milhões de toneladas, conforme a Conab – ambos representando recordes históricos.  \r\n\r\nCom essa produção, o Brasil deve exportar 104,1 milhões de toneladas de grãos, um aumento de 5,9% em relação ao ciclo anterior. O processamento interno de soja também deverá crescer, atingindo 57 milhões de toneladas, resultando em 44 milhões de toneladas de farelo de soja e 11,4 milhões de toneladas de óleo de soja, conforme projeções da Abiove.\r\n\r\nSegundo o Ceema, apesar da alta na produção, as exportações de óleo de soja devem cair 23,1%, com apenas 1 milhão de toneladas previstas para 2025. A redução é explicada pelo aumento na mistura de biodiesel no diesel fóssil, que passou de 14% para 15%, ampliando a demanda doméstica pelo produto.\r\n\r\n\r\n\r\nEntre janeiro e outubro, o Brasil exportou 67,8 milhões de toneladas de soja em grãos para a China, um aumento de 13,6% em relação ao mesmo período do ano passado. Já os Estados Unidos exportaram 15,1 milhões de toneladas para o país asiático, marcando uma queda de 13% no mesmo intervalo.\r\n\r\nPara 2025, o complexo soja brasileiro pode gerar uma receita de US$ 50,9 bilhões, ligeiramente abaixo dos US$ 53,1 bilhões registrados em 2024, impactado pela volatilidade cambial e pelos preços médios, conforme apontou o Ceema.	2024-11-25 22:24:35.947	Brasil	3	3	https://www.agrolink.com.br/upload/imagens-resizes/fe332bc5c23441859bb15809dab93820_858x483.jpg	133
MT: esmagamento de soja atinge 1,03 milhão de toneladas	Preço da soja pressiona margem bruta das indústrias	O setor de esmagamento de soja em Mato Grosso alcançou resultados expressivos em outubro de 2024. O volume processado atingiu 1,03 milhão de toneladas, um crescimento de 3,48% em relação ao mesmo mês de 2023 e 18,18% acima da média dos últimos três anos, conforme análise semanal do Instituto Mato-grossense de Economia Agropecuária (IMEA)\r\n\r\nNo acumulado de janeiro a outubro de 2024, o estado registrou 10,48 milhões de toneladas esmagadas, marcando um aumento de 6,18% em comparação com o mesmo período do ano passado. Durante o ano, apenas nos meses de janeiro e setembro o processamento ficou abaixo de 1,00 milhão de toneladas, destacando o ritmo consistente das indústrias locais.\r\n\r\n\r\n\r\nSegundo a Imea, o crescimento reflete, principalmente, o aumento da capacidade de processamento e a elevação da demanda por óleo e farelo de soja. No entanto, a margem bruta das indústrias registrou recuo em outubro, atingindo R$ 396,79 por tonelada, o que representa uma queda de 14,77% em relação a setembro. Essa redução foi atribuída à valorização do preço da soja, que superou os aumentos nos valores dos coprodutos.	2024-11-25 22:25:12.086	Preço	3	3	https://www.agrolink.com.br/upload/imagens-resizes/6af4098d11e64571b86680d450a65ad3_858x483.jpg	134
Safra de 2025 deve ter incremento de 5,8% frente a 2024	Crescimento da produção de soja influenciou positivamente o primeiro prognóstico	De acordo com o primeiro prognóstico do Levantamento Sistemático da Produção Agrícola (LSPA), divulgado hoje (14) pelo IBGE, a safra brasileira de grãos, cereais e leguminosas deve somar 311,0 milhões de toneladas em 2025. Essa produção representa um aumento de 5,8% em relação à safra de 2024, ou 17,2 milhões de toneladas a mais.\r\n\r\n“A safra de cereais, leguminosas e oleaginosas de 2024 enfrentou uma série de problemas climáticos em diversas unidades da federação, notadamente falta de chuvas e excesso de calor, sendo que no Rio Grande do Sul ainda tivemos excesso de chuvas e enchentes em abril/maio, o que retirou da safra brasileira em torno de cinco milhões de toneladas de grãos. Para 2025, embora os preços dos principais produtos não estejam apresentando uma boa rentabilidade, se tivermos um clima se comportando próximo a uma normalidade esperada, com as lavouras apresentando uma boa produtividade, teremos uma recuperação da safra brasileira, o que é importante para o controle da inflação e para o aumento das exportações brasileiras”, destaca Carlos Barradas, gerente do LSPA. \r\n\r\nA primeira estimativa indica que a produção de soja deve ter aumento de 10,9% em 2025, quando comparado com 2024, totalizando 160,2 milhões de toneladas, o que caracterizaria um novo recorde na produção nacional da leguminosa, superando a produção registrada no ano de 2023.  A estimativa para a produção de milho em 2025 é de 115,9 milhões de toneladas, aumento de 0,3% em relação à safra colhida em 2024. Para o milho 1ª safra, a estimativa é de uma produção de 24,9 milhões de toneladas, um crescimento de 9,1% em relação à safra de 2024, com declínio de 2,1% na área a ser colhida e crescimento de 11,4% no rendimento médio das lavouras. Já para o milho 2ª safra é estimada uma produção de 91,0 milhões de toneladas, redução de 1,8% na comparação com 2024.	2024-11-25 22:26:31.299	Mercado	3	3	https://www.agrolink.com.br/upload/imagens-resizes/a99d0aebf0194119a3bb4c6ae10e78ad_858x483.jpg	135
Colheita concluída nos EUA derruba cotações da soja	Cotações da soja em Chicago encerraram a semana em queda	As cotações da soja em Chicago encerraram a semana em queda, refletindo o avanço da colheita nos Estados Unidos e ajustes nas expectativas de mercado. Segundo dados da Central Internacional de Análises Econômicas e de Estudos de Mercado Agropecuário (CEEMA), o bushel da oleaginosa para o primeiro mês fechou a quinta-feira (21/11) cotado a US$ 9,77, contra US$ 9,85 registrado na semana anterior.\r\n\r\n\r\n\r\nO farelo de soja seguiu o mesmo movimento de baixa, enquanto o óleo se manteve estável, mas com viés de desvalorização, pressionando as margens de comercialização do complexo soja .\r\n\r\nNo entanto, os embarques de soja dos Estados Unidos continuam dentro das expectativas. Na semana encerrada em 14/11, o volume exportado alcançou 2,16 milhões de toneladas. No acumulado do ano comercial, as vendas externas já somam 17,5 milhões de toneladas, um aumento de 9% em relação ao mesmo período de 2023, conforme análise da CEEMA.\r\n\r\n\r\n\r\nCom o ritmo da colheita encerrado, o foco do mercado se volta agora para a demanda internacional e as negociações com a China, principal compradora do grão norte-americano.	2024-11-25 22:27:12.523	Soja	3	3	https://www.agrolink.com.br/upload/imagens-resizes/05e8e6f17d8d4bee82accf8038704e95_858x483.jpg	136
Mercado do boi gordo encerra semana com alta	Semana foi marcada por altas nas cotações	De acordo com a análise do informativo "Tem Boi na Linha" da Scot Consultoria, o mercado pecuário começou a semana com uma valorização. A arroba do boi gordo registrou alta de R$ 3,00, enquanto as cotações da vaca e da novilha permaneceram estáveis em diversas praças.\r\n\r\nNo Sudoeste do Mato Grosso, a cotação da arroba da vaca subiu R$ 2,00, enquanto a da novilha apresentou uma elevação mais expressiva, de R$ 5,00. Já o preço do boi gordo manteve-se inalterado na região.\r\n\r\nNo atacado, os preços da carne bovina com osso registraram aumento significativo na comparação semanal. A carcaça do boi capão casado subiu 4,5%, enquanto a carcaça do boi casado inteiro teve alta de 4,0%. A carcaça da vaca casada e a novilha casada também acompanharam o movimento de alta, com valorização de 3,1% e 3,7%, respectivamente.\r\n\r\nNa análise dos cortes, o destaque foi a ponta de agulha do boi casado inteiro, com aumento de 5,5%. Já o corte traseiro 1x1 do boi capão liderou as altas, registrando valorização de 5,2%.\r\n\r\nO mercado de carnes alternativas seguiu a tendência de valorização. A carcaça de suíno especial e o frango médio especial apresentaram variação positiva de 3,0% na segunda semana de novembro. O cenário atual reflete um momento de forte demanda e movimentação positiva no setor de carnes, com expectativas de manutenção das altas para os próximos períodos, especialmente nas categorias mais valorizadas.	2024-11-25 22:54:07.173	Bovinos	3	12	https://www.agrolink.com.br/upload/imagens-resizes/d9b0de8e3ae2489496ae0d43a05445ab_858x483.jpg	137
A qualidade do capim é essencial	Análises são fundamentais para adaptar a nutrição às necessidades dos animais	O preço do leite pago ao produtor em Mato Grosso subiu pelo sexto mês consecutivo, de acordo com o Instituto Mato-Grossense de Economia Agropecuária (Imea). Em outubro de 2024, o valor do litro do leite atingiu cerca de R$ 2,38, referente ao leite captado em setembro, o que representa um aumento de 1,71% em comparação ao mês anterior e uma valorização anual de 23,83%. Esse é o maior valor registrado desde outubro de 2022 no estado.\r\n\r\nO aumento dos preços está relacionado à menor oferta de leite no Mato Grosso, devido à redução da produção em algumas regiões, além de uma demanda crescente dos laticínios pela matéria-prima, impulsionada pelo crescimento do consumo de derivados lácteos. A muçarela industrial, por exemplo, apresentou incremento de 2,85% em relação ao mês anterior e de 27,83% comparado a agosto de 2023.\r\n\r\n\r\n\r\nCom a expectativa de chuvas nos próximos meses, o que deve favorecer a recuperação das [pastagens](https://www.agrolink.com.br/culturas/pastagens?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos), espera-se que a produção de [leite](https://www.agrolink.com.br/cotacoes/carnes/bovinos/?utm_source=agrolink-detalhe-noticia\\&utm_medium=detalhe-noticia\\&utm_campaign=links-internos) aumente, o que pode, eventualmente, reduzir os preços pagos aos produtores.	2024-11-25 22:56:51.722	Bovinos	3	12	https://www.agrolink.com.br/upload/imagens-resizes/ba9fc7142dde4c59b2d5efddd7eadfc7_858x483.jpg	140
Produção de leite no Brasil avança, mas preços sinalizam queda	Cenário político e econômico mundial segue pressionando os mercados	O cenário político e econômico mundial segue pressionando os mercados, com efeitos diretos sobre a cadeia de lácteos. A retração da demanda chinesa, associada ao estímulo à produção doméstica no país asiático, impacta significativamente o comércio global. Projeções indicam que as importações de leite pela China devem cair de 24 milhões para 20 milhões de litros equivalentes por dia entre 2023 e 2024, segundo relatório do Centro de Inteligência do Leite da Embrapa.\r\n\r\nEmbora essa desaceleração pressione o mercado internacional, o ajuste entre oferta e demanda nos principais exportadores começa a equilibrar as cotações. A recuperação das margens de rentabilidade nos países produtores deve sustentar um aumento na produção global nos próximos meses.\r\n\r\nNo Brasil, o crescimento econômico de 3,1% projetado pelo Boletim Focus para 2024 e a expansão da massa de renda continuam favorecendo o consumo de lácteos. A oferta nacional cresceu 2,4% nos últimos 12 meses encerrados em setembro, com destaque para as importações, que subiram 12,3% e agora representam 9% do mercado interno.\r\n\r\nApesar disso, o aumento da produção doméstica ainda é tímido, mesmo com termos de troca favoráveis ao produtor, os melhores dos últimos quatro anos. Problemas como altos custos de produção, dificuldade de acesso a mão de obra e a saída de produtores do setor limitam uma expansão mais robusta.\r\n\r\nNo varejo, o preço do leite, que vinha em alta nos últimos meses, começa a sinalizar queda devido à maior oferta sazonal no último trimestre e à dificuldade do mercado consumidor em absorver novos aumentos. Já há registros de redução de preços no mercado atacadista de São Paulo e no mercado Spot. Para o produtor, a rentabilidade tende a sofrer leve recuo, com custos de produção em alta pelo segundo mês consecutivo, conforme medido pelo ICPLeite/Embrapa. Ainda assim, a tendência para o último trimestre do ano é de ajustes no setor, equilibrando oferta, demanda e preços.	2024-11-26 19:46:23.968	Preços	3	12	https://www.agrolink.com.br/upload/imagens-resizes/130ee9b567ed4a33a35e6054c6ad5fe9_858x483.jpg	141
Café: Restrição na oferta sustenta preços	Essas previsões também refletem uma tendência global	De acordo com o Relatório da Hedgepoint Global Markets, as condições climáticas adversas, como seca e altas temperaturas, podem impactar negativamente o potencial produtivo da safra de café 25/26 no Brasil, especialmente no caso do café arábica. A expectativa é de uma leve retração na produção deste grão, estimada em 1,4%, enquanto o café conilon deve apresentar um aumento significativo de 12,2% em relação ao ano anterior.	2024-11-26 19:48:09.07	Tendências	3	13	https://www.agrolink.com.br/upload/imagens-resizes/94c9463d22574c0a82c25f14b32c272c_858x483.jpg	143
Potencial da carne bovina no México	A Abiec apresentou dados sobre a evolução dos embarques	A Associação Brasileira das Indústrias Exportadoras de Carne (Abiec) divulgou uma nota informando sua participação em um evento realizado na Embaixada do Brasil no México, na quinta-feira (29). A iniciativa, organizada em parceria com a Associação Brasileira de Proteína Animal (ABPA), fez parte de uma missão oficial promovida pelo Ministério da Agricultura e Pecuária (Mapa) ao país. O México, um dos mercados mais recentes abertos à carne bovina brasileira, tem registrado um crescimento expressivo nas exportações, fato destacado pela Abiec durante o encontro.\\n\\n\\n\\nSegundo a nota, a Abiec apresentou dados sobre a evolução dos embarques de carne bovina para o México, que tiveram um salto significativo entre janeiro e julho de 2024, comparado ao mesmo período de 2023. O volume exportado passou de 288 toneladas em 2023 para impressionantes 23.108 toneladas em 2024. A diretora de Relações Internacionais da Abiec, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.\\n\\n\\n\\nA associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México	2024-11-26 19:50:23	Internacional	3	12	https://www.agrolink.com.br/upload/imagens-resizes/95ab384ea6a44cb69ae5ea6001e40917_858x483.jpg	144
Frangos tipo resfriado é opção prática para refeição de brasileiros	O frango é o alimento de origem animal mais consumido no Brasil	O frango é o alimento de origem animal mais consumido no Brasil. Seu elevado valor nutricional, com baixo teor de gordura e alto nível de vitaminas, leva a população a consumi-lo cada vez mais. \\\\"Saboroso, versátil e extremamente nutritivo, o frango pode ser servido de diversas formas e faz parte de múltiplas composições culinárias, o que amplia ainda mais sua importância gastronômica em nossas vidas\\\\", comenta Mariana Nagata, diretora de marketing da Korin Alimentos. \\n\\n\\n\\nO consumo per capita de carne de frangos no Estado de São Paulo é de cerca de 45 quilos anuais. A produção supera 14,8 milhões de toneladas por ano em todo o Brasil. Além disso, as exportações atingiram 5,14 milhões de toneladas, em 2023. Com esses números, o Brasil é líder em exportação e um dos maiores produtores de frangos do mundo, de acordo com a Associação Brasileira de Proteína Animal (ABPA). \\n\\nA Korin Alimentos participa desse mercado em expansão. A empresa oferece o Frango tipo Resfriado Korin Boa Pedida - fresco e ideal para preparo rápido. Único no mercado na categoria sustentável, um importante diferencial do produto da Korin é oferecer mais praticidade na hora do preparo, já que não é necessário aguardar o processo de descongelamento para o início do cozimento. Basta retirar da embalagem e preparar. Além disso, está sempre fresco nos supermercados à disposição dos consumidores. \\n\\n\\n\\n\\\\"As pessoas ajustam seus hábitos alimentares em busca de praticidade. Dessa forma, optam por alimentos mais fáceis de preparar e de rápido cozimento\\\\", ressalta a diretora de marketing. \\\\"O frango é o prato ideal para quem não tem muito tempo a perder e quer qualidade\\\\". \\n\\nCom presença majoritária nos mercados de São Paulo e Rio de Janeiro, os Frangos Resfriados Korin Boa Pedida têm rastreabilidade e preocupação com o bem-estar animal. A criação não recebe antibióticos nem anticoccidianos. \\\\"Esse sistema faz parte do princípio da Agricultura Natural, preconizado pelo pensador japonês Mokiti Okada (1882-1955), que tem como objetivo resgatar a pureza do solo e dos alimentos e preservar a diversidade e o equilíbrio biológico, contribuindo para a elevação da qualidade da vida humana\\\\", informa Mariana. \\n\\n\\n\\nOs Frangos Resfriados Korin Boa Pedida são oferecidos nas versões com bandejas de 600 gramas e inteiro. Os cortes disponíveis são: coração, coxa com sobrecoxa sem osso, coxa, coxinha da asa, fígado, filé de coxa com sobrecoxa sem pele, filé de peito, filé sassami, meio da asa, moela, sobrecoxa, sobrecoxa sem pele, sobrecoxa sem osso e frango inteiro.	2024-11-26 19:52:17.823	Culinária	3	13	https://www.agrolink.com.br/upload/imagens-resizes/ffb6701390b3421aa1be8c8368a8b425_858x483.jpg	145
Carne de frango ganha competitividade com alta nos preços	Valorização mais suave torna a proteína avícola uma opção mais acessível	A carne de frango tem se destacado no mercado, ampliando sua competitividade em relação às carnes bovina e suína, que apresentam altas mais acentuadas. Essa valorização mais suave torna a proteína avícola uma opção mais acessível para os consumidores no início de setembro.\n\nSegundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida. Essa valorização mais suave torna a proteína avícola uma opção mais acessível para os consumidores no início de setembro.\n\nSegundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida.\n\nEssa valorização mais suave torna a proteína avícola uma opção mais acessível para os consumidores no início de setembro. Segundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida.\n\nSegundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida.	2024-11-26 19:55:04.527	Mercado	3	13	https://www.agrolink.com.br/upload/imagens-resizes/5ae27991230742b1a435da57bf753ae5_858x483.jpg	147
Milho segue lento nos principais estados	No Paraná, as tradings miram em vencimentos mais longos	O mercado do milho do estado do Rio Grande do Sul segue lento, segundo informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 73,00; Não-Me-Toque a R$ 74,00; Marau e Gaurama R$ 74;00 Arroio do Meio, Lajeado e Frederico Westphalen a R$ 75,00 e Montenegro a R$ 77,00. Vendedores a partir de R$ 80,00 no FOB interior e R$ 82,00 CIF fábricas. Negócios pontuais em Palmeira das Missões e Erechim, onde 300 toneladas foram negociadas a R$ 75,00, e 500 toneladas rodaram a R$ 75,50, respectivamente, na entrega imediata”, comenta.\r\n\r\nEm Santa Catarina, os fretes vêm aumentando devido à chegada do final de ano, mas os negócios não ocorrem. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 72,00 no interior e R$ 73,00/75,00 CIF fábricas. Negócios a R$ 75,00/76,00 no CIF meio oeste, em pelo menos 2 mil tons. Nas indicações, Chapecó a R$ 74,00; Campos Novos R$ 75,00; Rio do Sul a R$ 76,00; Videira R$ 73,00. Porto indicando R$ 67 outubro/R$ 69 novembro. Sem negócios neste retorno de feriado”, completa.\r\n\r\nNo Paraná, as tradings miram em vencimentos mais longos e praticamente não trabalham mais o dez/24. “Mercado sem negócios. No porto, indicações a R$ 68,00 nov/69,00 dez. No norte, indicações a R$ 67,00 (+1,00); Cascavel a R$ 68,00; Campos Gerais R$ 69,00; Guarapuava a R$ 70,00; Londrina R$ 71,00 (+1,00). Preços balcão no sudoeste e oeste a R$ 58,00, e norte a R$ 57,00. Produtores com pedidas a partir de R$ 77,00 no norte e oeste; e R$ 79,00 Campos Gerais. Não ouvimos sobre negócios no dia de hoje”, indica.\r\n\r\nOs negócios estão lentos também no Mato Grosso do Sul. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios em ritmo lento, com produtores iniciando pedidas a R$ 58,00 no FOB, e indicações nos portos a partir de R$ 60,00”, conclui.	2024-11-26 19:47:13.634	Mercado	3	2	https://www.agrolink.com.br/upload/imagens-resizes/df4cec1fdf0a44c3b6cc78fba2aceb13_858x483.jpg	142
\.


--
-- Data for Name: Pessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Pessoa" (pess_pessoa_id, pess_email, imagem_link, categ_pess_categ_pessoa_id) FROM stdin;
1	fornecedorax@gmail.com	https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png	1
2	padaria@gmail.com	https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png	2
3	Mercearia@gmail.com	https://www.diabetes.ie/wp-content/uploads/2021/05/logo-Placeholder.jpg	2
\.


--
-- Data for Name: PessoaFisica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PessoaFisica" (pess_pessoa_id, pepf_nome, pepf_cpf, pepf_dt_nascimento, pepf_rg) FROM stdin;
\.


--
-- Data for Name: PessoaJuridica; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PessoaJuridica" (pess_pessoa_id, psjr_razao_social, psjr_cnpj, psjr_insc_esta, psjr_nome_fant) FROM stdin;
1	Fornecedora X	55	424	Fornecedora X
2	Padaria X	41	421	Padaria
3	Mercearia	53	532	Mercearia X
\.


--
-- Data for Name: ProdutoInac; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProdutoInac" (prd_inac_id, pais, peso, valor, total_exp_val_pais) FROM stdin;
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "userId", expires, "sessionToken", "accessToken", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Telefone; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Telefone" (telefone_id, tipo, numero, pessoa_pess_pessoa_id) FROM stdin;
1		(14) 99784-4515	1
2		(14) 99842-4124	2
3		(14) 97784-5956	3
\.


--
-- Data for Name: TipoPessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TipoPessoa" (id, nome) FROM stdin;
1	Física
2	Jurídica
\.


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Usuario" (id, nome, cpf, senha, imagem_link, email, esp1, esp2, empresa_empresa_id, admin, "alterarSenha", inativado) FROM stdin;
cm7gobomq000111gxo4mh3mti	Fernanda	518.419.242-19	123456	\N	luiza@gmail.com	\N	\N	3	f	f	f
cm76ce4pf0001idjyz4blg9sa	Luiza	189.523.592-33	123456	https://i.pravatar.cc/150?u=a04258114e29026702d	teste@gmail.com	\N	\N	2	t	f	f
\.


--
-- Data for Name: Venda; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Venda" (venda_id, dt_venda, valor_venda, qtd_venda, desconto) FROM stdin;
17	2025-02-25 13:22:03.247	225	15	0
18	2025-02-25 13:22:27.237	2650	50	0
19	2025-02-25 13:22:45.622	75	5	0
20	2025-02-25 13:24:47.7	310	8	0
21	2025-02-25 19:30:56.637	15	1	0
22	2025-02-26 12:47:15.113	2120	40	0
23	2025-02-26 12:48:41.57	159	3	0
24	2025-02-26 14:47:54.302	375000	2500	0
25	2025-02-26 14:48:43.318	12000	300	0
26	2025-02-26 14:49:08.009	2250	15	0
27	2025-02-26 14:49:25.015	4000	100	0
28	2025-02-26 21:45:37.98	9075	165	0
29	2025-02-26 21:46:02.999	3575	65	0
30	2025-02-26 21:46:49.274	3000	600	0
31	2025-02-26 21:47:01.42	50	10	0
32	2025-02-26 21:58:28.746	3225	215	0
33	2025-02-26 21:58:43.341	60	4	0
34	2025-02-26 23:26:09.853	505	4	0
35	2025-02-27 01:21:12.438	300	2	0
36	2025-02-27 01:21:41.72	1500	125	0
\.


--
-- Data for Name: VendaEstoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendaEstoque" (vest_id, prc_prop, estoque_estoque_id, venda_venda_id) FROM stdin;
19	15	7	17
20	53	8	18
21	15	7	19
22	15	7	20
23	53	8	20
24	15	7	21
25	53	8	22
26	53	8	23
27	150	9	24
28	40	10	25
29	150	9	26
30	40	10	27
31	55	11	28
32	55	11	29
33	5	12	30
34	5	12	31
35	15	13	32
36	15	13	33
37	150	9	34
38	55	11	34
39	150	9	35
40	12	14	36
\.


--
-- Data for Name: VendaFormaPagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendaFormaPagamento" (venda_venda_id, forma_pagamento_form_pag_id, vfpag_id) FROM stdin;
\.


--
-- Data for Name: VendaPessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VendaPessoa" (vpes_id, venda_venda_id, pessoa_pess_pessoa_id, tipo_pessoa) FROM stdin;
16	17	1	Fornecedor
17	18	1	Fornecedor
18	19	2	Fornecedor
19	20	2	Fornecedor
20	21	3	Fornecedor
21	22	2	Fornecedor
22	23	3	Fornecedor
23	24	1	Fornecedor
24	25	1	Fornecedor
25	26	2	Fornecedor
26	27	2	Fornecedor
27	28	1	Fornecedor
28	29	3	Fornecedor
29	30	1	Fornecedor
30	31	2	Fornecedor
31	32	1	Fornecedor
32	33	2	Fornecedor
33	34	3	Fornecedor
34	35	3	Fornecedor
35	36	1	Fornecedor
\.


--
-- Data for Name: VerificationRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationRequest" (id, identifier, token, expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
d2e9927e-307d-47ac-9528-b0f731e953e2	370400fe770d235c7f54b60b5a84ecdf30a3d3311c47b2fa711a8c9b90ad6f89	2025-02-15 12:14:33.758392-03	20241013224907_add_new_fields	\N	\N	2025-02-15 12:14:33.753655-03	1
3cd0d3c0-915e-49fe-83ce-fb2c77b1e146	db741c543e70e42c16e1c4116e76873e5a9cfff2b5f6c74df8aa6ff2bfb58edb	2025-02-15 12:14:33.61767-03	20240701221837_init	\N	\N	2025-02-15 12:14:33.563876-03	1
6c053100-4f60-4fca-b225-9912141b28b5	eb7b8daec0ee36044749897ffa29c96c41df26fac64762d6285882b2cbf3c99d	2025-02-15 12:14:33.622321-03	20240701230251_add_password	\N	\N	2025-02-15 12:14:33.618848-03	1
1bbc46dc-8cb5-469b-87f0-f95d9e54775e	96c57577d2437838be2bf194e11911a41d7bcdfb6c13e8ae0ddd34b935f70f25	2025-02-15 12:14:33.845476-03	20241229121647_more_fields	\N	\N	2025-02-15 12:14:33.842947-03	1
2427d327-254f-45ee-91a0-c265c55349b4	22e856392e126865172b3f466b435f7ef3837310fb4588556e6cecbe10ce295b	2025-02-15 12:14:33.62906-03	20240704234938_	\N	\N	2025-02-15 12:14:33.623418-03	1
69b4b38f-d6a3-4fa4-83a8-ecb95b2d424a	a81d40da38e7d1df2e9bf4548a559c1acc8a8fac4e02f07de56d423b7c18cb05	2025-02-15 12:14:33.765775-03	20241014010553_reformat_fields	\N	\N	2025-02-15 12:14:33.759386-03	1
7c754210-9030-41ae-8490-e1e7887de09e	99a85b1f99c5b2bb80cdc4d634a58e2bc73f82e25f0a1f8ced4cd5cc1f9c8d14	2025-02-15 12:14:33.634483-03	20240704235206_	\N	\N	2025-02-15 12:14:33.630327-03	1
f80e4b87-74c1-4741-9c6b-a83bdba3dd61	7cac4d46e6ff65a86aa81e8fef83113e9949a03617a49692856063b92bd44b7d	2025-02-15 12:14:33.649602-03	20240712012132_add_product	\N	\N	2025-02-15 12:14:33.635449-03	1
cbd30be0-793f-41c0-aac0-feaf2311ae4c	e6baf94e21ecebd37d645a87b33324a5884bba8bcea5a08206a970c199055759	2025-02-15 12:14:33.65394-03	20240717214624_add_category_field	\N	\N	2025-02-15 12:14:33.650698-03	1
31a989e6-8fe8-49af-80f3-1a8d528402a4	697a86fa7ca73ec4bc7625c8566623ac47b4408a798b678ebffee84ae9d5b37a	2025-02-15 12:14:33.770419-03	20241025195413_add_new_field	\N	\N	2025-02-15 12:14:33.767097-03	1
3c790609-297c-4d30-ad4b-37754aa13dfc	cb3ccc2fabd06a0e52927fb243b6594c700b928cfcd5e0d59b5452152d042d45	2025-02-15 12:14:33.658655-03	20240718001228_add_status_field	\N	\N	2025-02-15 12:14:33.655285-03	1
5392e2c6-4fcf-49bf-9dcf-c91f9e313790	3d5aa360446c61fb52ca43de0273df662abcc40603bf936c284936393d218cc4	2025-02-15 12:14:33.664135-03	20240722014302_add_new_fields	\N	\N	2025-02-15 12:14:33.659781-03	1
01e2eb87-b9e1-4cb9-a5d8-475f4b934f90	80d9500dcf514a3b91646e845ca7b4778d17533cab4ff8850b869efedae3dc5a	2025-02-15 12:14:34.04706-03	20250120235226_	\N	\N	2025-02-15 12:14:34.027212-03	1
af32647f-4728-48be-902e-867593ca13d9	bf2c388f82e5d96680e959f3f4ce81f43fe06a251336a28688d97cef4a7de521	2025-02-15 12:14:33.707075-03	20240811195338_add_noticias_fields	\N	\N	2025-02-15 12:14:33.66529-03	1
4ef2089e-fc4c-4bcd-8b4d-fcc9d97674b5	4e62a10c9855354236b24698fb399eae6bcaee785b5fc03ba47537ca0dfade8f	2025-02-15 12:14:33.785081-03	20241104002752_add_new_fields	\N	\N	2025-02-15 12:14:33.771647-03	1
9a201ab7-97da-4ff3-8120-6015513f0658	7dc055dd4d25d1393a224482453c9f91cb181e72900884bbd0706cbaa75a49db	2025-02-15 12:14:33.71961-03	20240824162516_	\N	\N	2025-02-15 12:14:33.708093-03	1
0ce10119-17c9-4057-bd06-eac144407262	144bf8079efffd813c98281d1a4d53166782c56b01ec9b96c1e41f84d94f413f	2025-02-15 12:14:33.723493-03	20240824165046_change_field_name	\N	\N	2025-02-15 12:14:33.72071-03	1
a36e9410-a193-4904-a50f-ff88b5606132	0c749d64799b479a0860689e011a506400ed2e30b2abe26aa7df7a753ff70f5a	2025-02-15 12:14:33.849322-03	20241231112042_more_field	\N	\N	2025-02-15 12:14:33.846501-03	1
a0cacce6-83e2-4d8f-869b-6a7bd589be8e	e9db57569345e33e4af4359c6fff6e04c0f574e439614d2e064b4102b6a72912	2025-02-15 12:14:33.743449-03	20240915165336_novos_campos	\N	\N	2025-02-15 12:14:33.724553-03	1
079f5372-6526-414f-836f-858e9b7ecbc0	62cb5eab80f3679b9b153b5fee764d44cc6ceba36d2ae98658c2decb05485f26	2025-02-15 12:14:33.788915-03	20241104010419_rename_column	\N	\N	2025-02-15 12:14:33.785989-03	1
7f082aa6-a970-4390-95c3-3db79b7bb036	425564cb819f5c12f3190d6d9ce83598047992515a61417cede447b2dbb51433	2025-02-15 12:14:33.752474-03	20241013224613_add_commodity_type_talbe	\N	\N	2025-02-15 12:14:33.744352-03	1
9757901f-d608-4c54-a95b-d475173989b2	3a965924fbaaf0d34099fad6280e2d1cb96e9d29795109a9d98b9f6bc78488a4	2025-02-15 12:14:33.891943-03	20250118143950_	\N	\N	2025-02-15 12:14:33.888092-03	1
8369170d-4b65-46fe-a1cb-b671a97fe255	f20435b68c62655bb4c67996cbe0cba4e426d51963822c81f3a70e597a88a9a4	2025-02-15 12:14:33.822789-03	20241219001324_	\N	\N	2025-02-15 12:14:33.789845-03	1
88ab5d40-d7d3-47a6-957f-f2791fbf7773	5ebd9c49ce2718d07315af5891bea5672ff07bfac4b48655541859764e16eec5	2025-02-15 12:14:33.857048-03	20250116221808_add_new_table	\N	\N	2025-02-15 12:14:33.850175-03	1
1f191195-960a-4e02-82fc-06a15f00af75	3dda76426e29c7d295111d0efb9c207dc08f8f83236fc8e953f7b0422c1fe74d	2025-02-15 12:14:33.834184-03	20241229115904_	\N	\N	2025-02-15 12:14:33.823593-03	1
7d702f98-e7d0-40bd-96fc-caa4ca32259d	6ae5a1b0374f235c179eb9e55df73734138578e1a79d34416fc602fca8da47c9	2025-02-15 12:14:33.838467-03	20241229115956_new_fields	\N	\N	2025-02-15 12:14:33.835357-03	1
a8abcca4-d3aa-4f8c-8957-b12d48e5bb2f	176d3953c709a2a9deffbbb98ee78caf4e1ff081a355c4ff91c144b973ce936b	2025-02-15 12:14:33.842104-03	20241229120721_more_fields	\N	\N	2025-02-15 12:14:33.839506-03	1
36aee002-a979-4892-8de4-211f69f450a0	99541357c9aa68009e0fb593e6ca79099ade57a5c73f1fc51a82886a5c1c169b	2025-02-15 12:14:33.923719-03	20250118192914_	\N	\N	2025-02-15 12:14:33.919044-03	1
58c30de6-f6c8-4224-b2ae-2d4f05e7465d	a74c1680bf56eb410c9f17244b9f059ce35dc7d3568a1721713fb41eae37ccac	2025-02-15 12:14:33.867587-03	20250117203824_atualiza_tabela_de_noticias	\N	\N	2025-02-15 12:14:33.858-03	1
33cb4859-8852-4a5f-87c6-8129bfde94c7	c5b0cb369df8d256a096e6122d06784aaedfbd3fb103d471fe4adb82bfb2dd4d	2025-02-15 12:14:33.901524-03	20250118185558_	\N	\N	2025-02-15 12:14:33.892856-03	1
2913f01f-3fc5-4efa-bf36-4d75a7398fed	aa2d0ac777f0a0ae4e9522e3e5944c248408126af1c9c7c9a61c95068cbe01e7	2025-02-15 12:14:33.878023-03	20250117204751_	\N	\N	2025-02-15 12:14:33.868559-03	1
51087f52-33a1-4c5e-abff-51f7b7088452	6fa066425c2a2a459c76de803de706dcc474b6a5d718388cae4325fd900be459	2025-02-15 12:14:33.887146-03	20250117210258_	\N	\N	2025-02-15 12:14:33.878927-03	1
ae3ff00a-9533-45cf-a798-17b317a3c8a2	b877f4c63ce26bf062f880cd2bf0a3fb587a0d0bca521beab57715b1eefdf955	2025-02-15 12:14:33.912749-03	20250118185854_	\N	\N	2025-02-15 12:14:33.902764-03	1
a4e7ed54-bdf1-40ce-a3e4-c6d697f86f07	99050d8f29460c738c1ca6d07577b6bd9479f3621ee56729a95829b51afd04be	2025-02-15 12:14:34.026027-03	20250120234501_	\N	\N	2025-02-15 12:14:33.934093-03	1
7377b910-5c53-4ae3-97f4-38396e5a1078	e24627218060871946fbfa2e338df7aa0fc2bec3006d56b9ee64d6abba276dd6	2025-02-15 12:14:33.918086-03	20250118191453_	\N	\N	2025-02-15 12:14:33.913859-03	1
0a1ae41e-371c-4445-aad1-e3cb195aae04	8ff66a487d47d403723a1e9aa9f678390d8a58af272e2ff979bc1286bee32ca7	2025-02-15 12:14:33.929337-03	20250120172744_	\N	\N	2025-02-15 12:14:33.924826-03	1
20aa9349-e9a0-4836-8812-c40e5da189f5	4aaaee1c17196600e7726bc81701686141b737d18b62a85dc82527edbf37c969	2025-02-15 12:14:33.933047-03	20250120173151_	\N	\N	2025-02-15 12:14:33.930336-03	1
7ac814ea-87f2-479e-a018-6e803f42894c	5d6e1e639c68c1766ca6f08e1dd7e9e3be8ef422c00a02fe99c2d4479bf4c19c	2025-02-15 12:14:34.050529-03	20250121150430_	\N	\N	2025-02-15 12:14:34.048016-03	1
a1e44829-0275-4668-9d6b-afab388296e3	3c186babeac2509202ce7cfd86dbf2191c244ee9728b1021ca9b5eb21e26a86f	2025-02-15 12:14:34.063878-03	20250122004549_	\N	\N	2025-02-15 12:14:34.05148-03	1
d27e8141-272d-4c20-bf15-5bb685e41ea2	24abae629472045886ca8a75d6d5957468a73e216b346aaa757d6837bbfdc9a4	2025-02-15 12:14:34.06797-03	20250122015251_	\N	\N	2025-02-15 12:14:34.06495-03	1
a208dda3-e61f-437c-b155-3146c2f5103c	29cd536796a3af749a98c4f1a11bbb522033a93402a35f9e9d227f420ec408da	2025-02-15 12:14:34.074983-03	20250122025325_	\N	\N	2025-02-15 12:14:34.068981-03	1
2f953309-9e3f-41b0-b2e4-5e4fe43369b6	df8f72c279db8b2e6443499a8d56ee8ce2648abe3e583f75a21c4967b44369d7	2025-02-15 12:14:34.078936-03	20250122143314_	\N	\N	2025-02-15 12:14:34.075998-03	1
f0a41b90-00b0-4b75-973e-042810518a0d	723dedf55534e182b190ab26095f66e024088ca42e98492e7ac8c0ada765d405	2025-02-15 12:14:34.085313-03	20250122181942_	\N	\N	2025-02-15 12:14:34.079888-03	1
25db48bc-8777-46bf-b704-a6a9612e5cad	a05715f722a91bf35f8387ab9198bdc695a1f74f1b8c30471dbafca260d28907	2025-02-15 12:14:34.092016-03	20250122182807_	\N	\N	2025-02-15 12:14:34.086444-03	1
4ff98716-db2d-451f-b5a6-a1c848943f9a	eee430b0b231053338fe730befb5dcaf632559ff1f356ffa695af6ab91f5e435	2025-02-15 12:14:34.097392-03	20250122214121_	\N	\N	2025-02-15 12:14:34.093094-03	1
ef87c943-dd1e-4cda-ae36-661b6b7c78fe	4427a823cb39d0ea3390d36edf7e71a5defb825984b3a568b05395861f7bc4f9	2025-02-16 21:55:09.076517-03	20250217005509_	\N	\N	2025-02-16 21:55:09.035368-03	1
209542ae-69df-426c-b259-9d88991b08b1	716f554bf92c436034301a4234f8b1b7f16dd273d5afdb92cf65dba9e2b5c035	2025-02-15 12:14:34.109777-03	20250123003551_	\N	\N	2025-02-15 12:14:34.098371-03	1
177b3c19-bd40-4bd0-a3a6-7a058c4b859d	9e3b95b4f58948e288d15786776de436797c0497793dd7f3be7e4dfed1a24943	2025-02-15 12:14:34.135644-03	20250126001109_	\N	\N	2025-02-15 12:14:34.110847-03	1
a7eb01dd-c468-4d00-8e72-d432813d2223	46e43ece97ab4512c8a8faa53ab8b6abc3b50c9da607acc8601110c2e29e663c	2025-02-15 12:14:34.148901-03	20250126141752_	\N	\N	2025-02-15 12:14:34.136673-03	1
3d65fdad-0685-4ba1-9715-25d7eaad6848	872ab94679280e7e2ea0f061872e7a9c38dffcd766ac72042278499417ee09ec	2025-02-16 21:55:42.305101-03	20250217005542_	\N	\N	2025-02-16 21:55:42.302212-03	1
ec2dcacb-078f-4aac-a25e-2b8932d1e8d9	7b117d2d719bdbc51470166bf68b60d281d89cf7d2552d1ba44b2b5642c897cf	2025-02-15 12:14:34.176-03	20250126145429_	\N	\N	2025-02-15 12:14:34.150285-03	1
84a557e9-0b45-417b-a846-a3ad0c3a8131	980d5dd446810009f2eab7d16549e30c3e893fd6ba65c09bfadbf51f282dfd7e	2025-02-15 12:14:34.197051-03	20250127223225_	\N	\N	2025-02-15 12:14:34.176984-03	1
1290ff71-dd03-46b9-968e-1832e702f1d9	9458be684867041b6cea9914ae7ab1fcd6e6739aede159c8503a01527786a420	2025-02-15 12:14:34.201139-03	20250127224609_	\N	\N	2025-02-15 12:14:34.198256-03	1
17487a38-73fd-45de-8e0e-1fb6f6535ba3	52c9fefadd8c8c0410647eefed2a114b75b878ecdc99c49b86a6d10db93bafc1	2025-02-19 16:22:27.541067-03	20250219192227_	\N	\N	2025-02-19 16:22:27.514059-03	1
ab003744-1e30-426f-b3c5-0ca19bdf5605	75fd788c7b6bc94ec06f357e95da58a118e331946b9c2bbc3ee8da8774a5f0ac	2025-02-15 12:14:34.205058-03	20250127225436_	\N	\N	2025-02-15 12:14:34.202222-03	1
c0d7102e-f5f3-44f1-b339-c807e9ce15af	9ba264a30fa7f5f004caecbcec8c097a761a5fae49ed26831d9a1fc808c8f1ea	2025-02-15 12:14:34.209207-03	20250127225630_	\N	\N	2025-02-15 12:14:34.205997-03	1
26723a2b-e282-4493-b833-04b700e55c84	1ffbfedd68d93c29ec394f796793da755ed3591c40d9afe20a1da8eb3254968a	2025-02-15 12:14:34.225778-03	20250127225833_	\N	\N	2025-02-15 12:14:34.210125-03	1
95def286-45af-40c4-a588-c857d35636bf	201017bd6df8383931d6d00bc5e0ca578cabb528d16d9cba9fbc5e70fbc76ca0	2025-02-19 16:23:08.129325-03	20250219192308_	\N	\N	2025-02-19 16:23:08.109998-03	1
34da6c2b-93b6-4f67-a8bc-6484b0e2e359	c362d40dfaa91a130367d34dbb0a559b96f8b1a505c59bb056d422d672757fa3	2025-02-15 12:14:34.25515-03	20250127230111_	\N	\N	2025-02-15 12:14:34.227152-03	1
e2556fda-2d62-4d07-b7b2-40b0afd588d4	6ee565207d759530f489ed693dac093863adc565b561bd1a4906c9df006240e7	2025-02-15 12:14:34.263186-03	20250127230315_	\N	\N	2025-02-15 12:14:34.256071-03	1
eafa417e-0a98-4d90-bd71-71e921489b71	79c76fe820abbb90f5e975826bd06cdbd0f640c76d0fc52b95141bc8bfb145b4	2025-02-15 12:14:34.276593-03	20250127230434_	\N	\N	2025-02-15 12:14:34.264279-03	1
77283619-c090-433d-ab91-58cb5d3555cd	22a7caaa9e4c692b30edacfe12a7187b9867b54b431fb0cbb3f3bde275ee94ec	2025-02-22 18:19:35.421505-03	20250222211935_	\N	\N	2025-02-22 18:19:35.373153-03	1
84d210a5-e6f4-4208-8d1b-5aded49ee9c1	b7ffaaa8adb662fd59b4bc087f61af897fa2cbb965c946774f349ae37f4cc952	2025-02-15 12:14:34.405461-03	20250215151356_	\N	\N	2025-02-15 12:14:34.27771-03	1
5af407ce-e7e8-4664-ab22-1ea4dcecac05	dda352d9de96574f0e1905a3251b1a30e1ee05b136de095de71dc237e98ee897	2025-02-22 18:24:34.978917-03	20250222212434_	\N	\N	2025-02-22 18:24:34.949856-03	1
d876d501-eddf-447c-904f-70e01752a340	8adedb526fb4d4629bd59ce357126b73629a25796273f43a265bb76b08b62f1e	2025-02-22 19:16:57.072493-03	20250222221657_	\N	\N	2025-02-22 19:16:57.056141-03	1
ea62c194-ac7b-41f0-ad19-b584ea1d31be	363a0dcbda9d540a42e4fdfac43d3dadddc0fa4be04f535b0cfb9f31f860041b	2025-02-27 09:19:58.731904-03	20250227121958_	\N	\N	2025-02-27 09:19:58.604475-03	1
\.


--
-- Name: CategoriaPessoa_categ_pessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoriaPessoa_categ_pessoa_id_seq"', 2, true);


--
-- Name: Cultura_id_cultura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cultura_id_cultura_seq"', 5, true);


--
-- Name: Empresa_empresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Empresa_empresa_id_seq"', 3, true);


--
-- Name: Endereco_endereco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Endereco_endereco_id_seq"', 3, true);


--
-- Name: Estoque_estoque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Estoque_estoque_id_seq"', 14, true);


--
-- Name: HistoricoEstoque_hist_estq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HistoricoEstoque_hist_estq_id_seq"', 42, true);


--
-- Name: Noticia_notId_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Noticia_notId_seq"', 1, false);


--
-- Name: PessoaFisica_pess_pessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PessoaFisica_pess_pessoa_id_seq"', 1, false);


--
-- Name: PessoaJuridica_pess_pessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PessoaJuridica_pess_pessoa_id_seq"', 1, false);


--
-- Name: Pessoa_pess_pessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Pessoa_pess_pessoa_id_seq"', 3, true);


--
-- Name: Telefone_telefone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Telefone_telefone_id_seq"', 3, true);


--
-- Name: TipoPessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoPessoa_id_seq"', 3, true);


--
-- Name: VendaFormaPagamento_vfpag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VendaFormaPagamento_vfpag_id_seq"', 2, true);


--
-- Name: Venda_venda_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Venda_venda_id_seq"', 36, true);


--
-- Name: vendaestoque_vest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendaestoque_vest_id_seq', 40, true);


--
-- Name: vendapessoa_vpes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vendapessoa_vpes_id_seq', 35, true);


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: Autor Autor_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Autor"
    ADD CONSTRAINT "Autor_pkey" PRIMARY KEY (autor_id);


--
-- Name: CategoriaPessoa CategoriaPessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoriaPessoa"
    ADD CONSTRAINT "CategoriaPessoa_pkey" PRIMARY KEY (categ_pessoa_id);


--
-- Name: ComercioInternacionalNoticia ComercioInternacionalNoticia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacionalNoticia"
    ADD CONSTRAINT "ComercioInternacionalNoticia_pkey" PRIMARY KEY (cint_id);


--
-- Name: ComercioInternacionalProduto ComercioInternacionalProduto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacionalProduto"
    ADD CONSTRAINT "ComercioInternacionalProduto_pkey" PRIMARY KEY (cipi_id);


--
-- Name: ComercioInternacional ComercioInternacional_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacional"
    ADD CONSTRAINT "ComercioInternacional_pkey" PRIMARY KEY (com_int_id);


--
-- Name: Cultura Cultura_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cultura"
    ADD CONSTRAINT "Cultura_pkey" PRIMARY KEY (id_cultura);


--
-- Name: Empresa Empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Empresa"
    ADD CONSTRAINT "Empresa_pkey" PRIMARY KEY (empresa_id);


--
-- Name: Endereco Endereco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Endereco"
    ADD CONSTRAINT "Endereco_pkey" PRIMARY KEY (endereco_id);


--
-- Name: Estoque Estoque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Estoque"
    ADD CONSTRAINT "Estoque_pkey" PRIMARY KEY (estoque_id);


--
-- Name: FormaPagamento FormaPagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."FormaPagamento"
    ADD CONSTRAINT "FormaPagamento_pkey" PRIMARY KEY (form_pag_id);


--
-- Name: HistoricoEstoque HistoricoEstoque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoEstoque"
    ADD CONSTRAINT "HistoricoEstoque_pkey" PRIMARY KEY (hist_estq_id);


--
-- Name: HistoricoValores HistoricoValores_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoValores"
    ADD CONSTRAINT "HistoricoValores_pkey" PRIMARY KEY (hist_valores_id);


--
-- Name: Imagem Imagem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Imagem"
    ADD CONSTRAINT "Imagem_pkey" PRIMARY KEY (imagem_id);


--
-- Name: Mensagem Mensagem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Mensagem"
    ADD CONSTRAINT "Mensagem_pkey" PRIMARY KEY (mensagem_id);


--
-- Name: Moeda Moeda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Moeda"
    ADD CONSTRAINT "Moeda_pkey" PRIMARY KEY (sigla);


--
-- Name: Noticia Noticia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_pkey" PRIMARY KEY ("notId");


--
-- Name: PessoaFisica PessoaFisica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PessoaFisica"
    ADD CONSTRAINT "PessoaFisica_pkey" PRIMARY KEY (pess_pessoa_id);


--
-- Name: PessoaJuridica PessoaJuridica_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PessoaJuridica"
    ADD CONSTRAINT "PessoaJuridica_pkey" PRIMARY KEY (pess_pessoa_id);


--
-- Name: Pessoa Pessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pessoa"
    ADD CONSTRAINT "Pessoa_pkey" PRIMARY KEY (pess_pessoa_id);


--
-- Name: ProdutoInac ProdutoInac_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProdutoInac"
    ADD CONSTRAINT "ProdutoInac_pkey" PRIMARY KEY (prd_inac_id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Telefone Telefone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Telefone"
    ADD CONSTRAINT "Telefone_pkey" PRIMARY KEY (telefone_id);


--
-- Name: TipoPessoa TipoPessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TipoPessoa"
    ADD CONSTRAINT "TipoPessoa_pkey" PRIMARY KEY (id);


--
-- Name: Usuario Usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_pkey" PRIMARY KEY (id);


--
-- Name: VendaEstoque VendaEstoque_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaEstoque"
    ADD CONSTRAINT "VendaEstoque_pkey" PRIMARY KEY (vest_id);


--
-- Name: VendaFormaPagamento VendaFormaPagamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaFormaPagamento"
    ADD CONSTRAINT "VendaFormaPagamento_pkey" PRIMARY KEY (vfpag_id);


--
-- Name: VendaPessoa VendaPessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaPessoa"
    ADD CONSTRAINT "VendaPessoa_pkey" PRIMARY KEY (vpes_id);


--
-- Name: Venda Venda_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Venda"
    ADD CONSTRAINT "Venda_pkey" PRIMARY KEY (venda_id);


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
-- Name: ComercioInternacionalNoticia_com_int_com_int_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ComercioInternacionalNoticia_com_int_com_int_id_key" ON public."ComercioInternacionalNoticia" USING btree (com_int_com_int_id);


--
-- Name: ComercioInternacionalProduto_com_int_com_int_id_prd_inac_pr_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ComercioInternacionalProduto_com_int_com_int_id_prd_inac_pr_key" ON public."ComercioInternacionalProduto" USING btree (com_int_com_int_id, prd_inac_prd_inac_id);


--
-- Name: Session_accessToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_accessToken_key" ON public."Session" USING btree ("accessToken");


--
-- Name: Session_sessionToken_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Session_sessionToken_key" ON public."Session" USING btree ("sessionToken");


--
-- Name: VendaEstoque_venda_venda_id_estoque_estoque_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VendaEstoque_venda_venda_id_estoque_estoque_id_key" ON public."VendaEstoque" USING btree (venda_venda_id, estoque_estoque_id);


--
-- Name: VendaFormaPagamento_forma_pagamento_form_pag_id_venda_venda_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VendaFormaPagamento_forma_pagamento_form_pag_id_venda_venda_key" ON public."VendaFormaPagamento" USING btree (forma_pagamento_form_pag_id, venda_venda_id);


--
-- Name: VendaPessoa_venda_venda_id_pessoa_pess_pessoa_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VendaPessoa_venda_venda_id_pessoa_pess_pessoa_id_key" ON public."VendaPessoa" USING btree (venda_venda_id, pessoa_pess_pessoa_id);


--
-- Name: VerificationRequest_identifier_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationRequest_identifier_token_key" ON public."VerificationRequest" USING btree (identifier, token);


--
-- Name: VerificationRequest_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationRequest_token_key" ON public."VerificationRequest" USING btree (token);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ComercioInternacionalNoticia ComercioInternacionalNoticia_com_int_com_int_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacionalNoticia"
    ADD CONSTRAINT "ComercioInternacionalNoticia_com_int_com_int_id_fkey" FOREIGN KEY (com_int_com_int_id) REFERENCES public."ComercioInternacional"(com_int_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ComercioInternacionalNoticia ComercioInternacionalNoticia_not_not_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacionalNoticia"
    ADD CONSTRAINT "ComercioInternacionalNoticia_not_not_id_fkey" FOREIGN KEY (not_not_id) REFERENCES public."Noticia"("notId") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ComercioInternacionalProduto ComercioInternacionalProduto_com_int_com_int_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacionalProduto"
    ADD CONSTRAINT "ComercioInternacionalProduto_com_int_com_int_id_fkey" FOREIGN KEY (com_int_com_int_id) REFERENCES public."ComercioInternacional"(com_int_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ComercioInternacionalProduto ComercioInternacionalProduto_prd_inac_prd_inac_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioInternacionalProduto"
    ADD CONSTRAINT "ComercioInternacionalProduto_prd_inac_prd_inac_id_fkey" FOREIGN KEY (prd_inac_prd_inac_id) REFERENCES public."ProdutoInac"(prd_inac_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Endereco Endereco_pessoa_pess_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Endereco"
    ADD CONSTRAINT "Endereco_pessoa_pess_pessoa_id_fkey" FOREIGN KEY (pessoa_pess_pessoa_id) REFERENCES public."Pessoa"(pess_pessoa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Estoque Estoque_categoriaculturaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Estoque"
    ADD CONSTRAINT "Estoque_categoriaculturaId_fkey" FOREIGN KEY ("categoriaculturaId") REFERENCES public."Cultura"(id_cultura) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: HistoricoEstoque HistoricoEstoque_estoque_estoque_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoEstoque"
    ADD CONSTRAINT "HistoricoEstoque_estoque_estoque_id_fkey" FOREIGN KEY (estoque_estoque_id) REFERENCES public."Estoque"(estoque_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: HistoricoEstoque HistoricoEstoque_usuario_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoEstoque"
    ADD CONSTRAINT "HistoricoEstoque_usuario_usuario_id_fkey" FOREIGN KEY (usuario_usuario_id) REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: HistoricoEstoque HistoricoEstoque_venda_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoEstoque"
    ADD CONSTRAINT "HistoricoEstoque_venda_venda_id_fkey" FOREIGN KEY (venda_venda_id) REFERENCES public."Venda"(venda_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: HistoricoValores HistoricoValores_com_int_com_int_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."HistoricoValores"
    ADD CONSTRAINT "HistoricoValores_com_int_com_int_id_fkey" FOREIGN KEY (com_int_com_int_id) REFERENCES public."ComercioInternacional"(com_int_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Noticia Noticia_id_autor_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_id_autor_fkey" FOREIGN KEY (id_autor) REFERENCES public."Autor"(autor_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Noticia Noticia_id_cultura_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Noticia"
    ADD CONSTRAINT "Noticia_id_cultura_fkey" FOREIGN KEY (id_cultura) REFERENCES public."Cultura"(id_cultura) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PessoaFisica PessoaFisica_pess_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PessoaFisica"
    ADD CONSTRAINT "PessoaFisica_pess_pessoa_id_fkey" FOREIGN KEY (pess_pessoa_id) REFERENCES public."Pessoa"(pess_pessoa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PessoaJuridica PessoaJuridica_pess_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PessoaJuridica"
    ADD CONSTRAINT "PessoaJuridica_pess_pessoa_id_fkey" FOREIGN KEY (pess_pessoa_id) REFERENCES public."Pessoa"(pess_pessoa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Pessoa Pessoa_categ_pess_categ_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Pessoa"
    ADD CONSTRAINT "Pessoa_categ_pess_categ_pessoa_id_fkey" FOREIGN KEY (categ_pess_categ_pessoa_id) REFERENCES public."CategoriaPessoa"(categ_pessoa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."Usuario"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Telefone Telefone_pessoa_pess_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Telefone"
    ADD CONSTRAINT "Telefone_pessoa_pess_pessoa_id_fkey" FOREIGN KEY (pessoa_pess_pessoa_id) REFERENCES public."Pessoa"(pess_pessoa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Usuario Usuario_empresa_empresa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Usuario"
    ADD CONSTRAINT "Usuario_empresa_empresa_id_fkey" FOREIGN KEY (empresa_empresa_id) REFERENCES public."Empresa"(empresa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VendaEstoque VendaEstoque_estoque_estoque_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaEstoque"
    ADD CONSTRAINT "VendaEstoque_estoque_estoque_id_fkey" FOREIGN KEY (estoque_estoque_id) REFERENCES public."Estoque"(estoque_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VendaEstoque VendaEstoque_venda_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaEstoque"
    ADD CONSTRAINT "VendaEstoque_venda_venda_id_fkey" FOREIGN KEY (venda_venda_id) REFERENCES public."Venda"(venda_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VendaFormaPagamento VendaFormaPagamento_forma_pagamento_form_pag_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaFormaPagamento"
    ADD CONSTRAINT "VendaFormaPagamento_forma_pagamento_form_pag_id_fkey" FOREIGN KEY (forma_pagamento_form_pag_id) REFERENCES public."FormaPagamento"(form_pag_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VendaFormaPagamento VendaFormaPagamento_venda_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaFormaPagamento"
    ADD CONSTRAINT "VendaFormaPagamento_venda_venda_id_fkey" FOREIGN KEY (venda_venda_id) REFERENCES public."Venda"(venda_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VendaPessoa VendaPessoa_pessoa_pess_pessoa_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaPessoa"
    ADD CONSTRAINT "VendaPessoa_pessoa_pess_pessoa_id_fkey" FOREIGN KEY (pessoa_pess_pessoa_id) REFERENCES public."Pessoa"(pess_pessoa_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VendaPessoa VendaPessoa_venda_venda_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaPessoa"
    ADD CONSTRAINT "VendaPessoa_venda_venda_id_fkey" FOREIGN KEY (venda_venda_id) REFERENCES public."Venda"(venda_id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

