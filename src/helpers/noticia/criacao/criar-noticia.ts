export function generateMarkdown(articleTitle: string, articleSubtitle: string, articleImage: string, articleContent: string) {
    return `# ${articleTitle}
${articleSubtitle}

**PCNCA - Usuário ADM** Publicado em: ${getPublicacaoData(true)}

![](${articleImage})

${articleContent}
`;
}

export const getPublicacaoData = (mostrarHorario?: boolean,data?: string, ) => {
    let dataAtual;

    if(data)
        dataAtual = new Date(data);
    else
        dataAtual = new Date();

    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, por isso +1
    const ano = dataAtual.getFullYear();

    const horas = String(dataAtual.getHours()).padStart(2, '0');
    const minutos = String(dataAtual.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${mostrarHorario ? `às ${horas}:${minutos}h.` : ''}`;
};

