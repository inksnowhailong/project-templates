import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  msg: string;
}
/*
  因在拦截器中已经对数据进行了解析，所以需要修改axios实例的返回值类型
*/
interface AxiosInstanceFix<T = any> extends AxiosInstance {
  (config: AxiosRequestConfig): Promise<ApiResponse<T>>;
  (url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>>;
  request<T = any, R = ApiResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
  get<T = any, R = ApiResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = any, R = ApiResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  head<T = any, R = ApiResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  options<T = any, R = ApiResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
  post<T = any, R = ApiResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = any, R = ApiResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patch<T = any, R = ApiResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  postForm<T = any, R = ApiResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  putForm<T = any, R = ApiResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  patchForm<T = any, R = ApiResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  // 可以添加其他方法
}
// 创建axios实例
const service:AxiosInstanceFix = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || '', // 设置你的API基础URL
  timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 例如在请求头中添加 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['token'] = ` ${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误时的处理
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 响应成功时，直接返回数据
    return response.data;
  },
  (error) => {
    // 响应错误时处理
    const { response } = error;
    if (response) {
      // 服务器返回的错误信息
      const { status, data } = response;
      switch (status) {
        case 401:
          // 处理未授权错误，例如跳转到登录页
          console.error('Unauthorized: Please login.');
          break;
        case 403:
          // 处理权限不足错误
          console.error('Forbidden: Access denied.');
          break;
        case 500:
          // 服务器错误
          console.error('Server error:', data.message || 'Internal Server Error');
          break;
        default:
          console.error('Request error:', data.message || 'Something went wrong.');
      }
    } else {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default service
