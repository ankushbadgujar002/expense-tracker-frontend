import axios from "axios";

const defaultBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";

const apiClient = axios.create({
    baseURL: defaultBaseUrl,
    headers: {
        "Content-Type": "application/json"
    }
});

// Request interceptor to attach Bearer token automatically
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling 401 unauthenticated globally
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
        }
        return Promise.reject(error);
    }
);

export default apiClient;
