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
    showNoticia(noticiaId: number) {
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
    createProduto() {
        return `vendas/produtos/criar`;
    },
    editProduto(produtoId: string) {
        return `vendas/produtos/${produtoId}/editar`;
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
    cotacoesMoedas(){
        return '/cotacoes/moedas'
    },
    clima(){
        return '/clima'
    }
}

export default paths;