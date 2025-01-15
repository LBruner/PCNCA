import React from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {Button} from "@nextui-org/react";

interface TermosCondicoesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermosCondicoesModal: React.FC<TermosCondicoesModalProps> = ({isOpen, onClose}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} className="rounded-lg shadow-lg">
            <ModalContent>
                <ModalHeader>
                    <h2 className="text-xl font-semibold text-gray-800">Termos e Condições</h2>
                </ModalHeader>
                <ModalBody>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        Bem-vindo aos nossos serviços! Ao usar este site, você concorda em cumprir e estar vinculado
                        pelos seguintes termos e condições. Certifique-se de lê-los atentamente.
                    </p>
                    <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                        1. Seu uso dos serviços deve ser para fins legais e não deve violar nenhuma lei aplicável.
                    </p>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        2. Nós reservamos o direito de modificar ou encerrar os serviços a qualquer momento sem aviso
                        prévio.
                    </p>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        3. Todo o conteúdo neste site é protegido por direitos autorais e não pode ser reproduzido
                        sem permissão.
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color={'primary'}
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Aceitar e Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default TermosCondicoesModal;