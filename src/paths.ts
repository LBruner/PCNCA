const paths = {
    landingPage() {
        return '/';
    },
    home() {
        return `/home`;
    },
    login() {
        return `/auth/login`;
    },
    cadastro() {
        return `/auth/cadastro`;
    },
    vendas() {
        return `/vendas`;
    },
    createVenda() {
        return `/vendas/new`;
    },
    showVenda(vendaId: string) {
        return `/vendas/${vendaId}`;
    },
    editVenda(vendaId: string) {
        return `/vendas/${vendaId}/edit`;
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
    cotacoes(){
        return '/cotacoes'
    },
    clima(){
        return '/clima'
    }
}

export default paths;