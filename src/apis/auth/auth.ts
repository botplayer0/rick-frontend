import http, { IResponse } from "../../utils/http";
import type { RequestAuthLogin, RequestAuthRegister, ResponseAuthLogin } from "./auth.type";

export const apiHealthCheck = async () => {
  const response = await http.get<IResponse>("/auth/health")
  return response
}


export const apiRegister = async (data: RequestAuthRegister) => {
  const response = await http.post<IResponse>('/auth/register', data)
  return response
}

export const apiLogin = async (data: RequestAuthLogin) => {
  const response = await http.post<ResponseAuthLogin>('/auth/login', data)
  return response
}

export const apiRefreshLogin = async (token: string) => {
  const response = await http.post<ResponseAuthLogin>("/auth/refresh", null, {
    headers: {
      Authorization: token
    }
  })
  return response
}

export const apiLogout = async () => {
  const response = await http.post<IResponse>("/auth/logout", null)
  return response
}
