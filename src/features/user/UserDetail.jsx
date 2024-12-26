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

export const UserDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

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

  const refreshUserData = async () => {
    try {
      await dispatch(
        fetchUser(user.id, { timestamp: new Date().getTime() })
      ).unwrap();
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
      {user.header_image_url ? (
        <Box>
          <Image
            src={user.header_image_url}
            alt="cover"
            width="100%"
            height="200px"
          />
        </Box>
      ) : (
        <Box bg="gray.200" height="200px" />
      )}

      <Box px={4} py={2}>
        <Avatar
          src={`${user.avatar_url}?${new Date(user.updated_at).getTime()}`}
          size="xl"
          key={user.updated_at}
          fallback={<Avatar size="xl" name={user.name} />}
        />
        <Box>
          {user.is_self ? (
            <Button
              variant="outline"
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
              プロフィール編集
            </Button>
          ) : user.is_following ? (
            <Button
              variant="outline"
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
            <Button colorScheme="blue">フォロー</Button>
          )}
        </Box>
        <Box lineHeight={1.25}>
          <Text className="font-bold" fontSize="xl">
            {user.name}
          </Text>
          <Text className="text-gray-500">@{user.email?.split("@")[0]}</Text>
        </Box>
        <Text>{user.description}</Text>
        <Link to={user.website}>{user.website}</Link>
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
      {showProfileEditModal && (
        <UserProfileEditModal isOpen={true} onClose={handleCloseProfileEdit} />
      )}
    </VStack>
  );
};
