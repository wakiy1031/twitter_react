import {
  MessageCircleIcon,
  RepeatIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@yamada-ui/lucide";
import {
  HStack,
  IconButton,
  Modal,
  Tooltip,
  useDisclosure,
  ModalBody,
  Text,
  Flex,
  Box,
  Avatar,
  ModalCloseButton,
} from "@yamada-ui/react";
import { CommentForm } from "../features/comment/components/commentForm";

export const ActionButton = ({ post, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleReplyClick = (e) => {
    e.stopPropagation();
    onOpen();
  };
  return (
    <HStack spacing="4" justify="space-between">
      <Tooltip label="返信" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<MessageCircleIcon w={20} />}
          aria-label="返信"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "blue.50", color: "blue.500" }}
          onClick={handleReplyClick}
        />
      </Tooltip>
      <Tooltip label="リポスト" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<RepeatIcon w={20} />}
          aria-label="リポスト"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "green.50", color: "green.500" }}
        />
      </Tooltip>
      <Tooltip label="いいね" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<HeartIcon w={20} />}
          aria-label="いいね"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "red.50", color: "red.500" }}
        />
      </Tooltip>
      <Tooltip label="ブックマーク" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<BookmarkIcon w={20} />}
          aria-label="ブックマーク"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
      <Tooltip label="共有" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<ShareIcon w={20} />}
          aria-label="共有"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
        pt="12"
        size="lg"
      >
        <ModalCloseButton left="var(--ui-spaces-3)" top="var(--ui-spaces-4)" />

        <ModalBody onClick={(e) => e.stopPropagation()} mb={0}>
          <Flex
            alignItems="start"
            className="relative before:content-[''] before:absolute before:w-0.25 before:bg-gray-300 before:h-full before:left-4 before:top-0 pb-3 mb-1"
          >
            <Avatar
              size="sm"
              mr={2}
              cursor="pointer"
              src={user.avatar_url}
              fallback={<Avatar size="sm" name={user.name} />}
            />
            <Box w="full">
              <Text>
                <span className="font-bold" cursor="pointer">
                  {user.name}
                </span>
                <span className="text-gray-500 ml-1 text-sm" cursor="pointer">
                  @{user.email?.split("@")[0]}
                </span>
                <Tooltip
                  label={post.created_at}
                  openDelay={500}
                  gutter={2}
                  fontSize="xs"
                >
                  <span className="text-gray-500 text-sm">
                    ・{post.created_at}
                  </span>
                </Tooltip>
              </Text>
              <Text mb={3}>{post.content}</Text>
              <Text className="text-blue-500">
                <span className="text-gray-500">返信先：</span>@{post.user.name}
                さん
              </Text>
            </Box>
          </Flex>
        </ModalBody>

        <ModalBody onClick={(e) => e.stopPropagation()} mt={0}>
          <CommentForm post_id={post.id} onSuccess={onClose} />
        </ModalBody>
      </Modal>
    </HStack>
  );
};
