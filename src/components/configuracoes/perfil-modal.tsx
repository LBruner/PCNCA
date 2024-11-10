'use client';

import React from "react";
import {Modal, ModalBody, ModalContent} from "@nextui-org/modal";
import {User} from "@prisma/client";
import ProfileSettingsBody from "@/components/configuracoes/meu-perfil/ProfileSettingsBody";

interface PerfilModal {
    user: User;
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
    action?: () => void;
}

const PerfilModal: React.FC<PerfilModal> = ({user,isLoading, onClose, isOpen, }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
            backdrop={'blur'}
            placement="center"
        >
            <ModalContent className={''}>
                {(_) => (
                    <>
                        <ModalBody className="px-6 py-4">
                            <ProfileSettingsBody user={user}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default PerfilModal;