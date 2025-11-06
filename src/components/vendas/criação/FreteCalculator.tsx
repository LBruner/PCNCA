import { Button, Card, CardBody, Input, Select, SelectItem } from "@heroui/react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo, useState } from "react";

interface FreteCalculatorProps {
    shippingValue: number | null;
    setShippingValue: Dispatch<SetStateAction<number | null>>;
    openCheckoutAccordion: () => void;
    initialState?: FreteCalculatorState | null;
    onStateChange?: (state: FreteCalculatorState) => void;
}

type FieldKey = "postalCode" | "state" | "city" | "district" | "street" | "addressNumber" | "phone";

export interface FreteCalculatorState {
    postalCode: string;
    street: string;
    addressNumber: string;
    complement: string;
    district: string;
    city: string;
    state: string;
    phone: string;
    isCalculating: boolean;
    deliveryEstimate: number | null;
    errorMessage: string | null;
    fieldErrors: Record<FieldKey, string | null>;
}

const BRAZILIAN_STATES: Array<{ value: string; label: string }> = [
    { value: "AC", label: "Acre" },
    { value: "AL", label: "Alagoas" },
    { value: "AP", label: "Amapá" },
    { value: "AM", label: "Amazonas" },
    { value: "BA", label: "Bahia" },
    { value: "CE", label: "Ceará" },
    { value: "DF", label: "Distrito Federal" },
    { value: "ES", label: "Espírito Santo" },
    { value: "GO", label: "Goiás" },
    { value: "MA", label: "Maranhão" },
    { value: "MT", label: "Mato Grosso" },
    { value: "MS", label: "Mato Grosso do Sul" },
    { value: "MG", label: "Minas Gerais" },
    { value: "PA", label: "Pará" },
    { value: "PB", label: "Paraíba" },
    { value: "PR", label: "Paraná" },
    { value: "PE", label: "Pernambuco" },
    { value: "PI", label: "Piauí" },
    { value: "RJ", label: "Rio de Janeiro" },
    { value: "RN", label: "Rio Grande do Norte" },
    { value: "RS", label: "Rio Grande do Sul" },
    { value: "RO", label: "Rondônia" },
    { value: "RR", label: "Roraima" },
    { value: "SC", label: "Santa Catarina" },
    { value: "SP", label: "São Paulo" },
    { value: "SE", label: "Sergipe" },
    { value: "TO", label: "Tocantins" },
];

const initialFieldErrors: Record<FieldKey, string | null> = {
    postalCode: null,
    state: null,
    city: null,
    district: null,
    street: null,
    addressNumber: null,
    phone: null,
};

const normalizeWhitespace = (value: string) =>
    value.replace(/\s+/g, " ").replace(/^\s+/, "");

const formatPostalCode = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) {
        return digits;
    }
    return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const formatState = (value: string) =>
    value.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 2);

const formatAddressNumber = (value: string) =>
    value.replace(/[^0-9a-zA-Z]/g, "").toUpperCase().slice(0, 10);

const formatPhoneNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);

    if (digits.length === 0) {
        return "";
    }
    if (digits.length < 3) {
        return `(${digits}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
};

const validateField = (field: FieldKey, rawValue: string): string | null => {
    const value = rawValue.trim();

    if (!value) {
        switch (field) {
            case "postalCode":
                return "Informe o CEP para calcular o frete.";
            case "state":
                return "Informe a UF do estado.";
            case "city":
                return "Informe a cidade.";
            case "district":
                return "Informe o bairro.";
            case "street":
                return "Informe a rua.";
            case "addressNumber":
                return "Informe o número do endereço.";
            case "phone":
                return "Informe um telefone para contato.";
            default:
                return "Campo obrigatório.";
        }
    }

    switch (field) {
        case "postalCode": {
            const digits = value.replace(/\D/g, "");
            return digits.length === 8 ? null : "Informe um CEP válido no formato 00000-000.";
        }
        case "state":
            return /^[A-Z]{2}$/.test(value) ? null : "Informe a UF com 2 letras.";
        case "addressNumber":
            return /^\d+[A-Z0-9]*$/.test(value) ? null : "Use apenas números (opcionalmente seguidos por letras).";
        case "phone": {
            const digits = value.replace(/\D/g, "");
            return digits.length === 11 ? null : "Informe um telefone válido com DDD.";
        }
        default:
            return value.length >= 2 ? null : "Informe ao menos 2 caracteres.";
    }
};

const FreteCalculator: React.FC<FreteCalculatorProps> = ({
    setShippingValue,
    shippingValue,
    openCheckoutAccordion,
    initialState,
    onStateChange,
}) => {
    const [postalCode, setPostalCode] = useState(initialState?.postalCode ?? '');
    const [street, setStreet] = useState(initialState?.street ?? '');
    const [addressNumber, setAddressNumber] = useState(initialState?.addressNumber ?? '');
    const [complement, setComplement] = useState(initialState?.complement ?? '');
    const [district, setDistrict] = useState(initialState?.district ?? '');
    const [city, setCity] = useState(initialState?.city ?? '');
    const [state, setState] = useState(initialState?.state ?? '');
    const [phone, setPhone] = useState(initialState?.phone ?? '');
    const [isCalculating, setIsCalculating] = useState(initialState?.isCalculating ?? false);
    const [deliveryEstimate, setDeliveryEstimate] = useState<number | null>(initialState?.deliveryEstimate ?? null);
    const [errorMessage, setErrorMessage] = useState<string | null>(initialState?.errorMessage ?? null);
    const [fieldErrors, setFieldErrors] = useState<Record<FieldKey, string | null>>(initialState?.fieldErrors ?? { ...initialFieldErrors });

    const currencyFormatter = useMemo(() => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }), []);

    const handlePostalCodeChange = (value: string) => {
        const formatted = formatPostalCode(value);
        setPostalCode(formatted);
        if (fieldErrors.postalCode) {
            setFieldErrors((prev) => ({
                ...prev,
                postalCode: validateField("postalCode", formatted),
            }));
        }
    };

    const handleStateChange = (value: string) => {
        const formatted = formatState(value);
        setState(formatted);
        if (fieldErrors.state) {
            setFieldErrors((prev) => ({
                ...prev,
                state: validateField("state", formatted),
            }));
        }
    };

    const handleCityChange = (value: string) => {
        const formatted = normalizeWhitespace(value);
        setCity(formatted);
        if (fieldErrors.city) {
            setFieldErrors((prev) => ({
                ...prev,
                city: validateField("city", formatted),
            }));
        }
    };

    const handleDistrictChange = (value: string) => {
        const formatted = normalizeWhitespace(value);
        setDistrict(formatted);
        if (fieldErrors.district) {
            setFieldErrors((prev) => ({
                ...prev,
                district: validateField("district", formatted),
            }));
        }
    };

    const handleStreetChange = (value: string) => {
        const formatted = normalizeWhitespace(value);
        setStreet(formatted);
        if (fieldErrors.street) {
            setFieldErrors((prev) => ({
                ...prev,
                street: validateField("street", formatted),
            }));
        }
    };

    const handleAddressNumberChange = (value: string) => {
        const formatted = formatAddressNumber(value);
        setAddressNumber(formatted);
        if (fieldErrors.addressNumber) {
            setFieldErrors((prev) => ({
                ...prev,
                addressNumber: validateField("addressNumber", formatted),
            }));
        }
    };

    const handleComplementChange = (value: string) => {
        const formatted = normalizeWhitespace(value);
        setComplement(formatted);
    };

    const handlePhoneChange = (value: string) => {
        const formatted = formatPhoneNumber(value);
        setPhone(formatted);
        if (fieldErrors.phone) {
            setFieldErrors((prev) => ({
                ...prev,
                phone: validateField("phone", formatted),
            }));
        }
    };

    const handleCalculateFrete = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const updatedErrors: Record<FieldKey, string | null> = {
            postalCode: validateField("postalCode", postalCode),
            state: validateField("state", state),
            city: validateField("city", city),
            district: validateField("district", district),
            street: validateField("street", street),
            addressNumber: validateField("addressNumber", addressNumber),
            phone: validateField("phone", phone),
        };

        setFieldErrors(updatedErrors);

        const hasErrors = Object.values(updatedErrors).some(Boolean);
        if (hasErrors) {
            setErrorMessage("Revise os campos destacados para continuar.");
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

    useEffect(() => {
        if (!onStateChange) {
            return;
        }

        onStateChange({
            postalCode,
            street,
            addressNumber,
            complement,
            district,
            city,
            state,
            phone,
            isCalculating,
            deliveryEstimate,
            errorMessage,
            fieldErrors,
        });
    }, [
        postalCode,
        street,
        addressNumber,
        complement,
        district,
        city,
        state,
        phone,
        isCalculating,
        deliveryEstimate,
        errorMessage,
        fieldErrors,
        onStateChange,
    ]);

    return (
        <Card className="border border-default-200 p-8">
            <CardBody className="flex flex-col gap-4">
                <form onSubmit={handleCalculateFrete} className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input
                            label="CEP"
                            placeholder="00000-000"
                            value={postalCode}
                            onValueChange={handlePostalCodeChange}
                            isRequired
                            isInvalid={Boolean(fieldErrors.postalCode)}
                            errorMessage={fieldErrors.postalCode ?? undefined}
                        />
                        <Select
                            label="Estado"
                            placeholder="Selecione o estado"
                            selectedKeys={state ? [state] : []}
                            onChange={(event) => handleStateChange(event.target.value)}
                            isRequired
                            isInvalid={Boolean(fieldErrors.state)}
                            errorMessage={fieldErrors.state ?? undefined}
                        >
                            {BRAZILIAN_STATES.map(({ value, label }) => (
                                <SelectItem key={value}>
                                    {`${label} (${value})`}
                                </SelectItem>
                            ))}
                        </Select>
                        <Input
                            label="Cidade"
                            placeholder="Informe a cidade"
                            value={city}
                            onValueChange={handleCityChange}
                            isRequired
                            isInvalid={Boolean(fieldErrors.city)}
                            errorMessage={fieldErrors.city ?? undefined}
                        />
                        <Input
                            label="Bairro"
                            placeholder="Informe o bairro"
                            value={district}
                            onValueChange={handleDistrictChange}
                            isRequired
                            isInvalid={Boolean(fieldErrors.district)}
                            errorMessage={fieldErrors.district ?? undefined}
                        />
                        <Input
                            label="Rua"
                            placeholder="Informe a rua"
                            value={street}
                            onValueChange={handleStreetChange}
                            isRequired
                            isInvalid={Boolean(fieldErrors.street)}
                            errorMessage={fieldErrors.street ?? undefined}
                        />
                        <Input
                            label="Número"
                            placeholder="Informe o número"
                            value={addressNumber}
                            onValueChange={handleAddressNumberChange}
                            type="text"
                            isRequired
                            isInvalid={Boolean(fieldErrors.addressNumber)}
                            errorMessage={fieldErrors.addressNumber ?? undefined}
                        />
                        <Input
                            label="Complemento"
                            placeholder="Apartamento, bloco, etc."
                            value={complement}
                            onValueChange={handleComplementChange}
                        />
                        <Input
                            label="Telefone"
                            placeholder="(14) 999999999"
                            value={phone}
                            onValueChange={handlePhoneChange}
                            isRequired
                            isInvalid={Boolean(fieldErrors.phone)}
                            errorMessage={fieldErrors.phone ?? undefined}
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
                                    {`${street}, ${addressNumber}${complement ? ` - ${complement}` : ''}`}
                                    <br />
                                    {`${district} - ${city}/${state.toUpperCase()}`}
                                    <br />
                                    {`CEP: ${postalCode}`}
                                    <br />
                                    {`Telefone: ${phone}`}
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
