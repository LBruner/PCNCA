const paths = {
    landingPage() {
        return '/';
    },
    adm(){
        return `/adm`;
    },
    admNoticias(){
        return `/adm/noticias`;
    },
    admCulturas(){
        return `/adm/culturas`;
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
        return `/vendas/criar`;
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
    criarNoticia() {
        return `/adm/noticias/criar`;
    },
    maisNoticias() {
        return `/noticias/ver-mais`;
    },
    culturas() {
        return `/noticias/culturas`;
    },
    getCultura(id: number) {
        return `/noticias/culturas/${id}`;
    },
    showNoticia(noticiaId: number) {
        return `/noticias/${noticiaId}`;
    },
    editNoticia(noticiaId: number) {
        return `/adm/noticias/${noticiaId}/editar`;
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
    createPessoa() {
        return `/pessoas/criar`;
    },
    showPessoa(pessoaId: string) {
        return `/pessoas/${pessoaId}`;
    },
    editPessoa(pessoaId: number) {
        return `/pessoas/${pessoaId}/editar`;
    },
    configuracoes() {
        return `/configuracoes`;
    },
    cotacoesMoedas(){
        return '/cotacoes/moedas'
    },
    cotacoesCommodities(){
        return '/cotacoes/commodities'
    },
    prodInternacional(){
        return '/producao-internacional'
    }
}

export default paths;