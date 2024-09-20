import axios from "axios";
import Cookies from "js-cookie";

const DEFAULT_API_LOCALHOST = "http://localhost:3000/api/v1";
export const SESSIONS_ENDPOINT = `${DEFAULT_API_LOCALHOST}/auth/sessions`; // 正しいエンドポイントに変更

export const api = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("_access_token");
    const client = Cookies.get("_client");
    const uid = Cookies.get("_uid");

    if (accessToken && client && uid) {
      config.headers["access-token"] = accessToken;
      config.headers["client"] = client;
      config.headers["uid"] = uid;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
