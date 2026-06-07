import { http } from './request'

// 用户相关 API
export const userApi = {
  login: (data: { username: string; password: string }) =>
    http.post('/auth/login', data),
  getUserInfo: () => http.get('/user/info'),
  logout: () => http.post('/auth/logout')
}

// 示例：带类型的 API 响应
export interface UserInfo {
  id: number
  name: string
  email: string
}

export const getUserById = (id: number): Promise<UserInfo> =>
  http.get(`/user/${id}`)
