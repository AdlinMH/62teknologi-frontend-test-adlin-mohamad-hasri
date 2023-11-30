import { StyleSheet } from 'react-native'

import { Gutters, ThemeVariables } from '@appTypes/theme'

import { firstLetterToUpperCase } from '@/utils/functions/strings'

/**
 * Generate Styles depending on MetricsSizes vars availabled at ./theme/Variables
 * Styles are like :
 * <size><direction><op>: {
 *    <op><direction>: <value>
 * }
 * where:
 * <size>: is the key of the variable included in MetricsSizes
 * <direction>: can be ['Bottom','Top','Right','Left','Horizontal','Vertical']
 * <op>: can be ['Margin', 'Padding']
 * <value>: is the value of the <size>
 */
export default function ({ MetricsSizes }: ThemeVariables): Gutters {
  return StyleSheet.create({
    ...Object.entries(MetricsSizes).reduce(
      (acc, [key, value]) => {
        const key_ = firstLetterToUpperCase(key)
        return ({
          ...acc,
          /* Margins */
          [`margin${key_}`]: {
            margin: value,
          },
          [`marginBottom${key_}`]: {
            marginBottom: value,
          },
          [`marginTop${key_}`]: {
            marginTop: value,
          },
          [`marginRight${key_}`]: {
            marginRight: value,
          },
          [`marginLeft${key_}`]: {
            marginLeft: value,
          },
          [`marginVertical${key_}`]: {
            marginVertical: value,
          },
          [`marginHorizontal${key_}`]: {
            marginHorizontal: value,
          },

          /* Paddings */
          [`padding${key_}`]: {
            padding: value,
          },
          [`paddingBottom${key_}`]: {
            paddingBottom: value,
          },
          [`paddingTop${key_}`]: {
            paddingTop: value,
          },
          [`paddingRight${key_}`]: {
            paddingRight: value,
          },
          [`paddingLeft${key_}`]: {
            paddingLeft: value,
          },
          [`paddingVertical${key_}`]: {
            paddingVertical: value,
          },
          [`paddingHorizontal${key_}`]: {
            paddingHorizontal: value,
          },

          /* Border Radiuses */
          [`radius${key_}`]: {
            borderRadius: value,
          },
          [`radiusTopLeft${key_}`]: {
            borderTopLeftRadius: value,
          },
          [`radiusTopRight${key_}`]: {
            borderTopRightRadius: value,
          },
          [`radiusBottomLeft${key_}`]: {
            borderBottomLeftRadius: value,
          },
          [`radiusBottomRight${key_}`]: {
            borderBottomRightRadius: value,
          },

          /* Positions */
          [`top${key_}`]: {
            top: value,
          },
          [`right${key_}`]: {
            right: value,
          },
          [`bottom${key_}`]: {
            bottom: value,
          },
          [`left${key_}`]: {
            left: value,
          },
        })
      },
      {},
    ) as Gutters,
  })
}
