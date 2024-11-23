import {
  MessageCircleIcon,
  RepeatIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
} from "@yamada-ui/lucide";
import { HStack, IconButton, Tooltip } from "@yamada-ui/react";

export const ActionButton = () => {
  return (
    <HStack spacing="4" py="2" justify="space-between">
      <Tooltip label="返信" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<MessageCircleIcon />}
          aria-label="返信"
          size="sm"
          borderRadius="full"
          color="gray.500"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
      <Tooltip label="リポスト" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<RepeatIcon />}
          aria-label="リポスト"
          size="sm"
          borderRadius="full"
          color="gray.500"
          _hover={{ bg: "green.50", color: "green.500" }}
        />
      </Tooltip>
      <Tooltip label="いいね" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<HeartIcon />}
          aria-label="いいね"
          size="sm"
          borderRadius="full"
          color="gray.500"
          _hover={{ bg: "red.50", color: "red.500" }}
        />
      </Tooltip>
      <Tooltip label="ブックマーク" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<BookmarkIcon />}
          aria-label="ブックマーク"
          size="sm"
          borderRadius="full"
          color="gray.500"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
      <Tooltip label="共有" openDelay={500} gutter={2} fontSize="xs">
        <IconButton
          variant="ghost"
          icon={<ShareIcon />}
          aria-label="共有"
          size="sm"
          borderRadius="full"
          color="gray.500"
          _hover={{ bg: "blue.50", color: "blue.500" }}
        />
      </Tooltip>
    </HStack>
  );
};
