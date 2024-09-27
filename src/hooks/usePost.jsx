import { mutate } from "swr";
import { createPost } from "../features/api/postApi";
import { POSTS_ENDPOINT } from "../utils/api";

export const usePost = () => {
  const handleSubmit = async (postData) => {
    try {
      const data = await createPost(postData);
      mutate(POSTS_ENDPOINT);
      console.log("投稿が作成されました:", data);
    } catch (error) {
      console.error("投稿作成エラー:", error);
      throw error;
    }
  };

  return { handleSubmit };
};
