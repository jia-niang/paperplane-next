import localFont from 'next/font/local'

export const fontFZYanSong = localFont({
  src: '../fonts/fz-yansong/fz-yansong-zhun.woff2',
  weight: 'normal',
  display: 'swap',
  variable: '--font-fzyansong',
})

export const fontSwift = localFont({
  src: [
    { path: '../fonts/swift/swift-300.woff2', weight: '300' },
    { path: '../fonts/swift/swift-400.woff2', weight: 'normal' },
    { path: '../fonts/swift/swift-700.woff2', weight: '700' },
  ],
  variable: '--font-swift',
  display: 'swap',
})

export const fontSourceCodePro = localFont({
  src: [
    { path: '../fonts/source-code-pro-latin/source-code-pro-latin-200.woff2', weight: '200' },
    { path: '../fonts/source-code-pro-latin/source-code-pro-latin-400.woff2', weight: 'normal' },
    { path: '../fonts/source-code-pro-latin/source-code-pro-latin-600.woff2', weight: '600' },
  ],
  variable: '--font-source-code',
  display: 'swap',
})
