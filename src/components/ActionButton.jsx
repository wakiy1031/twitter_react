import { BookmarkIcon, ShareIcon } from "@yamada-ui/lucide";
import { HStack, IconButton, Tooltip } from "@yamada-ui/react";
import { CommentButton } from "./commentButton";
import { RepostButton } from "./repostButton";
import { FavoriteButton } from "./favoriteButton";
export const ActionButton = ({ post, user }) => {
  return (
    <HStack spacing="4" justify="space-between" py={2}>
      <CommentButton post={post} user={user} />
      <RepostButton post={post} />
      <FavoriteButton post={post} />
      <Tooltip label="ブックマーク" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<BookmarkIcon w={20} />}
          aria-label="ブックマーク"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
      <Tooltip label="共有" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<ShareIcon w={20} />}
          aria-label="共有"
          size="sm"
          w={6}
          p={1}
          borderRadius="full"
          color="gray.200"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
    </HStack>
  );
};
