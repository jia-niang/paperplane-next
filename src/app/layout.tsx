import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import '@mantine/dates/styles.css'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { ReactNode } from 'react'
import * as z from 'zod'
import { zhCN } from 'zod/locales'

import '@/lib/dayjs'

import ClientProvider from './ClientProvider'
import { fontFZYanSong, fontSourceCodePro, fontSwift } from './fonts'

import '@/styles/app.css'

z.config(zhCN())

export const metadata: Metadata = {
  title: 'PaperPlane 🌠',
  description: '',
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="zh-CN"
      {...mantineHtmlProps}
      className={clsx(
        fontFZYanSong.variable,
        fontSourceCodePro.variable,
        fontSwift.variable,
        'antialiased'
      )}
    >
      <head>
        <meta name="renderer" content="webkit" />
        <meta name="force-rendering" content="webkit" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <ColorSchemeScript />
      </head>

      <body style={{ marginRight: '0 !important' }}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  )
}
