/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import * as React from 'react'
import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native'

import { NavigationScreenArgsType } from '@appTypes/navigation'

type RoutesType = {
  name: string
  params?: Record<string, any>
}

export const navigationRef = React.createRef<NavigationContainerRef<any>>()

export function navigate(name: string, params?: NavigationScreenArgsType | null) {
  navigationRef.current?.navigate(name, params)
}

export function navigateAndReset(routes: RoutesType[]) {
  navigationRef.current?.dispatch(
    CommonActions.reset({ routes, index: routes.length - 1 }),
  )
}

export function navigateAndSimpleReset(name: string) {
  navigationRef.current?.dispatch(
    CommonActions.reset({ routes: [{ name }], index: 0 }),
  )
}

export function navigateAndResetInStack(name: string, params?: Record<string, unknown>) {
  navigationRef.current?.dispatch(
    StackActions.replace(name, params),
  )
}

export function navigatePop(goBackCount = 1) {
  navigationRef.current?.dispatch(
    StackActions.pop(goBackCount),
  )
}

export function navigateBack(cannotGobackCallback?: () => void) {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack()
  } else {
    cannotGobackCallback?.()
  }
}

export function getCurrentScreenName() {
  return navigationRef.current?.getCurrentRoute()?.name || ''
}
