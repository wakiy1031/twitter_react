import { Box, Text, Flex, Avatar, Loading } from "@yamada-ui/react";
import { PostImages } from "./components/postImages";
import { usePostDetail } from "../../hooks/usePostDetail";
import { useParams, useNavigate } from "react-router-dom";
import { HistoryNavButton } from "../../components/HistoryNavButton";
import { ActionButton } from "../../components/ActionButton";

export const PostDetail = () => {
  const { postId } = useParams();
  const { post, isLoading, error } = usePostDetail(postId);
  const navigate = useNavigate();

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
  const handleUserClick = (e) => {
    if (!e.defaultPrevented) {
      e.stopPropagation();
      navigate(`/users/${user.id}`);
    }
  };

  const { content, user, post_create } = post;

  return (
    <Box borderBottom="1px solid #dcdcde" py={2} px={4}>
      <Flex alignItems="center">
        <HistoryNavButton />
        <Text fontWeight="bold" ml={4} fontSize="xl">
          ポストする
        </Text>
      </Flex>
      <Flex alignItems="center" pt={5}>
        <Avatar
          size="sm"
          mr={2}
          onClick={handleUserClick}
          cursor="pointer"
          src={user.avatar_url}
        />
        <Box lineHeight={1}>
          <Text
            className="font-bold"
            onClick={handleUserClick}
            cursor="pointer"
          >
            {user.name}
          </Text>
          <Text
            className="text-gray-500 text-sm"
            onClick={handleUserClick}
            cursor="pointer"
          >
            @{user.email?.split("@")[0]}
          </Text>
        </Box>
      </Flex>
      <Text mb={2} pt={2}>
        {content}
      </Text>
      <PostImages post={post} />
      <Text
        mb={2}
        py={4}
        className="text-gray-500"
        borderBottom="1px solid #dcdcde"
      >
        {post_create}
      </Text>
      <ActionButton />
    </Box>
  );
};
