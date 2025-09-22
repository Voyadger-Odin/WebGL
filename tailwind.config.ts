import { fontFamily } from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';

import { palette } from './tailwind.palette';

import type { Config } from 'tailwindcss';

// Reference: https://github.com/tailwindlabs/tailwindcss/blob/cdbcefc232987c69141450951599169631332dde/stubs/config.full.js
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    backdropBlur: {
      xs: '2px',
      sm: '4px',
      DEFAULT: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '40px',
      ultra: '100px',
    },
    listStyleType: {
      dash: '– "',
    },
    zIndex: {
      'card-bg': '0',
      card: '1',
      dropdown: '10',
      sticky: '20',
      fixed: '30',
      drawer: '40',
      'mobile-bottom-nav': '50',
      'burger-menu': '60',
      'modal-overlay': '70',
      modal: '80',
      'modal-drawer': '90',
      popover: '100',
      tooltip: '110',
    },
    ringColor: {
      DEFAULT: 'black',
    },
    ringOpacity: {
      DEFAULT: '1',
    },
    screens: {
      md: '768px',
    },
    container: {
      center: true,
      padding: '1rem',
      screens: {
        default: '100%',
        md: '1352px',
      },
    },
    fontFamily: {
      sanFrancisco: ['var(--font-sanfrancisco)', ...fontFamily.sans],
      sans: ['var(--font-sans)', ...fontFamily.sans],
      jetbrains: ['var(--font-jetbrains-mono)', ...fontFamily.mono],
      geist: ['var(--font-geist-sans)', ...fontFamily.sans],
    },
    fontSize: {
      'ft-mobile-h1': [
        '1.5rem',
        {
          lineHeight: '1.875rem',
          fontWeight: 800,
        },
      ],
      xl: [
        '1.5rem',
        {
          lineHeight: '1.875rem',
          fontWeight: 800,
        },
      ],
      'ft-mobile-h2': [
        '1.25rem',
        {
          lineHeight: '1.625rem',
          fontWeight: 800,
        },
      ],
      lg: [
        '1.25rem',
        {
          lineHeight: '1.625rem',
          fontWeight: 800,
        },
      ],
      'ft-mobile-h2-light': [
        '1.25rem',
        {
          lineHeight: '1.625rem',
          fontWeight: 500,
        },
      ],
      'ft-mobile-h3': [
        '1rem',
        {
          lineHeight: '1.5rem',
          fontWeight: 800,
        },
      ],
      'ft-mobile-big-promo': [
        '2rem',
        {
          lineHeight: '2.5rem',
          fontWeight: 800,
        },
      ],
      '2xl': [
        '2rem',
        {
          lineHeight: '2.5rem',
          fontWeight: 800,
        },
      ],
      'ft-controls-basic': [
        '0.875rem',
        {
          lineHeight: '1rem',
          fontWeight: 500,
        },
      ],
      'ft-controls-basic-20': [
        '0.875rem',
        {
          lineHeight: '1.25rem',
          fontWeight: 500,
        },
      ],
      'ft-controls-caption': [
        '0.875rem',
        {
          lineHeight: '1rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      ],
      'ft-desktop-h1': [
        '2rem',
        {
          lineHeight: '2.5rem',
          fontWeight: 800,
        },
      ],
      'ft-desktop-h2': [
        '1.5rem',
        {
          lineHeight: '2.25rem',
          fontWeight: 800,
        },
      ],
      'ft-desktop-h2-light': [
        '1.5rem',
        {
          lineHeight: '2.25rem',
          fontWeight: 500,
        },
      ],
      'ft-desktop-h3': [
        '1.25rem',
        {
          lineHeight: '1.875rem',
          fontWeight: 800,
        },
      ],
      'ft-desktop-big-promo': [
        '3rem',
        {
          lineHeight: '3.375rem',
          fontWeight: 800,
        },
      ],
      'ft-desktop-body-16-large': [
        '1rem',
        {
          lineHeight: '1.75rem',
          fontWeight: 500,
        },
      ],
      md: [
        '1rem',
        {
          lineHeight: '1.75rem',
        },
      ],
      'ft-desktop-body-14-small': [
        '0.875rem',
        {
          lineHeight: '1.25rem',
          fontWeight: 500,
        },
      ],
      'ft-desktop-body-14-basic': [
        '0.875rem',
        {
          lineHeight: '1.5rem',
          fontWeight: 500,
        },
      ],
      base: [
        '0.875rem',
        {
          lineHeight: '1.5rem',
          fontWeight: 500,
        },
      ],
      'ft-desktop-body-14-semi-bold': [
        '0.875rem',
        {
          lineHeight: '1.5rem',
          fontWeight: 600,
        },
      ],
      'ft-desktop-body-12-small': [
        '0.75rem',
        {
          lineHeight: '1.25rem',
          fontWeight: 500,
        },
      ],
      sm: [
        '0.75rem',
        {
          lineHeight: '1rem',
          fontWeight: 500,
        },
      ],
      'ft-desktop-caption-16': [
        '1rem',
        {
          lineHeight: '1.5rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      ],
      'ft-desktop-caption-12': [
        '0.75rem',
        {
          lineHeight: '1rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      ],
      xs: [
        '0.625rem',
        {
          lineHeight: '0.875rem',
          fontWeight: 500,
        },
      ],
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      banner: '16 / 6',
    },
    borderRadius: {
      none: '0px',
      xs: '0.25rem',
      sm: '0.375rem',
      md: '0.5rem',
      DEFAULT: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      full: '9999px',
    },
    boxShadow: {
      md: '0px 6px 15px rgba(0, 0, 0, 0.12);',
    },
    color: {
      light: {
        gray: {
          '14': '#FFFFFF',
          '13': '#F7F8FA',
          '12': '#EBECF0',
          '11': '#DFE1E5',
          '10': '#D3D5DB',
          '9': '#C9CCD6',
          '8': '#A8ADBD',
          '7': '#818594',
          '6': '#6C707E',
          '5': '#5A5D6B',
          '4': '#494B57',
          '3': '#383A42',
          '2': '#27282E',
          '1-primary': '#000000',
        },
        blue: {
          '13': '#F5F8FE',
          '12': '#EDF3FF',
          '11': '#D4E2FF',
          '10': '#C2D6FC',
          '9': '#A0BDF8',
          '8': '#88ADF7',
          '7': '#709CF5',
          '6': '#588CF3',
          '5': '#4682FA',
          '4-primary': '#3574F0',
          '3': '#3369D6',
          '2': '#315FBD',
          '1': '#2E55A3',
        },
        green: {
          '11': '#F2FCF3',
          '10': '#E6F7E9',
          '9': '#C5E5CC',
          '8': '#AFDBB8',
          '7': '#89C398',
          '6': '#55A76A',
          '5': '#369650',
          '4-primary': '#208A3C',
          '3': '#1F8039',
          '2': '#1F7536',
          '1': '#1E6B33',
        },
        red: {
          '11': '#FFF7F7',
          '10': '#FFF2F3',
          '9': '#FAD4D8',
          '8': '#F2B6BB',
          '7': '#ED99A1',
          '6': '#E46A76',
          '5': '#E55765',
          '4-primary': '#DB3B4B',
          '3': '#CC3645',
          '2': '#BC303E',
          '1': '#AD2B38',
        },
        yellow: {
          '10': '#FFFAEB',
          '9': '#FFF6DE',
          '8': '#FFF1D1',
          '7': '#FEE6B1',
          '6': '#FED277',
          '5': '#FDBD3D',
          '4-primary': '#FFAF0F',
          '3': '#DF9303',
          '2': '#C27D04',
          '1': '#A46704',
        },
        orange: {
          '9': '#FFF4EB',
          '8': '#FCE6D6',
          '7': '#F9D2B6',
          '6': '#F2B181',
          '5': '#EC8F4C',
          '4-primary': '#E56D17',
          '3': '#CE6117',
          '2': '#B85516',
          '1': '#A14916',
        },
        purple: {
          '9': '#FAF5FF',
          '8': '#EFE5FF',
          '7': '#DCCBFB',
          '6': '#BFA1F8',
          '5': '#A177F4',
          '4-primary': '#834DF0',
          '3': '#7444D4',
          '2': '#643CB8',
          '1': '#55339C',
        },
        teal: {
          '9': '#F2FCFC',
          '8': '#DAF4F5',
          '7': '#B6E4E5',
          '6': '#7BCCCF',
          '5': '#3FB3B8',
          '4-primary': '#039BA1',
          '3': '#058B90',
          '2': '#077A7F',
          '1': '#096A6E',
        },
      },
      dark: {
        gray: {
          '14': '#FFFFFF',
          '13': '#F0F1F2',
          '12': '#DFE1E5',
          '11': '#CED0D6',
          '10': '#B4B8BF',
          '9': '#9DA0A8',
          '8': '#868A91',
          '7': '#6F737A',
          '6': '#5A5D63',
          '5': '#4E5157',
          '4': '#43454A',
          '3': '#393B40',
          '2': '#2B2D30',
          '1-primary': '#111111',
        },
        blue: {
          '11': '#99BBFF',
          '10': '#83ACFC',
          '9': '#6B9BFA',
          '8': '#548AF7',
          '7': '#467FF2',
          '6-primary': '#3574F0',
          '5': '#366ACF',
          '4': '#375FAD',
          '3': '#35538F',
          '2': '#2E436E',
          '1': '#25324D',
        },
        green: {
          '11': '#D4FAD7',
          '10': '#B9EBBD',
          '9': '#A0DBA5',
          '8': '#89CC8E',
          '7': '#73BD79',
          '6-primary': '#5FAD65',
          '5': '#57965C',
          '4': '#4E8052',
          '3': '#436946',
          '2': '#375239',
          '1': '#253627',
        },
        red: {
          '11': '#FAE3DE',
          '10': '#F7CCC6',
          '9': '#F2B1AA',
          '8': '#EB938D',
          '7': '#E37774',
          '6-primary': '#DB5C5C',
          '5': '#BD5757',
          '4': '#9C4E4E',
          '3': '#7A4343',
          '2': '#5E3838',
          '1': '#402929',
        },
        yellow: {
          '11': '#FFF6BD',
          '10': '#FCEBA4',
          '9': '#F7DE8B',
          '8': '#F5D273',
          '7-primary': '#F2C55C',
          '6': '#D6AE58',
          '5': '#BA9752',
          '4': '#9E814A',
          '3': '#826A41',
          '2': '#5E4D33',
          '1': '#3D3223',
        },
        orange: {
          '11': '#FFDFC7',
          '10': '#FACEAF',
          '9': '#F5BD98',
          '8': '#F0AC81',
          '7': '#E5986C',
          '6-primary': '#E08855',
          '5': '#C77D55',
          '4': '#A36B4E',
          '3': '#825845',
          '2': '#614438',
          '1': '#45322B',
        },
        purple: {
          '11': '#E4CEFF',
          '10': '#D4B8F9',
          '9': '#C4A0F3',
          '8': '#B589EC',
          '7': '#A571E6',
          '6-primary': '#955AE0',
          '5': '#8150BE',
          '4': '#6C469C',
          '3': '#583D7A',
          '2': '#433358',
          '1': '#2F2936',
        },
        teal: {
          '11': '#B9EBE6',
          '10': '#9BDDD6',
          '9': '#7DCEC5',
          '8': '#60C0B5',
          '7': '#42B1A4',
          '6-primary': '#24A394',
          '5': '#238E82',
          '4': '#21786F',
          '3': '#20635D',
          '2': '#1E4D4A',
          '1': '#1D3838',
        },
      },
    },
    extend: {
      maxWidth: {
        'wide-screen': 'min(100vw, 1920px)',
      },
      minWidth: {
        '375': '375px',
      },
      transitionDuration: {
        '30': '30ms',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'slide-in-from-right': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-out-to-right': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'slide-in-from-left': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-out-to-left': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'caret-blink': {
          '0%,70%,100%': {
            opacity: '1',
          },
          '20%,50%': {
            opacity: '0',
          },
        },
        'page-load': {
          to: {
            '-webkit-mask-size': '200% 200%',
            maskSize: '700% 700%',
          },
        },
        'page-load-blur': {
          '0%': {
            opacity: '100%',
          },
          '100%': {
            opacity: '0%',
          },
        },
        'element-up': {
          '0%': {
            transform: 'scale(0.95)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        in: {
          '0%': {
            transform: 'scale(0.95) translateY(-10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1',
          },
        },
        out: {
          '0%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(0.95) translateY(-10px)',
            opacity: '0',
          },
        },
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'slide-in-from-right': 'slide-in-from-right 0.150s ease-out forwards',
        'slide-out-to-right': 'slide-out-to-right 0.150s ease-in forwards',
        'slide-in-from-left': 'slide-in-from-left 0.150s ease-out forwards',
        'slide-out-to-left': 'slide-out-to-left 0.150s ease-in forwards',
        'page-load': 'page-load  1.8s ease-in forwards',
        'page-load-blur': 'page-load-blur  1.5s cubic-bezier(.42,0,.58,1) forwards',
        'element-up': 'element-up 1.5s cubic-bezier(.42,0,.58,1) forwards',
        in: 'in 0.2s cubic-bezier(.42,0,.58,1) forwards',
        out: 'out 0.2s cubic-bezier(.42,0,.58,1) forwards',
      },
    },
  },
  plugins: [
    // require('tailwindcss-animate'),
    // require('tailwindcss-aria-attributes'),
    plugin(function ({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)');
      addVariant('not-first', '&:not(:first-child)');
    }),
  ],
} satisfies Config;

export default config;
