import { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./userSlice";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Loading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
  VStack,
} from "@yamada-ui/react";
import { HistoryNavButton } from "../../components/HistoryNavButton";
import { PostItem } from "../post/components/PostItem";
import { UserProfileEditModal } from "./components/UserProfileEditModal";
import { MdOutlinePlace } from "react-icons/md";
import { RiLink } from "react-icons/ri";
import { IoCalendarOutline } from "react-icons/io5";
import { usePostListSWRInfinite } from "../post/customHooks/usePostListSWRInfinite";

export const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { postsDataArr, isLoading, refreshPosts } = usePostListSWRInfinite();

  const { onClose: onProfileEditClose } = useDisclosure();

  useEffect(() => {
    let isSubscribed = true;

    const fetchUserData = async () => {
      if (!id || location.state?.preventReload) return;

      try {
        await dispatch(fetchUser(id)).unwrap();
      } catch (error) {
        if (isSubscribed) {
          console.error("ユーザー情報の取得に失敗しました:", error);
        }
      }
    };

    fetchUserData();

    return () => {
      isSubscribed = false;
    };
  }, [dispatch, id, location.state?.preventReload]);

  if (status === "loading" && !user) {
    return <div>読み込み中...</div>;
  }

  if (status === "failed") {
    return <div>エラー: {error}</div>;
  }

  if (!user) {
    return null;
  }

  if (error) {
    return <div>投稿一覧の取得中にエラーが発生しました。</div>;
  }

  if (isLoading && postsDataArr.length === 0) {
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

  const refreshUserData = async () => {
    try {
      await dispatch(
        fetchUser(user.id, { timestamp: new Date().getTime() })
      ).unwrap();
      await refreshPosts();
    } catch (error) {
      console.error("ユーザー情報の再取得に失敗:", error);
    }
  };

  const handleCloseProfileEdit = async () => {
    onProfileEditClose();
    await refreshUserData();
    navigate(`/users/${user.id}`, {
      replace: true,
      state: { preventReload: true },
    });
  };

  const showProfileEditModal = location.pathname === "/settings/profile";

  return (
    <Box position="relative">
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
      >
        <HistoryNavButton />
        <Text ml={4} fontSize="xl">
          <span className="font-bold leading-4 block">{user.name}</span>
          <span className="text-gray-500 text-sm">
            {user.posts_count}件のポスト
          </span>
        </Text>
      </Flex>
      <VStack>
        {user.header_image_url ? (
          <Box>
            <Image
              src={`${user.header_image_url}?${new Date(
                user.updated_at
              ).getTime()}`}
              alt="cover"
              width="100%"
              height="200px"
            />
          </Box>
        ) : (
          <Box bg="gray.200" height="200px" />
        )}
        <Box mx={4} py={2} position="relative">
          <Avatar
            src={`${user.avatar_url}?${new Date(user.updated_at).getTime()}`}
            w="133px"
            h="133px"
            mt="-90px"
            mb="3"
            border="3px solid white"
            key={user.updated_at}
            fallback={<Avatar size="xl" name={user.name} />}
          />
          <Box position="absolute" top="0" right="0">
            {user.is_self ? (
              <Button
                variant="outline"
                borderRadius="30px"
                onClick={() =>
                  navigate("/settings/profile", {
                    replace: true,
                    state: {
                      isModal: true,
                      preventReload: true,
                    },
                  })
                }
              >
                プロフィールを編集
              </Button>
            ) : user.is_following ? (
              <Button
                variant="outline"
                borderRadius="30px"
                _hover={{
                  bg: "red.50",
                  borderColor: "red.500",
                  color: "red.500",
                }}
                data-hover-text="フォロー解除"
                sx={{
                  "&[data-hover-text]": {
                    "&:hover": {
                      "& > span:first-of-type": {
                        display: "none",
                      },
                      "&::before": {
                        content: "attr(data-hover-text)",
                      },
                    },
                  },
                }}
              >
                <span>フォロー中</span>
              </Button>
            ) : (
              <Button variant="outline" borderRadius="30px">
                フォロー
              </Button>
            )}
          </Box>
          <Box lineHeight={1.25}>
            <Text className="font-bold" fontSize="xl">
              {user.name}
            </Text>
            <Text className="text-gray-500">@{user.email?.split("@")[0]}</Text>
          </Box>
          <Text mt="2">{user.description}</Text>
          <Text className="flex items-center flex-wrap mt-2">
            {user.place && (
              <span className="flex items-center mr-2">
                <MdOutlinePlace className="mr-1" />
                {user.place}
              </span>
            )}
            {user.website && (
              <span className="flex items-center mr-2">
                <RiLink className="mr-1" />
                <Link className="text-blue-500" to={user.website}>
                  {user.website}
                </Link>
              </span>
            )}
            <span className="flex items-center">
              <IoCalendarOutline className="mr-1" />
              {user.created_at}からTwitterを利用しています
            </span>
          </Text>
          <Flex mt="2">
            <Text>
              <span className="font-bold mr-1">
                {user.followers_count || 0}
              </span>
              <span className="text-gray-500">フォロワー</span>
            </Text>
            <Text>
              <span className="font-bold mr-1">
                {user.following_count || 0}
              </span>
              <span className="text-gray-500">フォロー中</span>
            </Text>
          </Flex>
        </Box>
        <Tabs isFitted>
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
                <PostItem
                  key={post.id}
                  post={post}
                  onPostDeleted={refreshUserData}
                />
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
        {showProfileEditModal && (
          <UserProfileEditModal
            isOpen={true}
            onClose={handleCloseProfileEdit}
          />
        )}
      </VStack>
    </Box>
  );
};
