import axios, { type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

// 1. CẤU HÌNH KHỞI TẠO INSTANCE
const env = (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env;
const baseURL = env?.VITE_API_URL ?? '';

const axiosClient: AxiosInstance = axios.create({
    baseURL,
    timeout: 10000, // 10 giây ngắt kết nối nếu server không phản hồi
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    withCredentials: true,
});

// 2. REQUEST INTERCEPTOR: Tự động đính kèm Token từ localStorage trước khi gửi request
axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('focusFlowToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: unknown) => {
        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
);

// 3 & 4. RESPONSE INTERCEPTOR & XỬ LÝ LỖI TẬP TRUNG
axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        // Bóc tách sẵn dữ liệu trả về, tầng component chỉ cần dùng response thay vì response.data
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return response.data;
    },
    async (error: unknown) => {
        // Xử lý các mã lỗi HTTP trả về từ Server
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const status = error.response.status;

                switch (status) {
                    case 401: {
                        localStorage.removeItem('focusFlowToken');

                        const isPublicRoute =
                            window.location.pathname === '/login' ||
                            window.location.pathname === '/register' ||
                            window.location.pathname === '/';
                        if (!isPublicRoute) {
                            window.location.href = '/login';
                        }
                        break;
                    }
                    case 403:
                        console.error('Bạn không có quyền truy cập vào tài nguyên này.');
                        break;
                    case 500:
                        console.error('Lỗi hệ thống phía Server. Vui lòng thử lại sau.');
                        break;
                    default: {
                        const responseData = error.response.data as { message?: string } | undefined;
                        const message = responseData?.message ?? 'Không xác định';
                        console.error(`Lỗi hệ thống: ${message}`);
                    }
                }
            } else if (error.request) {
                // Lỗi do không kết nối được tới Server (mạng yếu, server sập)
                console.error(
                    'Không thể kết nối tới máy chủ. Vui lòng kiểm tra đường truyền mạng.'
                );
            } else {
                console.error('Đã xảy ra lỗi thiết lập request:', error.message);
            }
        } else if (error instanceof Error) {
            console.error('Đã xảy ra lỗi thiết lập request:', error.message);
        } else {
            console.error('Đã xảy ra lỗi không xác định');
        }

        return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }
);

export default axiosClient;

