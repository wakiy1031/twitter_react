import { api, COMMENTS_ENDPOINT } from "../../utils/api";

export const createComment = async (data) => {
  const response = await api.post(COMMENTS_ENDPOINT, data);
  return response.data;
};

// コメントの画像アップロード用の関数を追加
export const uploadCommentImages = async (commentId, images) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append("images[]", image);
  });

  const response = await api.post(
    `${COMMENTS_ENDPOINT}/${commentId}/upload_images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
