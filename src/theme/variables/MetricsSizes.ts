import { responsiveScale } from 'react-native-full-responsive'

/*
 * Metrics Sizes
 */
const none = 0
const tiny = responsiveScale(7)
const small = tiny * 2
const regular = tiny * 3
const large = regular * 2
const huge = regular * 3

const tinyMin = -responsiveScale(7)
const smallMin = -small
const regularMin = -regular
const largeMin = -large
const hugeMin = -huge
export const MetricsSizes = {
  none,
  tiny,
  small,
  regular,
  large,
  huge,

  tinyMin,
  smallMin,
  regularMin,
  largeMin,
  hugeMin,
}

export default MetricsSizes
