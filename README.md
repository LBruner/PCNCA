# PCNCA

[![wakatime](https://wakatime.com/badge/user/681dedeb-6eeb-49a5-b0c4-c6d753eec539/project/f2e8d35a-e3c1-4ad1-9bcc-c899529b4980.svg)](https://wakatime.com/badge/user/681dedeb-6eeb-49a5-b0c4-c6d753eec539/project/f2e8d35a-e3c1-4ad1-9bcc-c899529b4980)

<figure><embed src="https://wakatime.com/share/@LBruner/d3227817-124a-441b-8eb1-dfe81f1c8bd3.svg"></embed></figure>

<!-- Improved compatibility of voltar ao topo link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![Unlicense License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">

[//]: # (  <a href="https://github.com/othneildrew/Best-README-Template">)

[//]: # (    <img src="images/logo.png" alt="Logo" width="80" height="80">)

[//]: # (  </a>)

<h3 align="center">PCNCA</h3>

  <p align="center">
    Plataforma de Controle e Negociação de Commodities Agrícolas
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">Ver Demo (Em andamento)</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Reportar Bug</a>
    &middot;
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Pedir Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Tabela de conteúdos</summary>
  <ol>
    <li>
      <a href="#sobre">Sobre o Projeto</a>
      <ul>
        <li><a href="#feito-utilizando">Ferramentas Utilizadas</a></li>
      </ul>
    </li>
    <li>
      <a href="#configuracao">Configuração do Projeto
</a>
      <ul>
        <li><a href="#requisitos">Pré-requisitos</a></li>
        <li><a href="#instalaçao">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contribuindo">Contribuindo</a></li>
    <li><a href="#licença">Licença</a></li>
    <li><a href="#contato">Contato</a></li>
    <li><a href="#agradecimentos">Agradecimentos</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Sobre o Projeto
A Plataforma de Controle e Negociação de Commodities Agrícolas é um sistema web desenvolvido para facilitar a gestão e comercialização de commodities agrícolas, como grãos e pecuária. O objetivo principal é oferecer uma solução integrada para monitoramento de preços em tempo real, gerenciamento de estoque e execução de vendas, proporcionando mais eficiência e segurança nas negociações.
<a id="sobre"></a>

### Principais Funcionalidades

* **Monitoramento de Preços**: Exibição em tempo real das cotações das commodities agrícolas e do dólar, permitindo análises estratégicas para compra e venda.

* **Gestão de Estoque**: Controle detalhado de produtos armazenados, incluindo quantidades disponíveis e histórico de movimentação.

* **Negociação e Vendas**: Sistema de vendas integrado, permitindo que os usuários realizem transações e acompanhem relatórios financeiros.

* **Relatórios e Análises**: Geração de relatórios sobre estoque, variação de preços e histórico de vendas para embasar a tomada de decisões.

<a id="funcionalidades"></a>
* **Notícias e Tendências**: Acesso a informações do mercado e atualizações sobre fatores que podem influenciar os preços das commodities.

### Público-Alvo

A plataforma foi desenvolvida para atender agricultores, comerciantes e investidores do setor agropecuário que necessitam de uma ferramenta eficiente para acompanhamento de preços e realização de negociações.

<a id="publico"></a>
<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>


## Ferramentas Utilizadas
<br>

<a id="feito-utilizando"></a>
* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![Tailwind][Tailwind.com]][Tailwind-url]
* [![Tailwind][Prisma.orm]][Prisma-url]

<p align="right">(<a href="#readme-top">Voltar ao topo</a>)</p>

<!-- GETTING STARTED -->
## Configuração do Projeto
<a id="configuracao"></a>
Para executar o projeto localmente, siga os passos abaixo.

### Pré-requisitos
<a id="requisitos"></a>

Certifique-se de ter os seguintes requisitos instalados no seu sistema:

* [![Postgres][Postgres-shield]][Postgres]
* [![NodeJS][Node-shield]][Nodejs]

### Instalação
<a id="instalaçao"></a>

1. Clone o repositório e acesse a pasta do projeto:
   ```sh
   git clone https://github.com/LBruner/PCNCA
   ```
2. Instale as dependências executando o seguinte comando:
   ```sh
   npm install
   ```
3. Crie uma nova database no PostgreSQL que será utilizada pelo projeto.
4. Configure as variáveis de ambiente:
* Na raiz do projeto, crie um arquivo chamado `.env`.
* Adicione a seguinte linha, substituindo `USUARIO`, `SENHA`, `HOST`, `PORTA` e `BASE` pelas credenciais corretas do banco de dados:
  ```
      DATABASE_URL="DATABASE_URL="postgres://USUARIO:SENHA@HOST:PORTA/BASE" 
  ```
5. Execute as migrations para criar as tabelas no banco de dados:
    ```bash
    prisma migrate dev
    ```
6. Compile e inicie o projeto:
    ```bash
    npm run build
    npm run start
    ```
7. Acesse a aplicação no navegador pelo seguinte link: http://localhost:3000/

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- USAGE EXAMPLES -->
<a id="uso"></a>
## Uso

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- ROADMAP -->
<a id="roadmap"></a>
## Roadmap

- [x] Adicionar tema escuro
- [ ] Adicionar sistema de permissão para usuários
- [ ] Melhorar UI
- [ ] Suporte a múltiplos idiomas
    - [ ] Inglês
    - [ ] Espanhol

Veja o menu de [issues abertas](https://github.com/LBruner/PCNCA/issues) para ver uma lista de features propostas. (e possíveis problemas).

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- CONTRIBUTING -->
## Contribuindo
<a id="contribuindo"></a>

Se você tiver sugestões para melhorar o projeto, sinta-se à vontade para fazer um fork e enviar um pull request. Você também pode abrir uma issue com a tag "enhancement".

### Como contribuir
1. Faça um fork do projeto
2. Crie uma branch para sua funcionalidade:
    ```
   git checkout -b feature/NomeDaFuncionalidade
   ```
3. Faça as alterações e commit:
    ```
    git commit -m "Adiciona NomeDaFuncionalidade"
    ```
4. Envie para o repositório remoto:
    ```
    git push origin feature/NomeDaFuncionalidade
    ```
5. Abra um Pull Request no repositório original

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- LICENSE -->
<a id="licença"></a>
## Licença

Distribuído sob a liçenca MIT. Veja `LICENSE` para mais informações.

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- Contato -->
<a id="contato"></a>
## Contato

**Leandro Bruner**
* [![Linkedin][linkedin-shield]][linkedin-url]
* [![Gmail][Gmail]][Gmail-url]

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Agradecimentos
<a id="agradecimentos"></a>

Gostaria de reconhecer e agradecer os recursos e ferramentas que foram úteis no desenvolvimento deste projeto.

* [HerouUI](https://www.heroui.com/)
* [NextAuth](https://next-auth.js.org/)
* [MUI Charts](https://mui.com/)
* [React Markdown](https://github.com/remarkjs/react-markdown)
* [Img Shields](https://shields.io)
* [React Icons](https://react-icons.github.io/react-icons/search)
* [Readme Template](https://github.com/othneildrew/Best-README-Template/tree/main)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/lbruner/PCNCA.svg?style=for-the-badge
[contributors-url]: https://github.com/lbruner/PCNCA/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/lbruner/PCNCA.svg?style=for-the-badge
[forks-url]: https://github.com/LBruner/PCNCA/network/members
[stars-shield]: https://img.shields.io/github/stars/LBruner/PCNCA.svg?style=for-the-badge
[stars-url]: https://github.com/LBruner/PCNCA/stargazers
[issues-shield]: https://img.shields.io/github/issues/LBruner/PCNCA.svg?style=for-the-badge
[issues-url]: https://github.com/LBruner/PCNCA/issues
[license-shield]: https://img.shields.io/github/license/LBruner/PCNCA.svg?style=for-the-badge
[license-url]: https://github.com/LBruner/PCNCA/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=333
[linkedin-url]: https://www.linkedin.com/in/lbruner-dev/
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Localhost-url]: http://localhost:3000/
[Gmail]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[Gmail-url]: mailto:leandrobruner15@gmail.com
[Prisma.orm]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Tailwind.com]: https://img.shields.io/badge/Tailwind_CSS-grey?style=for-the-badge&logo=tailwind-css&logoColor=38B2AC
[Tailwind-url]: https://tailwindcss.com/
[Postgres]: https://www.postgresql.org/
[Postgres-shield]: https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white
[NodeJS]: https://nodejs.org/en
[Node-shield]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white
