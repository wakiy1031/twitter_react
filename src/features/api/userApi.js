import { api, USERS_ENDPOINT } from "../../utils/api";

export const getUser = async (id) => {
  const response = await api.get(`${USERS_ENDPOINT}/${id}`);
  return response.data;
};

export const updateUserProfile = async (userData) => {
  const formData = new FormData();

  // フォームデータの構築
  Object.keys(userData).forEach((key) => {
    if (userData[key] !== undefined && userData[key] !== null) {
      if (key === "avatar_image" || key === "header_image") {
        if (userData[key] instanceof File) {
          formData.append(`user[${key}]`, userData[key]);
        }
      } else {
        formData.append(`user[${key}]`, userData[key]);
      }
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
