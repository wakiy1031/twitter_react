import { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../user/userSlice";
import { useComment } from "../../../hooks/useComment";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Textarea,
  useNotice,
} from "@yamada-ui/react";
import { PiImageSquare, PiX } from "react-icons/pi";
import { Carousel, CarouselSlide } from "@yamada-ui/carousel";

export const CommentForm = ({ post_id, onSuccess }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState([]);
  const { handleSubmit } = useComment();
  const notice = useNotice();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.slice(0, 4 - imageData.length);

    setImageData((prevData) => [
      ...prevData,
      ...newFiles.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImageData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit({ content, post_id }, imageData);

      setContent("");
      setImageData([]);
      notice({
        title: "返信が作成されました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("返信作成エラー:", error);
      notice({
        title: "返信作成エラー",
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
    <form onSubmit={onSubmit} className="w-full">
      <Flex width="full" py={3}>
        <Avatar size="sm" src={currentUser?.avatar_url} cursor="pointer" />
        <Box width="full" ml={4}>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="返信をポスト"
            variant="unstyled"
            required
            fontSize="xl"
            mb={4}
            autosize
          />
          {imageData.length > 0 && (
            <Carousel
              slideSize={imageData.length === 1 ? "100%" : "50%"}
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
              {imageData.map(({ previewUrl }, index) => (
                <CarouselSlide key={index} className="relative">
                  <Box position="relative" w="full" h="full">
                    <Image
                      src={previewUrl}
                      borderRadius="12"
                      objectFit="cover"
                      objectPosition="center"
                      w="full"
                      h="full"
                    />
                    <Button
                      position="absolute"
                      top="1"
                      right="1"
                      bg="gray.800"
                      borderRadius="full"
                      color="white"
                      p={0}
                      size="sm"
                      _hover={{ bg: "gray.900" }}
                      onClick={() => handleRemoveImage(index)}
                    >
                      <PiX size="16" />
                    </Button>
                  </Box>
                </CarouselSlide>
              ))}
            </Carousel>
          )}
        </Box>
      </Flex>
      <Flex justifyContent="space-between" alignItems="center" pt={2}>
        <Box>
          <PiImageSquare
            size="24"
            className="cursor-pointer text-blue-500"
            onClick={handleIconClick}
          />
        </Box>
        <Button
          type="submit"
          isDisabled={!isPostValid}
          bg="blue.500"
          color="white"
          _hover={{ bg: "blue.600" }}
          borderRadius="full"
          px={4}
        >
          返信
        </Button>
      </Flex>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        disabled={imageData.length >= 4}
      />
    </form>
  );
};
