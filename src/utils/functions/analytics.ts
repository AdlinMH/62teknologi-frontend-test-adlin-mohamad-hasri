/* eslint-disable no-undef */
// import { firebase } from '@react-native-firebase/analytics'
// import * as Sentry from '@sentry/react-native'

export const LogEvent = async (eventName: string, propertyObject = {}) => {
  // console.tron('LogEvent', eventName, propertyObject)
  try {
    // await firebase?.analytics().logEvent(eventName, propertyObject)
  } catch (error) {
    // Sentry.captureException(error)
  }
}

export const LogScreenView = async (screenName: string | undefined, screenClass: string | undefined) => {
  // console.tron('LogScreenView', screenName)
  // await firebase?.analytics().logScreenView({
  //   screen_name: screenName,
  //   screen_class: screenClass,
  // })
}

export const IdentifyUser = async (user_id: number | undefined, username: string, email: string, callback?: () => void) => {
  // firebase
  await Promise.all([
    // firebase?.analytics()?.setUserId(String(user_id)),
    // firebase?.analytics()?.setUserProperty('username', username),
    // firebase?.analytics()?.setUserProperty('email', email),
  ])

  // sentry
  // Sentry.setUser({ user_id, username })

  // callback
  callback?.()
}
