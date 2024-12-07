import { api, USERS_ENDPOINT } from "../../utils/api";

export const getUser = async (id) => {
  const response = await api.get(`${USERS_ENDPOINT}/${id}`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const response = await api.patch("/profile", {
    user: userData,
  });
  return response.data;
};
