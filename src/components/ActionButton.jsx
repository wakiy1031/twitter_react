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
import useSWR from "swr";
import { fetchPost } from "../features/api/postApi";
import { useRepost } from "../hooks/useRepost";

const getPostKey = (postId) => `post/${postId}`;

export const ActionButton = ({ post, user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: postData } = useSWR(getPostKey(post.id), () =>
    fetchPost(post.id)
  );

  const commentsCount = postData?.data?.comments_count ?? post.comments_count;
  const repostsCount = postData?.data?.repost_count ?? post.repost_count;
  const isReposted = postData?.data?.reposted ?? post.reposted;

  const handleReplyClick = (e) => {
    e.stopPropagation();
    onOpen();
  };

  const { handleCreate, handleDelete } = useRepost();

  const handleRepostClick = async (e) => {
    e.stopPropagation();
    try {
      if (isReposted) {
        await handleDelete(post.id);
      } else {
        await handleCreate(post.id);
      }
    } catch (error) {
      console.error("リポスト操作に失敗しました。エラーの詳細:", {
        error,
        errorMessage: error.message,
        errorResponse: error.response?.data,
        postId: post.id,
        isReposted,
      });
    }
  };

  return (
    <HStack spacing="4" justify="space-between" py={2}>
      <Tooltip label="返信" openDelay={500} gutter={2} fontSize="xs">
        <Box
          position="relative"
          cursor="pointer"
          _hover={{
            "& > .comment-count": {
              color: "blue.500",
            },
          }}
          onClick={handleReplyClick}
        >
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
          />
          <Text
            fontSize="sm"
            color="gray.300"
            className="comment-count"
            position="absolute"
            animation="slideInUp"
            top="50%"
            right="-.25em"
            transform="translateY(-50%)"
          >
            {commentsCount}
          </Text>
        </Box>
      </Tooltip>
      <Tooltip label="リポスト" openDelay={500} gutter={2} fontSize="xs">
        <Box
          position="relative"
          cursor="pointer"
          _hover={{
            "& > .repost-count": {
              color: "green.500",
            },
          }}
          onClick={handleRepostClick}
        >
          <IconButton
            variant="ghost"
            icon={<RepeatIcon w={20} />}
            aria-label="リポスト"
            size="sm"
            w={6}
            p={1}
            borderRadius="full"
            color={isReposted ? "green.500" : "gray.200"}
            _hover={{ bg: "green.50", color: "green.500" }}
          />
          <Text
            fontSize="sm"
            color={isReposted ? "green.500" : "gray.300"}
            className="repost-count"
            animation="slideInUp"
            position="absolute"
            top="50%"
            right="-.25em"
            transform="translateY(-50%)"
          >
            {repostsCount > 0 ? repostsCount : ""}
          </Text>
        </Box>
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
                <span className="text-gray-500">返信先：</span>@
                {user.email?.split("@")[0]}
                <span className="text-gray-500">さん</span>
              </Text>
            </Box>
          </Flex>
        </ModalBody>

        <ModalBody onClick={(e) => e.stopPropagation()} mt={0}>
          <CommentForm
            post_id={post.id}
            onSuccess={onClose}
            post={post}
            user={user}
          />
        </ModalBody>
      </Modal>
    </HStack>
  );
};
