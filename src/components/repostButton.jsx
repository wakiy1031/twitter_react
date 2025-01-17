import { RepeatIcon } from "@yamada-ui/lucide";
import { IconButton, Tooltip, Text, Box } from "@yamada-ui/react";
import useSWR from "swr";
import { fetchPost } from "../features/api/postApi";
import { useRepost } from "../hooks/useRepost";

const getPostKey = (postId) => `post/${postId}`;

export const RepostButton = ({ post }) => {
  const { data: postData } = useSWR(getPostKey(post.id), () =>
    fetchPost(post.id)
  );

  const repostsCount = postData?.data?.repost_count ?? post.repost_count;
  const isReposted = postData?.data?.reposted ?? post.reposted;

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
  );
};
