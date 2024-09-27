import { api, POSTS_ENDPOINT, IMAGES_ENDPOINT } from "../../utils/api";

export const createPost = async (data, headers) => {
  const response = await api.post(POSTS_ENDPOINT, data, { headers });
  return response.data;
};

export const uploadImage = async (data, headers) => {
  const response = await api.post(IMAGES_ENDPOINT, data, { headers });
  return response.data;
};
