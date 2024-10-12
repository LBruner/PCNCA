'use client';
import React, {useState} from "react";
import {Button, Select, SelectItem, Spinner} from "@nextui-org/react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {ProductionProduct, productionProducts} from "@/models/producao-internacional/produtos";

interface Props {
    isOpen: boolean;
    onOpenChange: () => void;
    setSelectedProduct: (product: ProductionProduct) => void
}

const ProductionProductPickerModal: React.FC<Props> = ({onOpenChange, isOpen,setSelectedProduct}) => {
    const [value, setValue] = React.useState(new Set([]));
    const [isLoading, setIsLoading] = useState(false);

    if(isLoading){
        setTimeout(() => setIsLoading(false), 1000);
        return <div className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-md z-50 flex items-center justify-center">
            <Spinner color={'warning'}/>
        </div>
    }

    return (
        <Modal backdrop={"blur"} isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}
               isKeyboardDismissDisabled={true}>
        <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Seleção de commoditie</ModalHeader>
                        <ModalBody>
                            <p>
                                Escolha uma commodity para visualizar seus dados de produção.
                            </p>
                            <Select onSelectionChange={(e:any) => setValue(e)} label="Commoditie" multiple={false}>
                                {productionProducts.map((product) => (
                                    <SelectItem key={product.name} value={product.name}>
                                        {product.translationName}
                                    </SelectItem>
                                ))}
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button onClick={_ => {
                                setSelectedProduct(productionProducts.find((item) => Array.from(value)[0] === item.name)!);
                                setIsLoading(true);
                            }} color="primary" onPress={onClose}>
                                Selecionar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

export default ProductionProductPickerModal;