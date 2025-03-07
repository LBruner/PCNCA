import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: {
                "MDX Editor with Live Preview": "MDX Editor with Live Preview",
                "Editor": "Editor",
                "Create Link": "Create Link",
                "Insert Image": "Insert Image",
                "Insert Table": "Insert Table",
                "Insert Thematic Break": "Insert Thematic Break",
                "Insert Code Block": "Insert Code Block",
                "Insert Frontmatter": "Insert Frontmatter",
                "Insert Admonition": "Insert Admonition"
                // Add more translations here
            },
        },
        pt: {
            translation: {
                "MDX Editor with Live Preview": "Editor MDX com visualização ao vivo",
                "Editor": "Editor",
                "Create Link": "Criar Link",
                "Insert Image": "Inserir Imagem",
                "Insert Table": "Inserir Tabela",
                "Insert Thematic Break": "Inserir Quebra Temática",
                "Insert Code Block": "Inserir Bloco de Código",
                "Insert Frontmatter": "Inserir Frontmatter",
                "Insert Admonition": "Inserir Admoestação"
                // Add more translations here
            },
        },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
        escapeValue: false,
    },
}).then(_ => {});