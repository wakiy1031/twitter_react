import { Text } from "@yamada-ui/react";

export const PostItem = ({ post }) => {
  return (
    <>
      <Text>{post.content}</Text>
    </>
  );
};
