import { api, POSTS_ENDPOINT } from "../../utils/api";

export const createRepost = async (id) => {
  const response = await api.post(`${POSTS_ENDPOINT}/${id}/retweets`);
  return response.data;
};

export const deleteRepost = async (id) => {
  const response = await api.delete(`${POSTS_ENDPOINT}/${id}/retweets`);
  return response.data;
};
