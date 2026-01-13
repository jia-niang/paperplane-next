import { Container, createTheme } from '@mantine/core'
import clsx from 'clsx'

export default createTheme({
  primaryColor: 'lb',
  colors: {
    lb: [
      '#dffbff',
      '#caf2ff',
      '#99e2ff',
      '#64d2ff',
      '#3cc4fe',
      '#23bcfe',
      '#00b5ff',
      '#00a1e4',
      '#008fcd',
      '#007cb6',
    ],
    dp: [
      '#faedff',
      '#edd9f7',
      '#d8b1ea',
      '#c186dd',
      '#ae62d2',
      '#a34bcb',
      '#9d3fc9',
      '#8931b2',
      '#7a2aa0',
      '#6b218d',
    ],
    ma: [
      '#ffe9f6',
      '#ffd1e6',
      '#faa1c9',
      '#f66eab',
      '#f24391',
      '#f02981',
      '#f01879',
      '#d60867',
      '#c0005c',
      '#a9004f',
    ],
  },
  fontFamilyMonospace: `var(--font-source-code), -apple-system, sans-serif`,
  fontSizes: {
    xl: '32px',
    lg: '26px',
    md: '20px',
    sm: '16px',
    xs: '12px',
  },
  headings: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 'normal',
  },
  components: {
    Button: {
      classNames: {
        label: 'font-normal',
      },
    },
    Container: Container.extend({
      classNames: (_, { size }) => ({
        root: clsx({ 'container--responsive': size === 'responsive' }),
      }),
    }),
  },
})
