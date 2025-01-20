import { Box, Button, useDisclosure } from "@yamada-ui/react";
import { UserProfileEditModal } from "../../user/components/UserProfileEditModal";
import { useNavigate } from "react-router-dom";
import { usePostListSWRInfinite } from "../../post/customHooks/usePostListSWRInfinite";
import { useFollow } from "../../../hooks/useFollow";

export const UserFollowBtn = ({ user }) => {
  const navigate = useNavigate();
  const { refreshPosts } = usePostListSWRInfinite();

  const { onClose: onProfileEditClose } = useDisclosure();

  const { handleFollow, handleUnfollow } = useFollow();

  const handleFollowClick = async () => {
    try {
      await handleFollow(user.id);
      await refreshPosts();
    } catch (error) {
      console.error("フォローに失敗しました:", error);
    }
  };

  const handleUnfollowClick = async () => {
    try {
      await handleUnfollow(user.id);
      await refreshPosts();
    } catch (error) {
      console.error("フォロー解除に失敗しました:", error);
    }
  };

  const handleCloseProfileEdit = async () => {
    onProfileEditClose();
    await refreshPosts();
    navigate(`/users/${user.id}`, {
      replace: true,
      state: { preventReload: true },
    });
  };

  const showProfileEditModal = location.pathname === "/settings/profile";

  return (
    <>
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
            onClick={handleUnfollowClick}
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
          <Button
            variant="outline"
            borderRadius="30px"
            onClick={handleFollowClick}
          >
            フォローする
          </Button>
        )}
      </Box>
      {showProfileEditModal && (
        <UserProfileEditModal isOpen={true} onClose={handleCloseProfileEdit} />
      )}
    </>
  );
};
