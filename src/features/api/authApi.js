import { api } from "../../utils/api";

export const signUp = async (userData) => {
  try {
    const response = await api.post("/users", {
      ...userData,
      confirm_success_url: "http://localhost:3000/letter_opener",
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errors) {
      throw { errors: error.response.data.errors };
    } else {
      throw new Error("登録時にエラーが発生しました");
    }
  }
};
