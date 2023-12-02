import { PascalCase } from 'type-fest'
import { Theme as ReactNavigationTheme } from '@react-navigation/native/src/types'

import Variables from '@/theme/variables'
import {
  DefaultVariables, Fonts,
  Gutters, Images, Layout,
} from '@/theme'


/**
 * THEME OF VARIABLES
 */
export type ThemeVariables = {
  Colors: typeof Variables.Colors
  ComponentColors: typeof Variables.ComponentColors
  NavigationColors: typeof Variables.NavigationColors
  FontSize: typeof Variables.FontSize
  FontFamily: typeof Variables.FontFamily
  MetricsSizes: typeof Variables.MetricsSizes
};

export type Theme<F, G, I, L, C> = ThemeVariables & {
  Fonts: F;
  Gutters: G;
  Images: I;
  Layout: L;
  Common: C;
  Variables?: Partial<ThemeVariables>;
};


/**
 * THEME OF NAVIGATION
 */
type NavigationColors<T> = T extends { colors: infer U } ? U : never;
type ThemeNavigationColors = NavigationColors<ReactNavigationTheme>;

export type ThemeNavigationTheme = {
  dark: boolean;
  colors: ThemeNavigationColors;
};


/**
 * COMMON PARAMS
 */
const fonts = Fonts(DefaultVariables)
const layout = Layout(DefaultVariables)
const images = Images(DefaultVariables)
const gutters = Gutters(DefaultVariables)

export type CommonParams<C> =
  ThemeVariables &
  Pick<Theme<typeof fonts, typeof gutters, typeof images, typeof layout, C>,
  'Layout' | 'Gutters' | 'Fonts' | 'Images'
  >;


/**
 * GUTTERS
 */
type Margins =
  | 'margin'
  | 'marginBottom'
  | 'marginTop'
  | 'marginRight'
  | 'marginLeft'
  | 'marginVertical'
  | 'marginHorizontal';
type Paddings =
  | 'padding'
  | 'paddingBottom'
  | 'paddingTop'
  | 'paddingRight'
  | 'paddingLeft'
  | 'paddingVertical'
  | 'paddingHorizontal';
type BorderRadiuses =
  | 'radius'
  | 'radiusTopLeft'
  | 'radiusTopRight'
  | 'radiusBottomLeft'
  | 'radiusBottomRight';
type Positions =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left';

type MarginKeys = `${Margins}${PascalCase<keyof ThemeVariables['MetricsSizes']>}`;
type PaddingKeys = `${Paddings}${PascalCase<keyof ThemeVariables['MetricsSizes']>}`;
type BorderRadiusKeys = `${BorderRadiuses}${PascalCase<keyof ThemeVariables['MetricsSizes']>}`;
type PositionKeys = `${Positions}${PascalCase<keyof ThemeVariables['MetricsSizes']>}`;

type Gutters = {
  [key in MarginKeys | PaddingKeys | BorderRadiusKeys | PositionKeys]: {
    [k in string]: number;
  };
};


/**
 * LAYOUT COLOR GUTTERS
 */
type LayoutColorProps =
  | 'background'
  | 'borderColor'
  | 'borderTopColor'
  | 'borderRightColor'
  | 'borderBottomColor'
  | 'borderLeftColor';

type LayoutColorPropKeys = `${LayoutColorProps}${PascalCase<keyof ThemeVariables['Colors']>}`;

type LayoutColorPropOptions = {
  [key in LayoutColorPropKeys]: {
    [k in string]: string;
  };
};


/**
 * FONT COLOR GUTTERS
 */
type FontColorProp =
  | 'color';

type FontColorPropKeys = `${FontColorProp}${PascalCase<keyof ThemeVariables['Colors']>}`;

type FontColorStyleOptions = {
  [key in FontColorPropKeys]: {
    [k in string]: string;
  };
};


/**
 * FONT FAMILY GUTTERS
 */
type FontFamilyProp =
  | 'family';

type FontFamiltPropKeys = `${FontFamilyProp}${PascalCase<keyof ThemeVariables['FontFamily']>}`;

type FontFamilyStyleGutters = {
  [key in FontFamiltPropKeys]: {
    [k in string]: string;
  };
};
