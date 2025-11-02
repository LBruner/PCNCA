import { Button, Card, CardBody, Input } from "@heroui/react";
import { Dispatch, FormEvent, SetStateAction, useMemo, useState } from "react";

interface FreteCalculatorProps {
    shippingValue: number | null;
    setShippingValue: Dispatch<SetStateAction<number | null>>;
    openCheckoutAccordion: () => void;
}

const FreteCalculator: React.FC<FreteCalculatorProps> = ({ setShippingValue, shippingValue, openCheckoutAccordion }) => {
    const [postalCode, setPostalCode] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [deliveryEstimate, setDeliveryEstimate] = useState<number | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const currencyFormatter = useMemo(() => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }), []);

    const handleCalculateFrete = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const requiredFields = [
            { value: postalCode, label: 'CEP' },
            { value: street, label: 'Rua' },
            { value: number, label: 'Número' },
            { value: district, label: 'Bairro' },
            { value: city, label: 'Cidade' },
            { value: state, label: 'Estado' },
        ];

        const missingField = requiredFields.find(field => !field.value.trim());
        if (missingField) {
            setErrorMessage(`Preencha o campo ${missingField.label} para calcular o frete.`);
            return;
        }

        setErrorMessage(null);
        setIsCalculating(true);
        setShippingValue(null);
        setDeliveryEstimate(null);

        const randomValue = Number((Math.random() * (40 - 12) + 12).toFixed(2));
        const randomEstimate = Math.floor(Math.random() * (8 - 3 + 1)) + 3;

        // Simula um pequeno atraso da API de cálculo de frete
        setTimeout(() => {
            setShippingValue(randomValue);
            setDeliveryEstimate(randomEstimate);
            setIsCalculating(false);
        }, 600);
    };

    return (
        <Card className="border border-default-200 p-8">
            <CardBody className="flex flex-col gap-4">
                <form onSubmit={handleCalculateFrete} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="CEP"
                            placeholder="00000-000"
                            value={postalCode}
                            onValueChange={setPostalCode}
                            isRequired
                            errorMessage={'Campo obrigatório'}
                        />
                        <Input
                            label="Estado"
                            placeholder="UF"
                            value={state}
                            onValueChange={setState}
                            maxLength={2}
                            isRequired
                            errorMessage={'Campo obrigatório'}

                        />
                        <Input
                            label="Cidade"
                            placeholder="Informe a cidade"
                            value={city}
                            onValueChange={setCity}
                            isRequired
                            errorMessage={'Campo obrigatório'}

                        />
                        <Input
                            label="Bairro"
                            placeholder="Informe o bairro"
                            value={district}
                            onValueChange={setDistrict}
                            isRequired
                            errorMessage={'Campo obrigatório'}

                        />
                        <Input
                            label="Rua"
                            placeholder="Informe a rua"
                            value={street}
                            onValueChange={setStreet}
                            isRequired
                            errorMessage={'Campo obrigatório'}

                        />
                        <Input
                            label="Número"
                            placeholder="Informe o número"
                            value={number}
                            onValueChange={setNumber}
                            type="text"
                            isRequired
                            errorMessage={'Campo obrigatório'}

                        />
                        <Input
                            label="Complemento"
                            placeholder="Apartamento, bloco, etc."
                            value={complement}
                            onValueChange={setComplement}

                        />
                    </div>
                    {errorMessage && <span className="text-sm text-danger">{errorMessage}</span>}
                    <Button type="submit" color="primary" isLoading={isCalculating}>
                        Calcular frete
                    </Button>
                </form>
                {shippingValue !== null && deliveryEstimate !== null && (
                    <div className="mt-6 space-y-4">
                        <div className="bg-success-50 border border-success-200 rounded-lg p-5">
                            <div className="flex items-start justify-between flex-wrap gap-4">
                                <div className="flex-1">
                                    <span className="text-sm text-success-700 font-medium block mb-1">
                                        Frete calculado com sucesso!
                                    </span>
                                    <div className="mt-2">
                                        <span className="text-3xl font-bold text-success-900">
                                            {currencyFormatter.format(shippingValue)}
                                        </span>
                                    </div>
                                    <span className="text-sm text-success-700 mt-2 block">
                                        Prazo de entrega: {deliveryEstimate} dias úteis
                                    </span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-success-200">
                                <span className="text-xs font-medium text-success-800 block mb-1">
                                    Endereço de entrega:
                                </span>
                                <span className="text-sm text-success-700">
                                    {`${street}, ${number}${complement ? ` - ${complement}` : ''}`}
                                    <br />
                                    {`${district} - ${city}/${state.toUpperCase()}`}
                                    <br />
                                    {`CEP: ${postalCode}`}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-3 justify-end py-6 flex-col items-center sm:flex-row">
                            <Button
                                color="default"
                                variant="light"
                                onPress={() => {
                                    setShippingValue(null);
                                    setDeliveryEstimate(null);
                                }}
                            >
                                Recalcular frete
                            </Button>
                            <Button
                                color="primary"
                                onPress={openCheckoutAccordion}
                                size="lg"
                            >
                                Continuar para pagamento →
                            </Button>
                        </div>
                    </div>)}
            </CardBody>
        </Card>
    );
};

export default FreteCalculator;
