import { Box, Text, Flex, Loading } from "@yamada-ui/react";
import useSWR from "swr";
import { getNotifications } from "../api/notificationApi";
import { HistoryNavButton } from "../../components/HistoryNavButton";
import { NotificationRepostItem } from "./components/notificationRepostItem";
export const NotificationList = () => {
  const {
    data: notifications,
    error,
    isLoading,
  } = useSWR("notifications", getNotifications);

  if (error) {
    return <div>通知の取得中にエラーが発生しました。</div>;
  }

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

  return (
    <Box>
      <Flex
        alignItems="center"
        position="sticky"
        top={0}
        left={0}
        py={2}
        px={3}
        zIndex={3}
        w="100%"
        bg="rgba(255, 255, 255, 0.7)"
        backdropFilter="blur(5px)"
        borderBottom="1px solid #dcdcde"
      >
        <HistoryNavButton />
        <Text ml={4} fontSize="xl" fontWeight="bold">
          通知
        </Text>
      </Flex>

      {notifications?.length === 0 ? (
        <Box p={4}>
          <Text>通知はありません</Text>
        </Box>
      ) : (
        <Box>
          {notifications?.map((notification) => (
            <Box
              key={notification.id}
              cursor="pointer"
              borderBottom="1px solid #dcdcde"
            >
              {notification.action === "follow" ? (
                <Text>フォローされました</Text>
              ) : notification.action === "like" ? (
                <Text>いいねされました</Text>
              ) : notification.action === "comment" ? (
                <Text>コメントされました</Text>
              ) : notification.action === "repost" ? (
                <NotificationRepostItem notification={notification} />
              ) : (
                <Text>{notification.message}</Text>
              )}
              <Text fontSize="sm" color="gray.500" mt={1}>
                {notification.created_at}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};
