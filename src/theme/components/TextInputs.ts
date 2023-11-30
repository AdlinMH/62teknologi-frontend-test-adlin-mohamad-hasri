import { StyleSheet } from 'react-native'

import { CommonParams } from '@appTypes/theme'

export default function <C> ({
  Colors, ComponentColors, Gutters, Layout,
}: CommonParams<C>) {
  const input = {
    ...Layout.center,
    ...Gutters.paddingHorizontalRegular,
    ...Gutters.radiusRegular,
    backgroundColor: ComponentColors.inputBackground,
    color: Colors.black400,
    height: 45,
    borderRadius: 10,
    paddingStart: 20,
  }

  return StyleSheet.create({
    input,
  })
}
