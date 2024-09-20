import { Box, Text } from "@yamada-ui/react";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../globalStates/atoms";

export const HomePage = () => {
  const currentUser = useRecoilValue(currentUserState);

  return (
    <Box minH="100vh" p={8}>
      <Text fontSize="4xl" fontWeight="bold" mb={4}>
        ツイート一覧画面
      </Text>
      {currentUser ? (
        <Text fontSize="xl" mb={4}>
          ログインユーザー: {currentUser.name}
        </Text>
      ) : (
        <Text fontSize="xl" mb={4}>
          ログインしていません。
        </Text>
      )}
    </Box>
  );
};
