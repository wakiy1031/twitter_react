import axios from "axios";

const DEFAULT_API_LOCALHOST = "http://localhost:3000/api/v1";

export const api = axios.create({
  baseURL: DEFAULT_API_LOCALHOST,
});
