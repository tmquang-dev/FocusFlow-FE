import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 1. CẤU HÌNH KHỞI TẠO INSTANCE
const env = (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env;
const baseURL = env?.VITE_API_URL ?? '';

const axiosClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true, // Tự động đính kèm httpOnly Cookies
});

// Flag và Queue xử lý Silent Refresh Token
let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (error: unknown) => {
    failedQueue.forEach((promise) => {
        if (error) {
            promise.reject(error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Queue error'));
        } else {
            promise.resolve();
        }
    });
    failedQueue = [];
};

// 2. RESPONSE INTERCEPTOR & XỬ LÝ REFRESHTOKEN TỰ ĐỘNG
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response.data;
    },
    async (error: unknown) => {
        if (axios.isAxiosError(error) && error.config && error.response) {
            const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
            const status = error.response.status;

            const isAuthEndpoint =
                (originalRequest.url?.includes('/v1/auth/login') ?? false) ||
                (originalRequest.url?.includes('/v1/auth/refresh-token') ?? false) ||
                (originalRequest.url?.includes('/v1/auth/register') ?? false) ||
                (originalRequest.url?.includes('/v1/auth/password') ?? false);

            // Xử lý 401 với Token Hết hạn (INVALID_ACCESS_TOKEN hoặc 401 trên API thông thường)
            if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    })
                        .then(() => axiosClient(originalRequest))
                        .catch((err: unknown) => Promise.reject(err instanceof Error ? err : new Error(typeof err === 'string' ? err : 'Request error')));
                }

                originalRequest._retry = true;
                isRefreshing = true;

                try {
                    // Gọi API refresh token
                    await axiosClient.post('/v1/auth/refresh-token');
                    processQueue(null);
                    return await axiosClient(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError);
                    return await Promise.reject(
                        refreshError instanceof Error ? refreshError : new Error(typeof refreshError === 'string' ? refreshError : 'Refresh failed')
                    );
                } finally {
                    isRefreshing = false;
                }
            }
        }

        return Promise.reject(error instanceof Error ? error : new Error(typeof error === 'string' ? error : 'Request failed'));
    }
);

export default axiosClient;
