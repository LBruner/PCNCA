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

ALTER TABLE ONLY public."VendaPessoa" DROP CONSTRAINT "VendaPessoa_venda_venda_id_fkey";
ALTER TABLE ONLY public."VendaPessoa" DROP CONSTRAINT "VendaPessoa_pessoa_pess_pessoa_id_fkey";
ALTER TABLE ONLY public."VendaFormaPagamento" DROP CONSTRAINT "VendaFormaPagamento_venda_venda_id_fkey";
ALTER TABLE ONLY public."VendaFormaPagamento" DROP CONSTRAINT "VendaFormaPagamento_forma_pagamento_form_pag_id_fkey";
ALTER TABLE ONLY public."VendaEstoque" DROP CONSTRAINT "VendaEstoque_venda_venda_id_fkey";
ALTER TABLE ONLY public."VendaEstoque" DROP CONSTRAINT "VendaEstoque_estoque_estoque_id_fkey";
ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_empresa_empresa_id_fkey";
ALTER TABLE ONLY public."Telefone" DROP CONSTRAINT "Telefone_pessoa_pess_pessoa_id_fkey";
ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_userId_fkey";
ALTER TABLE ONLY public."Pessoa" DROP CONSTRAINT "Pessoa_categ_pess_categ_pessoa_id_fkey";
ALTER TABLE ONLY public."PessoaJuridica" DROP CONSTRAINT "PessoaJuridica_pess_pessoa_id_fkey";
ALTER TABLE ONLY public."PessoaFisica" DROP CONSTRAINT "PessoaFisica_pess_pessoa_id_fkey";
ALTER TABLE ONLY public."Noticia" DROP CONSTRAINT "Noticia_id_cultura_fkey";
ALTER TABLE ONLY public."Noticia" DROP CONSTRAINT "Noticia_id_autor_fkey";
ALTER TABLE ONLY public."HistoricoValores" DROP CONSTRAINT "HistoricoValores_com_int_com_int_id_fkey";
ALTER TABLE ONLY public."HistoricoEstoque" DROP CONSTRAINT "HistoricoEstoque_venda_venda_id_fkey";
ALTER TABLE ONLY public."HistoricoEstoque" DROP CONSTRAINT "HistoricoEstoque_usuario_usuario_id_fkey";
ALTER TABLE ONLY public."HistoricoEstoque" DROP CONSTRAINT "HistoricoEstoque_estoque_estoque_id_fkey";
ALTER TABLE ONLY public."Estoque" DROP CONSTRAINT "Estoque_categoriaculturaId_fkey";
ALTER TABLE ONLY public."Endereco" DROP CONSTRAINT "Endereco_pessoa_pess_pessoa_id_fkey";
ALTER TABLE ONLY public."ComercioInternacionalProduto" DROP CONSTRAINT "ComercioInternacionalProduto_prd_inac_prd_inac_id_fkey";
ALTER TABLE ONLY public."ComercioInternacionalProduto" DROP CONSTRAINT "ComercioInternacionalProduto_com_int_com_int_id_fkey";
ALTER TABLE ONLY public."ComercioInternacionalNoticia" DROP CONSTRAINT "ComercioInternacionalNoticia_not_not_id_fkey";
ALTER TABLE ONLY public."ComercioInternacionalNoticia" DROP CONSTRAINT "ComercioInternacionalNoticia_com_int_com_int_id_fkey";
ALTER TABLE ONLY public."ComercioCommoditiesVariacaoPreco" DROP CONSTRAINT "ComercioCommoditiesVariacaoPreco_commodity_id_fkey";
ALTER TABLE ONLY public."ComercioCommoditiesCotacoes" DROP CONSTRAINT "ComercioCommoditiesCotacoes_commodity_id_fkey";
ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_userId_fkey";
DROP INDEX public."VerificationRequest_token_key";
DROP INDEX public."VerificationRequest_identifier_token_key";
DROP INDEX public."VendaPessoa_venda_venda_id_pessoa_pess_pessoa_id_key";
DROP INDEX public."VendaFormaPagamento_forma_pagamento_form_pag_id_venda_venda_key";
DROP INDEX public."VendaEstoque_venda_venda_id_estoque_estoque_id_key";
DROP INDEX public."Session_sessionToken_key";
DROP INDEX public."Session_accessToken_key";
DROP INDEX public."ComercioInternacionalProduto_com_int_com_int_id_prd_inac_pr_key";
DROP INDEX public."ComercioInternacionalNoticia_com_int_com_int_id_key";
DROP INDEX public."Account_providerId_providerAccountId_key";
ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
ALTER TABLE ONLY public."VerificationRequest" DROP CONSTRAINT "VerificationRequest_pkey";
ALTER TABLE ONLY public."Venda" DROP CONSTRAINT "Venda_pkey";
ALTER TABLE ONLY public."VendaPessoa" DROP CONSTRAINT "VendaPessoa_pkey";
ALTER TABLE ONLY public."VendaFormaPagamento" DROP CONSTRAINT "VendaFormaPagamento_pkey";
ALTER TABLE ONLY public."VendaEstoque" DROP CONSTRAINT "VendaEstoque_pkey";
ALTER TABLE ONLY public."Usuario" DROP CONSTRAINT "Usuario_pkey";
ALTER TABLE ONLY public."TipoPessoa" DROP CONSTRAINT "TipoPessoa_pkey";
ALTER TABLE ONLY public."Telefone" DROP CONSTRAINT "Telefone_pkey";
ALTER TABLE ONLY public."Session" DROP CONSTRAINT "Session_pkey";
ALTER TABLE ONLY public."ProdutoInac" DROP CONSTRAINT "ProdutoInac_pkey";
ALTER TABLE ONLY public."Pessoa" DROP CONSTRAINT "Pessoa_pkey";
ALTER TABLE ONLY public."PessoaJuridica" DROP CONSTRAINT "PessoaJuridica_pkey";
ALTER TABLE ONLY public."PessoaFisica" DROP CONSTRAINT "PessoaFisica_pkey";
ALTER TABLE ONLY public."Noticia" DROP CONSTRAINT "Noticia_pkey";
ALTER TABLE ONLY public."Moeda" DROP CONSTRAINT "Moeda_pkey";
ALTER TABLE ONLY public."Mensagem" DROP CONSTRAINT "Mensagem_pkey";
ALTER TABLE ONLY public."Imagem" DROP CONSTRAINT "Imagem_pkey";
ALTER TABLE ONLY public."HistoricoValores" DROP CONSTRAINT "HistoricoValores_pkey";
ALTER TABLE ONLY public."HistoricoEstoque" DROP CONSTRAINT "HistoricoEstoque_pkey";
ALTER TABLE ONLY public."FormaPagamento" DROP CONSTRAINT "FormaPagamento_pkey";
ALTER TABLE ONLY public."Estoque" DROP CONSTRAINT "Estoque_pkey";
ALTER TABLE ONLY public."Endereco" DROP CONSTRAINT "Endereco_pkey";
ALTER TABLE ONLY public."Empresa" DROP CONSTRAINT "Empresa_pkey";
ALTER TABLE ONLY public."Cultura" DROP CONSTRAINT "Cultura_pkey";
ALTER TABLE ONLY public."ComercioInternacional" DROP CONSTRAINT "ComercioInternacional_pkey";
ALTER TABLE ONLY public."ComercioInternacionalProduto" DROP CONSTRAINT "ComercioInternacionalProduto_pkey";
ALTER TABLE ONLY public."ComercioInternacionalNoticia" DROP CONSTRAINT "ComercioInternacionalNoticia_pkey";
ALTER TABLE ONLY public."ComercioCommodities" DROP CONSTRAINT "ComercioCommodities_pkey";
ALTER TABLE ONLY public."ComercioCommoditiesVariacaoPreco" DROP CONSTRAINT "ComercioCommoditiesVariacaoPreco_pkey";
ALTER TABLE ONLY public."ComercioCommoditiesCotacoes" DROP CONSTRAINT "ComercioCommoditiesCotacoes_pkey";
ALTER TABLE ONLY public."CategoriaPessoa" DROP CONSTRAINT "CategoriaPessoa_pkey";
ALTER TABLE ONLY public."Autor" DROP CONSTRAINT "Autor_pkey";
ALTER TABLE ONLY public."Account" DROP CONSTRAINT "Account_pkey";
ALTER TABLE public."VendaPessoa" ALTER COLUMN vpes_id DROP DEFAULT;
ALTER TABLE public."VendaFormaPagamento" ALTER COLUMN vfpag_id DROP DEFAULT;
ALTER TABLE public."VendaEstoque" ALTER COLUMN vest_id DROP DEFAULT;
ALTER TABLE public."Venda" ALTER COLUMN venda_id DROP DEFAULT;
ALTER TABLE public."TipoPessoa" ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public."Telefone" ALTER COLUMN telefone_id DROP DEFAULT;
ALTER TABLE public."PessoaJuridica" ALTER COLUMN pess_pessoa_id DROP DEFAULT;
ALTER TABLE public."PessoaFisica" ALTER COLUMN pess_pessoa_id DROP DEFAULT;
ALTER TABLE public."Pessoa" ALTER COLUMN pess_pessoa_id DROP DEFAULT;
ALTER TABLE public."Noticia" ALTER COLUMN "notId" DROP DEFAULT;
ALTER TABLE public."HistoricoEstoque" ALTER COLUMN hist_estq_id DROP DEFAULT;
ALTER TABLE public."Estoque" ALTER COLUMN estoque_id DROP DEFAULT;
ALTER TABLE public."Endereco" ALTER COLUMN endereco_id DROP DEFAULT;
ALTER TABLE public."Empresa" ALTER COLUMN empresa_id DROP DEFAULT;
ALTER TABLE public."Cultura" ALTER COLUMN id_cultura DROP DEFAULT;
ALTER TABLE public."ComercioCommoditiesVariacaoPreco" ALTER COLUMN variacao_id DROP DEFAULT;
ALTER TABLE public."ComercioCommoditiesCotacoes" ALTER COLUMN cotacao_id DROP DEFAULT;
ALTER TABLE public."ComercioCommodities" ALTER COLUMN commodity_id DROP DEFAULT;
ALTER TABLE public."CategoriaPessoa" ALTER COLUMN categ_pessoa_id DROP DEFAULT;
DROP TABLE public._prisma_migrations;
DROP TABLE public."VerificationRequest";
DROP SEQUENCE public."Venda_venda_id_seq";
DROP SEQUENCE public."VendaPessoa_vpes_id_seq";
DROP TABLE public."VendaPessoa";
DROP SEQUENCE public."VendaFormaPagamento_vfpag_id_seq";
DROP TABLE public."VendaFormaPagamento";
DROP SEQUENCE public."VendaEstoque_vest_id_seq";
DROP TABLE public."VendaEstoque";
DROP TABLE public."Venda";
DROP TABLE public."Usuario";
DROP SEQUENCE public."TipoPessoa_id_seq";
DROP TABLE public."TipoPessoa";
DROP SEQUENCE public."Telefone_telefone_id_seq";
DROP TABLE public."Telefone";
DROP TABLE public."Session";
DROP TABLE public."ProdutoInac";
DROP SEQUENCE public."Pessoa_pess_pessoa_id_seq";
DROP SEQUENCE public."PessoaJuridica_pess_pessoa_id_seq";
DROP TABLE public."PessoaJuridica";
DROP SEQUENCE public."PessoaFisica_pess_pessoa_id_seq";
DROP TABLE public."PessoaFisica";
DROP TABLE public."Pessoa";
DROP SEQUENCE public."Noticia_notId_seq";
DROP TABLE public."Noticia";
DROP TABLE public."Moeda";
DROP TABLE public."Mensagem";
DROP TABLE public."Imagem";
DROP TABLE public."HistoricoValores";
DROP SEQUENCE public."HistoricoEstoque_hist_estq_id_seq";
DROP TABLE public."HistoricoEstoque";
DROP TABLE public."FormaPagamento";
DROP SEQUENCE public."Estoque_estoque_id_seq";
DROP TABLE public."Estoque";
DROP SEQUENCE public."Endereco_endereco_id_seq";
DROP TABLE public."Endereco";
DROP SEQUENCE public."Empresa_empresa_id_seq";
DROP TABLE public."Empresa";
DROP SEQUENCE public."Cultura_id_cultura_seq";
DROP TABLE public."Cultura";
DROP TABLE public."ComercioInternacionalProduto";
DROP TABLE public."ComercioInternacionalNoticia";
DROP TABLE public."ComercioInternacional";
DROP SEQUENCE public."ComercioCommodities_commodity_id_seq";
DROP SEQUENCE public."ComercioCommoditiesVariacaoPreco_variacao_id_seq";
DROP TABLE public."ComercioCommoditiesVariacaoPreco";
DROP SEQUENCE public."ComercioCommoditiesCotacoes_cotacao_id_seq";
DROP TABLE public."ComercioCommoditiesCotacoes";
DROP TABLE public."ComercioCommodities";
DROP SEQUENCE public."CategoriaPessoa_categ_pessoa_id_seq";
DROP TABLE public."CategoriaPessoa";
DROP TABLE public."Autor";
DROP TABLE public."Account";
-- *not* dropping schema, since initdb creates it
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
-- Name: ComercioCommodities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioCommodities" (
    commodity_id integer NOT NULL,
    nome text NOT NULL,
    descricao text,
    categoria_id integer NOT NULL
);


ALTER TABLE public."ComercioCommodities" OWNER TO postgres;

--
-- Name: ComercioCommoditiesCotacoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioCommoditiesCotacoes" (
    cotacao_id integer NOT NULL,
    commodity_id integer NOT NULL,
    valor double precision NOT NULL,
    dt_valor timestamp(3) without time zone NOT NULL,
    fonte text
);


ALTER TABLE public."ComercioCommoditiesCotacoes" OWNER TO postgres;

--
-- Name: ComercioCommoditiesCotacoes_cotacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ComercioCommoditiesCotacoes_cotacao_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComercioCommoditiesCotacoes_cotacao_id_seq" OWNER TO postgres;

--
-- Name: ComercioCommoditiesCotacoes_cotacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ComercioCommoditiesCotacoes_cotacao_id_seq" OWNED BY public."ComercioCommoditiesCotacoes".cotacao_id;


--
-- Name: ComercioCommoditiesVariacaoPreco; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioCommoditiesVariacaoPreco" (
    variacao_id integer NOT NULL,
    commodity_id integer NOT NULL,
    dt_inicio timestamp(3) without time zone NOT NULL,
    dt_fim timestamp(3) without time zone NOT NULL,
    variacao double precision NOT NULL
);


ALTER TABLE public."ComercioCommoditiesVariacaoPreco" OWNER TO postgres;

--
-- Name: ComercioCommoditiesVariacaoPreco_variacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ComercioCommoditiesVariacaoPreco_variacao_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComercioCommoditiesVariacaoPreco_variacao_id_seq" OWNER TO postgres;

--
-- Name: ComercioCommoditiesVariacaoPreco_variacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ComercioCommoditiesVariacaoPreco_variacao_id_seq" OWNED BY public."ComercioCommoditiesVariacaoPreco".variacao_id;


--
-- Name: ComercioCommodities_commodity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ComercioCommodities_commodity_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ComercioCommodities_commodity_id_seq" OWNER TO postgres;

--
-- Name: ComercioCommodities_commodity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ComercioCommodities_commodity_id_seq" OWNED BY public."ComercioCommodities".commodity_id;


--
-- Name: ComercioInternacional; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ComercioInternacional" (
    com_int_id integer NOT NULL,
    nome character varying(50),
    valor double precision,
    dt_valor timestamp(3) without time zone,
    categoria character varying(1),
    "descrição" character varying(300)
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
    comprador boolean DEFAULT false NOT NULL,
    estoque_estoque_id integer NOT NULL,
    venda_venda_id integer NOT NULL,
    usuario_usuario_id text NOT NULL
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
    "notId" integer NOT NULL,
    titulo character varying(200) NOT NULL,
    subtitulo character varying(1000) NOT NULL,
    corpo text NOT NULL,
    data_publicacao timestamp(3) without time zone NOT NULL,
    descricao character varying(1000),
    id_autor integer NOT NULL,
    id_cultura integer NOT NULL,
    imagem_link character varying(300) NOT NULL
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
    admin boolean DEFAULT false NOT NULL,
    "alterarSenha" boolean DEFAULT false NOT NULL,
    imagem_link character varying(300),
    inativado boolean DEFAULT false NOT NULL,
    email character varying(300),
    esp1 character varying(20),
    esp2 character varying(20),
    empresa_empresa_id integer NOT NULL
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
-- Name: VendaEstoque_vest_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VendaEstoque_vest_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VendaEstoque_vest_id_seq" OWNER TO postgres;

--
-- Name: VendaEstoque_vest_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VendaEstoque_vest_id_seq" OWNED BY public."VendaEstoque".vest_id;


--
-- Name: VendaFormaPagamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VendaFormaPagamento" (
    vfpag_id integer NOT NULL,
    venda_venda_id integer NOT NULL,
    forma_pagamento_form_pag_id integer NOT NULL
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
-- Name: VendaPessoa_vpes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VendaPessoa_vpes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VendaPessoa_vpes_id_seq" OWNER TO postgres;

--
-- Name: VendaPessoa_vpes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VendaPessoa_vpes_id_seq" OWNED BY public."VendaPessoa".vpes_id;


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
-- Name: CategoriaPessoa categ_pessoa_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CategoriaPessoa" ALTER COLUMN categ_pessoa_id SET DEFAULT nextval('public."CategoriaPessoa_categ_pessoa_id_seq"'::regclass);


--
-- Name: ComercioCommodities commodity_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommodities" ALTER COLUMN commodity_id SET DEFAULT nextval('public."ComercioCommodities_commodity_id_seq"'::regclass);


--
-- Name: ComercioCommoditiesCotacoes cotacao_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommoditiesCotacoes" ALTER COLUMN cotacao_id SET DEFAULT nextval('public."ComercioCommoditiesCotacoes_cotacao_id_seq"'::regclass);


--
-- Name: ComercioCommoditiesVariacaoPreco variacao_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommoditiesVariacaoPreco" ALTER COLUMN variacao_id SET DEFAULT nextval('public."ComercioCommoditiesVariacaoPreco_variacao_id_seq"'::regclass);


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

ALTER TABLE ONLY public."VendaEstoque" ALTER COLUMN vest_id SET DEFAULT nextval('public."VendaEstoque_vest_id_seq"'::regclass);


--
-- Name: VendaFormaPagamento vfpag_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaFormaPagamento" ALTER COLUMN vfpag_id SET DEFAULT nextval('public."VendaFormaPagamento_vfpag_id_seq"'::regclass);


--
-- Name: VendaPessoa vpes_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VendaPessoa" ALTER COLUMN vpes_id SET DEFAULT nextval('public."VendaPessoa_vpes_id_seq"'::regclass);


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Autor; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Autor" VALUES (2, 'Mariana Dias');
INSERT INTO public."Autor" VALUES (3, 'Pedro Alves');
INSERT INTO public."Autor" VALUES (4, 'João Silva');
INSERT INTO public."Autor" VALUES (5, 'Ana Pereira');
INSERT INTO public."Autor" VALUES (6, 'Carlos Mendes');
INSERT INTO public."Autor" VALUES (7, 'Maria Souza');
INSERT INTO public."Autor" VALUES (8, 'Fernanda Oliveira');
INSERT INTO public."Autor" VALUES (9, 'Lucas Rocha');
INSERT INTO public."Autor" VALUES (10, 'Ricardo Lima');
INSERT INTO public."Autor" VALUES (11, 'Beatriz Moreira');


--
-- Data for Name: CategoriaPessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."CategoriaPessoa" VALUES (1, 421, 'Fornecedor');
INSERT INTO public."CategoriaPessoa" VALUES (2, 5654, 'Cliente');


--
-- Data for Name: ComercioCommodities; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ComercioCommoditiesCotacoes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ComercioCommoditiesVariacaoPreco; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ComercioInternacional; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ComercioInternacionalNoticia; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ComercioInternacionalProduto; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Cultura; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Cultura" VALUES (6, 'Café', 'O café é uma das culturas mais populares e economicamente significativas no mundo', '/images/cafe.jpg');
INSERT INTO public."Cultura" VALUES (12, 'Bovinos', 'A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais', '/images/bovinos.jpg');
INSERT INTO public."Cultura" VALUES (13, 'Aves', 'A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais', '/images/aves.jpg');
INSERT INTO public."Cultura" VALUES (7, 'Cana-de-açúcar', 'A cana-de-açúcar é uma das principais culturas para a produção de açúcar e etanol. Cultivada principalmente em regiões tropicais e subtropicais', '/images/cana.jpg');
INSERT INTO public."Cultura" VALUES (3, 'Soja', 'A soja é uma cultura leguminosa altamente valorizada', '/images/graos.jpg');
INSERT INTO public."Cultura" VALUES (2, 'Milho', 'O milho é uma das principais culturas de grãos do mundo', '/images/corn.jpg');
INSERT INTO public."Cultura" VALUES (5, 'Pecuária ', 'Todas outras categorias da pecuária', '/images/pecuaria.jpg');
INSERT INTO public."Cultura" VALUES (1, 'Agrícola', 'Todos os outros', '/images/agricola.jpg');


