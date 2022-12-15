import axios from "axios";
import { API_BASE_URL } from "./api_url";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    CompanyId: 1,
  },
});
