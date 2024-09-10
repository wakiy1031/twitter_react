import axios from "axios";
import { users } from "../urls";

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${users}`, {
      ...userData,
      confirm_success_url: "http://localhost:3000/letter_opener",
    });
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : new Error("登録時にエラーが発生しました");
  }
};
