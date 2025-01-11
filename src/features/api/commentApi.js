import { api, COMMENTS_ENDPOINT } from "../../utils/api";

export const createComment = async (data) => {
  const response = await api.post(COMMENTS_ENDPOINT, data);
  return response.data;
};
