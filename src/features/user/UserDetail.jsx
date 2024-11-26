import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";
import {
  Avatar,
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@yamada-ui/react";
import { HistoryNavButton } from "../../components/HistoryNavButton";
import { PostItem } from "../post/components/PostItem";

export const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchUser(id));
    }
  }, [dispatch, id]);

  if (status === "loading") {
    return <div>読み込み中...</div>;
  }

  if (status === "failed") {
    return <div>エラー: {error}</div>;
  }

  if (!user) {
    return null;
  }
  return (
    <VStack>
      <Flex alignItems="center" position="sticky" top={0} py={2} px={3}>
        <HistoryNavButton />
        <Text ml={4} fontSize="xl">
          <span className="font-bold leading-4 block">{user.name}</span>
          <span className="text-gray-500 text-sm">
            {user.posts_count}件のポスト
          </span>
        </Text>
      </Flex>
      <Box>
        <Image src={user.cover_image} alt="cover" />
      </Box>
      <Box px={4} py={2}>
        <Avatar src={user.avatar} size="xl" />
        <Box lineHeight={1.25}>
          <Text className="font-bold" fontSize="xl">
            {user.name}
          </Text>
          <Text className="text-gray-500">@{user.username || user.name}</Text>
        </Box>
        <Text>{user.bio}</Text>
        <Flex>
          <Text>
            <span className="font-bold mr-1">{user.followers_count || 0}</span>
            <span className="text-gray-500">フォロワー</span>
          </Text>
          <Text>
            <span className="font-bold mr-1">{user.following_count || 0}</span>
            <span className="text-gray-500">フォロー中</span>
          </Text>
        </Flex>
      </Box>
      <Tabs variant="sticky" isFitted>
        <TabList>
          <Tab
            _selected={{
              borderBottom: "2px solid #0070f3",
              fontWeight: "bold",
            }}
          >
            ポスト
          </Tab>
          <Tab
            _selected={{
              borderBottom: "2px solid #0070f3",
              fontWeight: "bold",
            }}
          >
            返信
          </Tab>
          <Tab
            _selected={{
              borderBottom: "2px solid #0070f3",
              fontWeight: "bold",
            }}
          >
            メディア
          </Tab>
          <Tab
            _selected={{
              borderBottom: "2px solid #0070f3",
              fontWeight: "bold",
            }}
          >
            いいね
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel p={0}>
            {user?.tweets?.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </TabPanel>
          <TabPanel>
            <Text>返信</Text>
          </TabPanel>
          <TabPanel>
            <Text>メディア</Text>
          </TabPanel>
          <TabPanel>
            <Text>いいね</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
};
