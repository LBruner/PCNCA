export function generateMarkdown(articleTitle: string, articleSubtitle: string, articleImage: string, articleContent: string) {
    return `# ${articleTitle}
${articleSubtitle}

**PCNCA - Usuário ADM** ${getPublicacaoData()}

![](${articleImage})

${articleContent}
`;
}

export const getPublicacaoData = () => {
    const data = new Date();

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Janeiro é 0, por isso +1
    const ano = data.getFullYear();

    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `Publicado em ${dia}/${mes}/${ano} às ${horas}:${minutos}h.`;
};
