import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 响应数据通用接口
export interface ApiResponse<T = any> {
  code: number
  data: T
  message: string
}

// 请求配置接口
interface RequestConfig extends AxiosRequestConfig {
  showLoading?: boolean
  showError?: boolean
}

class HttpClient {
  private instance: AxiosInstance
  private loadingCount: number = 0

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    // 请求拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        const { data } = response
        if (data.code !== 0) {
          // 处理业务错误
          console.error(`[API Error] ${data.message}`)
          return Promise.reject(new Error(data.message))
        }
        return response
      },
      (error) => {
        // 处理网络错误
        const message =
          error.response?.data?.message || error.message || '请求失败'
        console.error(`[Network Error] ${message}`)
        return Promise.reject(error)
      }
    )
  }

  // GET 请求
  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.get<ApiResponse<T>>(url, config)
    return response.data.data
  }

  // POST 请求
  async post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.post<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  // PUT 请求
  async put<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<T> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config)
    return response.data.data
  }

  // DELETE 请求
  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config)
    return response.data.data
  }
}

// 导出单例实例
export const http = new HttpClient()

// 导出类以支持多实例场景
export default HttpClient
