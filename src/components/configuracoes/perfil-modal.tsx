'use client';

import React from "react";
import {Modal, ModalBody, ModalContent} from "@nextui-org/modal";
import ProfileSettingsBody from "@/components/configuracoes/meu-perfil/ProfileSettingsBody";

interface PerfilModal {
    user: any;
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
    action?: () => void;
}

const PerfilModal: React.FC<PerfilModal> = ({user, onClose, isOpen, }) => {
    return (
        <Modal
            isOpen={isOpen}
            className={`w-[1800px] h-auto} border rounded-lg`}
            onClose={onClose}
            size="5xl"
            backdrop={'blur'}
            placement="center"
        >
            <ModalContent className={''}>
                {(_) => (
                    <>
                        <ModalBody className="px-10 py-10">
                            <ProfileSettingsBody user={user}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PerfilModal;