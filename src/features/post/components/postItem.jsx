import { Box, Text, Flex, Avatar } from "@yamada-ui/react";
import { PostImages } from "./postImages";
import { useNavigate } from "react-router-dom";

export const PostItem = ({ post }) => {
  const { id, content, user, created_at } = post;
  const navigate = useNavigate();

  const handlePostClick = (e) => {
    if (!e.defaultPrevented) {
      navigate(`/${user.name}/${id}`);
    }
  };

  return (
    <Box
      borderBottom="1px solid #dcdcde"
      py={2}
      px={3}
      onClick={handlePostClick}
      cursor="pointer"
    >
      <Flex alignItems="start">
        <Avatar size="sm" mr={2} />
        <Box w="full">
          <Text>
            <span className="font-bold">{user.name}</span>
            <span className="text-gray-500 ml-1 text-sm">
              @{user.username ? user.username : user.name}
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
