import {
  StyleProp, ViewStyle, View,
} from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

import { useTheme } from '@/hooks'

import FocusAwareStatusBar from '@/components/FocusAwareStatusBar'

export type CustomBottomSheetProps = {
  isVisible: boolean
  children: any
  panelStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const SCREEN_HEIGHT = responsiveHeight(100)

const HomeBottomSheet = ({
  isVisible, panelStyle, containerStyle, children,
} : CustomBottomSheetProps) => {
  const { Layout, Gutters } = useTheme()

  const panelBottomStyle = useAnimatedStyle(() => ({
    bottom: isVisible
      ? withTiming(0, { duration: 200 })
      : withTiming(-SCREEN_HEIGHT, { duration: 100 }),
  }), [isVisible])

  return (
    <>
      {/* backdrop */}
      {isVisible && (
        <FocusAwareStatusBar />
      )}

      {/* children container */}
      <Animated.View style={[
        Layout.col, Layout.fullWidth, Layout.positionAbsolute, Layout.backgroundWhite,
        Gutters.radiusTopLeftSmall, Gutters.radiusTopRightSmall,
        {
          // display: isVisible ? 'flex' : 'none',
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
