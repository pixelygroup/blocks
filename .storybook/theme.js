import { create } from '@storybook/theming/create'
import logo from '../src/assets/svg/px-logo.svg'

const palette = {
  white: '#fff',
  primary: '#0e93ed',
  error: '#fa5351',
  success: '#00aa99',
  warning: '#e66834',
  darkGray: '#3e4756',
  midGray: '#8895aa',
  lightGray: '#e6ebf3',
}

export default create({
  base: 'light',

  colorPrimary: palette.primary,
  colorSecondary: palette.darkGray,

  // UI
  appBg: palette.lightGray,
  appContentBg: palette.white,
  appBorderColor: palette.darkGray,
  appBorderRadius: 6,

  // Typography
  fontBase:
    '"Quicksand", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: palette.darkGray,
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: palette.darkGray,
  barSelectedColor: palette.primary,
  barBg: palette.white,

  // Form colors
  inputBg: palette.white,
  inputBorder: palette.midGray,
  inputTextColor: palette.darkGray,
  inputBorderRadius: 6,

  brandTitle: 'Pixely Group',
  brandUrl: 'https://pixely.group/',
  brandImage: logo,
})

