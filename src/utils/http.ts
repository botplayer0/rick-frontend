import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { message } from "antd";
import useAuthStore from "@/stores/auth/auth.store";
import { createBrowserHistory } from 'history';


interface IRequestOptions extends AxiosRequestConfig { }

interface IResponse<T = any> {
  code: number;
  data: T;
  message: string;
  total?: number
  error_msg?: string
}

interface ISuccessResponse {
  code: 0
}



class HttpClient {
  private readonly instance: AxiosInstance;
  private readonly history = createBrowserHistory();;
  private hasRefrshedToken: boolean = false;

  private debounce<T>(func: (...args: any[]) => Promise<T>, delay: number) {
    let timer: NodeJS.Timeout | null;

    return (...args: any[]) =>
      new Promise<T>((resolve) => {
        clearTimeout(timer as NodeJS.Timeout);
        timer = setTimeout(async () => {
          const result = await func(...args);
          resolve(result);
        }, delay);
      });
  }

  constructor(baseUrl: string, options?: IRequestOptions) {
    this.instance = axios.create({
      baseURL: baseUrl,
      ...options
    })

    this.instance.defaults.withCredentials = false;
    this.history = createBrowserHistory()

    this.instance.interceptors.request.use(this.handleRequest)
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);

  }

  private handleRequest = (config: InternalAxiosRequestConfig<AxiosRequestConfig>): InternalAxiosRequestConfig<AxiosRequestConfig> => {
    // 当登录或者注册时, header中无需 Authorization
    if (!config.url?.match(/\/(login|register)$/)) {
      const token = useAuthStore.getState().userInfo?.token || 'null'
      if (token) {
        config.headers.Authorization = `${token}`
      }
    }

    return config;
  }

  private handleResponse = <T>(response: AxiosResponse<IResponse<T>>): AxiosResponse<IResponse<T>> => {
    const { code, error_msg: e_msg } = response.data
    if (code !== 0) {
      message.error(e_msg)
    }
    return response
  }

  private handleError = async (error: any): Promise<any> => {
    console.log("here", error)
    if (error.code === "ERR_NETWORK") {
      message.error(`网络异常`)
    }
    // 处理状态码==400
    else if (error.response && error.response.status === 401) {
      message.error(error.response.data.error_msg || error.message || "Token已失效")
      console.log("这里打印了error")
      if (!this.hasRefrshedToken) {
        this.hasRefrshedToken = true
        try {
          const response = await this.instance.post<IResponse>("/auth/refresh_token")
          useAuthStore.getState().setUserInfo(response.data.data)
          message.success("刷新Token成功~")
        } catch (err) {
          console.log(err)
          window.localStorage.removeItem("userInfo")
          window.location.href = "/login";
          throw err
        }
      } else {
        window.localStorage.removeItem("userInfo")
        window.location.href = "/login";
      }
    } else if (error.response && error.response.status === 400) {
      message.error(error.response.data.error_msg || error.message || "请求出错了")
      return error.response
    } else {
      message.error(error.response.data.error_msg || error.message || "请求出错了")
    }
    // 抛出axios_error
    throw error;
  }

  // 添加请求拦截器

  public async get<T>(url: string, config?: IRequestOptions): Promise<IResponse<T>> {
    // const response = await this.instance.get<IResponse<T>>(url, config)
    // return response.data
    const request = async () => {
      const response = await this.instance.get<IResponse<T>>(url, config);
      return response.data;
    };

    const debouncedRequest = this.debounce(request, 100);
    return debouncedRequest();
  }

  public async post<T>(url: string, data?: any, config?: IRequestOptions): Promise<IResponse<T>> {
    const response = await this.instance.post<IResponse<T>>(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: any, config?: IRequestOptions): Promise<IResponse<T>> {
    const response = await this.instance.put<IResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: IRequestOptions): Promise<IResponse<T>> {
    const response = await this.instance.delete<IResponse<T>>(url, config);
    return response.data;
  }

}

const http = new HttpClient("http://127.0.0.1:9000/")

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default http;
export { waitTime }
export type {
  IResponse
}