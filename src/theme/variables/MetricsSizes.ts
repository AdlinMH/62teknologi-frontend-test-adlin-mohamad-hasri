import { responsiveScreenWidth } from 'react-native-responsive-dimensions'

/*
 * Metrics Sizes
 */
const none = 0
const tiny = responsiveScreenWidth(2)
const small = tiny * 2
const regular = tiny * 3
const large = regular * 2
const huge = regular * 3

const tinyMin = -responsiveScreenWidth(2)
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
