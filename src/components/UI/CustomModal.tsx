import React from "react";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/modal";
import {Button, Spinner} from "@nextui-org/react";

interface CustomModalProps {
    title: string,
    text: string,
    action: () => void,
    actionText: string,
    closeText?: string,
    isOpen: boolean,
    onClose: () => void,
    isLoading?: boolean,
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "full" | undefined,
}

const CustomModal: React.FC<CustomModalProps> = (
    {
        isOpen, isLoading, onClose, size, text, title, action, closeText, actionText
    }) => {

    let modalBody;

    if (isLoading) {
        modalBody = <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10  z-50">
            <Spinner color={'warning'}/>
        </div>
    } else {
        modalBody =
            <>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    <p>
                        {text}
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        {closeText}
                    </Button>
                    <Button color="primary" onPress={action}>
                        {actionText}
                    </Button>
                </ModalFooter>
            </>
    }

    return (
        <Modal backdrop={'blur'} size={size} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                {(_) => (
                    <>
                        {modalBody}
                    </>
                )}
            </ModalContent>
        </Modal>

    )
}

export default CustomModal;