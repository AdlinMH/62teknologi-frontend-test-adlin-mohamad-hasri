/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'

import { FontColorStyleOptions, FontFamilyStyleGutters, ThemeVariables } from '@appTypes/theme'

import { firstLetterToUpperCase } from '@/utils/functions/strings'

export default function ({ FontSize, FontFamily, Colors }: ThemeVariables) {
  return StyleSheet.create({
    // colors
    ...Object.entries(Colors).reduce(
      (acc, [key, value]) => {
        const key_ = firstLetterToUpperCase(key)
        return ({
          ...acc,
          /* text color */
          [`color${key_}`]: {
            color: value,
          },
        })
      },
      {},
    ) as FontColorStyleOptions,

    // Font Family
    ...Object.entries(FontFamily).reduce(
      (acc, [key, value]) => {
        const key_ = firstLetterToUpperCase(key)
        return ({
          ...acc,
          /* text color */
          [`family${key_}`]: {
            fontFamily: value,
          },
        })
      },
      {},
    ) as FontFamilyStyleGutters,

    // sizes
    h1: {
      fontSize: FontSize.h1,
      fontWeight: 'bold',
      fontFamily: FontFamily.bold,
      color: Colors.black900,
    },
    h2: {
      fontSize: FontSize.h2,
      fontWeight: 'bold',
      fontFamily: FontFamily.bold,
      color: Colors.black900,
    },
    h3: {
      fontSize: FontSize.h3,
      fontWeight: 'bold',
      fontFamily: FontFamily.bold,
      color: Colors.black900,
    },
    sizeLarge: {
      fontSize: FontSize.large,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },
    sizeMedium: {
      fontSize: FontSize.medium,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },
    sizeRegular: {
      fontSize: FontSize.regular,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },
    sizeMediumSmall: {
      fontSize: FontSize.mediumSmall,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },
    sizeSmall: {
      fontSize: FontSize.small,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },
    sizeMediumTiny: {
      fontSize: FontSize.mediumTiny,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },
    sizeTiny: {
      fontSize: FontSize.tiny,
      fontFamily: FontFamily.regular,
      color: Colors.black900,
    },

    // weights
    weightNormal: {
      fontWeight: 'normal',
    },
    weight100: {
      fontWeight: '100',
    },
    weight200: {
      fontWeight: '200',
    },
    weight300: {
      fontWeight: '300',
    },
    weight400: {
      fontWeight: '400',
    },
    weight500: {
      fontWeight: '500',
    },
    weight600: {
      fontWeight: '600',
    },
    weight700: {
      fontWeight: '700',
    },
    weight800: {
      fontWeight: '800',
    },
    weight900: {
      fontWeight: '900',
    },
    weightBold: {
      fontWeight: 'bold',
    },
    textBold: {
      fontWeight: 'bold',
    },

    // aligns
    textAlignCenter: {
      textAlign: 'center',
    },
    textAlignJustify: {
      textAlign: 'justify',
    },
    textAlignLeft: {
      textAlign: 'left',
    },
    textAlignRight: {
      textAlign: 'right',
    },
    textAlignTop: {
      textAlignVertical: 'top',
    },
    textAlignMiddle: {
      textAlignVertical: 'center',
    },
    textAlignBottom: {
      textAlignVertical: 'bottom',
    },

    // Text Transform
    textTransformUppercase: {
      textTransform: 'uppercase',
    },
    textTransformLowercase: {
      textTransform: 'lowercase',
    },
    textTransformCapitalize: {
      textTransform: 'capitalize',
    },
    textTransformNone: {
      textTransform: 'none',
    },

    // decorations
    textUnderline: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: '#000',
    },
    textLineThrough: {
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      textDecorationColor: '#000',
    },
  })
}
