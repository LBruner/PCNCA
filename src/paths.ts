const paths = {
    landingPage() {
        return '/';
    },
    home() {
        return `/home`;
    },
    login() {
        return `/login`;
    },
    noticias() {
        return `/noticias`;
    },
    showNoticia(noticiaId: string) {
        return `/noticias/${noticiaId}`;
    },
    estoque() {
        return `/estoque`;
    },
    relatorios() {
        return `/relatorios`;
    },
    produtos() {
        return `/produtos`;
    },
    showProduto(produtoId: string) {
        return `/produtos/${produtoId}`;
    },
    produtoCreate() {
        return `/produtos/new`;
    },
    editProduto(produtoId: string) {
        return `/produtos/${produtoId}/edit`;
    },
    pessoas(){
        return `/pessoas`;
    },
    showPessoa(pessoaId: string) {
        return `/pessoas/${pessoaId}`;
    },
    createPessoa() {
        return `/pessoas/new`;
    },
    editPessoa(pessoaId: string) {
        return `/pessoas/${pessoaId}/edit`;
    },
    configuracoes() {
        return `/configuracoes`;
    },

}

export default paths;