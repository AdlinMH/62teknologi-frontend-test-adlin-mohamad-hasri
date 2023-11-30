import { AxiosRequestConfig } from 'axios'

export type ApiRequest<T> = T & {
  requestOptions?: Omit<RequestOptions, 'url' | 'method'>
}

export interface ApiResponse<T = Record<string, any>> {
  success: boolean
  data: T | null
  paging: ApiResponsePaging | null
  errors: ApiResponseError | null
}

export interface ApiResponseError {
  data?: any | null | Record<string, any> | any[]
  success?: boolean
  error?: Record<string, any> | null
  msg?: string
  status?: number
  status_text?: string
}

export interface ApiResponsePaging {
  page: number
  per_page: number
  count: number
  page_count: number
  next: boolean
  prev: boolean
}

export type RequestOptions = {
  url: string
  method: AxiosRequestConfig['method']
  data?: AxiosRequestConfig['data']
  params?: AxiosRequestConfig['params']
  headers?: AxiosRequestConfig['headers']
  timeout?: AxiosRequestConfig['timeout']
  signal?: AxiosRequestConfig['signal']
}
