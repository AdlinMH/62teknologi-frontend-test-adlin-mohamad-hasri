import * as React from 'react'
import { StatusBar, StatusBarProps } from 'react-native'
import { useIsFocused } from '@react-navigation/native'

import { useTheme } from '@/hooks'

export default function FocusAwareStatusBar(props: StatusBarProps) {
  const isFocused = useIsFocused()

  const { Colors } = useTheme()

  return isFocused ? (
    <StatusBar
      translucent
      backgroundColor={Colors.transparent}
      barStyle="dark-content"
      animated
      {...props}
    />
  ) : null
}
