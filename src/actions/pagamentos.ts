interface PreferenceInputProps {
    id: string;
    title: string;
    quantity: number;
}

export const pegaPreference = async (preferenceData: PreferenceInputProps[]): Promise<string> => {
    try {
        const response = await fetch(`/api/create-preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({items: preferenceData}),
        });

        const data = await response.json();
        return data.id;
    }
    catch (error) {
        console.error('Erro ao obter formas de pagamento:', error);
        throw error;
    }
}