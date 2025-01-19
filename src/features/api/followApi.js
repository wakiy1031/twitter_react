import { api } from "../../utils/api";

export const followUser = async (userId) => {
  const response = await api.post(`/users/${userId}/follow`);
  return response.data;
};

export const unfollowUser = async (userId) => {
  const response = await api.delete(`/users/${userId}/unfollow`);
  return response.data;
};
