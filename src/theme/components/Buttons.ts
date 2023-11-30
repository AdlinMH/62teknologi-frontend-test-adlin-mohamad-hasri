import { StyleSheet } from 'react-native'

import { CommonParams } from '@appTypes/theme'

export default function <C> ({
  Colors, ComponentColors, Gutters, Layout, Fonts,
}: CommonParams<C>) {
  const base = {
    ...Layout.center,
    ...Gutters.paddingHorizontalRegular,
    height: 40,
    backgroundColor: Colors.primary500,
  }
  const rounded = {
    ...base,
    ...Gutters.radiusRegular,
  }
  const circle = {
    ...Layout.center,
    ...Gutters.radiusLarge,
    height: 70,
    width: 70,
    backgroundColor: ComponentColors.circleButtonBackground,
  }

  const title = {
    ...Fonts.textBold,
    color: Colors.black800,
  }

  return StyleSheet.create({
    base,
    rounded,
    circle,
    outline: {
      ...base,
      ...Layout.borderWidth2,
      backgroundColor: Colors.transparent,
      borderColor: Colors.primary500,
    },
    outlineRounded: {
      ...rounded,
      ...Layout.borderWidth2,
      backgroundColor: Colors.transparent,
      borderColor: Colors.primary500,
    },

    title,
  })
}
