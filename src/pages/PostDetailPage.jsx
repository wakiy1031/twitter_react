import { Box, Flex, VStack } from "@yamada-ui/react";
import { PostDetail } from "../features/post/PostDetail";

export const PostDetailPage = () => {
  return (
    <Flex
      minH="100dvh"
      direction={{ base: "row", lg: "column" }}
      justify={{ base: "center", lg: "flex-start" }}
    >
      <VStack
        width={{ base: "250px", lg: "100%" }}
        p={4}
        borderRight={{ base: "1px solid #e1e8ed", lg: "none" }}
        borderBottom={{ base: "none", lg: "1px solid #e1e8ed" }}
        alignItems="flex-start"
      ></VStack>
      <Box width={{ base: "600px", lg: "100%" }}>
        <PostDetail />
      </Box>
      <VStack
        width={{ base: "350px", lg: "100%" }}
        p={4}
        borderLeft={{ base: "1px solid #e1e8ed", lg: "none" }}
        borderTop={{ base: "none", lg: "1px solid #e1e8ed" }}
      ></VStack>
    </Flex>
  );
};
