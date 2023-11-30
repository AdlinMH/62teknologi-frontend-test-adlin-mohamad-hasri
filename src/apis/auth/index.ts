import { api } from '../_base'
import {
  AuthPostLoginReq,
  AuthPostLoginRes,
  AuthPostVerifyOTPReq,
  AuthPostVerifyOTPRes,
} from './_types'

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation<AuthPostLoginRes, AuthPostLoginReq>({
      query: (data) => ({
        url: '/v2/auth/login?login_mode=sms',
        method: 'POST',
        data,
      }),
    }),
    postVerifyOTP: build.mutation<AuthPostVerifyOTPRes, AuthPostVerifyOTPReq>({
      query: (data) => ({
        url: '/v2/auth/verifyOtp',
        method: 'POST',
        data,
      }),
    }),
  }),
  overrideExisting: true,
})

export const {
  usePostLoginMutation,
  usePostVerifyOTPMutation,
} = authApi
