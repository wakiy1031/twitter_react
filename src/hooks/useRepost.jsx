import { mutate } from "swr";
import { createRepost, deleteRepost } from "../features/api/repostApi";

export const useRepost = () => {
  const handleCreate = async (postId) => {
    try {
      const response = await createRepost(postId);

      // 特定の投稿のキャッシュを更新
      await mutate(
        `post/${postId}`,
        (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            data: {
              ...currentData.data,
              repost_count: response.repost_count,
              reposted: response.reposted,
            },
          };
        },
        false
      );

      return response;
    } catch (error) {
      console.error("Repost creation failed:", {
        error,
        errorMessage: error.message,
        errorResponse: error.response?.data,
        postId,
      });
      throw error;
    }
  };

  const handleDelete = async (postId) => {
    try {
      const response = await deleteRepost(postId);

      // 特定の投稿のキャッシュを更新
      await mutate(
        `post/${postId}`,
        (currentData) => {
          if (!currentData) return currentData;
          return {
            ...currentData,
            data: {
              ...currentData.data,
              repost_count: response.repost_count,
              reposted: response.reposted,
            },
          };
        },
        false
      );

      return response;
    } catch (error) {
      console.error("Repost deletion failed:", {
        error,
        errorMessage: error.message,
        errorResponse: error.response?.data,
        postId,
      });
      throw error;
    }
  };

  return { handleCreate, handleDelete };
};
