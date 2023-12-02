import {
  Pressable, StatusBar, StyleProp, ViewStyle, View,
} from 'react-native'
import React from 'react'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import AntIcon from 'react-native-vector-icons/AntDesign'

import { useTheme } from '@/hooks'

import FocusAwareStatusBar from '../FocusAwareStatusBar'

export type CustomBottomSheetProps = {
  isVisible: boolean
  showCloseButton?: boolean
  closeEvent?: () => void
  children: any
  withBackdrop?: boolean
  backdropDismissable?: boolean
  panelStyle?: StyleProp<ViewStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const SCREEN_HEIGHT = responsiveHeight(100)

const BottomSheetCustomComponent = ({
  isVisible, showCloseButton = false, closeEvent, panelStyle, containerStyle, children, withBackdrop = true, backdropDismissable = false,
} : CustomBottomSheetProps) => {
  const { Layout, Gutters, FontSize } = useTheme()

  const panelBottomStyle = useAnimatedStyle(() => ({
    bottom: isVisible
      ? withTiming(0, { duration: 200 })
      : withTiming(-SCREEN_HEIGHT, { duration: 100 }),
  }), [isVisible])

  const backdropOpacityStyle = useAnimatedStyle(() => ({
    opacity: isVisible
      ? withTiming(0.6, { duration: 150 })
      : withTiming(0, { duration: 50 }),
  }), [isVisible])

  return (
    <>
      {/* backdrop */}
      {isVisible && (
        <>
          <FocusAwareStatusBar />

          {withBackdrop && (
            <Animated.View
              onTouchStart={backdropDismissable ? () => closeEvent?.() : undefined}
              style={[
                Layout.positionAbsolute, Layout.fullSize, Layout.backgroundBlack700, {
                  top: -(StatusBar?.currentHeight || 200),
                  bottom: 0,
                  zIndex: 8888,
                  height: responsiveHeight(110),
                }, backdropOpacityStyle,
              ]}
            />
          )}
        </>
      )}

      {/* children container */}
      <Animated.View style={[
        Layout.col, Layout.fullWidth, Layout.positionAbsolute,
        Gutters.paddingBottomRegular, // Gutters.paddingTopSmall,
        Gutters.radiusTopLeftSmall, Gutters.radiusTopRightSmall,
        Layout.backgroundWhite,
        {
          // display: isVisible ? 'flex' : 'none',
          height: 'auto',
          zIndex: 9999,
        },
        panelBottomStyle,
        panelStyle,
      ]}
      >
        {showCloseButton && (
          <Pressable
            onPress={() => closeEvent?.()}
            style={[Layout.positionAbsolute, Layout.center, Gutters.rightTiny, Gutters.topTiny, { width: responsiveWidth(14), height: responsiveWidth(14), zIndex: 99991 }]}
          >
            <AntIcon name="close" size={FontSize.large} />
          </Pressable>
        )}

        <View style={containerStyle}>
          {children}
        </View>
      </Animated.View>
    </>
  )
}

export default React.memo(BottomSheetCustomComponent)
