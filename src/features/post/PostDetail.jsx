import { Box, Text, Flex, Avatar, Loading } from "@yamada-ui/react";
import { PostImages } from "./components/postImages";
import { usePostDetail } from "../../hooks/usePostDetail";
import { useParams } from "react-router-dom";

export const PostDetail = () => {
  const { postId } = useParams();
  const { post, isLoading, error } = usePostDetail(postId);

  if (isLoading) {
    return (
      <Loading
        variant="oval"
        fontSize="2xl"
        color="blue.500"
        mx="auto"
        w="full"
        mt={6}
      />
    );
  }

  if (error) {
    return <div>投稿の取得中にエラーが発生しました。</div>;
  }

  if (!post) {
    return <div>投稿が見つかりません。</div>;
  }

  const { content, user, created_at } = post;

  return (
    <Box borderBottom="1px solid #dcdcde" py={2} px={3}>
      <Flex alignItems="start">
        <Avatar size="sm" mr={2} />
        <Box>
          <Text>
            <span className="font-bold">{user.name}</span>
            <span className="text-gray-500 ml-1 text-sm">
              @{user.username || user.name}
            </span>
            <span className="text-gray-500 text-sm">・{created_at}</span>
          </Text>
          <Text mb={2}>{content}</Text>
          <PostImages post={post} />
        </Box>
      </Flex>
    </Box>
  );
};
