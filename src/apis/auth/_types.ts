import { LoginMode } from 'prototype-pb-js/consumeriam/svc/v1/iam'

import { ValueOf } from '@/utils/types-helpers'
import { ApiResponse } from '../_base/_types'


// post login
export type AuthPostLoginReq = {
  mobile_number: string
}
export type AuthPostLoginRes = ApiResponse<{
  id: number
  session_id: number
  is_user_exist: boolean | false
  driver_id: number
  login_mode: ValueOf<typeof LoginMode>
  session_id_str: string
}>


// post verify OTP
export type AuthPostVerifyOTPReq = {
  driver_id?: number
  session_id?: number
  otp_text?: string
}
export type AuthPostVerifyOTPRes = ApiResponse<{
  token: string | null
  driver_id: number
}>


// // post refreshtoken
// export type AuthPostRefreshTokenReq = {
//   refresh_token: string
// }
// export type AuthPostRefreshTokenRes = ApiResponse<{
//   refresh_token: string
//   token: string
// }>
