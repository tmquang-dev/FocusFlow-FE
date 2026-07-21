import axios from 'axios';

// 1. CẤU HÌNH KHỞI TẠO INSTANCE
const baseURL = import.meta.env?.VITE_API_URL || '';

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

// 3 & 4. RESPONSE INTERCEPTOR & XỬ LÝ LỖI TẬP TRUNG
axiosClient.interceptors.response.use(
    (response) => {
        // Bóc tách sẵn dữ liệu trả về, tầng component chỉ cần dùng response thay vì response.data
        return response.data;
    },
    async (error) => {
        // Xử lý các mã lỗi HTTP trả về từ Server
        if (error.response) {
            const status = error.response.status;

            switch (status) {
                case 401:
                    localStorage.removeItem('token');

                    const isPublicRoute =
                        window.location.pathname === '/login' ||
                        window.location.pathname === '/register' ||
                        window.location.pathname === '/';
                    if (!isPublicRoute) {
                        window.location.href = '/login';
                    }
                    break;
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

