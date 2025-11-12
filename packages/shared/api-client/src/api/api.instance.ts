import axios, { AxiosError, AxiosRequestConfig } from 'axios';

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

function onRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

function subscribeTokenRefresh(callback: (token: string) => void) {
  refreshSubscribers.push(callback);
}

export const apiInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiInstance.interceptors.request.use((config) => {
  const token = process.env.API_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _isRetry?: boolean;
    };

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const newToken = process.env.API_TOKEN;
          if (!newToken) throw new Error();
          isRefreshing = false;
          onRefreshed(newToken);
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return apiInstance.request(originalRequest);
        } catch (refreshError) {
          console.error('Token refresh failed', refreshError);
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${token}`,
            };
            resolve(apiInstance.request(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export type ApiRequest = AxiosRequestConfig & {
  signal?: AbortSignal;
};

export const createInstance = async <T>({
  signal,
  ...config
}: ApiRequest): Promise<T> => {
  return apiInstance({
    ...config,
    signal,
  }).then((response) => response.data);
};

export type BodyType<Data> = Data;
export type ErrorType<Error> = AxiosError<Error>;
