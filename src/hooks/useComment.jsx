import { mutate } from "swr";
import { COMMENTS_ENDPOINT } from "../utils/api";
import { createComment, uploadCommentImages } from "../features/api/commentApi";

export const useComment = () => {
  const handleSubmit = async (commentData, imageData) => {
    try {
      // コメントを作成
      const response = await createComment(commentData);
      const commentId = response.data.id;

      // 画像がある場合はアップロード
      if (imageData && imageData.length > 0) {
        const images = imageData.map(({ file }) => file);
        await uploadCommentImages(commentId, images);
      }

      // SWRのキャッシュを更新
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
