import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from "axios";

const defaultOptions: AxiosRequestConfig = {
  timeout: 30000,
  baseURL: import.meta.env.VITE_BASE_URL,
}

export const axiosInstance = axios.create(defaultOptions)

export const axiosInterceptorRequest = async (requestConfig: InternalAxiosRequestConfig) => {
  const storedState = localStorage.getItem("auth-store");

  if (!storedState) return requestConfig;

  const parsedState = JSON.parse(storedState);
  const token = parsedState?.state?.token;

  if (requestConfig.headers && token && !requestConfig.url?.includes('/api/auth/local')) {
    requestConfig.headers.Authorization = `Bearer ${token}`;
  }

  return requestConfig;
};

axiosInstance.interceptors.request.use(axiosInterceptorRequest, (err) => err)