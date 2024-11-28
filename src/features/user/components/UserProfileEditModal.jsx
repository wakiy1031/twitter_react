import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
} from "@yamada-ui/react";
import { useLocation } from "react-router-dom";

export const UserProfileEditModal = ({ isOpen: propIsOpen, onClose }) => {
  const location = useLocation();
  const isOpen = propIsOpen ?? location.pathname === "/settings/profile";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" px={8} py={4}>
      <ModalOverlay />
      <ModalHeader>プロフィールを編集</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{/* TODO: プロフィール編集フォームを実装する */}</ModalBody>
    </Modal>
  );
};
