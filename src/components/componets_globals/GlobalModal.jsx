import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";

const GlobalModal = ({ isOpen, onOpenChange, title, children, footer }) => {
  return (
    <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {footer && <ModalFooter>{footer(onClose)}</ModalFooter>}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default GlobalModal;
