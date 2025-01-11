import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Tooltip,
  useNotice,
} from "@yamada-ui/react";
import { PiDotsThreeBold, PiTrash } from "react-icons/pi";
import { MdOutlinePersonAddAlt } from "react-icons/md";
import { useSelector } from "react-redux";
import { deletePost } from "../../api/postApi";
import { usePostListSWRInfinite } from "../customHooks/usePostListSWRInfinite";

export const PostMenuButton = ({ post, onPostDeleted }) => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const { refreshPosts } = usePostListSWRInfinite();
  const notice = useNotice();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deletePost(post.id);
      await refreshPosts();
      if (onPostDeleted) {
        await onPostDeleted();
      }
      notice({
        title: "投稿を削除しました",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("投稿の削除に失敗しました:", error);
      notice({
        title: "投稿の削除に失敗しました",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position="absolute" top="0" right="0" onClick={handleClick}>
      <Menu>
        <Tooltip label="もっと見る" openDelay={500} gutter={2} fontSize="xs">
          <MenuButton
            as={IconButton}
            icon={<PiDotsThreeBold fontSize="2xl" />}
            bg="none"
            border="none"
          />
        </Tooltip>

        <MenuList bg="white" border="none">
          {post.user_id === currentUser.id ? (
            <MenuItem
              icon={<PiTrash fontSize="1.5em" color="red" />}
              onClick={handleDelete}
              color="red"
              fontWeight="bold"
            >
              削除
            </MenuItem>
          ) : (
            <MenuItem
              icon={<MdOutlinePersonAddAlt fontSize="1.5em" />}
              fontWeight="bold"
            >
              {post.user.name}さんをフォロー
            </MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};
