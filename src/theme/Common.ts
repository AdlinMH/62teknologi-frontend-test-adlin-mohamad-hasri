/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */

import { CommonParams } from '@appTypes/theme'

import buttonStyles from './components/Buttons'
import textInputStyles from './components/TextInputs'

export default function <C> ({ Colors, ...args }: CommonParams<C>) {
  return {
    button: buttonStyles({ Colors, ...args }),

    textInput: textInputStyles({ Colors, ...args }),

    // Shadow
    headerShadow: {
      shadowColor: Colors.black900,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 2,
    },
    cardShadow: {
      shadowColor: Colors.black500,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    buttonShadow: {
      shadowColor: Colors.black500,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 2,
    },
    noButtonShadow: {
      shadowColor: Colors.transparent,
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0,
      shadowRadius: 0,

      elevation: 0,
    },
  }
}
