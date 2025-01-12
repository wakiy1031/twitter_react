import { mutate } from "swr";
import { uploadImage } from "../features/api/postApi";
import { COMMENTS_ENDPOINT } from "../utils/api";
import { createComment } from "../features/api/commentApi";

export const useComment = () => {
  const handleSubmit = async (commentData, imageData) => {
    try {
      const response = await createComment(commentData);

      if (imageData && imageData.length > 0) {
        const formData = new FormData();
        imageData.forEach(({ file }) => formData.append("images[]", file));
        formData.append("post_id", response.data.id);
        await uploadImage(formData);
      }

      mutate(
        (key) => typeof key === "string" && key.startsWith(COMMENTS_ENDPOINT)
      );

      return response;
    } catch (error) {
      console.error("コメント作成エラー:", error);
      throw error;
    }
  };

  return { handleSubmit };
};
