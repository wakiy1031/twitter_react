import { Box, Button, useDisclosure } from "@yamada-ui/react";
import { UserProfileEditModal } from "../../user/components/UserProfileEditModal";
import { useNavigate } from "react-router-dom";
import { usePostListSWRInfinite } from "../../post/customHooks/usePostListSWRInfinite";

export const UserFollowBtn = ({ user }) => {
  const navigate = useNavigate();
  const { refreshPosts } = usePostListSWRInfinite();

  const { onClose: onProfileEditClose } = useDisclosure();

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
      {showProfileEditModal && (
        <UserProfileEditModal isOpen={true} onClose={handleCloseProfileEdit} />
      )}
    </>
  );
};
