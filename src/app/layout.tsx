import { prefetchSession } from '@daveyplate/better-auth-tanstack/server'
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import clsx from 'clsx'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { ReactNode } from 'react'
import * as z from 'zod'
import { zhCN } from 'zod/locales'

import appTheme from '@/app/theme'
import GlobalLayout from '@/components/layouts/GlobalLayout'
import { auth } from '@/lib/auth'
import { getQueryClient } from '@/lib/query-client'

import { QueryProvider } from './QueryProvider'
import { fontFZYanSong, fontSourceCodePro, fontSwift } from './fonts'

import '@/styles/app.css'

export const dynamic = 'force-dynamic'

z.config(zhCN())

export const metadata: Metadata = {
  title: 'PaperPlane 🌠 Alphabet',
  description: '',
}

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const queryClient = getQueryClient()
  await prefetchSession(auth, queryClient, { headers: await headers() })

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
        <QueryProvider>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <MantineProvider theme={appTheme}>
              <ModalsProvider>
                <GlobalLayout>{children}</GlobalLayout>
              </ModalsProvider>
              <Notifications />
            </MantineProvider>
          </HydrationBoundary>
        </QueryProvider>
      </body>
    </html>
  )
}
