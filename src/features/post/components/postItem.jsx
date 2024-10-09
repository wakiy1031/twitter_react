import { Box, Text, Flex, Avatar } from "@yamada-ui/react";
import { PostImages } from "./postImages";

export const PostItem = ({ post }) => {
  return (
    <Box borderBottom="1px solid #dcdcde" py={2} px={3}>
      <Flex alignItems="start">
        <Avatar size="sm" mr={2} />
        <Box>
          <Text>
            <span className="font-bold">{post.user.name}</span>
            <span className="text-gray-500 ml-1 text-sm">
              @{post.user.username ? post.user.username : post.user.name}
            </span>
            <span className="text-gray-500 text-sm">・{post.created_at}</span>
          </Text>
          <Text mb={2}>{post.content}</Text>
          <PostImages post={post} />
        </Box>
      </Flex>
    </Box>
  );
};
