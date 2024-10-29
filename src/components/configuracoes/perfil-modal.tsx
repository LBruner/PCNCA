'use client';

import React from "react";
import {Tab, Tabs} from "@nextui-org/react";
import ProfileSettingsPage from "@/app/configuracoes/meu-perfil/page";
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

const PerfilModal: React.FC<PerfilModal> = ({user,isLoading, onClose, isOpen, action}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="4xl"
            backdrop={'blur'}
            placement="center"
        >
            <ModalContent className={''}>
                {(onClose) => (
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