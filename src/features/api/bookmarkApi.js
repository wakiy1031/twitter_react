import { api } from "../../utils/api";

export const createBookmark = async (id) => {
  const response = await api.post(`/tweets/${id}/bookmarks`);
  return response.data;
};

export const deleteBookmark = async (id) => {
  const response = await api.delete(`/tweets/${id}/bookmarks`);
  return response.data;
};
