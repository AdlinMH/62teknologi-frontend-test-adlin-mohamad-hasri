import { StyleSheet } from 'react-native'
import { LayoutColorPropOptions, ThemeVariables } from '@appTypes/theme'
import { firstLetterToUpperCase } from '@/utils/functions/strings'

export default function ({ Colors }: ThemeVariables) {
  return StyleSheet.create({
    ...Object.entries(Colors).reduce(
      (acc, [key, value]) => {
        const key_ = firstLetterToUpperCase(key)
        return ({
          ...acc,
          /* Backgrounds */
          [`background${key_}`]: {
            backgroundColor: value,
          },
          /* Backgrounds */
          [`borderColor${key_}`]: {
            borderColor: value,
          },
        })
      },
      {},
    ) as LayoutColorPropOptions,

    /* Column Layouts */
    col: {
      flexDirection: 'column',
    },
    colReverse: {
      flexDirection: 'column-reverse',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colVCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    colHCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },

    /* Row Layouts */
    row: {
      flexDirection: 'row',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowVCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowHCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemsCenter: {
      alignItems: 'center',
    },
    itemsStart: {
      alignItems: 'flex-start',
    },
    itemsEnd: {
      alignItems: 'flex-end',
    },
    itemsStretch: {
      alignItems: 'stretch',
    },
    selfBaseline: {
      alignSelf: 'baseline',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    selfCenter: {
      alignSelf: 'center',
    },
    selfStart: {
      alignSelf: 'flex-start',
    },
    selfEnd: {
      alignSelf: 'flex-end',
    },
    selfAuto: {
      alignSelf: 'auto',
    },
    contentCenter: {
      alignContent: 'center',
    },
    contentStart: {
      alignContent: 'flex-start',
    },
    contentEnd: {
      alignContent: 'flex-end',
    },
    contentAround: {
      alignContent: 'space-around',
    },
    contentBetween: {
      alignContent: 'space-between',
    },
    contentStretch: {
      alignContent: 'stretch',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    justifyContentStart: {
      justifyContent: 'flex-start',
    },
    justifyContentEnd: {
      justifyContent: 'flex-end',
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },

    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fullSize: {
      height: '100%',
      width: '100%',
    },
    fullWidth: {
      width: '100%',
    },
    halfWidth: {
      width: '50%',
    },
    fullHeight: {
      height: '100%',
    },

    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: '90deg' }],
    },
    rotate90Inverse: {
      transform: [{ rotate: '-90deg' }],
    },

    // Position
    positionRelative: {
      position: 'relative',
    },
    positionAbsolute: {
      position: 'absolute',
    },
    top0: {
      top: 0,
    },
    bottom0: {
      bottom: 0,
    },
    left0: {
      left: 0,
    },
    right0: {
      right: 0,
    },

    // Border
    borderWidth0: {
      borderWidth: 0,
    },
    borderWidth0_5: {
      borderWidth: 0.5,
    },
    borderWidth1: {
      borderWidth: 1,
    },
    borderWidth2: {
      borderWidth: 2,
    },
    borderWidth3: {
      borderWidth: 3,
    },
    borderWidth4: {
      borderWidth: 4,
    },
    borderDashed: {
      borderStyle: 'dashed',
    },

    // Opacities
    opacity0: {
      opacity: 0,
    },
    opacity1: {
      opacity: 0.1,
    },
    opacity2: {
      opacity: 0.2,
    },
    opacity3: {
      opacity: 0.3,
    },
    opacity4: {
      opacity: 0.4,
    },
    opacity5: {
      opacity: 0.5,
    },
    opacity6: {
      opacity: 0.6,
    },
    opacity7: {
      opacity: 0.7,
    },
    opacity8: {
      opacity: 0.8,
    },
    opacity9: {
      opacity: 0.9,
    },
    opacity10: {
      opacity: 1,
    },

    // Others
    overflowHidden: {
      overflow: 'hidden',
    },
    hidden: {
      display: 'none',
    },
  })
}
