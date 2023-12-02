import { responsiveScreenFontSize } from 'react-native-responsive-dimensions'

/**
 * FontSize
 */
export const FontSize = {
  h1: responsiveScreenFontSize(4),
  h2: responsiveScreenFontSize(3.1),
  h3: responsiveScreenFontSize(2.8),
  h4: responsiveScreenFontSize(2.2),
  large: responsiveScreenFontSize(3),
  medium: responsiveScreenFontSize(2.7),
  regular: responsiveScreenFontSize(2.5),
  mediumSmall: responsiveScreenFontSize(2.3),
  small: responsiveScreenFontSize(2),
  mediumTiny: responsiveScreenFontSize(1.8),
  tiny: responsiveScreenFontSize(1.5),
}

export default FontSize
