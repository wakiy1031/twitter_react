import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@yamada-ui/react";
import { LoginForm } from "./LoginForm";
import { useNavigate } from "react-router-dom";

export const LoginModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    onClose();
    navigate("/home", { replace: true });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalHeader>ログイン</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <LoginForm onSuccess={handleSuccess} />
      </ModalBody>
    </Modal>
  );
};
