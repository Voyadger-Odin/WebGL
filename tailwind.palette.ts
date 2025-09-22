// Reference: https://github.com/lmsqueezy/wedges/blob/1637f640cdf6b12f20542b173f74a61fe12010d9/packages/wedges/src/tw-plugin/foundation/colors/palette.ts

export const palette = {
  white: {
    DEFAULT: '#FFFFFF',
  },
  black: {
    DEFAULT: '#313131',
  },
  blackest: {
    DEFAULT: '#000000',
  },
  dark: {
    DEFAULT: '#313131',
    400: '#313131',
    900: '#313131',
  },
  gray: {
    DEFAULT: '#A8A8A8',
    100: '#F5F5F5',
    // 150: '#EFEFEF' // button.secondary.hover
    200: '#D9D9D9',
    300: '#CACACA',
    400: '#A8A8A8',
    500: '#808080',
    600: '#808080',
    700: '#808080',
    800: '#808080',
    900: '#808080',
    950: '#808080', // mostly used by default ShadCN
  },
  green: {
    DEFAULT: '#25BD77',
    400: '#25BD77',
  },
  red: {
    DEFAULT: '#E50000',
    500: '#E50000',
    900: '#E50000',
  },
  purple: {
    DEFAULT: '#867FFF',
  },
} as const;

export type Palette = typeof palette;
export type PaletteKeys = keyof Palette;
export type PrefixedPaletteKeys = {
  [K in keyof Palette as `pal-${string & K}`]: Palette[K];
};