--
-- Data for Name: Empresa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Empresa" VALUES (3, 'AgroNexus ', 241412);
INSERT INTO public."Empresa" VALUES (2, 'AgroTrade', 124141241);
INSERT INTO public."Empresa" VALUES (1, 'Rural Trade', 12121);
INSERT INTO public."Empresa" VALUES (4, 'Agromarket Comércio', 314124);
INSERT INTO public."Empresa" VALUES (5, 'Nova Safra Commodities', 24124);


--
-- Data for Name: Endereco; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Endereco" VALUES (1, 'Rua', 54, 'Vila Maria', 'Nenhum', 'Goiania', 'GO', 19894, 'Brasil', 1);
INSERT INTO public."Endereco" VALUES (3, 'Rua', 65, 'Barra Funda', 'Nenhum', 'Nova Iguaçu', 'RJ', 12414, 'Brasil', 3);
INSERT INTO public."Endereco" VALUES (2, 'Rua', 42, 'Itamarati', 'Nenhum', 'São Paulo', 'SP', 18798, 'Brasil', 2);
INSERT INTO public."Endereco" VALUES (6, 'Rua', 423, 'Teste', '.', 'Duque de Caxias', 'RJ', 21421, 'BR', 6);
INSERT INTO public."Endereco" VALUES (7, 'Rua', 654, 'QQR', '.', 'Brasílias', 'DF', 21144, 'BR', 7);
INSERT INTO public."Endereco" VALUES (4, 'Rua', 87, 'Bairro Teste', 'Nenhum', 'Salvador', 'BA', 19724, 'Brasil', 4);
INSERT INTO public."Endereco" VALUES (5, 'Rua', 76, 'Não Sei', 'Nenhum', 'Ourinhos', 'SP', 42412, 'Brasil', 5);


