import { api, USERS_ENDPOINT } from "../../utils/api";

export const getUser = async (id) => {
  const response = await api.get(`${USERS_ENDPOINT}/${id}`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const formData = new FormData();

  if (userData.avatar_image) {
    formData.append("user[avatar_image]", userData.avatar_image);
  }

  Object.keys(userData).forEach((key) => {
    if (key !== "avatar_image") {
      formData.append(`user[${key}]`, userData[key]);
    }
  });

  // リクエストの詳細をログ出力

  try {
    const response = await api.patch("/profile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("APIエラー詳細:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
