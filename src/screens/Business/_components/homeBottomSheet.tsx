import {
  StyleProp, ViewStyle, View,
} from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/hooks'
import FocusAwareStatusBar from '@/components/FocusAwareStatusBar'

export type CustomBottomSheetProps = {
  collapsed: boolean
  collapsedHeight: number
  children: any
  panelStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const SCREEN_HEIGHT = responsiveHeight(100)

const HomeBottomSheet = ({
  collapsed, collapsedHeight, panelStyle, containerStyle, children,
} : CustomBottomSheetProps) => {
  const { Layout, Gutters } = useTheme()

  const panelBottomStyle = useAnimatedStyle(() => ({
    bottom: collapsed
      ? withTiming(-(SCREEN_HEIGHT - collapsedHeight), { duration: 200 })
      : withTiming(0, { duration: 200 }),
  }), [collapsed])

  return (
    <>
      {/* status bar */}
      <FocusAwareStatusBar />

      {/* content container */}
      <Animated.View style={[
        Layout.col, Layout.fullWidth, Layout.positionAbsolute, Layout.backgroundWhite,
        Gutters.radiusTopLeftSmall, Gutters.radiusTopRightSmall, Layout.overflowHidden,
        {
          height: 'auto',
          zIndex: 9999,
        },
        panelBottomStyle,
        panelStyle,
      ]}
      >
        <View style={containerStyle}>
          {children}
        </View>
      </Animated.View>
    </>
  )
}

export default React.memo(HomeBottomSheet)
