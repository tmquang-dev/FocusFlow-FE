import axios from 'axios';

// 1. CẤU HÌNH KHỞI TẠO INSTANCE
const baseURL = import.meta.env.VITE_API_URL;

const axiosClient = axios.create({
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
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

interface FailedRequest {
    resolve: (token: string | null) => void;
    reject: (error: any) => void;
}

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// 3 & 4. RESPONSE INTERCEPTOR & XỬ LÝ LỖI TẬP TRUNG
axiosClient.interceptors.response.use(
    (response) => {
        // Bóc tách sẵn dữ liệu trả về, tầng component chỉ cần dùng response thay vì response.data
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        // Xử lý các mã lỗi HTTP trả về từ Server
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    // Nếu đây là request refresh token bị lỗi 401, hoặc request đã thử lại một lần trước đó
                    if (
                        originalRequest._retry ||
                        originalRequest.url === '/auth/refresh-token'
                    ) {
                        localStorage.removeItem('token');

                        const isPublicRoute =
                            window.location.pathname === '/login' ||
                            window.location.pathname === '/register' ||
                            window.location.pathname === '/';
                        if (!isPublicRoute) {
                            window.location.href = '/login';
                        }
                        return Promise.reject(error);
                    }

                    if (isRefreshing) {
                        return new Promise<string | null>((resolve, reject) => {
                            failedQueue.push({ resolve, reject });
                        })
                            .then((token) => {
                                originalRequest.headers.Authorization = `Bearer ${token}`;
                                return axiosClient(originalRequest);
                            })
                            .catch((err) => {
                                return Promise.reject(err);
                            });
                    }

                    originalRequest._retry = true;
                    isRefreshing = true;

                    return new Promise((resolve, reject) => {
                        axiosClient
                            .post('/auth/refresh-token', {}, { withCredentials: true })
                            .then((response: any) => {
                                const newAccessToken = response.accessToken;
                                localStorage.setItem('token', newAccessToken);

                                axiosClient.defaults.headers.common['Authorization'] =
                                    `Bearer ${newAccessToken}`;
                                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                                processQueue(null, newAccessToken);
                                resolve(axiosClient(originalRequest));
                            })
                            .catch((err) => {
                                processQueue(err, null);
                                localStorage.removeItem('token');
                                const isPublicRoute =
                                    window.location.pathname === '/login' ||
                                    window.location.pathname === '/register' ||
                                    window.location.pathname === '/';
                                if (!isPublicRoute) {
                                    window.location.href = '/login';
                                }
                                reject(err);
                            })
                            .finally(() => {
                                isRefreshing = false;
                            });
                    });

                case 403:
                    console.error('Bạn không có quyền truy cập vào tài nguyên này.');
                    break;
                case 500:
                    console.error('Lỗi hệ thống phía Server. Vui lòng thử lại sau.');
                    break;
                default:
                    console.error(
                        `Lỗi hệ thống: ${error.response.data?.message || 'Không xác định'}`
                    );
            }
        } else if (error.request) {
            // Lỗi do không kết nối được tới Server (mạng yếu, server sập)
            console.error(
                'Không thể kết nối tới máy chủ. Vui lòng kiểm tra đường truyền mạng.'
            );
        } else {
            console.error('Đã xảy ra lỗi thiết lập request:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
