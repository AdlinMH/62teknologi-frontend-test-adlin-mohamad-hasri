/* eslint-disable arrow-body-style */
import { AxiosError, AxiosRequestConfig } from 'axios'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'

// import { changeUser } from '@/storeRe/user'
// import { RootStoreState } from '@/store/_types'
// import { useGlobalStore } from '@/storeZu/global'
// import { getSubset } from '@/utils/functions/object'

// import { AuthPostRefreshTokenRes } from '../auth/_types'

import axiosClient from './axiosClient'
import { RequestOptions } from '../_base/_types'

// async function refreshAccessToken(baseURL: string, currRefreshToken: string) {
//   return axios.post<AuthPostRefreshTokenRes>(`${baseURL}/customer/auth/refresh-token`, { refresh_token: currRefreshToken })
//     .then((res) => res.data.data)
//     .catch((err) => Promise.reject(err))
// }

const axiosBaseQuery = ({ baseUrl }: { baseUrl: string } = { baseUrl: '' }): BaseQueryFn<RequestOptions, unknown, unknown> => (
  async (requestOpts, { getState: _, dispatch: _dispatch }) => {
    const {
      url, method, data, params, headers, timeout, signal,
    } = requestOpts

    const userToken = 'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx'

    let controller: AbortController | undefined
    if (!signal) controller = new AbortController()

    let timeoutEvent: NodeJS.Timeout | undefined
    if (timeout && controller) {
      timeoutEvent = setTimeout(() => {
        controller?.abort('')
      }, timeout + 100)
    }

    const config: AxiosRequestConfig & { _retry?: boolean } = {
      url,
      method,
      data,
      params,
      headers: {
        ...(userToken && !headers?.Authorization ? { Authorization: `${userToken}` } : null),
        ...headers,
      },
      timeout,
      signal: signal || controller?.signal,
    }

    try {
      // start calling API
      const result = await axiosClient(baseUrl, config)
      clearTimeout(timeoutEvent)

      // return the result data
      return { data: result.data }

    // Got Exception!
    } catch (axiosError) {
      const error = JSON.parse(JSON.stringify(axiosError as AxiosError))

      // Trigger Refresh Token
      // if (error.status === 401 && !config?._retry) {
      //   try {
      //     const originalConfig = { ...config }

      //     // flagging this action
      //     originalConfig._retry = true

      //     // get New token
      //     const currRefreshToken = (getState?.() as RootStoreState)?.user?.refreshToken
      //     const { token, refresh_token } = await refreshAccessToken(originalConfig?.baseURL || error.config?.baseURL, currRefreshToken) || {}

      //     // save New Token and its Refresh token
      //     dispatch?.(changeUser({ token, refreshToken: refresh_token }))
      //     originalConfig.headers = { ...originalConfig.headers, Authorization: `Bearer ${token}` }

      //     // call same api again
      //     const result = await axiosClient(baseUrl, originalConfig)
      //     clearTimeout(timeoutEvent)

      //     // return result data
      //     return { data: result.data }

      //   // Got Exception!
      //   } catch (axiosError2) {
      //     const error2 = JSON.parse(JSON.stringify(axiosError2 as AxiosError))
      //     useGlobalStore.getState().setShow401Modal(true)
      //     return { error: getSubset(error2, ['status', 'data']) }
      //   }
      // }

      // return Error
      return { error: { status: error?.status | 0, data: error?.data?.error } }
    }
  }
)

export default axiosBaseQuery
