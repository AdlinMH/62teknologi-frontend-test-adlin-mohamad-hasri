import { PermissionsAndroid, Platform } from 'react-native'
import {
  PERMISSIONS, request,
  check, checkNotifications, requestNotifications,
} from 'react-native-permissions'

export const location = {
  // permissionStatus: () => check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : (PERMISSIONS.IOS.LOCATION_WHEN_IN_USE || PERMISSIONS.IOS.LOCATION_ALWAYS)),
  permissionStatus: async () => check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
  askPermission: async () => request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
}

export const notifications = {
  permissionStatus: async () => checkNotifications().then((n) => Promise.resolve(n.status)),
  permissionStatusComplete: async () => checkNotifications(),
  askPermission: async () => requestNotifications(['alert', 'badge', 'sound']),
}

export const camera = {
  permissionStatus: () => check(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA),
  askPermission: () => request(Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA),
}

export const microphone = {
  permissionStatus: () => check(Platform.OS === 'android' ? (PERMISSIONS.ANDROID.CALL_PHONE && PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS && PERMISSIONS.ANDROID.RECORD_AUDIO) : PERMISSIONS.IOS.MICROPHONE),
  askPermission: () => request(Platform.OS === 'android' ? (PERMISSIONS.ANDROID.CALL_PHONE && PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS && PERMISSIONS.ANDROID.RECORD_AUDIO) : PERMISSIONS.IOS.MICROPHONE),
}

export const permissionCameraCheck = async () => {
  const hasPermission = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  )

  if (hasPermission) {
    return true
  }

  const status = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  )

  if (status === PermissionsAndroid.RESULTS.GRANTED) {
    return true
  }

  return false
}
