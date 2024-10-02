import { Flex, VStack } from "@yamada-ui/react";
import { PostForm } from "../features/post/components/postForm";

export const HomePage = () => {
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
      <VStack width={{ base: "600px", lg: "100%" }} p={4}>
        <PostForm />
      </VStack>
      <VStack
        width={{ base: "350px", lg: "100%" }}
        p={4}
        borderLeft={{ base: "1px solid #e1e8ed", lg: "none" }}
        borderTop={{ base: "none", lg: "1px solid #e1e8ed" }}
      ></VStack>
    </Flex>
  );
};
