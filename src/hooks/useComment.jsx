import { mutate } from "swr";
import {
  createComment,
  uploadCommentImages,
  deleteComment,
  getComments,
} from "../features/api/commentApi";

const getCommentsKey = (postId) => `comments-${postId}`;

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
      const key = getCommentsKey(commentData.post_id);
      const newComments = await getComments(commentData.post_id);
      await mutate(key, newComments, false);

      return response;
    } catch (error) {
      console.error("コメント作成エラー:", error);
      throw error;
    }
  };

  const handleDelete = async (commentId, postId) => {
    if (!postId) {
      console.error("post_idが指定されていません");
      throw new Error("post_idが指定されていません");
    }

    const key = getCommentsKey(postId);
    try {
      // APIを呼び出してコメントを削除
      await deleteComment(commentId);

      // 削除後のデータを取得
      const updatedComments = await getComments(postId);

      // キャッシュを更新
      await mutate(key, updatedComments, false);
    } catch (error) {
      console.error("コメント削除エラー:", error);
      throw error;
    }
  };

  return { handleSubmit, handleDelete };
};
