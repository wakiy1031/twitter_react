import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@yamada-ui/react";
import { LoginForm } from "./LoginForm";

export const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalHeader>ログイン</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <LoginForm onSuccess={onClose} />
      </ModalBody>
    </Modal>
  );
};
