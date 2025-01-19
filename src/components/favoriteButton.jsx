import { HeartIcon } from "@yamada-ui/lucide";
import { Box, IconButton, Text, Tooltip } from "@yamada-ui/react";
import useSWR from "swr";
import { fetchPost } from "../features/api/postApi";
import { useFavorite } from "../hooks/useFavorite";

const getPostKey = (postId) => `post/${postId}`;

export const FavoriteButton = ({ post }) => {
  const { data: postData } = useSWR(getPostKey(post.id), () =>
    fetchPost(post.id)
  );

  const favoritesCount = postData?.data?.favorite_count ?? post.favorite_count;
  const isFavorited = postData?.data?.favorited ?? post.favorited;

  const { handleCreate, handleDelete } = useFavorite();

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    try {
      if (isFavorited) {
        await handleDelete(post.id);
      } else {
        await handleCreate(post.id);
      }
    } catch (error) {
      console.error("いいね操作に失敗しました。エラーの詳細:", {
        error,
        errorMessage: error.message,
        errorResponse: error.response?.data,
        postId: post.id,
        isFavorited,
      });
    }
  };

  return (
    <Tooltip label="いいね" openDelay={500} gutter={2} fontSize="xs">
      <Box
        onClick={handleFavoriteClick}
        position="relative"
        cursor="pointer"
        _hover={{
          "& > .favorite-count": {
            color: "red.500",
          },
        }}
      >
        <IconButton
          variant="ghost"
          icon={<HeartIcon w={20} />}
          aria-label="いいね"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color={isFavorited ? "red.500" : "gray.200"}
          _hover={{ bg: "red.50", color: "red.500" }}
        />
        <Text
          fontSize="sm"
          color={isFavorited ? "red.500" : "gray.300"}
          className="favorite-count"
          animation="slideInUp"
          position="absolute"
          top="50%"
          right="-.25em"
          transform="translateY(-50%)"
        >
          {favoritesCount > 0 ? favoritesCount : ""}
        </Text>
      </Box>
    </Tooltip>
  );
};
