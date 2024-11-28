import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
} from "@yamada-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const UserProfileEditModal = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isOpen = propIsOpen ?? location.state?.isModal;

  const onClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      navigate(-1, {
        replace: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" px={8} py={4}>
      <ModalOverlay />
      <ModalHeader>プロフィールを編集</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{/* TODO: プロフィール編集フォームを実装する */}</ModalBody>
    </Modal>
  );
};
