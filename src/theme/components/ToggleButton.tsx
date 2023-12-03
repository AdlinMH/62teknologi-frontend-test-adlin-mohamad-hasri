/* eslint-disable quote-props */
import React, { useEffect, useState } from 'react'
import { Chip as ChipRNElement, ChipProps } from '@rneui/themed'

import { useTheme } from '@/hooks'
import { TouchableWithoutFeedback } from 'react-native'

interface Props extends ChipProps {
  defaultToggled?: boolean
  onChange?: (e: boolean) => void
}

const ToggleButton = (props: Props) => {
  const {
    title, defaultToggled, onChange, buttonStyle, titleStyle,
  } = props

  const [isToggled, setIsToggled] = useState<boolean>(defaultToggled || false)

  const { Gutters, Fonts, Layout } = useTheme()

  useEffect(() => {
    if (onChange) onChange(isToggled)
  }, [isToggled])

  const styles = {
    'false': {
      buttonStyle: [Layout.backgroundBlack300, Layout.borderWidth0],
      titleStyle: [Fonts.colorBlack900],

    },
    'true': {
      buttonStyle: [Layout.backgroundPrimary400],
      titleStyle: [Fonts.colorWhite],
    },
  }

  return (
    <ChipRNElement
      {...props}
      type={isToggled ? 'solid' : 'outline'}
      title={title}
      size="md"
      onPress={() => {
        setIsToggled((prev) => !prev)
      }}
      containerStyle={[
        Gutters.marginRightTiny,
        Gutters.marginBottomTiny,
      ]}
      buttonStyle={[
        Layout.center,
        Gutters.paddingHorizontalSmall,
        Gutters.paddingVerticalTiny,
        styles[`${isToggled}`].buttonStyle,
        buttonStyle,
      ]}
      titleStyle={[
        Fonts.sizeRegular,
        Fonts.familyMedium,
        styles[`${isToggled}`].titleStyle,
        titleStyle,
      ]}
      TouchableComponent={TouchableWithoutFeedback}
    />
  )
}

export default ToggleButton
