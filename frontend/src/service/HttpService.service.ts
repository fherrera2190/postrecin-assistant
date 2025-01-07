import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getEnvVariables } from "../config/config";

export class HttpService {
  private baseUrl: string;
  private instance: AxiosInstance;

  constructor(endpoint = "") {
    this.baseUrl = getEnvVariables().VITE_API_URL + endpoint;
    this.instance = axios.create({ baseURL: this.baseUrl });
  }

  get defaultHeaders(): Record<string, string | null> {
    return {
      Authorization: localStorage.getItem("Authorization"),
      "Content-Type": "application/json",
    };
  }

  request<TResponse, TData = undefined>(
    method: string,
    url: string,
    data?: TData,
    customHeaders: Record<string, string> = {}
  ): Promise<AxiosResponse<TResponse>> {
    const headers = { ...this.defaultHeaders, ...customHeaders };

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
    };

    if (data) {
      config.data = data;
    }

    return this.instance.request<TResponse>(config);
  }

  get<TResponse>(url: string, customHeaders: Record<string, string> = {}) {
    return this.request<TResponse, undefined>(
      "get",
      url,
      undefined,
      customHeaders
    );
  }

  post<TResponse, TData>(
    url: string,
    data: TData,
    customHeaders: Record<string, string> = {}
  ) {
    return this.request<TResponse, TData>("post", url, data, customHeaders);
  }

  put<TResponse, TData>(
    url: string,
    data: TData,
    customHeaders: Record<string, string> = {}
  ) {
    return this.request<TResponse, TData>("put", url, data, customHeaders);
  }

  delete<TResponse>(url: string, customHeaders: Record<string, string> = {}) {
    return this.request<TResponse, undefined>(
      "delete",
      url,
      undefined,
      customHeaders
    );
  }
}
