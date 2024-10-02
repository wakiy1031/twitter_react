import { useRef, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Textarea,
  useNotice,
} from "@yamada-ui/react";
import { uploadImage } from "../../../features/api/postApi";
import { PiImageSquare } from "react-icons/pi";

export const PostForm = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const { handleSubmit } = usePost();
  const notice = useNotice();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await handleSubmit({ content });

      if (image) {
        const formData = new FormData();
        formData.append("images[]", image);
        formData.append("post_id", postResponse.data.id);
        await uploadImage(formData);
      }

      setContent("");
      setImage(null);
      setPreview("");
      notice({
        title: "投稿が作成されました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("投稿作成エラー:", error);
      notice({
        title: "投稿作成エラー",
        description: "140文字以内で入力してください",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const isPostValid = content.trim() !== "";

  return (
    <form onSubmit={onSubmit}>
      <Flex width="full">
        <Box>
          <Avatar src="https://not-found.com" size="sm" />
        </Box>
        <Box width="full" ml={4}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="いまどうしてる？"
            variant="unstyled"
            required
            fontSize="xl"
            mb={4}
            autosize
          />
          {preview && (
            <img
              src={preview}
              alt="プレビュー"
              style={{
                maxWidth: "100%",
                borderRadius: "16px",
                marginBottom: "16px",
              }}
            />
          )}
          <Flex justifyContent="space-between" alignItems="center">
            <Flex>
              <Box mr={2}>
                <PiImageSquare
                  size="24"
                  className="cursor-pointer text-blue-500"
                  onClick={handleIconClick}
                />
              </Box>
            </Flex>
            <Button
              type="submit"
              isDisabled={!isPostValid}
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.600" }}
              borderRadius="full"
              px={4}
            >
              ポスト
            </Button>
          </Flex>
        </Box>
      </Flex>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
    </form>
  );
};
