import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box,
  Tooltip,
  useNotice,
  Dialog,
  useDisclosure,
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleDelete = async () => {
    try {
      await deletePost(post.id);
      await refreshPosts();
      if (onPostDeleted) {
        await onPostDeleted();
      }
      onClose();
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

  const handleMenuItemClick = (e) => {
    e.stopPropagation();
    onOpen();
  };

  return (
    <Box position="absolute" top="0" right="0" onClick={handleClick}>
      <Menu>
        <Tooltip label="もっと見る" openDelay={500} gutter={2} fontSize="xs">
          <MenuButton
            as={IconButton}
            icon={<PiDotsThreeBold w={20} />}
            bg="none"
            border="none"
            w={3}
            p={0.5}
            borderRadius="full"
            color="gray.500"
            _hover={{ bg: "blue.50", color: "blue.500" }}
          />
        </Tooltip>

        <MenuList bg="white" border="none">
          {post.user_id === currentUser.id ? (
            <MenuItem
              icon={<PiTrash fontSize="1.5em" color="red" />}
              onClick={handleMenuItemClick}
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
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        header="ポストを削除しますか？"
        success={{
          colorScheme: "red",
          children: "削除する",
        }}
        onSuccess={handleDelete}
        cancel="キャンセル"
        onCancel={onClose}
      >
        この操作は取り消せません。プロフィール、あなたをフォローしているアカウントのタイムライン、検索結果からポストが削除されます。
      </Dialog>
    </Box>
  );
};
