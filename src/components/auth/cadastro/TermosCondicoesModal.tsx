import React from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@heroui/modal";
import {Button} from "@heroui/react";

interface TermosCondicoesModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TermosCondicoesModal: React.FC<TermosCondicoesModalProps> = ({isOpen, onClose}) => {
    return (
        <Modal size={'2xl'} isOpen={isOpen} onClose={onClose} className="rounded-xl shadow-2xl">
            <ModalContent className="bg-white dark:bg-gray-800">
                <ModalHeader className="border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Termos e Condições</h2>
                </ModalHeader>
                <ModalBody className="px-6 py-4">
                    <div className="space-y-4">
                        <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                            Bem-vindo aos nossos serviços! Ao usar este site, você concorda em cumprir e estar vinculado
                            pelos seguintes termos e condições. Certifique-se de lê-los atentamente.
                        </p>

                        <div className="space-y-3 mt-6">
                            <div className="flex">
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-warning-100 text-warning-600 font-semibold mr-3">1</span>
                                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                                    Seu uso dos serviços deve ser para fins legais e não deve violar nenhuma lei aplicável.
                                </p>
                            </div>

                            <div className="flex">
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-warning-100 text-warning-600 font-semibold mr-3">2</span>
                                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                                    Nós reservamos o direito de modificar ou encerrar os serviços a qualquer momento sem aviso
                                    prévio.
                                </p>
                            </div>

                            <div className="flex">
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-warning-100 text-warning-600 font-semibold mr-3">3</span>
                                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                                    Todo o conteúdo neste site é protegido por direitos autorais e não pode ser reproduzido
                                    sem permissão.
                                </p>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter className="border-t border-gray-200 dark:border-gray-700 flex justify-end">
                    <Button
                        color={'primary'}
                        onPress={onClose}
                        className="px-6 py-2 bg-warning-400 text-white font-medium rounded-lg shadow-md hover:bg-warning-600 focus:outline-none focus:ring-2 focus:ring-warning-500 focus:ring-opacity-50 transition-all duration-200"
                    >
                        Aceitar e Fechar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default TermosCondicoesModal;