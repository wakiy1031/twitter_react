import { useRef, useState } from "react";
import { usePost } from "../../../hooks/usePost";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Textarea,
  useNotice,
} from "@yamada-ui/react";
import { uploadImage } from "../../../features/api/postApi";
import { PiImageSquare } from "react-icons/pi";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";

export const PostForm = () => {
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const { handleSubmit } = usePost();
  const notice = useNotice();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const postResponse = await handleSubmit({ content });

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => formData.append("images[]", image));
        formData.append("post_id", postResponse.data.id);
        await uploadImage(formData);
      }

      setContent("");
      setImages([]);
      setPreviews([]);
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
          {previews.length > 0 && (
            <Carousel
              slideSize={previews.length === 1 ? "100%" : "50%"}
              align="start"
              withIndicators={false}
              loop={false}
              draggable={false}
              controlProps={{
                bg: "gray.800",
                color: "white",
                _hover: { bg: "gray.900" },
              }}
            >
              {previews.map((preview, index) => (
                <CarouselSlide key={index}>
                  <Image
                    src={preview}
                    className="w-full h-full object-cover"
                    borderRadius="12"
                  />
                </CarouselSlide>
              ))}
            </Carousel>
          )}
          <Flex justifyContent="space-between" alignItems="center" pt={2}>
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
        multiple
      />
    </form>
  );
};
