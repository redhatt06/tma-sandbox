import axios from "axios";
import { applyErrorMessageInterceptor } from "./error-message-interceptor";

// ----------------------------------------------------------------------

export const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/public`,
  timeout: 30 * 1000,
  withCredentials: false,
});
httpClient.defaults.headers.post["Content-Type"] =
  "application/json;charset=utf-8";
applyErrorMessageInterceptor(httpClient);