--
-- Data for Name: Estoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Estoque" VALUES (11, 'Café', 6, 'A', 'Café', 99, 55, 't', 'https://rehagro.com.br/blog/wp-content/uploads/2019/04/capa-producao-cafe-brasil.jpg');
INSERT INTO public."Estoque" VALUES (14, 'tesste', 13, 'P', 'faf', 125, 12, 'm³', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (15, 'Teste', 2, 'A', '', 450, 15, 'kg', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (7, 'Milho', 7, 'A', 'fasfas', 2, 15, 'gal', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (8, 'Pão', 13, 'A', 'faafsas', 0, 53, 'ml', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhTz5eGb4-9pmt1ycLIXvQc3kGgs7UjuV1Q&s');
INSERT INTO public."Estoque" VALUES (16, 'Produto Teste', 3, 'A', 'fsafsa', 1315, 156, 'g', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (10, 'Trigo', 3, 'A', 'Trigo', 200, 40, 't', 'https://www.indupropil.com.br/media/catalog/product/cache/1/image/900x/9df78eab33525d08d6e5fb8d27136e95/5/5/55.jpg');
INSERT INTO public."Estoque" VALUES (12, 'Laranja', 3, 'P', 'Laranja', 590, 5, 'ml', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-6RgR0LEHqaVoUKC7d2XkK8CfxMu-tWMdpw&s');
INSERT INTO public."Estoque" VALUES (13, 'Soja', 7, 'P', 'fsafas', 211, 15, 'ml', 'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRf9O8IOiodDs3f4_15kCGHfdnIsuJCMuP2dKj4p0Fn1z2Fc4NPK2qEJCB1Htyho1bxUpPz6Hx4hYACUUpFAjp8Zw');
INSERT INTO public."Estoque" VALUES (17, 'Teste 1', 12, 'A', '4', 14, 1, 't', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (18, 'Teste 2', 7, 'A', '4', 4, 15, 'g', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (19, 'Teste 3', 12, 'A', '', 4, 15, 'g', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (20, 'Teste 5', 13, 'A', '', 6, 5, 't', 'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=');
INSERT INTO public."Estoque" VALUES (9, 'Açucar', 7, 'P', 'sugar', 2375, 150, 'saco', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSfexWVz_GYi6n0LL4XvSGLz6pJK-575sQTA&s');
INSERT INTO public."Estoque" VALUES (21, 'Teste 6', 3, 'A', '', 5, 5, 't', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVNer1ZryNxWVXojlY9Hoyy1-4DVNAmn7lrg&s');


--
-- Data for Name: FormaPagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."FormaPagamento" VALUES (1, 1, 'Boleto');
INSERT INTO public."FormaPagamento" VALUES (2, 2, 'PIX');
INSERT INTO public."FormaPagamento" VALUES (3, 3, 'Cartão de Crédito');


--
-- Data for Name: HistoricoEstoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."HistoricoEstoque" VALUES (21, '2025-02-25 13:22:03.259', '13:22', 15, true, 7, 17, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (22, '2025-02-25 13:22:27.241', '13:22', 50, true, 8, 18, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (24, '2025-02-25 13:24:47.709', '13:24', 3, false, 7, 20, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (26, '2025-02-25 19:30:56.667', '19:30', 1, false, 7, 21, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (27, '2025-02-26 12:47:15.155', '12:47', 40, false, 8, 22, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (28, '2025-02-26 12:48:41.582', '12:48', 3, false, 8, 23, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (29, '2025-02-26 14:47:54.315', '14:47', 2500, true, 9, 24, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (31, '2025-02-26 14:49:08.022', '14:49', 15, false, 9, 26, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (25, '2025-02-25 13:24:47.715', '13:24', 75, false, 8, 20, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (23, '2024-09-25 13:22:45.633', '13:22', 450, false, 7, 19, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (33, '2025-02-26 21:45:37.993', '21:45', 165, true, 11, 28, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (34, '2025-02-26 21:46:03.008', '21:46', 65, false, 11, 29, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (35, '2025-02-26 21:46:49.284', '21:46', 600, true, 12, 30, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (36, '2025-02-26 21:47:01.424', '21:47', 10, false, 12, 31, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (37, '2025-02-26 21:58:28.754', '21:58', 215, true, 13, 32, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (38, '2025-02-26 21:58:43.356', '21:58', 4, false, 13, 33, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (39, '2025-02-26 23:26:09.869', '23:26', 3, false, 9, 34, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (40, '2025-02-26 23:26:09.881', '23:26', 1, false, 11, 34, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (41, '2025-02-27 01:21:12.475', '01:21', 2, false, 9, 35, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (42, '2025-02-27 01:21:41.728', '01:21', 125, true, 14, 36, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (43, '2025-02-27 17:16:37.912', '17:16', 500, true, 15, 37, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (44, '2025-02-27 17:22:24.5', '17:22', 50, false, 15, 38, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (45, '2025-02-27 17:22:24.509', '17:22', 4, false, 7, 38, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (46, '2025-02-27 17:22:24.517', '17:22', 2, false, 8, 38, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (47, '2025-02-28 11:59:53.73', '11:59', 15, true, 16, 39, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (48, '2025-02-28 12:00:25.517', '12:00', 2, false, 16, 40, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (49, '2025-02-28 12:19:01.473', '12:19', 3, false, 9, 41, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (50, '2025-02-28 12:34:52.135', '12:34', 1, false, 9, 42, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (51, '2025-02-28 14:24:57.707', '14:24', 1, false, 9, 46, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (52, '2025-03-03 12:32:19.623', '12:32', 15, true, 17, 47, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (53, '2025-03-03 12:32:51.382', '12:32', 1, false, 17, 49, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (54, '2025-03-03 12:53:10.319', '12:53', 5, true, 18, 50, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (55, '2025-03-03 12:53:23.341', '12:53', 1, false, 18, 51, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (56, '2025-03-03 12:53:42.943', '12:53', 5, true, 19, 52, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (57, '2025-03-03 12:54:16.561', '12:54', 7, true, 20, 53, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (58, '2025-03-03 12:54:38.345', '12:54', 1, false, 19, 54, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (59, '2025-03-03 12:54:38.352', '12:54', 1, false, 20, 54, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (32, '2024-12-26 14:49:25.024', '14:49', 100, false, 10, 27, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (30, '2024-12-26 14:48:43.325', '14:48', 300, true, 10, 25, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (60, '2025-03-03 13:53:49.425', '13:53', 100, false, 9, 55, 'cm76ce4pf0001idjyz4blg9sa');
INSERT INTO public."HistoricoEstoque" VALUES (61, '2025-03-03 14:08:13.741', '14:08', 5, true, 21, 56, 'cm76ce4pf0001idjyz4blg9sa');


--
-- Data for Name: HistoricoValores; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Imagem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Mensagem; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Moeda; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Moeda" VALUES ('USD', 'Dólar Americano', 'us');
INSERT INTO public."Moeda" VALUES ('BRL', 'Real Brasileiro', 'br');
INSERT INTO public."Moeda" VALUES ('EUR', 'Euro', 'eu');
INSERT INTO public."Moeda" VALUES ('JPY', 'Iene Japonês', 'jp');
INSERT INTO public."Moeda" VALUES ('GBP', 'Libra Esterlina', 'gb');
INSERT INTO public."Moeda" VALUES ('AUD', 'Dólar Australiano', 'au');
INSERT INTO public."Moeda" VALUES ('CAD', 'Dólar Canadense', 'ca');
INSERT INTO public."Moeda" VALUES ('CHF', 'Franco Suíço', 'ch');
INSERT INTO public."Moeda" VALUES ('CNY', 'Yuan Chinês', 'cn');
INSERT INTO public."Moeda" VALUES ('HKD', 'Dólar de Hong Kong', 'hk');
INSERT INTO public."Moeda" VALUES ('NZD', 'Dólar Neozelandês', 'nz');
INSERT INTO public."Moeda" VALUES ('SEK', 'Coroa Sueca', 'se');
INSERT INTO public."Moeda" VALUES ('KRW', 'Won Sul-Coreano', 'kr');
INSERT INTO public."Moeda" VALUES ('SGD', 'Dólar de Singapura', 'sg');
INSERT INTO public."Moeda" VALUES ('NOK', 'Coroa Norueguesa', 'no');
INSERT INTO public."Moeda" VALUES ('MXN', 'Peso Mexicano', 'mx');
INSERT INTO public."Moeda" VALUES ('INR', 'Rupia Indiana', 'in');
INSERT INTO public."Moeda" VALUES ('RUB', 'Rublo Russo', 'ru');
INSERT INTO public."Moeda" VALUES ('ZAR', 'Rand Sul-Africano', 'za');
INSERT INTO public."Moeda" VALUES ('TRY', 'Lira Turca', 'tr');


--
-- Data for Name: Noticia; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Noticia" VALUES (132, 'Soja em queda: alta do dólar segura perdas no mercado interno', 'Movimento de baixa é atribuído ao término da colheita nos Estados Unidos', 'Os preços da soja, tanto no mercado interno quanto no externo, registraram queda na última semana, de acordo com o boletim informativo do Cepea (Centro de Estudos Avançados em Economia Aplicada). O movimento de baixa é atribuído ao término da colheita nos Estados Unidos, ao avanço acelerado das semeaduras no Brasil e na Argentina, além da menor demanda global pelo grão.



No Brasil, a desvalorização foi limitada pela alta do dólar frente ao Real, fator que aumenta a competitividade da soja brasileira no mercado internacional. Mesmo assim, compradores, especialmente indústrias nacionais, reduziram o ritmo de aquisição após semanas de compras intensas, segundo os pesquisadores do Cepea.



Do lado dos vendedores, observa-se uma resistência nas negociações do remanescente da safra 2023/24. Muitos produtores, em posição confortável de caixa, optam por segurar o produto à espera de melhores preços no futuro.

As perspectivas para o mercado permanecem voláteis, com atenção voltada à evolução do clima nas regiões de plantio e ao comportamento da demanda global. Para os produtores brasileiros, o câmbio pode continuar sendo um fator crucial para os preços internos.', '2025-02-27 14:47:13.634', 'Mercado', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/8ad5d2e0e76d4e6ba970901316a0f59b_858x483.jpg');
INSERT INTO public."Noticia" VALUES (128, 'Impacto das chuvas no cinturão cafeeiro', 'Mês de outubro trouxe boas notícias para os cafeicultores', 'O cultivo de café conilon enfrenta os mais diversos desafios relacionados ao clima, principalmente em relação à gestão da água. A variação diária das necessidades de irrigação, causada pelas mudanças climáticas, exige uma abordagem rigorosa para evitar perdas de produtividade. Nesse cenário, a adoção de tecnologias de irrigação de precisão se tornam indispensáveis. 



Quando as tecnologias de monitoramento são utilizadas, elas permitem que o produtor possa ajustar em tempo real, a quantidade de água aplicada à lavoura. “A aplicação precisa de água resulta em melhor absorção dos nutrientes pelas plantas, o que, além de reduzir o uso de fertilizantes, promove uma colheita mais saudável e produtiva,” explica Elídio Torezani, diretor da Hydra Irrigações.

O monitoramento é utilizado para que o produtor tenha acessa acesso a dados detalhados sobre umidade do solo, clima e outras variáveis importantes. “Com essas informações, o manejo é ajustado com precisão para atender às necessidades diárias da planta, evitando desperdícios de água e insumos,” detalha Torezani.



E assim, com essas práticas de irrigação inteligente , é possível que uso de fertilizantes seja otimizado. Segundo Torezani, “ao aplicar a quantidade ideal de água, o café absorve melhor os nutrientes, o que reduz a necessidade de adubação e os custos de produção.” Com isso, o produtor de café conilon pode alcançar uma produtividade maior, reduzindo a pegada ambiental e maximizando a eficiência dos recursos. Estudos mostram que práticas de irrigação de precisão podem aumentar em até 30% a produtividade do café conilon. Em um mercado cada vez mais competitivo e consciente, essa eficiência é fundamental para os produtores que buscam reduzir custos e atender a demanda por práticas sustentáveis.', '2024-02-27 14:47:13.634', 'Expectativa', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/f3977dc78530492ca5dd02e788fde134_858x483.jpg');
INSERT INTO public."Noticia" VALUES (109, 'Carne de frango ganha competitividade com alta nos preços', 'Valorização mais suave torna a proteína avícola uma opção mais acessível', 'A carne de frango tem se destacado no mercado, ampliando sua competitividade em relação às carnes bovina e suína, que apresentam altas mais acentuadas. Essa valorização mais suave torna a proteína avícola uma opção mais acessível para os consumidores no início de setembro.



Segundo dados informados pelo Cepea, a menor valorização da carne de frango, em comparação com as concorrentes, está relacionada ao aumento do poder de compra da população e à maior demanda. Enquanto a oferta restrita impulsiona os preços das carnes suína e bovina, o setor avícola responde ao incremento da procura, com o atacado reforçando estoques para atender à demanda aquecida.', '2025-02-27 23:59:14.577', 'Mercado', 10, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/5ae27991230742b1a435da57bf753ae5_858x483.jpg');
INSERT INTO public."Noticia" VALUES (100, 'Queimadas afetam colheita de cana e pressionam setor', 'Incêndios impactam lavouras de cana', 'Segundo informações divulgadas pela UNICA, a segunda quinzena de agosto trouxe uma leve redução na moagem de cana-de-açúcar no Centro-Sul do Brasil. As unidades produtoras processaram 45,07 milhões de toneladas, registrando uma queda de 3,25% em comparação ao mesmo período da safra 2023/2024. No entanto, o acumulado da safra 2024/2025 até o início de setembro apresenta crescimento, com 422,61 milhões de toneladas moídas, 3,93% a mais que na safra anterior.



Atualmente, 258 unidades estão em operação no Centro-Sul, sendo 239 focadas no processamento de cana-de-açúcar, nove dedicadas à produção de etanol de milho e dez usinas flex. Em relação à qualidade da matéria-prima, o nível de Açúcares Totais Recuperáveis (ATR) alcançou 155,34 kg por tonelada na segunda quinzena de agosto, um aumento de 0,92% em relação à safra anterior.

A produção de açúcar, no entanto, registrou queda. Foram produzidas 3,26 milhões de toneladas de açúcar, uma redução de 6,02% em relação ao mesmo período da safra passada. Já o etanol apresentou desempenho mais robusto, com um total de 2,45 bilhões de litros produzidos na segunda metade de agosto, sendo 1,56 bilhão de litros de etanol hidratado, representando um crescimento de 10,27%.



Apesar desses números, a UNICA alerta para os efeitos das queimadas, especialmente em São Paulo. Segundo a entidade, incêndios afetaram mais de 231 mil hectares de cana-de-açúcar na segunda quinzena de agosto, o que pode impactar tanto a qualidade da matéria-prima quanto o cronograma de colheita.

Nas vendas de etanol, agosto registrou alta de 3,76%, com destaque para o etanol hidratado, que aumentou 6,81% no período.', '2024-09-18 23:30:59.264', 'Brasil', 3, 7, 'https://www.agrolink.com.br/upload/imagens-resizes/e4ee32da53ef4717808b32ed01bb2de9_858x483.jpg');
INSERT INTO public."Noticia" VALUES (102, 'Preços do frango vivo sobem em setembro', 'Exportações de carne de frango caem consideravelmente', 'Segundo a análise da edição de setembro do Boletim Agropecuário produzido pela Empresa de Pesquisa Agropecuária e Extensão Rural de Santa Catarina (Epagri) divulgado pelo Observatório Agro Catarinense, nas duas primeiras semanas de setembro, os preços do frango vivo apresentaram leve alta nos dois principais estados produtores. No Paraná, houve um aumento de 0,5% em comparação com o mês anterior, enquanto em Santa Catarina o crescimento foi de 0,4%. Quando comparados aos preços de setembro do ano passado, as altas foram de 4,5% no Paraná e 2,9% em Santa Catarina, considerando os valores nominais.



Em relação às variações regionais, os preços nas duas primeiras semanas de setembro mantiveram-se estáveis nas regiões Meio Oeste e Litoral Sul. No entanto, a região Oeste registrou uma alta de 1,2% no período. Comparado a setembro de 2023, o Meio Oeste viu um aumento de 3,1%, e o Litoral Sul, de 0,7%, enquanto o Oeste sofreu uma queda de 6,6%, todos os valores corrigidos pelo IGP-DI.

No mercado atacadista, os preços da carne de frango mostraram variações distintas no início de setembro. O peito com osso e o filé de peito apresentaram altas de 1,7% e 0,8%, respectivamente. Por outro lado, a coxa/sobrecoxa e o frango inteiro congelado tiveram variações negativas de -0,8% e -0,1%. A variação média dos quatro cortes foi de 0,4%, com um aumento acumulado de 18,6% no ano, conforme dados do Boletim Agropecuária.

Quando comparados aos preços de setembro de 2023, os valores atuais apresentam aumentos em todos os cortes: 34,2% para o filé de peito, 30,8% para o peito com osso, 10,3% para o frango inteiro e 3,9% para a coxa/sobrecoxa. A variação média dos quatro cortes foi de 19,8%.



De acordo com a Embrapa Suínos e Aves, o custo de produção de frangos em aviário climatizado positivo em Santa Catarina foi de R$ 4,85/kg em agosto, refletindo uma alta de 2,1% em relação ao mês anterior e 4,0% acima do custo de agosto de 2023, corrigido pelo IGP-DI. No acumulado do ano, o aumento é de 5,2%. A relação de troca insumo-produto caiu levemente nas duas primeiras semanas de setembro, com uma redução de 0,5% devido ao aumento no preço do frango vivo na região Oeste, parcialmente compensado pela alta no preço do [milho](https://www.agrolink.com.br/culturas/milho?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos).

No setor de exportações, o Brasil enviou 318,5 mil toneladas de carne de frango em agosto, o que representa uma queda de 29,6% em relação ao mês anterior e de 24,4% na comparação com agosto de 2023. As receitas caíram para US$ 609,0 milhões, uma redução de 30,3% em relação ao mês anterior e de 25,2% na comparação anual. A Associação Brasileira de Proteína Animal (ABPA) atribui essa queda ao surto de doença de Newcastle no Rio Grande do Sul, que afetou especialmente os embarques para a China e o México.

No acumulado de janeiro a agosto, o Brasil exportou 3,30 milhões de toneladas de carne de frango, gerando receitas de US$ 6,04 bilhões, o que representa uma queda de 3,2% em quantidade e 10,2% em valor em comparação com o mesmo período do ano passado. Santa Catarina exportou 69,9 mil toneladas em agosto, com uma queda de 32,3% em relação ao mês anterior e de 28,8% na comparação anual. As receitas foram de US$ 141,0 milhões, com uma redução de 31,5% em relação ao mês anterior e de 31,9% na comparação anual.



Apesar das quedas recentes, o valor médio da carne de frango in natura exportada por Santa Catarina foi de US$ 1.934,82 por tonelada em agosto, uma pequena queda de 0,1% em relação ao mês anterior, mas 3,8% abaixo do valor de agosto de 2023. No acumulado do ano, o estado exportou 736,4 mil toneladas, com receitas de US$ 1,42 bilhão, apresentando um aumento de 0,5% em quantidade, mas uma queda de 10,5% em valor, comparado ao mesmo período do ano anterior. Santa Catarina foi responsável por 23,5% das receitas geradas pelas exportações brasileiras de carne de frango nos primeiros oito meses de 2024.', '2024-09-18 23:34:00.23', 'Mercado', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/f0d1448d1c614b63a00ed60510e4fdf6_858x483.jpg');
INSERT INTO public."Noticia" VALUES (104, 'Preços da carne de frango recuperam em agosto após queda', 'O aumento dos preços é impulsionado pela demanda aquecida', 'De acordo com informações divulgadas pelo Centro de Estudos Avançados em Economia Aplicada (Cepea), os preços médios da carne de frango, que enfrentaram queda em julho, apresentaram sinais de recuperação ao final de agosto. O aumento dos preços é impulsionado pela demanda aquecida, especialmente na primeira quinzena do mês, coincidente com o pagamento de salários, e pela oferta interna mais restrita.



O mercado de frango vivo também experimentou um aumento nos preços devido à combinação de demanda elevada pela carne e oferta reduzida do animal. No entanto, enquanto o mercado interno mostra sinais de recuperação, as exportações brasileiras de carne de frango in natura continuam enfraquecidas.', '2024-09-18 23:35:02.027', 'Mercado', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/827426b4de864e86b90671cdce04eaa1_858x483.jpg');
INSERT INTO public."Noticia" VALUES (129, 'Congresso de café foca em controle de broca', 'O inseticida Afiado se destaca pela sua ação de choque rápida', 'A cidade de Franca (SP) sedia entre os dias 22 e 25 de outubro de 2024 o Congresso Brasileiro de Pesquisas Cafeeiras, organizado pela Fundação Procafé. O evento reúne especialistas e empresas do setor para discutir inovações em tecnologia, produtividade e controle de pragas no cultivo do café. Entre os destaques, está a participação da Albaugh, multinacional com raízes norte-americanas, reconhecida por seu portfólio robusto em proteção de cultivos. Durante o congresso, a empresa Albaugh traz inovações com o inseticida Afiado e o fungicida Recop. Segundo Fábio Arantes Porto, gerente de marketing da Albaugh, um dos focos será o controle da broca-do-café (Hypothenemus hampei), praga que afeta todas as regiões produtoras de café. 

O inseticida Afiado se destaca pela sua ação de choque rápida e pelo residual prolongado, características que o tornam uma escolha eficaz no combate a pragas. Além disso, sua fórmula é projetada para não interferir nas populações de inimigos naturais, preservando o equilíbrio ecológico do ambiente agrícola. A nova formulação líquida do produto não apenas facilita sua dosagem e aplicação, mas também garante maior eficiência no manejo, permitindo que os agricultores alcancem resultados consistentes e sustentáveis em suas lavouras.



Outro destaque é o fungicida Recop, que vem sendo utilizado no controle de doenças importantes do cafeeiro, como a ferrugem-do-cafeeiro, antracnose e mancha-do-olho-pardo. De acordo com a Albaugh, Recop tem um papel preventivo e auxilia na maturação uniforme dos frutos, aumentando a qualidade e a rentabilidade da colheita. Fundada em 1979 por Dennis Albaugh, a empresa opera globalmente com fábricas próprias para garantir a qualidade e o fornecimento de seus defensivos agrícolas, consolidando-se como uma das líderes no mercado de proteção de cultivos.', '2024-11-25 22:20:08.626', 'Inovação', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/136d7afd37f64c7cbf8518eb0165bb12_858x483.jpg');
INSERT INTO public."Noticia" VALUES (105, 'Captação do leite cai 6,16% no Brasil', 'Queda na captação de leite no Sul e Centro-Oeste impacta produção nacional', 'A captação de leite no Brasil registrou uma queda de 6,16% no segundo trimestre de 2024 em relação ao trimestre anterior, de acordo com a análise semanal do Instituto Mato-grossense de Economia Agropecuária (Imea) e dados do IBGE. O volume total captado no período somou 5,83 bilhões de litros. A principal responsável por essa redução foi a região Sul, que sofreu uma retração de 5,30%, sendo puxada principalmente pelo Rio Grande do Sul, onde as enchentes resultaram em uma queda de 10,08% no volume captado em relação ao primeiro trimestre de 2024.



Segundo a análise, na região Centro-Oeste, a entrada do período seco também impactou a produção, com uma queda de 10,77%, resultando em um total de 0,62 bilhão de litros captados. Mato Grosso do Sul e Mato Grosso lideraram as retrações, com reduções de 23,21% e 18,43%, respectivamente.



Para o terceiro trimestre de 2024, a continuidade do período seco na região Centro-Oeste pode continuar a limitar a captação de leite, enquanto as pastagens de inverno na região Sul devem proporcionar uma recuperação, sustentando um leve aumento na captação a nível nacional, conforme os dados do Imea.', '2024-09-18 23:36:03.394', 'Produção', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/8c91bc5aca8344c4841291e37d8435fa_858x483.jpg');
INSERT INTO public."Noticia" VALUES (89, 'China reduz importações de milho, afetando mercado brasileiro', 'Plantio da safra de verão avança no Sul', 'A análise do Grão Direto indica que a produção de milho nos EUA teve um leve aumento, de 384,74 para 385,73 milhões de toneladas. No entanto, a produção mundial caiu de 1.219,82 para 1.218,57 bilhões de toneladas, afetando os estoques globais. O USDA informou que os EUA venderam 1,561 milhão de toneladas, superando as expectativas de 700 mil a 1,6 milhão de toneladas.



Segundo a análise produzida pelo Grão Direto, o Departamento de Agricultura dos Estados Unidos (USDA) revisou para baixo suas projeções de importação de milho pela China, de 23 para 21 milhões de toneladas. Essa redução pode ser um indicativo de que o país asiático está se aproximando da autossuficiência na produção de milho, o que pode impactar diretamente a demanda pelo produto brasileiro.

No Brasil, os produtores têm mostrado resistência a novas vendas após a quitação de dívidas com vendas anteriores, pressionando os compradores a oferecer preços mais atrativos. No entanto, há ainda grande volume de milho para ser negociado, enquanto a colheita norte-americana avança, oferecendo concorrência no mercado internacional.



O plantio da safra de verão segue em ritmo moderado nos estados do Sul, com o Rio Grande do Sul registrando 37% da área total plantada, abaixo dos 44% do ano anterior. O clima instável em outras regiões do Brasil, contudo, gera incertezas sobre o avanço do plantio do cereal.

Nas exportações, o USDA reduziu a projeção brasileira de 50 para 48 milhões de toneladas, em função da menor produção e do ritmo mais lento de exportações. Mesmo assim, o número ainda está acima da estimativa da Conab, de 36 milhões de toneladas, com o mercado prevendo um patamar entre 40 e 42 milhões de toneladas, cerca de 30% abaixo do previsto inicialmente. Esse cenário pode manter as cotações em alta pelo terceiro mês consecutivo.', '2024-09-18 22:59:18.767', 'Mundo', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/6b0d3abbd6884b828203b793a22aff0c_858x483.jpg');
INSERT INTO public."Noticia" VALUES (101, 'São Paulo: calor no fim de agosto aumenta risco de incêndios no campo', 'Queimadas provocaram prejuízos de mais de R$ 1 bilhão ao agro de SP', 'A previsão de aumento das temperaturas e de tempo seco no fim de semana eleva o alerta para o alto risco de incêndios nas lavouras do Estado de São Paulo. Nos últimos dias, uma frente fria que atingiu a Região Sudeste ajudou no combate aos focos de incêndio, mas o cenário deve mudar nos próximos dias, trazendo novos desafios para o setor agropecuário, conforme os dados da Secretaria de Agricultura e Abastecimento de São Paulo (SAA).



De acordo com dados da SSA, as queimadas registradas no último fim de semana impactaram fortemente as atividades agrícolas, especialmente a pecuária, cana-de-açúcar, fruticultura, heveicultura e apicultura. Os danos causados pelo fogo nas lavouras, pastagens e até a morte de animais já geraram prejuízos superiores a R$ 1 bilhão.

Gabriel Rodrigues, meteorologista do Agrolink destacou que a expectativa de que o tempo seco persista até pelo menos 12 de setembro. "O final de agosto ainda é marcado pela estação seca no estado de São Paulo, que tem início na segunda metade de maio, e historicamente, a estação chuvosa começa a partir da segunda quinzena de setembro. O cenário nas projeções de médio prazo ainda indicam uma condição de tempo seco no estado paulista até pelo menos o dia 12 de setembro. De certa forma, esta previsão está de acordo com os registros históricos", explica o especialista. 

[Veja mais informações sobre o clima em Agrotempo](https://www.agrolink.com.br/agrotempo?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos)

As chuvas ficaram abaixo da média em São Paulo refletindo um inverno ainda mais seco. "No entanto, vale ressaltar que nos últimos 120 dias, as chuvas ficaram abaixo da média no estado, indicando um inverno ainda mais seco. Além disso, a influência de vários episódios de bloqueios atmosféricos ao longo desta estação, contribuíram com a intensificação do calor e o impedimento do avanço das frentes frias sobre o estado. Condição que estamos vendo, agora no final do mês de agosto, mesmo após a chegada de uma massa de ar mais frio, continua Rodrigues. 



Com o aumento das temperaturas previsto para os últimos dias de agosto, a Defesa Civil do Estado de São Paulo emitiu um alerta para o alto risco de queimadas nas regiões produtivas. Para evitar novos focos de incêndio, é fundamental que a população colabore, adotando medidas como evitar queimar lixo, não acender fogueiras, não soltar balões (prática considerada crime ambiental), e manter aceiros limpos em volta das propriedades.

"A presença de um bloqueio atmosférico, que atuará nas próximas semanas. Esse bloqueio, além de impedir a formação das nuvens carregadas e o avanço das chuvas das frentes frias, contribui com a redução dos índices de umidade, favorecendo então um ambiente altamente propício para o alastramento dos incêndios e queimadas no estado. Contudo, as projeções de longo prazo, estão mostrando um cenário mais úmido entre a última semana de setembro e primeira semana de outubro. Condição que pode aliviar, momentaneamente, as condições secas no estado de São Paulo" finaliza o meteorologista.

Para mitigar esses prejuízos, a SAA destinou R$ 110 milhões aos produtores rurais paulistas afetados pelas queimadas, por meio do Fundo de Expansão do Agronegócio Paulista (FEAP). Os produtores interessados em acessar esse crédito devem procurar a Casa da Agricultura de seus municípios, conforme as informações da Secretaria de Agricultura e São Paulo.



Conforme o informado pela Secretaria de Agricultura e Abastecimento de São Paulo, em caso de emergência, a Defesa Civil (199) e o Corpo de Bombeiros (193) estão disponíveis para atendimento. As regiões sob alerta incluem Andradina, Araçatuba, Assis, Barretos, Bauru, Campinas, Campos do Jordão, Franca, Guaratinguetá, Iperó, Itapeva, Jales, Jaú, Jundiaí, Marília, Ourinhos, Presidente Prudente, Ribeirão Preto, São Carlos, São José do Rio Preto, Sorocaba e Votuporanga.', '2024-09-18 23:32:10.795', 'Produção', 3, 7, 'https://www.agrolink.com.br/upload/imagens-resizes/3cd974ea0a724522b78b6c5d17adb406_858x483.jpg');
INSERT INTO public."Noticia" VALUES (98, 'Compras de oportunidade elevam soja em Chicago', 'A valorização de uma cesta de commodities também influenciou', 'O relatório da UNICA revelou um mix de açúcar de 48,85%, abaixo das expectativas de mercado, que previa um índice acima de 49%. Esse resultado surpreendeu os analistas, reforçando ainda mais o movimento de alta no mercado.

No campo legislativo, a aprovação do projeto de lei "Combustíveis do Futuro" pelo Senado brasileiro trouxe perspectivas de aumento na demanda por biocombustíveis, como o etanol. Entre as principais disposições, o aumento da mistura de biogás no gás natural e as metas para biocombustíveis até 2031 foram destacados. "Se o mandato de mistura de etanol na gasolina for fixado em 30% para 2025, a demanda por etanol anidro terá um crescimento significativo, gerando oportunidades no setor de biocombustíveis", afirmou Coda.

Entretanto, a Hedgepoint destacou que o mercado de açúcar permanece atento à paridade das exportações indianas, com a participação do país no comércio internacional sendo restrita a preços acima de 20-21 c/lb. No mercado de açúcar branco, a entrega de outubro foi robusta, com 544,6 mil toneladas sendo entregues, a segunda maior já registrada em Londres.

Embora o cenário seja positivo para os preços do açúcar, os biocombustíveis ainda têm um longo caminho a percorrer antes de impactarem diretamente esse mercado. Até lá, o mix de fatores climáticos e macroeconômicos deverá continuar a definir o rumo dos preços, especialmente à medida que a seca no Centro-Sul brasileiro persiste.', '2024-06-18 23:26:03.844', 'Internacional', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/e7646f0bc57a442ab8d1acc6cfb88886_858x483.jpg');
INSERT INTO public."Noticia" VALUES (88, 'Custo de produção do milho supera preço do cereal, aponta Imea', 'Ciclo futuro do milho em Mato Grosso continua sendo um desafio', 'Segundo dados do Instituto Mato-grossense de Economia Agropecuária (Imea), o ponto de equilíbrio dos indicadores de custo de produção para a próxima temporada de milho em Mato Grosso revela um cenário desafiador para os produtores. Os custos de produção para o custeio, COE (Custo Operacional Efetivo), COT (Custo Operacional Total) e CT (Custo Total) foram estimados em R$ 28,96/sc, R$ 41,17/sc, R$ 45,99/sc e R$ 54,38/sc, respectivamente. Esses valores indicam que o preço do milho no estado Cobre apenas as despesas relacionadas ao custeio da temporada.



Os cálculos de ponto de equilíbrio (P.E) utilizaram dados do custo de produção do projeto Acapa-MT, divulgados em setembro de 2024, e a produtividade média das últimas três safras. Com isso, o ciclo futuro do milho em Mato Grosso continua sendo um desafio, exigindo que os produtores mantenham uma gestão rigorosa dos custos, aproveitem as oportunidades de valorização do cereal e otimizem as relações de troca com os insumos.



Além disso, a produtividade permanece como um fator fundamental e indefinido que pode impactar a rentabilidade, desempenhando um papel fundamental na definição das margens dos produtores.', '2024-09-18 22:58:45.317', 'Produção', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/4f78c51a69ea40879b7eadfba5c7a3eb_858x483.jpg');
INSERT INTO public."Noticia" VALUES (92, 'Café robusta atinge recordes históricos e supera R$ 1.500 por saca', 'Valorização é de 100%', 'Os preços do café robusta no Brasil continuam a atingir novos recordes, com a saca de 60 kg fechando acima de R$ 1.500,00 pela primeira vez desde o final da semana passada. O movimento de alta nas cotações, que já era observado desde o último trimestre de 2023, representa uma valorização de 100% em comparação ao preço de R$ 740/sc registrado no período.



Segundo informações do Cepea (Centro de Estudos Avançados em Economia Aplicada), o aumento expressivo nos preços do robusta é atribuído a uma série de fatores. O clima adverso prejudicou a safra brasileira e deve impactar também a produção do Vietnã, maior produtor mundial da variedade. Além disso, dificuldades no fluxo global de mercadorias, que elevaram os custos de frete, têm atrapalhado os envios da Ásia para a Europa.



O clima seco e quente nas principais regiões produtoras também gera preocupações quanto à safra brasileira de 2025/26, tanto para o robusta quanto para o arábica.', '2024-09-18 23:03:12.732', 'Mercado', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/2d0457adbba34d0eb7314f3850c7f3ae_858x483.jpg');
INSERT INTO public."Noticia" VALUES (90, 'Preços do milho sob pressão', 'Esses movimentos indicam a necessidade de atenção', 'De acordo com a TF Agroeconômica, a recente resistência nos preços do milho na B3 acendeu um alerta para investidores e agricultores. Caso essa resistência seja superada na próxima semana, o ideal é manter a posição; caso contrário, pode ser o momento de sair das posições compradas. Embora os preços do milho tenham subido ao longo do mês, o relatório da Conab trouxe um impacto negativo no dia ao registrar aumento nos estoques finais, gerando pressão de queda nos preços.



Entre os fatores de alta, destacam-se o atraso na colheita nos Estados Unidos, causado pelo furacão Francine, e o aumento das exportações brasileiras de milho. A ANEC revisou para cima suas projeções de embarques para setembro, o que elevou os prêmios de exportação no Brasil, impulsionados pela necessidade dos exportadores de cumprir compromissos. Além disso, o aumento da seca em regiões dos EUA, conforme relatório do USDA, segue afetando o mercado, com 18% da área agrícola americana sofrendo algum nível de seca.



Por outro lado, os fatores de baixa incluem o aumento dos estoques finais de milho no Brasil, que passaram de 4,97 milhões para 5,05 milhões de toneladas, segundo a Conab, e a queda de 5,36% nos preços do suíno, um grande consumidor de milho. Além disso, a entrada da safra comercial brasileira no mercado de exportação exerce pressão adicional sobre os preços, mesmo com uma previsão de exportações menor do que no ciclo anterior. Esses movimentos indicam a necessidade de atenção ao comportamento do mercado, pois, apesar dos aumentos recentes, as flutuações de oferta e demanda podem impactar os preços de maneira significativa nos próximos dias.', '2024-09-18 23:00:46.319', 'Mercado', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/ad3fdec02f5c45d19ae948046fc567bd_858x483.jpg');
INSERT INTO public."Noticia" VALUES (99, 'Inflação em queda nos EUA e seca no Brasil impulsionam preços do açúcar', 'O mercado de açúcar iniciou a semana passada de forma cautelosa', 'O mercado de açúcar iniciou a semana passada de forma cautelosa, com os participantes aguardando o relatório da União da Indústria de Cana-de-Açúcar (UNICA) enquanto a seca severa no Centro-Sul do Brasil continuava a dar suporte aos preços. A análise da Hedgepoint Global Markets destacou que a combinação da seca prolongada e a queda da inflação nos Estados Unidos fortaleceram o mercado de açúcar, elevando os preços do produto.



Lívea Coda, analista de Açúcar e Etanol da Hedgepoint, explicou que, apesar da fraqueza geral no complexo de energia, o açúcar mostrou resiliência, especialmente com as condições climáticas adversas que a principal região produtora do Brasil enfrentou na primeira quinzena de setembro. "As altas temperaturas e a baixa umidade relativa do ar aumentaram o risco de incêndios nos [canaviais](https://www.agrolink.com.br/culturas/cana-de-acucar/?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos)", acrescentou.

O relatório da UNICA revelou um mix de açúcar de 48,85%, abaixo das expectativas de mercado, que previa um índice acima de 49%. Esse resultado surpreendeu os analistas, reforçando ainda mais o movimento de alta no mercado.

No campo legislativo, a aprovação do projeto de lei "Combustíveis do Futuro" pelo Senado brasileiro trouxe perspectivas de aumento na demanda por biocombustíveis, como o etanol. Entre as principais disposições, o aumento da mistura de biogás no gás natural e as metas para biocombustíveis até 2031 foram destacados. "Se o mandato de mistura de etanol na gasolina for fixado em 30% para 2025, a demanda por etanol anidro terá um crescimento significativo, gerando oportunidades no setor de biocombustíveis", afirmou Coda.



Entretanto, a Hedgepoint destacou que o mercado de açúcar permanece atento à paridade das exportações indianas, com a participação do país no comércio internacional sendo restrita a preços acima de 20-21 c/lb. No mercado de açúcar branco, a entrega de outubro foi robusta, com 544,6 mil toneladas sendo entregues, a segunda maior já registrada em Londres.

Embora o cenário seja positivo para os preços do açúcar, os biocombustíveis ainda têm um longo caminho a percorrer antes de impactarem diretamente esse mercado. Até lá, o mix de fatores climáticos e macroeconômicos deverá continuar a definir o rumo dos preços, especialmente à medida que a seca no Centro-Sul brasileiro persiste.', '2024-09-18 23:30:22.309', 'EUA', 3, 7, 'https://www.agrolink.com.br/upload/imagens-resizes/1c06c98d2c724a269450333e388ebd11_858x483.jpg');
INSERT INTO public."Noticia" VALUES (103, 'Exportações de ovos caem pelo segundo mês consecutivo', 'Brasil exportou 1,239 mil toneladas de ovos in natura e processados no último mês', 'As exportações de ovos comerciais do Brasil registraram nova queda em agosto, consolidando o segundo mês consecutivo de recuo. Esse desempenho negativo foi impulsionado, sobretudo, pela redução nos embarques de produtos processados, como ovalbumina e ovos secos ou cozidos, setores que apresentaram baixa expressiva.



Segundo dados informados pelo Cepea, com base nas estatísticas da Secex, o Brasil exportou 1,239 mil toneladas de ovos in natura e processados no último mês, o que representa uma queda de 4,7% em relação a julho e uma redução significativa de 42% em comparação a agosto de 2023. Destas exportações, apenas 24,6% (equivalente a 305 toneladas) foram de produtos processados, o menor índice registrado desde dezembro de 2022.', '2024-09-18 23:34:30.741', 'Exportação', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/2e67af479dc24df9ae6983f5fc124bc2_858x483.jpg');
INSERT INTO public."Noticia" VALUES (115, 'Milho fecha semana em alta na B3', 'Na Bolsa de Chicago, o milho fechou dia e semana em alta', 'Na Bolsa de Mercadorias de São Paulo, o milho fechou a semana em alta, acompanhado do mercado norte-americano nesta sexta-feira, de acordo com informações divulgadas pela TF Agroeconômica. “Os contratos futuros de grãos registraram alta acompanhado o mercado americano. Apesar dos relatórios de oferta e demanda do USDA e da Conab apresentarem dados baixistas, os dois mercados seguraram as cotações. Na Bolsa de Chicago, o vencimento setembro/24 fechou cotado a US$ 3,94, em uma valorização de 7,75 pontos”, comenta.



“Diante deste quadro, as cotações futuras fecharam variações em alta no dia: o vencimento de setembro/24 foi de R$ 63,91 apresentando alta de R$ 0,13 no dia, alta de R$ 1,09 na semana; novembro/24 fechou a R$ 67,82, alta de R$ 1,21 no dia, alta de R$ 1,70 na semana; o vencimento janeiro/25 fechou a R$ 70,60, alta de R$ 0,90 no dia e alta de R$ 1,31 na semana”, completa.

Na Bolsa de Chicago, o milho fechou dia e semana em alta com fundos recomprando posições. “A cotação de dezembro24, referência para a nossa safra de inverno, fechou em alta de 1,79 % ou $ 7,25 cents/bushel a $ 413,25. A cotação para março25, fechou em alta de 1,53 % ou $ 6,50 cents/bushel a $ 431,00”, indica.



“O mercado voltou a cobrir posições em aberto do milho, movimento que transbordou do trigo para o cereal. A melhora da paridade para o Dólar em relação ao Real também deu suporte para milho. Segundo o USDA o México e a Europa devem aumentar as suas importações de milho. Ao longo da semana, as condições secas no Brasil, no começo do plantio do milho de primeira safra deram suporte aos preços. Com isso o milho fechou o acumulado da semana em alta de 1,72% ou $7,00 cents/bushel”, conclui.', '2024-09-18 22:47:13.31', 'Produção', 10, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/efe634a1e2564f26a6bf53f00d828b5b_858x483.jpg');
INSERT INTO public."Noticia" VALUES (112, 'Açúcar fecha em baixa nos mercados internacionais', 'Datagro reduz estimativa de produção', 'Os contratos futuros do açúcar fecharam a quarta-feira (4) em baixa nos mercados internacionais, com os comerciantes, segundo analistas ouvidos pela Reuters, destacando que “o mercado ficou tecnicamente fraco depois de não conseguir atingir novos picos de dois meses nesta semana. Na semana passada, ele se recuperou, impulsionado pelos incêndios nos canaviais do Brasil”.
 
“No entanto, eles disseram que o açúcar continua sustentado pela situação de seca no Brasil e pela decisão da Índia de permitir que as usinas de açúcar usem o caldo de cana para produzir etanol”, destacou a Agência Internacional de Notícias.
 
Ontem a Consultoria Datagro reduziu para 39,3 milhões de toneladas a projeção de produção de açúcar no Centro-Sul do Brasil na atual temporada. A redução leva em conta os impactos das condições climáticas desfavoráveis atuais.
 
Nova York
 
Na ICE Futures de Nova York, o açúcar bruto fechou contratado ontem, no lote outubro/24, a 19,24 centavos de dólar por libra-peso, baixa de 25 pontos, ou 1,3%, no comparativo com os preços da véspera. Já a tela março/25 caiu 25 pontos, contratada a 19,56 cts/lb. Os demais contratos recuaram entre 1 e 20 pontos, com a exceção do lote julho/26 que subiu 4 pontos.
 
Londres
 
Já o açúcar branco listado na ICE Futures Europe de Londres fechou no vermelho em todos os lotes. O vencimento outubro/24 foi contratado a US$ 539,10 a tonelada, recuo de 2,70 dólares no comparativo com os preços da véspera. A tela dezembro/24 caiu 3,30 dólares, contratada a US$ 528,80 a tonelada. Os demais lotes recuaram entre 2,40 e 4,20 dólares.
 
Mercado doméstico
 
No mercado interno a quarta-feira foi de alta nas cotações do açúcar cristal medidas pelo Indicador Cepea/Esalq, da USP. A saca de 50 quilos foi comercializada ontem a R$ 136,94 contra R$ 135,97 de terça-feira, valorização de 0,71% no comparativo.
 
Etanol hidratado
 
Já o etanol hidratado fechou pelo terceiro dia seguido em queda pelo Indicador Diário Paulínia. O biocombustível foi negociado ontem a R$ 2.607,00 o m³, contra R$ 2.631,00 o m³ praticado na véspera, desvalorização de 0,91% no comparativo entre os dias.', '2024-09-18 23:43:31.9', 'Importação', 3, 7, 'https://www.agrolink.com.br/upload/imagens-resizes/9a35558ae78843f09b0283d7edaf085a_858x483.jpg');
INSERT INTO public."Noticia" VALUES (95, 'Oferta mundial de soja afeta mercado brasileiro', 'Demanda cresce por óleo de soja', 'De acordo com dados da edição de setembro do boletim Agro em Dado da Secretaria de Estado de Agricultura, Pecuária e Abastecimento (Seapa), a oferta mundial recorde de soja na temporada 2023/24 e as projeções de alta disponibilidade para 2024/25, juntamente com variação negativa do dólar frente ao real em agosto, resultaram na desvalorização das cotações da soja tanto no mercado brasileiro quanto no internacional na primeira quinzena do mês.



No acumulado de exportações de janeiro a julho, o Brasil registrou um aumento de 3,0% no volume exportado de produtos do complexo soja em comparação ao mesmo período de 2023. No entanto, o valor arrecadado caiu 15,4%, refletindo a desvalorização da oleaginosa no mercado externo.

O óleo de soja, por sua vez, teve valorização no mercado nacional em julho, impulsionado pela maior demanda de indústrias de biodiesel. Esse foi o mês com maior volume de embarques em 2024, totalizando 207,7 mil toneladas, um aumento de 48,9% em relação a junho, com receita de US$196,7 milhões.



Em Goiás, terceiro maior exportador de óleo de soja do Brasil, foram embarcadas 106,8 mil toneladas entre janeiro e julho de 2024, somando US$97,7 milhões, representando quedas de 22,1% no volume e 32,2% no valor em relação ao mesmo período do ano anterior. Abril foi o mês de destaque, com 25,5 mil toneladas exportadas e faturamento de US$22,5 milhões, impulsionado pela valorização do dólar.

O farelo de soja também teve impacto. De janeiro a julho, o Brasil exportou 13,3 milhões de toneladas, com um aumento de 3,6% em volume, mas uma queda de 14,3% no valor, totalizando US$5,7 bilhões. Goiás, quarto no ranking nacional, embarcou 1,5 milhão de toneladas, ao valor de US$668,9 milhões, recuando 15,8%.', '2024-09-18 23:22:59.013', 'Mercado', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/59b6f442c49746cb8b0dcd39754853e9_858x483.jpg');
INSERT INTO public."Noticia" VALUES (130, 'Mercado do milho sente impacto de menor demanda', 'Interrupção da valorização ocorreu devido à redução no interesse de compra', 'O movimento de alta nos preços do milho, observado desde agosto, perdeu força na última semana em algumas regiões monitoradas pelo Cepea (Centro de Estudos Avançados em Economia Aplicada). De acordo com o boletim informativo da entidade, a interrupção da valorização ocorreu devido à redução no interesse de compra por parte dos consumidores.



Por outro lado, os produtores, especialmente no estado de São Paulo, estão menos ativos no mercado. Segundo pesquisadores do Cepea, esse comportamento reflete a atenção voltada ao desenvolvimento da safra verão, que vem sendo impulsionado por condições climáticas favoráveis na maioria das regiões.



No Sul do Brasil, a semeadura da safra verão 2024/25 avança rapidamente e já se aproxima de sua reta final. Essa perspectiva traz otimismo, mas também contribui para a menor disponibilidade de grãos no mercado imediato.

A estabilidade nos preços do milho pode continuar nos próximos dias, dependendo da evolução da safra e da demanda dos compradores.', '2024-11-25 22:21:28.863', 'Mercado', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/00ea6e85b06348679521d3c8fce074c9_858x483.jpg');
INSERT INTO public."Noticia" VALUES (96, 'Falta de chuvas atra semeadura da soja em Mato Grosso', 'No mesmo período do ano passado, 1,82% da área já havia sido cultivada no estado', 'Desde o dia 7 de setembro, os produtores de Mato Grosso estão autorizados a iniciar a semeadura da safra de soja 2024/25. No entanto, segundo dados do Instituto Mato-grossense de Economia Agropecuária (Imea), os trabalhos no campo têm ocorrido de forma pontual, restritos a áreas irrigadas por pivô central. A razão para o avanço limitado nessas regiões se deve ao baixo volume de água nos reservatórios.



O Imea atribui esse cenário de seca à mudança nas temperaturas do Oceano Pacífico, que passou de um fenômeno El Niño para uma condição de neutralidade no início de 2024. Essa alteração climática tem retardado as primeiras chuvas em Mato Grosso, complicando o início do plantio.



De acordo com projeções do Instituto Nacional de Meteorologia (Inmet), o estado deve receber entre 1 e 3 mm de precipitação nos próximos sete dias, volume considerado insuficiente para a semeadura adequada. No mesmo período do ano passado, 1,82% da área já havia sido cultivada no estado, cenário que deve se repetir com atraso em 2024.



Com a previsão de chuvas aquém do necessário, o setor agropecuário de Mato Grosso aguarda com apreensão a evolução climática nas próximas semanas para evitar impactos negativos na produtividade da safra.', '2024-09-18 23:23:33.624', 'Mercado nacional', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/e93429e3193e4c5a9d14e4f495000039_858x483.jpg');
INSERT INTO public."Noticia" VALUES (97, 'Mercado da soja “desanimado”', 'Em Santa Catarina, os negócios continuam estagnados', 'O mercado da soja do estado do Rio Grande do Sul continuou desanimado devido à valorização do real frente ao dólar, o que resultou em poucos negócios reportados, segundo informações divulgadas pela TF Agroeconômica. Os preços de hoje para entrega em outubro e pagamento em 15/10 foram: R$ 139,00 no Porto. No interior, os valores seguiram conforme as praças: R$ 131,50 em Cruz Alta, R$ 132,00 em Passo Fundo, R$ 131,00 em Ijuí e R$ 130,50 em Santa Rosa/São Luiz (pagamento em 04/10).



Em Santa Catarina, os negócios continuam estagnados. Segundo o Epagri, Santa Catarina deve colher cerca de 3 milhões de toneladas de soja, um aumento de 12,77% em relação à safra passada. “Os negócios continuam estagnados, refletindo a ausência de movimentação nos preços. O preço no porto foi de R$ 126,00, Chapecó a R$ 117,00”, comenta.

No Paraná também não houve muitas alterações no preço. “No porto, Paranaguá vai a R$ 141,00. No interior, em relação à soja da safra 2023/24, a ideia de compra girava em torno de R$ 136,00 por saca CIF Ponta Grossa, com entrega no começo de setembro e pagamento no fim de setembro. No balcão, os preços em Ponta Grossa ficaram em R$ 128,00”, completa.



Preços parados e negócios apenas pontuais no Mato Grosso do Sul. “O plantio no estado segue atrasado, segundo a CONAB, que não indicou o começo da semeadura no Brasil. O vazio sanitário acabou neste dia 15 para o estado. Dourados R$ 132,00. Campo Grande: R$ 131,00. Maracaju: R$ 131,00. Chapadão do Sul: R$ 129,00. Sidrolândia: R$ 129,00”, indica.

No Mato Grosso, mais especificamente em Sorriso, os preços subiram para R$ 128 por saca FOB, com retirada em outubro e pagamento em novembro, após estarem a R$ 126 na véspera. “Rodaram volumes pontuais. Preços praticados: Campo Verde: R$ 127,10, Lucas do Rio Verde: R$ 125,60. Nova Mutum: R$ 125,90. Primavera do Leste: R$ 128,00. Rondonópolis: R$ 1330. Sorriso: R$ 125,00”, conclui.', '2024-09-18 23:24:16.257', 'Produção', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/4ef974c1892344c3bc0876ae6e260fe7_858x483.jpg');
INSERT INTO public."Noticia" VALUES (91, 'Milho lento no Sul', 'O mercado do Paraná, enquanto isso, segue sem negócios', 'No mercado de milho do estado do Rio Grande do Sul o mercado ainda está lento, segundo informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 63,00; Não-Me-Toque a R$ 64,00; Marau e Gaurama R$ 64,50; Arroio do Meio, Lajeado e Frederico Westphalen a R$ 66,00 e Montenegro a R$ 67,00. Vendedores a partir de R$ 63,00 no FOB interior. Não ouvimos negócios nesta quinta-feira”, comenta.



Em Santa Catarina as indicações foram mantidas. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 60,00 no interior e R$ 63,00/64,00 CIF fábricas. Rumores de negócios a R$ 64,00/64,50 no CIF oeste. Nas indicações, Chapecó a R$ 62,00; Campos Novos R$ 64,00; Rio do Sul a R$ 64,00; Videira R$ 63,00. Em negócios ao oeste, viu-se milho sendo negociado entre R$ 63,00 até 64,00 CIF, a depender do vencimento, onde corretores relatam negócios em pelo menos 5 mil toneladas”, completa.

O mercado do Paraná, enquanto isso, segue sem negócios. “Mercado com negócios pontuais reportados. No porto, indicações a R$ 63,00 set/64,00 nov/65,00 dez. No norte, indicações a R$ 57,00 (+1,00); Cascavel a R$ 56,00 (+2,00); Campos Gerais R$ 59,00 (+1,00); Guarapuava a R$ 58,00; Londrina R$ 57,50. Preços balcão no sudoeste a R$ 52,00; norte a R$ 54,00; oeste R$ 54,00 e centro-oeste R$ 55,00. Rumores de novos negócios na ferrovia Maringá, a R$ 62,00 outubro”, indica.



No Mato Grosso do Sul os preços subiram. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios pontuais em Naviraí, onde uma indústria levou 2 mil tons entrega setembro/pgto final do mês a R$ 54,00”, conclui.', '2024-09-18 23:01:42.13', 'Mercado brasileiro', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/44c7a8418c8843dd81abe850d4635a08_858x483.jpg');
INSERT INTO public."Noticia" VALUES (86, 'EUA: 65% da safra de milho está em boas a excelentes condições', 'Safra de milho alcança 9% dos EUA', 'O relatório do Weekly Weather and Crop Bulletin, publicado pelo Departamento de Comércio dos EUA em parceria com a Administração Oceânica e Atmosférica Nacional (NOAA) e o Departamento de Agricultura (USDA) apontou que 85% da área de milho nos Estados Unidos já estava amassada até 15 de setembro. Esse índice está 3 pontos percentuais abaixo do registrado no ano passado, mas 1 ponto à frente da média dos últimos cinco anos. Quanto à maturidade da safra, 45% da área de milho do país já alcançou esse estágio, um número que é 3 pontos percentuais inferior ao de 2023, mas 7 pontos à frente da média.



Em relação à colheita, 9% da área plantada foi colhida até o fim da semana, o que representa 1 ponto percentual à frente do mesmo período do ano passado e 3 pontos à frente da média histórica. A colheita está em andamento em 15 dos 18 estados produtores estimados.



Além disso, 65% da área de milho do país foi classificada como estando em condições de boas a excelentes, uma melhora de 1 ponto percentual em comparação à semana anterior e 14 pontos acima do registrado no ano passado. No estado de Iowa, maior produtor de milho do país, 77% da safra foi classificada nessas condições favoráveis.', '2024-09-18 22:52:01.439', 'Mundo', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/7b0572e203584a089ebeb0c2b772fc65_858x483.jpg');
INSERT INTO public."Noticia" VALUES (107, 'Benefícios cosméticos dos ovos', 'A clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele', 'Os ovos, além de serem amplamente utilizados na culinária, têm ganhado reconhecimento por seus benefícios cosméticos. Sua composição rica em proteínas, vitaminas e ácidos graxos os torna aliados naturais em tratamentos para a pele e cabelos, promovendo resultados surpreendentes. Na rotina de beleza, os ovos podem ser utilizados de diversas maneiras, oferecendo soluções caseiras eficazes e acessíveis. Um exemplo é a máscara facial feita com clara de ovo, que ajuda a tonificar e firmar a pele. Combinada com iogurte, fonte de ácido láctico, essa mistura esfolia suavemente o rosto, deixando a pele macia e renovada, além de reduzir a aparência de poros dilatados.



A gema do ovo, por sua vez, é uma excelente aliada para os cabelos, especialmente os danificados. Rica em ácidos graxos e vitaminas, a gema restaura a hidratação e o brilho dos fios, transformando cabelos secos e sem vida em madeixas mais saudáveis e luminosas. Para quem sofre com oleosidade no couro cabeludo, a clara do ovo pode ser aplicada como um tratamento eficaz, controlando a produção de óleo e deixando os cabelos mais leves e com aspecto limpo por mais tempo. A clara de ovo também pode ser utilizada em um esfoliante facial, combinado com açúcar, para remover células mortas e revitalizar a pele, promovendo uma aparência renovada e fresca.

Além disso, a clara de ovo tem propriedades que ajudam a clarear manchas escuras na pele e uniformizar o tom, deixando-a mais radiante e luminosa. Aplicar a clara sob os olhos também pode ajudar a reduzir olheiras e inchaços, proporcionando uma aparência descansada. No cuidado com as unhas, a gema do ovo é ideal para ser utilizada como um condicionador para cutículas, hidratando e fortalecendo-as, o que promove unhas mais saudáveis e evita a quebra. Uma máscara capilar feita com ovos, azeite e mel pode proporcionar hidratação profunda aos cabelos, aumentando o brilho e a resistência dos fios.



Outro benefício interessante da clara de ovo é sua propriedade antimicrobiana, devido à presença da enzima lisozima. Essa enzima ajuda a reduzir o tamanho dos poros da pele, prevenindo o acúmulo de sujeira e poeira, o que pode contribuir para a redução da acne. Além disso, a clara de ovo possui propriedades anti-inflamatórias, tornando-se uma opção eficaz para acalmar a pele irritada. Incorporar os ovos na rotina de cuidados pessoais, seja na pele ou nos cabelos, pode ser uma maneira natural e econômica de obter uma aparência mais saudável e radiante.', '2024-09-18 23:37:42.122', 'Saúde', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/33f430c0c10c470f9b69f05d25388dc2_858x483.jpg');
INSERT INTO public."Noticia" VALUES (94, 'Qualidade da soja mantém-se elevada nos EUA', '64% das lavouras estão em boas condições', 'O mais recente relatório do Weekly Weather, divulgado pelo Departamento de Comércio dos EUA em parceria com a Administração Oceânica e Atmosférica Nacional (NOAA) e o Departamento de Agricultura (USDA), indicou que 44% da queda de folhas das lavouras de soja foi concluída até 15 de setembro. Esse número está 3 pontos percentuais atrás do registrado no ano passado, mas 7 pontos à frente da média de cinco anos.



A colheita de soja alcançou 6% de sua área plantada até a mesma data, um avanço de 2 pontos percentuais em relação a 2023 e 3 pontos à frente da média de cinco anos. A colheita já estava em andamento em 17 dos 18 estados estimados.

Em termos de qualidade, 64% das plantações de soja foram classificadas como boas a excelentes em 15 de setembro, um leve recuo de 1 ponto percentual em relação à semana anterior, mas ainda 12 pontos percentuais acima do índice registrado no mesmo período do ano passado.', '2024-09-18 23:22:23.163', 'Internacional', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/5ea92573f29343e192d278c2d3300f4a_858x483.jpg');
INSERT INTO public."Noticia" VALUES (113, 'EUA: milho registra crescimento de produção', 'EUA: milho registra crescimento apesar de área colhida reduzida', 'De acordo com a análise semanal do Instituto Mato-grossense de Economia Agropecuária (Imea), segundo dados divulgados pelo Departamento de Agricultura dos Estados Unidos (USDA) em setembro de 2024, a área colhida para a safra 2024/25 de [milho](https://www.agrolink.com.br/culturas/milho?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos) manteve-se em 33,47 milhões de hectares, uma queda de 4,4% em relação à temporada anterior.



No entanto, a produção apresentou um leve aumento de 0,26% em comparação ao relatório de agosto, totalizando 385,73 milhões de toneladas.

Esse crescimento na produção reflete o bom desempenho das lavouras, com 65% delas classificadas como em condições boas ou excelentes, 9 pontos percentuais acima da média das últimas cinco safras no mesmo período. A colheita começou na semana anterior e, até o dia 15 de setembro, alcançou 9% da área total estimada, o que representa um avanço de 3 pontos percentuais em relação à média histórica.', '2024-09-18 23:39:51.382', 'Internacional', 4, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/df4cec1fdf0a44c3b6cc78fba2aceb13_858x483.jpg');
INSERT INTO public."Noticia" VALUES (111, 'Mercado de açúcar cai 2,4% na semana', 'Outro fator que pressionou os preços foram os bons níveis de chuvas na Índia', 'Segundo informações da StoneX, o mercado de açúcar e etanol registrou quedas significativas na última semana, influenciado por fatores climáticos e econômicos. Os preços do açúcar bruto em Nova Iorque encerraram a semana com uma retração consolidada de 2,4%, situando-se em US¢ 18,03 por libra-peso. Essa queda foi reflexo da divulgação dos dados da safra do Centro-Sul na segunda metade de julho de 2024, além do aumento da aversão ao risco nos mercados financeiros globais.



Outro fator que pressionou os preços do açúcar foram os bons níveis de chuvas na Índia durante a temporada de monções. Esses elementos contribuíram para uma tendência geral de baixa, apesar de uma alta pontual de 0,84% na sexta-feira (16). A combinação desses fatores adversos resultou em um movimento baixista consolidado no mercado.

No mercado de etanol, os dados do CEPEA revelam uma desvalorização de 1,4% no etanol hidratado (média São Paulo) entre os dias 08 e 16 de julho, com o preço ficando em R$ 2,5977 por litro, sem impostos. Essa queda foi influenciada pela desaceleração da demanda em função dos preços elevados. As usinas, ainda em pico de safra, ajustaram seus preços, como mostra o indicador da StoneX para o etanol base PVU Ribeirão Preto-SP, que registrou uma queda de 1,6%, retornando ao patamar de R$ 3,10 por litro.



Mesmo com a estabilidade dos preços entre R$ 3,05 e R$ 3,10 por litro desde o final de julho, as perspectivas para o etanol seguem otimistas, impulsionadas pela robusta demanda. As vendas das usinas do Centro-Sul em julho totalizaram 1,77 milhão de metros cúbicos no mercado interno, o maior volume desde 2019. A continuidade dessa demanda forte sugere que, apesar das recentes quedas, o mercado de etanol pode manter uma tendência altista no curto prazo.', '2024-09-18 23:42:11.67', 'Mercado', 4, 7, 'https://www.agrolink.com.br/upload/imagens-resizes/372fb1c5170f4d328581722abc49303d_858x483.jpg');
INSERT INTO public."Noticia" VALUES (122, 'Frangos tipo resfriado é opção prática para refeição de brasileiros', 'O frango é o alimento de origem animal mais consumido no Brasil', 'O frango é o alimento de origem animal mais consumido no Brasil. Seu elevado valor nutricional, com baixo teor de gordura e alto nível de vitaminas, leva a população a consumi-lo cada vez mais. "Saboroso, versátil e extremamente nutritivo, o frango pode ser servido de diversas formas e faz parte de múltiplas composições culinárias, o que amplia ainda mais sua importância gastronômica em nossas vidas", comenta Mariana Nagata, diretora de marketing da Korin Alimentos. 



O consumo per capita de carne de frangos no Estado de São Paulo é de cerca de 45 quilos anuais. A produção supera 14,8 milhões de toneladas por ano em todo o Brasil. Além disso, as exportações atingiram 5,14 milhões de toneladas, em 2023. Com esses números, o Brasil é líder em exportação e um dos maiores produtores de frangos do mundo, de acordo com a Associação Brasileira de Proteína Animal (ABPA). 

A Korin Alimentos participa desse mercado em expansão. A empresa oferece o Frango tipo Resfriado Korin Boa Pedida - fresco e ideal para preparo rápido. Único no mercado na categoria sustentável, um importante diferencial do produto da Korin é oferecer mais praticidade na hora do preparo, já que não é necessário aguardar o processo de descongelamento para o início do cozimento. Basta retirar da embalagem e preparar. Além disso, está sempre fresco nos supermercados à disposição dos consumidores. 



"As pessoas ajustam seus hábitos alimentares em busca de praticidade. Dessa forma, optam por alimentos mais fáceis de preparar e de rápido cozimento", ressalta a diretora de marketing. "O frango é o prato ideal para quem não tem muito tempo a perder e quer qualidade". 

Com presença majoritária nos mercados de São Paulo e Rio de Janeiro, os Frangos Resfriados Korin Boa Pedida têm rastreabilidade e preocupação com o bem-estar animal. A criação não recebe antibióticos nem anticoccidianos. "Esse sistema faz parte do princípio da Agricultura Natural, preconizado pelo pensador japonês Mokiti Okada (1882-1955), que tem como objetivo resgatar a pureza do solo e dos alimentos e preservar a diversidade e o equilíbrio biológico, contribuindo para a elevação da qualidade da vida humana", informa Mariana. 



Os Frangos Resfriados Korin Boa Pedida são oferecidos nas versões com bandejas de 600 gramas e inteiro. Os cortes disponíveis são: coração, coxa com sobrecoxa sem osso, coxa, coxinha da asa, fígado, filé de coxa com sobrecoxa sem pele, filé de peito, filé sassami, meio da asa, moela, sobrecoxa, sobrecoxa sem pele, sobrecoxa sem osso e frango inteiro.', '2025-02-27 14:47:13.634', 'Gastronomia', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/ffb6701390b3421aa1be8c8368a8b425_858x483.jpg');
INSERT INTO public."Noticia" VALUES (93, 'TESTE Estoques de café no Japão caem, mas demanda mantém projeção estável', 'Demanda aparente no Japão sofreu reduções nos últimos anos', 'TESTESegundo informações divulgadas pela Hedgepoint Global Markets, os estoques de café no Japão continuam em queda. De acordo com os dados mais recentes da Japan Coffee Association (JCA), houve uma redução de 3,3% entre maio e julho, levando o volume para 2,42 milhões de sacas, um nível estável em relação ao ano passado, mas ainda abaixo da média histórica de 2,8 milhões de sacas. Essa diminuição é acompanhada por uma estabilização na demanda aparente para a temporada de 2023/24 (outubro de 2023 a junho de 2024), que já se aproxima dos níveis de 2022/23.

Laleska Moda, analista de café da Hedgepoint, destaca que, apesar dos menores estoques oferecerem suporte para as cotações, a demanda aparente no Japão sofreu reduções nos últimos anos. No entanto, ela ressalta que o consumo está estabilizado, e a expectativa é que a demanda total da temporada 23/24 atinja 6,2 milhões de sacas, o que seria praticamente o mesmo volume de 2022/23.

**Exportações brasileiras batem recorde**

Enquanto o Japão lida com a queda dos estoques, o Brasil registra recordes nas exportações de café. Em agosto, o país exportou 3,73 milhões de sacas, um aumento de 0,7% em relação ao mesmo período do ano passado, segundo dados do Cecafé. Esse crescimento foi impulsionado principalmente pelo conilon, cujas exportações subiram 31,4% e atingiram um novo recorde histórico de 924,6 mil sacas.

A participação do conilon no mercado internacional vem crescendo, especialmente devido à restrição de oferta em países como o Vietnã. "O conilon brasileiro está ganhando força em destinos como a Europa, Japão e outros países asiáticos, e esperamos que essa tendência continue forte em 2024/25", destaca a Hedgepoint.

**Tendências** 

A participação do Brasil nas importações japonesas também aumentou, enquanto países como Vietnã e outros da América Latina perderam espaço. Segundo a Hedgepoint, a oferta limitada no Sudeste Asiático e os problemas climáticos têm impulsionado o café brasileiro, especialmente o conilon, que continua a ser uma escolha preferida por conta do seu preço competitivo.

Com a oferta global de robusta restrita, as exportações brasileiras devem permanecer em níveis elevados, consolidando o país como o principal fornecedor global de café, enquanto os outros produtores lidam com dificuldades de produção.', '2024-10-25 11:55:26.958', 'Internacional', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/697d512ae68a48f3b4330d4177f5cf6e_858x483.jpg');
INSERT INTO public."Noticia" VALUES (125, 'Bahia: exportações do agronegócio batem recorde em outubro', 'Produtos baianos conquistam mais de 100 mercados internacionais', 'De acordo com dados divulgados pela Secretaria da Agricultura, Pecuária, Irrigação, Pesca e Aquicultura (Seagri BA), as exportações do agronegócio da Bahia alcançaram um novo recorde em outubro de 2024, totalizando US$ 745 milhões. O valor representa um crescimento de 14,7% em comparação ao mesmo período de 2023, quando foram registrados US$ 635 milhões. O montante é o maior da série histórica para o mês, de acordo com dados do Ministério da Agricultura e Pecuária (Mapa).

O complexo do cacau foi um dos motores do desempenho. Em outubro de 2023, o setor havia exportado US$ 19,8 milhões, mas em 2024, esse valor mais que dobrou, atingindo US$ 48,1 milhões, impulsionado pela valorização global das cotações da amêndoa, conforme informou a Secretaria de Agricultura.

O café também se destacou, com um crescimento expressivo. As exportações passaram de US$ 15,4 milhões em outubro de 2023 para US$ 29,3 milhões no mesmo período deste ano, quase dobrando de valor.

Outros produtos como fibras, têxteis e o complexo soja também tiveram impacto positivo no recorde de exportações. O setor de produtos florestais, especialmente a celulose, registrou um salto, passando de US$ 101,9 milhões em outubro de 2023 para US$ 155 milhões no mesmo mês de 2024.



Os produtos agrícolas baianos chegaram a mais de 100 destinos internacionais, incluindo mercados estratégicos como China, Europa e Estados Unidos. Esse desempenho reforça a liderança da Bahia nas exportações do agronegócio no Nordeste, com um portfólio diversificado e de alta qualidade, segundo a Seagri BA.', '2024-11-25 22:15:23.551', 'Produção', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/4895c329130443f487d947572fe41b03_858x483.jpg');
INSERT INTO public."Noticia" VALUES (126, 'Escassez e alta demanda disparam preços do café no Brasil', 'Alta é impulsionada por oferta limitada e demanda aquecida', 'Os preços dos cafés arábica e robusta seguem em alta no mercado brasileiro, impulsionados por fatores como oferta limitada e demanda aquecida. Segundo o Boletim Informativo do Cepea (Centro de Estudos Avançados em Economia Aplicada), o Indicador CEPEA/ESALQ do robusta tipo 6, peneira 13 acima, a retirar no Espírito Santo, renovou recordes reais da série histórica iniciada em novembro de 2001. No acumulado de 2024, a valorização ultrapassa 100%, reflexo direto da restrição de oferta no Brasil e no Vietnã, somada aos elevados preços do arábica.

Já o Indicador CEPEA/ESALQ do arábica tipo 6, bebida dura para melhor, posto na capital paulista, atingiu valores acima de R$ 1.800 por saca de 60 kg, o maior patamar real desde 1998. No ano, a alta acumulada é de quase 80%, atribuindo-se este cenário à baixa oferta, ao alto percentual de café já comercializado pelos produtores e à safra 2024/25 menos volumosa.

Pesquisadores do Cepea destacam ainda que as condições debilitadas das plantas podem comprometer a produção da safra 2025/26, elevando a atenção de agentes do setor para o desenvolvimento da próxima temporada.', '2024-11-25 22:16:05.476', 'Crise', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/23d61fdfe61b49658e6868ca9fe6e4c6_858x483.jpg');
INSERT INTO public."Noticia" VALUES (127, 'Fertilizantes podem garantir sabor diferenciados no café', 'Cafeicultores estão adotando tecnologias inovadoras', 'O Brasil, líder mundial na produção e exportação de café, não se destaca apenas pela quantidade – cerca de 69,9 milhões de sacas estimadas para a safra 2024/25 – mas também pela qualidade dos grãos. Cada vez mais, a busca por uma produção sustentável tem incentivado cafeicultores a adotarem tecnologias inovadoras, como os fertilizantes organominerais, que prometem melhorar o manejo do solo e elevar a qualidade final do produto.



Maycon Cardoso, produtor de Brejetuba, na região serrana do Espírito Santo, é um exemplo de como esses insumos estão revolucionando a cafeicultura. Brejetuba, reconhecida como a maior produtora de café arábica do estado, também lidera em inovações. "Os fertilizantes químicos funcionam bem, mas são menos sustentáveis. Por isso, optei pelos organominerais, que trazem benefícios não só para a planta, mas também para a preservação do solo", afirma Maycon.

Maycon começou a utilizar fertilizantes à base de matéria orgânica, como a proveniente de camas de aves, para preparar o solo antes do plantio. Trinta dias depois, aplicou bioorganominerais no manejo de cobertura. "São nutrientes essenciais para o café, e acredito que esse manejo sustentável pode até mesmo resultar em grãos com aroma e sabor diferenciados, o que o mercado valoriza muito", projeta.

A tecnologia por trás dos fertilizantes organominerais combina nutrientes orgânicos e minerais, melhorando as propriedades químicas, físicas e biológicas do solo. Além disso, essa prática está alinhada à economia circular, já que reutiliza resíduos como as camas de aves, que poderiam ser descartados.

Nilton Rezende Junior, consultor de cafeicultura, explica que a utilização de fertilizantes organominerais reduz a necessidade de insumos químicos, o que beneficia tanto o meio ambiente quanto a competitividade do café brasileiro no mercado internacional. "O consumidor busca cada vez mais produtos com baixa pegada ambiental, e certificações que garantem isso são valorizadas", destaca.', '2024-11-25 22:17:22.004', 'Inovação', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/cef8cfa5ebf64341bfee8b7e13e02c5a_858x483.jpg');
INSERT INTO public."Noticia" VALUES (131, 'Mercado de milho segue lento', 'No Paraná as tradings miram em vencimentos mais longos', 'O mercado de milho do estado do Rio Grande do Sul segue lento, segundo informações divulgadas pela TF Agroeconômica. “Nas indicações, manutenção: Santa Rosa a R$ 73,00; Não-Me-Toque a R$ 74,00; Marau e Gaurama R$ 74;00 Arroio do Meio, Lajeado e Frederico Westphalen a R$ 75,00 e Montenegro a R$ 77,00. Vendedores a partir de R$ 80,00 no FOB interior e R$ 82,00 CIF fábricas. Negócios pontuais em Palmeira das Missões e Erechim, onde 300 toneladas foram negociadas a R$ 75,00, e 500 toneladas rodaram a R$ 75,50, respectivamente, na entrega imediata”, comenta.



Em Santa Catarina, o produtor não vem à mesa de negócios e o milho diferido está praticamente finalizado. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 72,00 no interior e R$ 73,00/75,00 CIF fábricas. Negócios aR$ 75,00/76,00 no CIF meio oeste, em pelo menos 2 mil tons. Nas indicações, Chapecó a R$ 74,00; Campos Novos R$ 75,00; Rio do Sul a R$ 76,00; Videira R$ 73,00. Porto indicando R$ 67 outubro/R$ 69 novembro. Sem negócios neste retorno de feriado”, completa.

No Paraná as tradings miram em vencimentos mais longos e praticamente não trabalham mais o dez/24. “No porto, indicações a R$ 68,00 nov/69,00 dez.No norte, indicações a R$ 67,00 (+1,00); Cascavel a R$ 68,00; Campos Gerais R$ 69,00; Guarapuava a R$ 70,00; Londrina R$ 71,00 (+1,00). Preços balcão no sudoeste e oeste a R$ 58,00, e norte a R$ 57,00. Produtores com pedidas a partir de R$ 77,00 no norte e oeste; e R$ 79,00 Campos Gerais. Negócios ao oeste, onde se pagou R$ 73,00 FOB por 2 mil toneladas, retirada imediata e pagamento em 30 dias”, indica.



Enquanto isso, os negócios se arrastam no estado do Mato Grosso do Sul. “Em Maracaju, indicações de R$53,00 (+1,00);Dourados aR$ 54,00 (+R$1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios em ritmo lento, com produtores iniciando pedidas a R$ 58,00 no FOB, e indicações nos portos a partir de R$ 60,00”, conclui.', '2024-11-25 22:22:20.763', 'Mercado', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/db1ed13edad74ab796b4be7c4d6d27a8_858x483.jpg');
INSERT INTO public."Noticia" VALUES (133, 'Brasil deve alcançar recorde na produção de soja', 'Preço da soja recua no Brasil', 'De acordo com a Central Internacional de Análises Econômicas e de Estudos de Mercado Agropecuário (Ceema), os preços da soja no Brasil apresentaram leve queda na última semana, com o câmbio oscilando entre R$ 5,70 e R$ 5,80 por dólar. No Rio Grande do Sul, o preço médio foi de R$ 128,87 por saca, enquanto em outras praças variou entre R$ 120,00 e R$ 146,00 por saca.



O relatório trouxe uma retração nos preços, a produção brasileira de soja para 2025 deve atingir 167,7 milhões de toneladas, segundo a Abiove, e 166,1 milhões de toneladas, conforme a Conab – ambos representando recordes históricos.  

Com essa produção, o Brasil deve exportar 104,1 milhões de toneladas de grãos, um aumento de 5,9% em relação ao ciclo anterior. O processamento interno de soja também deverá crescer, atingindo 57 milhões de toneladas, resultando em 44 milhões de toneladas de farelo de soja e 11,4 milhões de toneladas de óleo de soja, conforme projeções da Abiove.

Segundo o Ceema, apesar da alta na produção, as exportações de óleo de soja devem cair 23,1%, com apenas 1 milhão de toneladas previstas para 2025. A redução é explicada pelo aumento na mistura de biodiesel no diesel fóssil, que passou de 14% para 15%, ampliando a demanda doméstica pelo produto.



Entre janeiro e outubro, o Brasil exportou 67,8 milhões de toneladas de soja em grãos para a China, um aumento de 13,6% em relação ao mesmo período do ano passado. Já os Estados Unidos exportaram 15,1 milhões de toneladas para o país asiático, marcando uma queda de 13% no mesmo intervalo.

Para 2025, o complexo soja brasileiro pode gerar uma receita de US$ 50,9 bilhões, ligeiramente abaixo dos US$ 53,1 bilhões registrados em 2024, impactado pela volatilidade cambial e pelos preços médios, conforme apontou o Ceema.', '2024-11-25 22:24:35.947', 'Brasil', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/fe332bc5c23441859bb15809dab93820_858x483.jpg');
INSERT INTO public."Noticia" VALUES (134, 'MT: esmagamento de soja atinge 1,03 milhão de toneladas', 'Preço da soja pressiona margem bruta das indústrias', 'O setor de esmagamento de soja em Mato Grosso alcançou resultados expressivos em outubro de 2024. O volume processado atingiu 1,03 milhão de toneladas, um crescimento de 3,48% em relação ao mesmo mês de 2023 e 18,18% acima da média dos últimos três anos, conforme análise semanal do Instituto Mato-grossense de Economia Agropecuária (IMEA)

No acumulado de janeiro a outubro de 2024, o estado registrou 10,48 milhões de toneladas esmagadas, marcando um aumento de 6,18% em comparação com o mesmo período do ano passado. Durante o ano, apenas nos meses de janeiro e setembro o processamento ficou abaixo de 1,00 milhão de toneladas, destacando o ritmo consistente das indústrias locais.



Segundo a Imea, o crescimento reflete, principalmente, o aumento da capacidade de processamento e a elevação da demanda por óleo e farelo de soja. No entanto, a margem bruta das indústrias registrou recuo em outubro, atingindo R$ 396,79 por tonelada, o que representa uma queda de 14,77% em relação a setembro. Essa redução foi atribuída à valorização do preço da soja, que superou os aumentos nos valores dos coprodutos.', '2024-11-25 22:25:12.086', 'Preço', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/6af4098d11e64571b86680d450a65ad3_858x483.jpg');
INSERT INTO public."Noticia" VALUES (135, 'Safra de 2025 deve ter incremento de 5,8% frente a 2024', 'Crescimento da produção de soja influenciou positivamente o primeiro prognóstico', 'De acordo com o primeiro prognóstico do Levantamento Sistemático da Produção Agrícola (LSPA), divulgado hoje (14) pelo IBGE, a safra brasileira de grãos, cereais e leguminosas deve somar 311,0 milhões de toneladas em 2025. Essa produção representa um aumento de 5,8% em relação à safra de 2024, ou 17,2 milhões de toneladas a mais.

“A safra de cereais, leguminosas e oleaginosas de 2024 enfrentou uma série de problemas climáticos em diversas unidades da federação, notadamente falta de chuvas e excesso de calor, sendo que no Rio Grande do Sul ainda tivemos excesso de chuvas e enchentes em abril/maio, o que retirou da safra brasileira em torno de cinco milhões de toneladas de grãos. Para 2025, embora os preços dos principais produtos não estejam apresentando uma boa rentabilidade, se tivermos um clima se comportando próximo a uma normalidade esperada, com as lavouras apresentando uma boa produtividade, teremos uma recuperação da safra brasileira, o que é importante para o controle da inflação e para o aumento das exportações brasileiras”, destaca Carlos Barradas, gerente do LSPA. 

A primeira estimativa indica que a produção de soja deve ter aumento de 10,9% em 2025, quando comparado com 2024, totalizando 160,2 milhões de toneladas, o que caracterizaria um novo recorde na produção nacional da leguminosa, superando a produção registrada no ano de 2023.  A estimativa para a produção de milho em 2025 é de 115,9 milhões de toneladas, aumento de 0,3% em relação à safra colhida em 2024. Para o milho 1ª safra, a estimativa é de uma produção de 24,9 milhões de toneladas, um crescimento de 9,1% em relação à safra de 2024, com declínio de 2,1% na área a ser colhida e crescimento de 11,4% no rendimento médio das lavouras. Já para o milho 2ª safra é estimada uma produção de 91,0 milhões de toneladas, redução de 1,8% na comparação com 2024.', '2024-11-25 22:26:31.299', 'Mercado', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/a99d0aebf0194119a3bb4c6ae10e78ad_858x483.jpg');
INSERT INTO public."Noticia" VALUES (136, 'Colheita concluída nos EUA derruba cotações da soja', 'Cotações da soja em Chicago encerraram a semana em queda', 'As cotações da soja em Chicago encerraram a semana em queda, refletindo o avanço da colheita nos Estados Unidos e ajustes nas expectativas de mercado. Segundo dados da Central Internacional de Análises Econômicas e de Estudos de Mercado Agropecuário (CEEMA), o bushel da oleaginosa para o primeiro mês fechou a quinta-feira (21/11) cotado a US$ 9,77, contra US$ 9,85 registrado na semana anterior.



O farelo de soja seguiu o mesmo movimento de baixa, enquanto o óleo se manteve estável, mas com viés de desvalorização, pressionando as margens de comercialização do complexo soja .

No entanto, os embarques de soja dos Estados Unidos continuam dentro das expectativas. Na semana encerrada em 14/11, o volume exportado alcançou 2,16 milhões de toneladas. No acumulado do ano comercial, as vendas externas já somam 17,5 milhões de toneladas, um aumento de 9% em relação ao mesmo período de 2023, conforme análise da CEEMA.



Com o ritmo da colheita encerrado, o foco do mercado se volta agora para a demanda internacional e as negociações com a China, principal compradora do grão norte-americano.', '2024-11-25 22:27:12.523', 'Soja', 3, 3, 'https://www.agrolink.com.br/upload/imagens-resizes/05e8e6f17d8d4bee82accf8038704e95_858x483.jpg');
INSERT INTO public."Noticia" VALUES (137, 'Mercado do boi gordo encerra semana com alta', 'Semana foi marcada por altas nas cotações', 'De acordo com a análise do informativo "Tem Boi na Linha" da Scot Consultoria, o mercado pecuário começou a semana com uma valorização. A arroba do boi gordo registrou alta de R$ 3,00, enquanto as cotações da vaca e da novilha permaneceram estáveis em diversas praças.

No Sudoeste do Mato Grosso, a cotação da arroba da vaca subiu R$ 2,00, enquanto a da novilha apresentou uma elevação mais expressiva, de R$ 5,00. Já o preço do boi gordo manteve-se inalterado na região.

No atacado, os preços da carne bovina com osso registraram aumento significativo na comparação semanal. A carcaça do boi capão casado subiu 4,5%, enquanto a carcaça do boi casado inteiro teve alta de 4,0%. A carcaça da vaca casada e a novilha casada também acompanharam o movimento de alta, com valorização de 3,1% e 3,7%, respectivamente.

Na análise dos cortes, o destaque foi a ponta de agulha do boi casado inteiro, com aumento de 5,5%. Já o corte traseiro 1x1 do boi capão liderou as altas, registrando valorização de 5,2%.

O mercado de carnes alternativas seguiu a tendência de valorização. A carcaça de suíno especial e o frango médio especial apresentaram variação positiva de 3,0% na segunda semana de novembro. O cenário atual reflete um momento de forte demanda e movimentação positiva no setor de carnes, com expectativas de manutenção das altas para os próximos períodos, especialmente nas categorias mais valorizadas.', '2024-11-25 22:54:07.173', 'Bovinos', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/d9b0de8e3ae2489496ae0d43a05445ab_858x483.jpg');
INSERT INTO public."Noticia" VALUES (141, 'Produção de leite no Brasil avança, mas preços sinalizam queda', 'Cenário político e econômico mundial segue pressionando os mercados', 'O cenário político e econômico mundial segue pressionando os mercados, com efeitos diretos sobre a cadeia de lácteos. A retração da demanda chinesa, associada ao estímulo à produção doméstica no país asiático, impacta significativamente o comércio global. Projeções indicam que as importações de leite pela China devem cair de 24 milhões para 20 milhões de litros equivalentes por dia entre 2023 e 2024, segundo relatório do Centro de Inteligência do Leite da Embrapa.

Embora essa desaceleração pressione o mercado internacional, o ajuste entre oferta e demanda nos principais exportadores começa a equilibrar as cotações. A recuperação das margens de rentabilidade nos países produtores deve sustentar um aumento na produção global nos próximos meses.

No Brasil, o crescimento econômico de 3,1% projetado pelo Boletim Focus para 2024 e a expansão da massa de renda continuam favorecendo o consumo de lácteos. A oferta nacional cresceu 2,4% nos últimos 12 meses encerrados em setembro, com destaque para as importações, que subiram 12,3% e agora representam 9% do mercado interno.

Apesar disso, o aumento da produção doméstica ainda é tímido, mesmo com termos de troca favoráveis ao produtor, os melhores dos últimos quatro anos. Problemas como altos custos de produção, dificuldade de acesso a mão de obra e a saída de produtores do setor limitam uma expansão mais robusta.

No varejo, o preço do leite, que vinha em alta nos últimos meses, começa a sinalizar queda devido à maior oferta sazonal no último trimestre e à dificuldade do mercado consumidor em absorver novos aumentos. Já há registros de redução de preços no mercado atacadista de São Paulo e no mercado Spot. Para o produtor, a rentabilidade tende a sofrer leve recuo, com custos de produção em alta pelo segundo mês consecutivo, conforme medido pelo ICPLeite/Embrapa. Ainda assim, a tendência para o último trimestre do ano é de ajustes no setor, equilibrando oferta, demanda e preços.', '2024-11-26 19:46:23.968', 'Preços', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/130ee9b567ed4a33a35e6054c6ad5fe9_858x483.jpg');
INSERT INTO public."Noticia" VALUES (140, 'A qualidade do capim é essencial', 'Análises são fundamentais para adaptar a nutrição às necessidades dos animais', 'O preço do leite pago ao produtor em Mato Grosso subiu pelo sexto mês consecutivo, de acordo com o Instituto Mato-Grossense de Economia Agropecuária (Imea). Em outubro de 2024, o valor do litro do leite atingiu cerca de R$ 2,38, referente ao leite captado em setembro, o que representa um aumento de 1,71% em comparação ao mês anterior e uma valorização anual de 23,83%. Esse é o maior valor registrado desde outubro de 2022 no estado.

O aumento dos preços está relacionado à menor oferta de leite no Mato Grosso, devido à redução da produção em algumas regiões, além de uma demanda crescente dos laticínios pela matéria-prima, impulsionada pelo crescimento do consumo de derivados lácteos. A muçarela industrial, por exemplo, apresentou incremento de 2,85% em relação ao mês anterior e de 27,83% comparado a agosto de 2023.



Com a expectativa de chuvas nos próximos meses, o que deve favorecer a recuperação das [pastagens](https://www.agrolink.com.br/culturas/pastagens?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos), espera-se que a produção de [leite](https://www.agrolink.com.br/cotacoes/carnes/bovinos/?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos) aumente, o que pode, eventualmente, reduzir os preços pagos aos produtores.', '2025-02-27 14:47:13.634', 'Bovinos', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/ba9fc7142dde4c59b2d5efddd7eadfc7_858x483.jpg');
INSERT INTO public."Noticia" VALUES (143, 'Café: Restrição na oferta sustenta preços', 'Essas previsões também refletem uma tendência global', 'De acordo com o Relatório da Hedgepoint Global Markets, as condições climáticas adversas, como seca e altas temperaturas, podem impactar negativamente o potencial produtivo da safra de café 25/26 no Brasil, especialmente no caso do café arábica. A expectativa é de uma leve retração na produção deste grão, estimada em 1,4%, enquanto o café conilon deve apresentar um aumento significativo de 12,2% em relação ao ano anterior.', '2024-11-26 19:48:09.07', 'Tendências', 3, 6, 'https://www.agrolink.com.br/upload/imagens-resizes/94c9463d22574c0a82c25f14b32c272c_858x483.jpg');
INSERT INTO public."Noticia" VALUES (144, 'Potencial da carne bovina no México', 'A Abiec apresentou dados sobre a evolução dos embarques', 'A Associação Brasileira das Indústrias Exportadoras de Carne (Abiec) divulgou uma nota informando sua participação em um evento realizado na Embaixada do Brasil no México, na quinta-feira (29). A iniciativa, organizada em parceria com a Associação Brasileira de Proteína Animal (ABPA), fez parte de uma missão oficial promovida pelo Ministério da Agricultura e Pecuária (Mapa) ao país. O México, um dos mercados mais recentes abertos à carne bovina brasileira, tem registrado um crescimento expressivo nas exportações, fato destacado pela Abiec durante o encontro.Segundo a nota, a Abiec apresentou dados sobre a evolução dos embarques de carne bovina para o México, que tiveram um salto significativo entre janeiro e julho de 2024, comparado ao mesmo período de 2023. O volume exportado passou de 288 toneladas em 2023 para impressionantes 23.108 toneladas em 2024. A diretora de **Relações Internacionais da Abiec**, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.A associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México.

&#x20;A diretora de Relações Internacionais da Abiec, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.A associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a **Abiec** ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México.

&#x20;A diretora de Relações Internacionais da **Abiec**, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.A associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México.  A diretora de Relações Internacionais da Abiec, Lhais Sparvoli, atribuiu esse crescimento à alta demanda do mercado mexicano por carne de qualidade e ao reconhecimento dos rigorosos padrões de segurança e sanidade da carne brasileira.A associação também destacou o papel crucial da parceria com a ApexBrasil, através do projeto Brazilian Beef, no sucesso dessas exportações. Além de fortalecer o comércio bilateral, a Abiec ressaltou que as importações de carne bovina brasileira ajudam o México a otimizar seu mix de produtos exportados, permitindo ao país atender à demanda interna e ganhar escala para exportar outros cortes estratégicos. Na nota, Lhais Sparvoli conclui que eventos como esse são fundamentais para estreitar as relações bilaterais e fazem parte de uma agenda estratégica contínua, visando à consolidação e ao crescimento do mercado de carne bovina brasileira no México', '2024-11-26 19:50:23', 'Internacional', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/95ab384ea6a44cb69ae5ea6001e40917_858x483.jpg');
INSERT INTO public."Noticia" VALUES (1, 'Com 70% colhido, milho silagem mantém boa produtividade', 'Colheita de milho silagem segue dentro das projeções', 'A colheita do milho para silagem segue avançando no Rio Grande do Sul, com 70% da área já finalizada, de acordo com o boletim conjuntural da Emater/RS-Ascar, divulgado na última quinta-feira (20). A produtividade está próxima das estimativas iniciais e considerada satisfatória.



As lavouras semeadas em novembro estão na fase de enchimento de grãos, beneficiadas pelas chuvas recentes, que melhoraram os níveis de umidade do solo e garantiram um desenvolvimento adequado, resultando em uma silagem de alta qualidade bromatológica.

Já as áreas implantadas tardiamente, na segunda quinzena de janeiro, receberam adubação nitrogenada e potássica e, até o momento, não enfrentaram estresse hídrico significativo, favorecendo o crescimento e o acúmulo de biomassa.

Na região da Campanha, a melhora na distribuição das chuvas e a redução das temperaturas beneficiaram lavouras plantadas no início de dezembro, que agora se encontram nas fases de pendoamento, embonecamento e polinização, etapas cruciais para definir o potencial produtivo.



Na Fronteira Oeste, especialmente em Santana do Livramento, o retorno das chuvas pode favorecer a granação do milho. No entanto, devido ao estresse hídrico prolongado, muitas lavouras apresentam porte reduzido e desfolhação intensa, o que levou produtores a antecipar a ensilagem para evitar maiores perdas.

Na região de Erechim, 95% da colheita já foi concluída, e os 5% restantes estão prontos para serem colhidos. A produtividade supera 45 mil kg/ha, e os preços da silagem variam entre R$ 0,40/kg na lavoura e R$ 0,65/kg ensacada.', '2025-02-27 14:04:46.853', 'No RS', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/fb11bf41cd9144e9a90331d8cf280bfd_858x483.jpg');
INSERT INTO public."Noticia" VALUES (142, 'Milho segue lento nos principais estados', 'No Paraná, as tradings miram em vencimentos mais longos', 'O mercado do milho do estado do Rio Grande do Sul segue lento, segundo informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 73,00; Não-Me-Toque a R$ 74,00; Marau e Gaurama R$ 74;00 Arroio do Meio, Lajeado e Frederico Westphalen a R$ 75,00 e Montenegro a R$ 77,00. Vendedores a partir de R$ 80,00 no FOB interior e R$ 82,00 CIF fábricas. Negócios pontuais em Palmeira das Missões e Erechim, onde 300 toneladas foram negociadas a R$ 75,00, e 500 toneladas rodaram a R$ 75,50, respectivamente, na entrega imediata”, comenta.

Em Santa Catarina, os fretes vêm aumentando devido à chegada do final de ano, mas os negócios não ocorrem. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 72,00 no interior e R$ 73,00/75,00 CIF fábricas. Negócios a R$ 75,00/76,00 no CIF meio oeste, em pelo menos 2 mil tons. Nas indicações, Chapecó a R$ 74,00; Campos Novos R$ 75,00; Rio do Sul a R$ 76,00; Videira R$ 73,00. Porto indicando R$ 67 outubro/R$ 69 novembro. Sem negócios neste retorno de feriado”, completa.

No Paraná, as tradings miram em vencimentos mais longos e praticamente não trabalham mais o dez/24. “Mercado sem negócios. No porto, indicações a R$ 68,00 nov/69,00 dez. No norte, indicações a R$ 67,00 (+1,00); Cascavel a R$ 68,00; Campos Gerais R$ 69,00; Guarapuava a R$ 70,00; Londrina R$ 71,00 (+1,00). Preços balcão no sudoeste e oeste a R$ 58,00, e norte a R$ 57,00. Produtores com pedidas a partir de R$ 77,00 no norte e oeste; e R$ 79,00 Campos Gerais. Não ouvimos sobre negócios no dia de hoje”, indica.

Os negócios estão lentos também no Mato Grosso do Sul. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Negócios em ritmo lento, com produtores iniciando pedidas a R$ 58,00 no FOB, e indicações nos portos a partir de R$ 60,00”, conclui.', '2025-02-27 14:47:13.634', 'Mercado', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/df4cec1fdf0a44c3b6cc78fba2aceb13_858x483.jpg');
INSERT INTO public."Noticia" VALUES (2, 'Expansão do algodão supera expectativas no Brasil', 'O uso de mapeamento por satélite foi essencial para obter maior precisão', 'A área plantada com algodão no Brasil cresceu 21,9% na safra 2023/24, ultrapassando 2 milhões de hectares, conforme estudo da Serasa Experian, divulgado pela Santiago Cotton no LinkedIn. Esse aumento superou as estimativas iniciais de 1,9 milhão de hectares, destacando a expansão significativa da cultura no país.  

O uso de mapeamento por satélite foi essencial para obter maior precisão na identificação das áreas cultivadas, permitindo um monitoramento mais detalhado da produção. A tecnologia possibilitou a revisão das estimativas e reforçou a importância do sensoriamento remoto para o setor agrícola.  

Mato Grosso e Bahia seguem como os principais estados produtores, com destaque para municípios como Sapezal (MT) e São Desidério (BA). Essas regiões possuem forte tradição no cultivo do algodão e continuam a impulsionar a produção nacional, consolidando a competitividade brasileira no mercado global.  

Além da ampliação da área plantada, o avanço tecnológico tem sido crucial para o setor. O uso de sensoriamento remoto contribui não apenas para o monitoramento das lavouras, mas também para um planejamento estratégico mais eficiente, garantindo maior produtividade e sustentabilidade na cotonicultura.

“O mapeamento por satélite foi fundamental para identificar com precisão as áreas cultivadas, superando as estimativas iniciais de 1,9 milhão de hectares. Mato Grosso e Bahia lideram a produção, com destaque para municípios como Sapezal (MT) e São Desidério (BA).  A tecnologia de sensoriamento remoto também tem sido crucial para melhorar o monitoramento agrícola e contribuir para o planejamento estratégico do setor”, conclui.', '2025-02-27 14:05:40.653', 'Valorização', 3, 1, 'https://www.agrolink.com.br/upload/imagens-resizes/6afbd140021649778a93fa5544598ff8_858x483.jpg');
INSERT INTO public."Noticia" VALUES (3, 'Preço do trigo segue em alta no Brasil', 'Compradores enfrentam dificuldades para encontrar lotes com bom padrão', 'Os preços do trigo em grão continuam em alta no Brasil, impulsionados pela escassez de produto de qualidade no mercado interno. De acordo com o boletim informativo do Cepea, compradores enfrentam dificuldades para encontrar lotes com bom padrão, o que tem levado à priorização das importações.Por outro lado, vendedores, com estoques reduzidos, evitam fechar novos negócios à espera de cotações ainda mais elevadas nos próximos meses, em plena entressafra nacional. Segundo o Cepea, a comercialização do trigo com PH igual ou superior a 78 está restrita a lotes pontuais, reforçando a limitação da oferta interna.

Enquanto isso, os produtores já começam a se planejar para a próxima safra. Dados oficiais apontam uma redução de 2,1% na área plantada no Brasil, mas a expectativa de aumento na produtividade deve garantir uma oferta maior em 2025 na comparação com o ano anterior.

De acordo com o boletim informativo do Cepea, compradores enfrentam dificuldades para encontrar lotes com bom padrão, o que tem levado à priorização das importações.Por outro lado, vendedores, com estoques reduzidos, evitam fechar novos negócios à espera de cotações ainda mais elevadas nos próximos meses, em plena entressafra nacional. Segundo o Cepea, a comercialização do trigo com PH igual ou superior a 78 está restrita a lotes pontuais, reforçando a limitação da oferta interna. Enquanto isso, os produtores já começam a se planejar para a próxima safra. Dados oficiais apontam uma redução de 2,1% na área plantada no Brasil, mas a expectativa de aumento na produtividade deve garantir uma oferta maior em 2025 na comparação com o ano anterior.', '2025-02-27 14:14:14.247', 'Mercado', 3, 5, 'https://www.agrolink.com.br/upload/imagens-resizes/ab6ced5934814ee0a4748f0089ed3803_858x483.jpg');
INSERT INTO public."Noticia" VALUES (6, 'Santa Catarina registra crescimento nas exportações de frango em julho', 'Exportações de frango crescem mesmo com embargos temporários', 'O Boletim Agropecuário de agosto do Centro de Socioeconomia e Planejamento Agrícola (Epagri/Cepa) destacou que, na primeira quinzena de agosto, os preços do frango vivo apresentaram aumento nos dois principais estados produtores do país: 2,6% no Paraná e 0,5% em Santa Catarina, em relação ao mês anterior. Comparando com agosto de 2023, os preços subiram 5,2% em Santa Catarina e 2,0% no Paraná, considerando os valores nominais.



Em Santa Catarina, entre as três regiões monitoradas pela Epagri/Cepa, apenas o Oeste registrou variação positiva na primeira quinzena de agosto, com alta de 1,8%. As regiões do Meio Oeste e Litoral Sul mantiveram os preços inalterados no período. Em relação a agosto de 2023, houve alta de 24,3% no Meio Oeste, mas quedas de 3,6% no Litoral Sul e 12,6% no Oeste, considerando os preços ajustados pelo IGP-DI.

No atacado, todos os cortes de carne de frango acompanhados pela Epagri/Cepa registraram variações negativas em comparação ao mês anterior: -1,7% para o filé de peito, -1,5% para o peito com osso, -1,0% para a coxa/sobrecoxa e -0,3% para o frango inteiro congelado. A média dos cortes caiu 1,1% no período, embora no ano acumulem uma alta de 17,4% em valores nominais. Comparando com agosto de 2023, houve alta em todos os cortes, com destaque para o filé de peito (35,5%) e peito com osso (33,5%). A variação média foi de 21,3%, considerando os valores corrigidos pelo IGP-DI.

De acordo com a Embrapa Suínos e Aves, o custo de produção de frangos em aviário climatizado positivo em Santa Catarina foi de R$ 4,75/kg de peso vivo em julho, um aumento de 3,3% em relação ao mês anterior e 3,0% em comparação com julho de 2023. A relação de troca insumo-produto caiu ligeiramente na primeira quinzena de agosto (-0,3%), devido à alta do preço do milho na região Oeste (1,5%) e a elevação do preço do frango vivo (1,8%). Atualmente, essa relação de troca está 19,7% acima do registrado em agosto de 2023.



Segundo o Boletim Agropecuário, o Brasil exportou 452,6 mil toneladas de carne de frango em julho, um crescimento de 6,4% em relação ao mês anterior e 7,2% em comparação com julho de 2023. As receitas foram de US$ 874,4 milhões, aumento de 12,1% em relação a junho e de 3,5% em comparação com julho de 2023. Esse resultado é notável, especialmente considerando a confirmação de um foco da doença de Newcastle em uma avicultura comercial no Rio Grande do Sul em julho, o que levou à suspensão das importações de carne de frango do estado por 44 destinos, além de 5 destinos que suspenderam as importações de todo o Brasil. O controle rápido e efetivo do foco permitiu a retomada das exportações, com a maioria dos embargos sendo limitados apenas ao Rio Grande do Sul.

Apesar da rápida retomada, a Associação Brasileira de Proteína Animal (ABPA) revisou para baixo sua projeção para as exportações de carne de frango em 2024, prevendo agora 5,25 milhões de toneladas, um crescimento de 2,2% em relação a 2023. De janeiro a julho, o Brasil exportou 2,98 milhões de toneladas, com receitas de US$ 5,43 bilhões, ligeira queda de 0,1% em volume e de 8,1% em valor em comparação com o mesmo período de 2023.

Santa Catarina destacou-se nas exportações em julho, com embarques de 103,2 mil toneladas de carne de frango, um aumento de 11,8% em relação ao mês anterior e 14,7% em comparação com julho de 2023. As receitas totalizaram US$ 206,0 milhões, um crescimento de 18,1% em relação a junho e de 5,2% na comparação anual. O valor médio da carne de frango in natura exportada pelo estado foi de US$ 1.936,47 por tonelada, um aumento de 5,9% em relação ao mês anterior, embora 6,9% abaixo do valor de julho de 2023. No acumulado de janeiro a julho, Santa Catarina exportou 666,6 mil toneladas, gerando receitas de US$ 1,28 bilhão, com alta de 5,0% em volume, mas queda de 7,3% em valor, em comparação com o mesmo período de 2023.



A produção de frangos em Santa Catarina também apresentou crescimento. Nos primeiros sete meses de 2024, foram produzidos 514,8 milhões de frangos, um aumento de 1,9% em relação ao mesmo período do ano anterior. Até 15 de agosto, haviam sido confirmados 166 focos de influenza aviária de alta patogenicidade (IAAP) no Brasil, 21 deles em Santa Catarina. Contudo, nenhum desses casos ocorreu em aves comerciais no Brasil até o momento.', '2025-02-27 14:30:18.984', 'Santa Catarina', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/62c6814400374581a156a5bf8c1c6fc7_858x483.jpg');
INSERT INTO public."Noticia" VALUES (4, 'Fertirrigação impulsiona a pecuária no Sul', '"O mercado de irrigação para pastagens na região Sul é gigantesco"', 'A pecuária na região Sul do Brasil enfrenta desafios crescentes com estiagens prolongadas e eventos climáticos extremos. A expansão da agricultura, especialmente da [soja](https://www.agrolink.com.br/culturas/soja?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos), tem reduzido áreas tradicionalmente destinadas à criação de gado, exigindo estratégias para manter a produtividade em espaços menores. Diante desse cenário, a irrigação tem se mostrado uma alternativa eficiente para garantir a oferta de alimento ao rebanho durante todo o ano.  Com a frequência das secas, a capacidade das pastagens de fornecer nutrientes de forma contínua tem sido comprometida. A irrigação por aspersão, por exemplo, melhora a absorção de água e nutrientes, permitindo maior desempenho das forrageiras. Apesar de ainda pouco utilizada, essa tecnologia apresenta grande potencial de crescimento na região.  

"As pastagens possuem raízes fasciculadas, geralmente com predominância de 3 a 15 centímetros de profundidade, a aspersão consegue criar um bulbo molhado ideal para que as plantas tenham maior performance na busca por nutrientes e água. Isso representa uma grande oportunidade. O mercado de irrigação para pastagens na região Sul é gigantesco, com vasto potencial de crescimento”, destaca Geferson Reis, especialista da Netafim.

Além dos benefícios climáticos, o investimento em irrigação tem sido impulsionado pelo bom momento do mercado pecuário, com preços elevados e demanda crescente por carne. Em propriedades que adotaram a técnica, os ganhos diários de peso do gado têm sido superiores, contribuindo para a compensação da redução de áreas de pastagem e garantindo maior eficiência na produção.', '2024-01-27 14:16:27.923', 'Tecnologia', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/40c30f9fa2a44e6daf1f15a1ba3e9d42_858x483.jpg');
INSERT INTO public."Noticia" VALUES (5, 'Fim do estado de emergência para doença de newcastle no RS', 'MAPA declara fim do estado estado de emergência zoossanitária no Rio Grande do Sul', 'O Ministério da Agricultura e Pecuária (Mapa) publicou nesta terça-feira, 6 de agosto, a [Portaria nº 706](http://www.in.gov.br/web/dou/-/portaria-mapa-n-706-de-5-de-agosto-de-2024-576537836), que declara o fim do estado de emergência zoossanitária no Rio Grande do Sul devido à detecção do vírus patogênico da doença de Newcastle em aves comerciais.

De acordo com o anúncio, embora o estado de emergência tenha sido encerrado, o Mapa determinou que, para a área de 10 km ao redor do foco da doença, a exportação de produtos avícolas e seu material genético permanece restrita. Nesta região, onde o serviço veterinário oficial continua em ação, ainda são exigidos procedimentos especiais de fiscalização para os produtos destinados ao mercado doméstico, incluindo a possibilidade de termoprocessamento antes da comercialização.

Segundo o Ministério da Agricultura e Pecuária, o estado de emergência foi inicialmente declarado em 19 de julho, com duração prevista de 90 dias, para permitir uma resposta mais rápida nas ações de vigilância epidemiológica e aplicação de procedimentos de erradicação do foco, conforme estabelecido no Plano de Contingência para a doença.

Em 26 de julho, o Mapa informou à Organização Mundial de Saúde Animal (OMSA) a conclusão das ações de limpeza e desinfecção do foco. Na semana seguinte, em 31 de julho, foram comunicados os resultados das ações de vigilância, que não identificaram novos casos suspeitos.

A confirmação do diagnóstico positivo para a doença de Newcastle (DNC) no município de Anta Gorda (RS) foi feita pelo Mapa em 17 de julho. A análise foi realizada pelo Laboratório Federal de Defesa Agropecuária de São Paulo (LFDA-SP), reconhecido pela OMSA como laboratório de referência internacional para o diagnóstico da doença. O serviço veterinário oficial continua executando ações de campo para garantir o retorno à normalidade sanitária o mais rápido possível.



A doença de Newcastle é uma enfermidade viral que afeta aves domésticas e silvestres, causando sintomas respiratórios, seguidos frequentemente por manifestações nervosas, diarreia e edema na cabeça. Causada por um vírus do grupo paramixovírus aviário sorotipo 1 (APMV-1), a DNC é de notificação obrigatória à OMSA devido à sua virulência em aves de produção comercial.', '2025-02-27 14:29:51.123', 'Rio Grande do Sul', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/3725117805504c94ae948a7e7291b6f6_858x483.jpg');
INSERT INTO public."Noticia" VALUES (11, 'BA: prazo para cadastro de rebanhos termina na sexta-feira', 'A Bahia se destaca no cenário agropecuário nacional', 'Segundo dados divulgados pela Secretaria da Agricultura, Pecuária, Irrigação, Pesca e Aquicultura (Seagri Ba), os produtores rurais da Bahia têm até a próxima sexta-feira (17) para realizar o cadastramento obrigatório de seus rebanhos junto à Agência de Defesa Agropecuária da Bahia (Adab), vinculada à Secretaria da Agricultura, Pecuária, Irrigação, Pesca e Aquicultura (Seagri). O registro é indispensável para a obtenção da Guia de Trânsito Animal (GTA), documento essencial para o transporte e comercialização de animais.



A exigência se aplica a todos os criadores baianos que possuem animais de produção, como bovinos, bubalinos, ovinos, caprinos, suínos, equinos, peixes e até abelhas. Segundo a Adab, o cadastro é fundamental para garantir a saúde e segurança dos animais, além de assegurar a regularidade nas operações comerciais.

Os produtores podem optar por realizar a atualização pelo Sistema de Defesa Agropecuário da Bahia (Sidab), disponível no site oficial da Adab, ou presencialmente em um dos 402 escritórios de atendimento da Agência distribuídos pelo estado.

A Bahia se destaca no cenário agropecuário nacional, com cerca de 762 mil propriedades rurais, conforme o último Censo Agropecuário do IBGE. A criação de bovinos lidera o setor, com 13,2 milhões de cabeças de gado, colocando o estado em posição de destaque no Nordeste.



A Adab reforça que o processo de cadastramento foi simplificado para facilitar o acesso dos criadores, com suporte técnico disponível nos escritórios regionais. Além disso, o Sidab oferece uma plataforma intuitiva para aqueles que optarem pelo registro online, conforme o divulgado pela Seagri.', '2024-02-27 16:41:15.805', 'Brasil', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/d9b0de8e3ae2489496ae0d43a05445ab_858x483.jpg');
INSERT INTO public."Noticia" VALUES (8, 'Paraná amplia emergência zoossanitária contra gripe aviária', 'O Paraná não registrou casos em produção comercial', 'A Secretaria da Agricultura e do Abastecimento do Paraná informou que o governador Carlos Massa Ratinho Junior assinou, nesta quinta-feira (23), o Decreto 8721, que prorroga por mais 180 dias o estado de emergência zoossanitária no Paraná. A medida reforça a vigilância contra a influenza aviária de alta patogenicidade (H5N1), evitando impactos na avicultura estadual, setor estratégico para a economia do estado.

Inicialmente instituído em 23 de julho de 2023, o decreto é uma resposta à detecção inédita do vírus no Brasil em aves silvestres, em maio de 2023. A gripe aviária, conhecida por sua distribuição global e impacto no comércio internacional de produtos avícolas, já causou mortes em humanos nos Estados Unidos e afetou produções comerciais no Chile e na Colômbia.



O Paraná, maior exportador de carne de frango do Brasil, não registrou casos em produção comercial, apenas em aves silvestres, o que garantiu a continuidade das exportações.

Em 2023, a avicultura paranaense alcançou um Valor Bruto de Produção (VBP) de R$ 38,8 bilhões, representando 19,61% do total do agronegócio no estado. A exportação de carne de frango superou 2,171 milhões de toneladas, um aumento de 4% em relação ao ano anterior, gerando uma arrecadação de US$ 4 bilhões, 7% a mais que em 2022. Novos mercados foram conquistados, com destaque para a Lituânia, que adquiriu 476 toneladas por US$ 555,6 mil.', '2024-02-27 14:32:52.76', 'Doença', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/ef917d93f08b4b4da5d5b25c7b3a430d_858x483.jpg');
INSERT INTO public."Noticia" VALUES (10, 'Boi gordo inicia ano com preços firmes', 'No entanto, fevereiro começou com um novo recuo no spread', 'O mercado do boi gordo iniciou 2025 com preços firmes, sem grandes quedas nas carcaças no atacado e mantendo bons spreads da indústria no mercado interno, conforme análise do Itaú BBA. Além disso, as exportações registraram volumes expressivos, com preços de embarque em alta. Em janeiro, o indicador Cepea para o boi gordo teve valorização de 1,4% em relação a dezembro de 2024, refletindo uma oferta controlada de gado terminado e condições favoráveis das [pastagens](https://www.agrolink.com.br/culturas/pastagens?utm_source=agrolink-detalhe-noticia\&utm_medium=detalhe-noticia\&utm_campaign=links-internos), que permitiram aos produtores espaçarem as entregas. No setor de carne, a carcaça casada apresentou recuo de 1,1%, reduzindo o spread da indústria de 11% para 8,4%, ainda assim um dos melhores níveis para o período nos últimos anos.  



No entanto, fevereiro começou com um novo recuo no spread, já que os preços do boi se estabilizaram no fim de janeiro, enquanto a carne apresentou maior enfraquecimento. As exportações de carne bovina in natura totalizaram 180,5 mil toneladas no primeiro mês do ano, uma queda de 0,6% em relação a janeiro de 2024 e de 10,9% sobre dezembro. Entretanto, o preço médio dos embarques subiu 1,7% frente ao mês anterior, o que moderou a alta do custo do boi gordo em dólares (2,5%). Assim, o spread cedeu 1 ponto percentual, para 8%, ligeiramente abaixo da média histórica de 10%.  

No segmento de reposição, o preço do bezerro no Mato Grosso do Sul, medido pelo Cepea, desvalorizou 6,1% em janeiro. Contudo, a partir da segunda quinzena do mês, a tendência de queda foi interrompida. Apesar disso, a relação de troca entre boi gordo em São Paulo e bezerro no MS melhorou para a recria e engorda. O ágio do bezerro sobre o boi gordo caiu de 24% em dezembro de 2024 para 15% em janeiro de 2025, tornando a reposição mais favorável aos pecuaristas.



“Nos próximos meses pode haver uma elevação da oferta para abate um pouco acima do normal de fêmeas não emprenhadas, em função da longa seca do ano passado, que deve ter interferido negativamente nas taxas de prenhez. Por outro lado, isto seria, mais adiante, ainda mais altista para o bezerro, com menos nascimentos previstos para 2026. Para os recriadores, vale reforçar a atenção com as oportunidades de realizarem uma boa reposição, após esta recente acomodação da cria”, comenta.', '2025-02-27 14:38:39.01', 'Preços', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/084a05543d3a4ac4b743162d486a8143_858x483.jpg');
INSERT INTO public."Noticia" VALUES (9, 'Como a gripe aviária atravessa a barreira das espécies', 'A pesquisa revelou que a proteína ANP32 atua como uma ponte entre as duas polimerases', 'Nos últimos anos, as medidas de saúde pública, vigilância e vacinação têm diminuído significativamente o impacto das epidemias de gripe sazonal, causadas pelos vírus da gripe humana A e B. No entanto, o potencial surto de gripe aviária A, também conhecida como "gripe aviária", em mamíferos, incluindo humanos, ainda representa uma ameaça significativa à saúde pública.



O grupo Cusack do Laboratório Europeu de Biologia Molecular (EMBL) em Grenoble tem investigado a replicação dos vírus influenza e descobriu novas informações sobre as mutações que o vírus da gripe aviária pode sofrer para se replicar em células de mamíferos. Embora algumas cepas da gripe aviária possam causar doenças graves e até mortalidade, as diferenças biológicas entre aves e mamíferos geralmente limitam a propagação do vírus. Para infectar mamíferos, o vírus deve superar barreiras relacionadas à entrada e replicação nas células e adquirir a capacidade de transmissão entre humanos.

Recentemente, a infecção inesperada de vacas leiteiras nos EUA pela cepa H5N1 da gripe aviária levantou preocupações sobre a possibilidade de o vírus se tornar endêmico em bovinos e adaptar-se aos humanos. Um estudo publicado na revista \*Nature Communications\* destaca o papel da polimerase, uma enzima essencial na replicação viral. Essa proteína pode se reorganizar para desempenhar diferentes funções durante a infecção, como a transcrição e a replicação do RNA viral.



A pesquisa revelou que a proteína ANP32 atua como uma ponte entre as duas polimerases virais, sendo crucial para a formação do complexo de replicação. Diferenças na cauda da ANP32 entre aves e mamíferos explicam a dificuldade do vírus aviário em replicar-se em humanos. Benoît Arragain, do EMBL, explica que a polimerase adaptada às aves precisa adquirir mutações para utilizar o ANP32 humano. Os resultados de Arragain e sua equipe fornecem informações detalhadas sobre a estrutura do complexo de replicação, essenciais para monitorar mutações do vírus e desenvolver medicamentos antivirais específicos. Stephen Cusack enfatiza a importância de entender como o complexo de replicação funciona dinamicamente para enfrentar futuras ameaças pandêmicas.', '2024-02-27 14:36:26.175', 'Internacional', 3, 13, 'https://www.agrolink.com.br/upload/imagens-resizes/1a76334e4232487eb367a6ba922b8267_858x483.jpg');
INSERT INTO public."Noticia" VALUES (12, 'Carne bovina registra reajustes expressivos', 'No mercado internacional, a situação foi distinta', 'De acordo com Ricardo Leite, Superintendente Executivo do Banco Safra, o setor pecuário enfrentou oscilações significativas em 2024, refletindo uma combinação de fatores internos e externos. O preço do boi gordo registrou uma alta expressiva de 35% entre janeiro e novembro, subindo de R$ 249,65 para R$ 338,75 por arroba. No varejo, o impacto também foi relevante: cortes como o acém tiveram aumento de 10,4% em novembro em relação ao mês anterior, acumulando alta de 14,5% no ano. Outros cortes premium, como a picanha e o contrafilé, registraram aumentos de 6,5% e 9,7%, respectivamente.

No mercado internacional, a situação foi distinta. O preço médio de exportação da carne bovina caiu 4,4% no acumulado de janeiro a novembro de 2024. No entanto, o aumento de 30,3% no volume exportado compensou a queda nos preços, resultando em uma elevação de 24,7% na receita total, que alcançou US$ 10,6 bilhões. Desde o pico histórico registrado em julho de 2022, o preço da carne bovina brasileira no mercado internacional acumulou uma desvalorização de 17%, com o preço médio em março de 2024 chegando a R$ 22,6 por kg (US$ 4,53 por kg).

Os últimos cinco anos evidenciam um ciclo de altos e baixos para o boi gordo. Em 2020, o preço subiu de R$ 200 para R$ 250 por arroba, impulsionado pela forte demanda de exportação, especialmente da China. Em 2022, o valor atingiu um recorde em julho, chegando a R$ 320, mas ajustes no mercado internacional fizeram com que terminasse o ano em R$ 300. Já em 2024, o aumento consistente dos preços foi reflexo de uma menor oferta e maior demanda interna e externa, com o valor fechando novembro em R$ 338,75 por arroba.

“As variações de preço da carne bovina em 2024 refletem uma combinação de fatores internos e externos. No mercado interno, a alta demanda e a menor oferta impulsionaram os preços, enquanto no mercado externo, a queda nos preços foi compensada por um aumento no volume de exportações”, disse ele.', '2025-02-27 14:40:36.387', 'Mercado', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/e84496e7c9bf4560b9ecc72a854d0f90_858x483.jpg');
INSERT INTO public."Noticia" VALUES (13, 'Período entre o pré e pós-parto exige atenção redobrada', 'Tarciso destaca a importância de estratégias nutricionais adequadas', 'O período de transição entre o pré e pós-parto é um dos momentos mais críticos na pecuária leiteira, demandando atenção especial para garantir o bom desempenho do rebanho. Segundo Tarciso Villela, coordenador técnico-comercial da Trouw Nutrition, é essencial criar condições ideais para que as vacas alcancem seu máximo potencial genético. Caso contrário, problemas como baixa performance, doenças metabólicas e reprodutivas, além do aumento do descarte involuntário de animais, podem surgir.

Uma das principais dificuldades para os produtores é entender as necessidades fisiológicas da fêmea nesse período. Além dos desafios relacionados ao parto e aos ajustes dietéticos, o estresse térmico por calor também representa um obstáculo significativo, aumentando o risco de inflamações e comprometendo a saúde do animal. A combinação desses fatores eleva a possibilidade de doenças e reduz a eficiência produtiva.

Para lidar com esses desafios, Tarciso destaca a importância de estratégias nutricionais adequadas, como o uso de aditivos modernos e programas de resfriamento durante o período seco. A maximização do consumo de matéria seca é uma das principais práticas, já que vacas bem alimentadas no pré-parto tendem a manter um bom desempenho produtivo e reprodutivo no pós-parto. Além disso, o uso de aditivos como Selko® Lactibute, que promove a saúde intestinal, e Reviva, que previne a hipocalcemia, são fundamentais para garantir a saúde do rebanho.

“Os melhores resultados são alcançados por produtores que assumem postura proativa, tomando decisões estratégicas e implementando ações com impacto positivo. É essencial compreender que o sucesso na produção leiteira está diretamente relacionado ao manejo consciente e ao uso de tecnologias baseadas em evidências científicas. Nesse sentido, a equipe técnica da Trouw Nutrition auxilia o produtor a aplicar as melhores práticas de acordo com a realidade de cada negócio, sempre buscando proporcionar bem-estar para alcançar a produtividade e a longevidade para o rebanho”, finaliza.', '2025-02-27 14:42:35.933', 'Cuidado animal', 3, 12, 'https://www.agrolink.com.br/upload/imagens-resizes/42129924425c4901996208940440694d_858x483.jpg');
INSERT INTO public."Noticia" VALUES (87, 'Milho tem negócios pontuais', 'No Paraná se viu um mercado com poucos lotes', 'No mercado do milho do estado do Rio Grande do Sul foram vistos negócios pontuais ao sul do estado, de acordo com informações divulgadas pela TF Agroeconômica. “Mercado lento. Nas indicações, manutenção: Santa Rosa a R$ 63,00; Não-Me-Toque a R$ 64,00; Marau e Gaurama R$ 64,50; Arroio do Meio, Lajeado e Frederico Westphalen a R$ 66,00 e Montenegro a R$ 67,00. Vendedores a partir de R$ 63,00 no FOB interior. Negócios pontuais em Panambi, onde 700 tons rodaram a R$ 64,00 no CIF indústria, entrega imediata”, comenta.



Santa Catarina tem diferença entre R$ 2,00 a R$ 3,00 e vendedores com pouco prazo travam negócios. “Produtores com pedidas ao menos R$ 2,00 acima, em que compradores hoje indicam a partir de R$ 60,00 no interior e R$ 63,00/64,00 CIF fábricas. Rumores de negócios a R$ 64,00/64,50 no CIF oeste. Nas indicações, Chapecó a R$ 62,00; Campos Novos R$ 64,00; Rio do Sul a R$ 64,00; Videira R$ 63,00. Não ouvimos negócios nesta segunda-feira”, completa.

No Paraná se viu um mercado com poucos lotes. “Mercado com negócios pontuais reportados. No porto, indicações a R$ 63,00 set/64,00 nov/65,00 dez. No norte, indicações a R$ 58,00 (+1,00); Cascavel a R$ 57,00 (+1,00); Campos Gerais R$ 58,00 (-1,00); Guarapuava a R$ 58,00; Londrina R$ 57,50. Preços balcão no sudoeste a R$ 52,00; norte a R$ 54,00; oeste R$ 54,00 e centro-oeste R$ 55,00. Rumores de novos negócios na ferrovia Maringá, a R$ 62,00 outubro, onde teriam rodado pelo menos 5 mil toneladas”, indica.



No Mato Grosso do Sul, a maioria dos preços subiu. “Em Maracaju, indicações de R$ 53,00 (+1,00); Dourados a R$ 54,00 (+R$ 1,00); Naviraí R$ 54,00 (-R$ 1,00) e São Gabriel a R$ 49,00. Produtores iniciam ofertas FOB a R$ 52,00 com maior parte das pedidas concentradas em R$ 55,00, base interior. Não ouvimos sobre negócios nesta segunda-feira”, conclui.', '2025-02-27 14:47:13.634', 'Produtividade', 3, 2, 'https://www.agrolink.com.br/upload/imagens-resizes/f0b749daba5a4fc1a60b1842c376bbac_858x483.jpg');


--
-- Data for Name: Pessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Pessoa" VALUES (1, 'fornecedorax@gmail.com', 'https://img.freepik.com/vetores-gratis/logotipo-abstrato-em-forma-de-chama_1043-44.jpg?t=st=1740690747~exp=1740694347~hmac=9d0ad709576f57558878b54daca6b2f6a92c8f7f6234a816d97afd4aa468e70f&w=740', 1);
INSERT INTO public."Pessoa" VALUES (3, 'Mercearia@gmail.com', 'https://img.freepik.com/vetores-gratis/design-plano-design-de-logotipo-ac_23-2149482027.jpg?t=st=1740690815~exp=1740694415~hmac=d879cc6c27ce8900237a50edb64d2961aab47dc2a95781f9f097451ca724e2d1&w=740', 2);
INSERT INTO public."Pessoa" VALUES (2, 'padaria@gmail.com', 'https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?t=st=1740690843~exp=1740694443~hmac=6dffa1e5ee32bcd31bcec3c56872da4f13d6477e80b8cc2005d9ce3d78e0c5f1&w=740', 2);
INSERT INTO public."Pessoa" VALUES (6, 'c@gmail.com', 'https://img.freepik.com/vetores-gratis/modelo-de-logotipo-colorido-borboleta_361591-1587.jpg?t=st=1740691279~exp=1740694879~hmac=5c4d5c43c093abb6db9997181d9bff8133e92433dbf9272b101a27afa96e1d66&w=740', 2);
INSERT INTO public."Pessoa" VALUES (7, 'y@gmail.com', 'https://img.freepik.com/vetores-gratis/design-de-logotipo-local-da-loja-gradiente_23-2149613163.jpg?t=st=1740691415~exp=1740695015~hmac=d9683afa97767a74c33b35e67b748f3d74e767a151d8933f64bd306b52d1599d&w=1060', 1);
INSERT INTO public."Pessoa" VALUES (4, 'luiza@gmail.com', 'https://img.freepik.com/vetores-gratis/modelo-de-design-de-caneta-de-pena-gradiente_23-2149837194.jpg?t=st=1740690866~exp=1740694466~hmac=1c0e6a111ebfe4afd5b5501d1acebbf02cc613eb6c8a88fc0efee094009e2139&w=740', 1);
INSERT INTO public."Pessoa" VALUES (5, 'b@gmail.com', 'https://img.freepik.com/vetores-premium/design-do-logotipo-do-passaro-dourado_1195-336.jpg?w=740', 1);


--
-- Data for Name: PessoaFisica; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."PessoaFisica" VALUES (4, 'Cliente C', 968, '1998-02-01 00:00:00', 59);
INSERT INTO public."PessoaFisica" VALUES (5, 'Cliente T', 214, '2002-02-01 00:00:00', 42);


--
-- Data for Name: PessoaJuridica; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."PessoaJuridica" VALUES (1, 'Fornecedora Y', 55, 424, 'Fornecedora X');
INSERT INTO public."PessoaJuridica" VALUES (3, 'Mercearia Z', 53, 532, 'Mercearia X');
INSERT INTO public."PessoaJuridica" VALUES (2, 'Padaria X', 41, 421, 'Padaria');
INSERT INTO public."PessoaJuridica" VALUES (6, 'Fornecedora G', 42, 412, 'N');
INSERT INTO public."PessoaJuridica" VALUES (7, 'Fornecedora F', 12, 421, 'E');


--
-- Data for Name: ProdutoInac; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: Telefone; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Telefone" VALUES (1, '', '(14) 99784-4515', 1);
INSERT INTO public."Telefone" VALUES (3, '', '(14) 97784-5956', 3);
INSERT INTO public."Telefone" VALUES (2, '', '(14) 99842-4124', 2);
INSERT INTO public."Telefone" VALUES (6, '', '(18) 9421-47', 6);
INSERT INTO public."Telefone" VALUES (7, '', '(14) 6454-543', 7);
INSERT INTO public."Telefone" VALUES (4, '', '(14) 97723-3232', 4);
INSERT INTO public."Telefone" VALUES (5, '', '(17) 84844-9444', 5);


--
-- Data for Name: TipoPessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."TipoPessoa" VALUES (1, 'Física');
INSERT INTO public."TipoPessoa" VALUES (2, 'Jurídica');


--
-- Data for Name: Usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Usuario" VALUES ('cm7gobomq000111gxo4mh3mti', 'Fernanda', '518.419.242-19', '123456', false, false, NULL, false, 'luiza@gmail.com', NULL, NULL, 3);
INSERT INTO public."Usuario" VALUES ('cm76ce4pf0001idjyz4blg9sa', 'Maria Eduarda', '189.523.592-33', '123456', true, false, 'https://i.pravatar.cc/150?u=a04258114e29026702d', false, 'teste@gmail.com', NULL, NULL, 2);


--
-- Data for Name: Venda; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Venda" VALUES (17, '2025-02-25 13:22:03.247', 225, 15, 0);
INSERT INTO public."Venda" VALUES (18, '2025-02-25 13:22:27.237', 2650, 50, 0);
INSERT INTO public."Venda" VALUES (19, '2025-02-25 13:22:45.622', 75, 5, 0);
INSERT INTO public."Venda" VALUES (20, '2025-02-25 13:24:47.7', 310, 8, 0);
INSERT INTO public."Venda" VALUES (21, '2025-02-25 19:30:56.637', 15, 1, 0);
INSERT INTO public."Venda" VALUES (22, '2025-02-26 12:47:15.113', 2120, 40, 0);
INSERT INTO public."Venda" VALUES (23, '2025-02-26 12:48:41.57', 159, 3, 0);
INSERT INTO public."Venda" VALUES (25, '2025-02-26 14:48:43.318', 12000, 300, 0);
INSERT INTO public."Venda" VALUES (26, '2025-02-26 14:49:08.009', 2250, 15, 0);
INSERT INTO public."Venda" VALUES (27, '2025-02-26 14:49:25.015', 4000, 100, 0);
INSERT INTO public."Venda" VALUES (28, '2025-02-26 21:45:37.98', 9075, 165, 0);
INSERT INTO public."Venda" VALUES (29, '2025-02-26 21:46:02.999', 3575, 65, 0);
INSERT INTO public."Venda" VALUES (30, '2025-02-26 21:46:49.274', 3000, 600, 0);
INSERT INTO public."Venda" VALUES (31, '2025-02-26 21:47:01.42', 50, 10, 0);
INSERT INTO public."Venda" VALUES (32, '2025-02-26 21:58:28.746', 3225, 215, 0);
INSERT INTO public."Venda" VALUES (33, '2025-02-26 21:58:43.341', 60, 4, 0);
INSERT INTO public."Venda" VALUES (34, '2025-02-26 23:26:09.853', 505, 4, 0);
INSERT INTO public."Venda" VALUES (35, '2025-02-27 01:21:12.438', 300, 2, 0);
INSERT INTO public."Venda" VALUES (36, '2025-02-27 01:21:41.72', 1500, 125, 0);
INSERT INTO public."Venda" VALUES (37, '2025-02-27 17:16:37.899', 7500, 500, 0);
INSERT INTO public."Venda" VALUES (38, '2025-02-27 17:22:24.489', 916, 56, 0);
INSERT INTO public."Venda" VALUES (24, '2024-06-26 14:47:54.302', 375000, 2500, 0);
INSERT INTO public."Venda" VALUES (39, '2025-02-28 11:59:53.727', 240, 15, 0);
INSERT INTO public."Venda" VALUES (40, '2025-02-28 12:00:25.504', 32, 2, 0);
INSERT INTO public."Venda" VALUES (41, '2025-02-28 12:19:01.458', 450, 3, 0);
INSERT INTO public."Venda" VALUES (42, '2025-02-28 12:34:51.998', 150, 1, 0);
INSERT INTO public."Venda" VALUES (43, '2025-02-28 14:21:20.011', 450, 3, 0);
INSERT INTO public."Venda" VALUES (44, '2025-02-28 14:22:05.712', 150, 1, 0);
INSERT INTO public."Venda" VALUES (45, '2025-02-28 14:24:03.263', 150, 1, 0);
INSERT INTO public."Venda" VALUES (46, '2025-02-28 14:24:57.69', 150, 1, 0);
INSERT INTO public."Venda" VALUES (47, '2025-03-03 12:32:19.62', 15, 15, 0);
INSERT INTO public."Venda" VALUES (48, '2025-03-03 12:32:42.96', 1, 1, 0);
INSERT INTO public."Venda" VALUES (49, '2025-03-03 12:32:51.363', 1, 1, 0);
INSERT INTO public."Venda" VALUES (50, '2025-03-03 12:53:10.293', 75, 5, 0);
INSERT INTO public."Venda" VALUES (51, '2025-03-03 12:53:23.325', 15, 1, 0);
INSERT INTO public."Venda" VALUES (52, '2025-03-03 12:53:42.941', 75, 5, 0);
INSERT INTO public."Venda" VALUES (53, '2025-03-03 12:54:16.56', 35, 7, 0);
INSERT INTO public."Venda" VALUES (54, '2025-03-03 12:54:38.333', 20, 2, 0);
INSERT INTO public."Venda" VALUES (55, '2025-03-03 13:53:49.397', 15000, 100, 0);
INSERT INTO public."Venda" VALUES (56, '2025-03-03 14:08:13.737', 25, 5, 0);


--
-- Data for Name: VendaEstoque; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."VendaEstoque" VALUES (19, 15, 7, 17);
INSERT INTO public."VendaEstoque" VALUES (20, 53, 8, 18);
INSERT INTO public."VendaEstoque" VALUES (21, 15, 7, 19);
INSERT INTO public."VendaEstoque" VALUES (22, 15, 7, 20);
INSERT INTO public."VendaEstoque" VALUES (23, 53, 8, 20);
INSERT INTO public."VendaEstoque" VALUES (24, 15, 7, 21);
INSERT INTO public."VendaEstoque" VALUES (25, 53, 8, 22);
INSERT INTO public."VendaEstoque" VALUES (26, 53, 8, 23);
INSERT INTO public."VendaEstoque" VALUES (27, 150, 9, 24);
INSERT INTO public."VendaEstoque" VALUES (28, 40, 10, 25);
INSERT INTO public."VendaEstoque" VALUES (29, 150, 9, 26);
INSERT INTO public."VendaEstoque" VALUES (30, 40, 10, 27);
INSERT INTO public."VendaEstoque" VALUES (31, 55, 11, 28);
INSERT INTO public."VendaEstoque" VALUES (32, 55, 11, 29);
INSERT INTO public."VendaEstoque" VALUES (33, 5, 12, 30);
INSERT INTO public."VendaEstoque" VALUES (34, 5, 12, 31);
INSERT INTO public."VendaEstoque" VALUES (35, 15, 13, 32);
INSERT INTO public."VendaEstoque" VALUES (36, 15, 13, 33);
INSERT INTO public."VendaEstoque" VALUES (37, 150, 9, 34);
INSERT INTO public."VendaEstoque" VALUES (38, 55, 11, 34);
INSERT INTO public."VendaEstoque" VALUES (39, 150, 9, 35);
INSERT INTO public."VendaEstoque" VALUES (40, 12, 14, 36);
INSERT INTO public."VendaEstoque" VALUES (41, 15, 15, 37);
INSERT INTO public."VendaEstoque" VALUES (42, 15, 15, 38);
INSERT INTO public."VendaEstoque" VALUES (43, 15, 7, 38);
INSERT INTO public."VendaEstoque" VALUES (44, 53, 8, 38);
INSERT INTO public."VendaEstoque" VALUES (45, 16, 16, 39);
INSERT INTO public."VendaEstoque" VALUES (46, 16, 16, 40);
INSERT INTO public."VendaEstoque" VALUES (47, 150, 9, 41);
INSERT INTO public."VendaEstoque" VALUES (48, 150, 9, 42);
INSERT INTO public."VendaEstoque" VALUES (49, 150, 9, 46);
INSERT INTO public."VendaEstoque" VALUES (50, 1, 17, 47);
INSERT INTO public."VendaEstoque" VALUES (51, 1, 17, 49);
INSERT INTO public."VendaEstoque" VALUES (52, 15, 18, 50);
INSERT INTO public."VendaEstoque" VALUES (53, 15, 18, 51);
INSERT INTO public."VendaEstoque" VALUES (54, 15, 19, 52);
INSERT INTO public."VendaEstoque" VALUES (55, 5, 20, 53);
INSERT INTO public."VendaEstoque" VALUES (56, 15, 19, 54);
INSERT INTO public."VendaEstoque" VALUES (57, 5, 20, 54);
INSERT INTO public."VendaEstoque" VALUES (58, 150, 9, 55);
INSERT INTO public."VendaEstoque" VALUES (59, 5, 21, 56);


--
-- Data for Name: VendaFormaPagamento; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: VendaPessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."VendaPessoa" VALUES (16, 17, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (17, 18, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (18, 19, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (19, 20, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (20, 21, 3, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (21, 22, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (22, 23, 3, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (23, 24, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (24, 25, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (25, 26, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (26, 27, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (27, 28, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (28, 29, 3, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (29, 30, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (30, 31, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (31, 32, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (32, 33, 2, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (33, 34, 3, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (34, 35, 3, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (35, 36, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (36, 37, 1, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (37, 38, 3, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (38, 40, 6, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (39, 41, 5, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (40, 42, 4, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (41, 46, 4, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (42, 49, 4, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (43, 51, 4, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (44, 54, 5, 'Fornecedor');
INSERT INTO public."VendaPessoa" VALUES (45, 55, 4, 'Fornecedor');


--
-- Data for Name: VerificationRequest; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('12dc1d08-f68f-468e-9a18-07ea4456a835', '59a2751f06822ef01cc7387a28b65698207f5bcc3a51cc9e003fce9effb2e122', '2025-03-03 12:02:17.548304-03', '20250303145151_init', NULL, NULL, '2025-03-03 12:02:17.399658-03', 1);
INSERT INTO public._prisma_migrations VALUES ('1f47b936-3a81-475f-ae2a-8823758869f8', 'dbcc09b1142892b3362f594b65c1782f477bd87d651d9f54f62cabe166e0458f', '2025-03-03 12:02:17.557114-03', '20250303145948_start_new_db', NULL, NULL, '2025-03-03 12:02:17.549269-03', 1);
INSERT INTO public._prisma_migrations VALUES ('93f00acb-918d-4af0-a565-191d4fac6301', '30d3a9bc2459e9f7f1ae4271d92231d27fa8a61ab384df2b69ba44bf983a0974', '2025-03-03 12:03:02.770311-03', '20250303150302_', NULL, NULL, '2025-03-03 12:03:02.711403-03', 1);


--
-- Name: CategoriaPessoa_categ_pessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CategoriaPessoa_categ_pessoa_id_seq"', 1, false);


--
-- Name: ComercioCommoditiesCotacoes_cotacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ComercioCommoditiesCotacoes_cotacao_id_seq"', 1, false);


--
-- Name: ComercioCommoditiesVariacaoPreco_variacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ComercioCommoditiesVariacaoPreco_variacao_id_seq"', 1, false);


--
-- Name: ComercioCommodities_commodity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ComercioCommodities_commodity_id_seq"', 1, false);


--
-- Name: Cultura_id_cultura_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Cultura_id_cultura_seq"', 1, false);


--
-- Name: Empresa_empresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Empresa_empresa_id_seq"', 1, false);


--
-- Name: Endereco_endereco_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Endereco_endereco_id_seq"', 1, false);


--
-- Name: Estoque_estoque_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Estoque_estoque_id_seq"', 1, false);


--
-- Name: HistoricoEstoque_hist_estq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."HistoricoEstoque_hist_estq_id_seq"', 1, false);


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

SELECT pg_catalog.setval('public."Pessoa_pess_pessoa_id_seq"', 1, false);


--
-- Name: Telefone_telefone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Telefone_telefone_id_seq"', 1, false);


--
-- Name: TipoPessoa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."TipoPessoa_id_seq"', 1, false);


--
-- Name: VendaEstoque_vest_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VendaEstoque_vest_id_seq"', 1, false);


--
-- Name: VendaFormaPagamento_vfpag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VendaFormaPagamento_vfpag_id_seq"', 1, false);


--
-- Name: VendaPessoa_vpes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VendaPessoa_vpes_id_seq"', 1, false);


--
-- Name: Venda_venda_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Venda_venda_id_seq"', 1, false);


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
-- Name: ComercioCommoditiesCotacoes ComercioCommoditiesCotacoes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommoditiesCotacoes"
    ADD CONSTRAINT "ComercioCommoditiesCotacoes_pkey" PRIMARY KEY (cotacao_id);


--
-- Name: ComercioCommoditiesVariacaoPreco ComercioCommoditiesVariacaoPreco_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommoditiesVariacaoPreco"
    ADD CONSTRAINT "ComercioCommoditiesVariacaoPreco_pkey" PRIMARY KEY (variacao_id);


--
-- Name: ComercioCommodities ComercioCommodities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommodities"
    ADD CONSTRAINT "ComercioCommodities_pkey" PRIMARY KEY (commodity_id);


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
-- Name: ComercioCommoditiesCotacoes ComercioCommoditiesCotacoes_commodity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommoditiesCotacoes"
    ADD CONSTRAINT "ComercioCommoditiesCotacoes_commodity_id_fkey" FOREIGN KEY (commodity_id) REFERENCES public."ComercioCommodities"(commodity_id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ComercioCommoditiesVariacaoPreco ComercioCommoditiesVariacaoPreco_commodity_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ComercioCommoditiesVariacaoPreco"
    ADD CONSTRAINT "ComercioCommoditiesVariacaoPreco_commodity_id_fkey" FOREIGN KEY (commodity_id) REFERENCES public."ComercioCommodities"(commodity_id) ON UPDATE CASCADE ON DELETE CASCADE;


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

