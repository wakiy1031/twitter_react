import { mutate } from "swr";
import { createPost } from "../features/api/postApi";
import { POSTS_ENDPOINT } from "../utils/api";

export const usePost = () => {
  const handleSubmit = async (postData) => {
    try {
      const response = await createPost(postData);
      mutate(POSTS_ENDPOINT);
      return response;
    } catch (error) {
      console.error("投稿作成エラー:", error);
      throw error;
    }
  };

  return { handleSubmit };
};
