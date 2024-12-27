import {
  Button,
  FormControl,
  Avatar,
  Image,
  Flex,
  Box,
} from "@yamada-ui/react";
import { FloatingInput } from "../../../components/FloatingInput";
import { useState } from "react";
import { updateUserProfile } from "../../api/userApi";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../userSlice";
import { RiCameraLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

export const UserProfileEditForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    name: user.name,
    description: user.description,
    website: user.website,
    avatar_image: "",
    header_image: "",
  });
  const [previewUrl, setPreviewUrl] = useState(user.avatar_url);
  const [previewHeaderUrl, setPreviewHeaderUrl] = useState(
    user.header_image_url
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar_image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.onerror = (error) => {
        console.error("プレビュー生成エラー:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        header_image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewHeaderUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveHeaderImage = () => {
    setFormData((prev) => ({
      ...prev,
      header_image: null,
    }));
    setPreviewHeaderUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 現在の画像の状態を確認
      const updateData = {
        ...formData,
        // avatar_imageがnullでない場合のみ、削除フラグを送信
        avatar_image:
          formData.avatar_image === null
            ? null
            : formData.avatar_image || undefined,
        // header_imageがnullでない場合のみ、削除フラグを送信
        header_image:
          formData.header_image === null
            ? null
            : formData.header_image || undefined,
      };

      const updatedUser = await updateUserProfile(updateData);
      dispatch(fetchUser(user.id));
      onSuccess(updatedUser);
    } catch (error) {
      console.error("プロフィール更新中にエラーが発生しました:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FormControl position="relative">
        {previewHeaderUrl ? (
          <>
            <Image
              src={previewHeaderUrl}
              alt="cover"
              width="100%"
              height="200px"
            />
            <Flex
              align="center"
              gap={2}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleHeaderImageChange}
                style={{ display: "none" }}
                id="header-input"
              />
              <Button
                as="label"
                htmlFor="header-input"
                variant="outline"
                size="sm"
                mt={2}
                border="none"
                borderRadius="full"
                w="44px"
                h="44px"
                backdropFilter="blur(4px)"
                backgroundColor="rgba(15, 20, 25, 0.75)"
                _hover={{
                  opacity: 0.6,
                }}
              >
                <RiCameraLine className="w-6 h-6 text-white" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                mt={2}
                onClick={handleRemoveHeaderImage}
                border="none"
                borderRadius="full"
                w="44px"
                h="44px"
                backdropFilter="blur(4px)"
                backgroundColor="rgba(15, 20, 25, 0.75)"
                _hover={{
                  opacity: 0.6,
                }}
              >
                <IoMdClose className="w-6 h-6 text-white" />
              </Button>
            </Flex>
          </>
        ) : (
          <Box
            position="relative"
            width="100%"
            height="200px"
            backgroundColor="gray.600"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleHeaderImageChange}
              style={{ display: "none" }}
              id="header-input"
            />
            <Button
              as="label"
              htmlFor="header-input"
              variant="outline"
              size="sm"
              mt={2}
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              border="none"
              borderRadius="full"
              w="44px"
              h="44px"
              background="none"
              backdropFilter="blur(4px)"
              backgroundColor="rgba(15, 20, 25, 0.75)"
              _hover={{
                opacity: 0.6,
              }}
            >
              <RiCameraLine className="w-6 h-6 text-white" />
            </Button>
          </Box>
        )}
      </FormControl>
      <FormControl>
        <Avatar src={previewUrl} size="xl" />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="avatar-input"
        />
        <Button
          as="label"
          htmlFor="avatar-input"
          variant="outline"
          size="sm"
          mt={2}
        >
          画像を変更
        </Button>
      </FormControl>
      <FormControl>
        <FloatingInput
          id="name"
          name="name"
          type="text"
          placeholder="ユーザーネーム"
          value={formData.name}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FloatingInput
          id="description"
          name="description"
          type="text"
          placeholder="自己紹介"
          value={formData.description}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FloatingInput
          id="website"
          name="website"
          type="text"
          placeholder="ウェブサイト"
          value={formData.website}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        更新
      </Button>
    </form>
  );
};
