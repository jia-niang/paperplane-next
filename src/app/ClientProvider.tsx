'use client'

import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack'
import { MantineProvider } from '@mantine/core'
import { DatesProvider } from '@mantine/dates'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient } from '@trpc/client'
import { PropsWithChildren, useState } from 'react'

import appTheme from '@/app/theme'
import '@/lib/dayjs'
import { getQueryClient } from '@/lib/query-client'
import { replaceEqualDeep } from '@/lib/structural-sharing'

import { trpcClientConfig, TRPCProvider } from '../lib/trpc-client'
import type { AppRouter } from './api/appRouter'

export default function QueryProvider(props: PropsWithChildren) {
  const [queryClient] = useState(() => getQueryClient())
  const [trpcClient] = useState(() => createTRPCClient<AppRouter>(trpcClientConfig))

  return (
    <MantineProvider theme={appTheme}>
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
            <AuthQueryProvider queryOptions={{ structuralSharing: replaceEqualDeep }}>
              <DatesProvider settings={{ locale: 'zh-cn' }}>{props.children}</DatesProvider>
            </AuthQueryProvider>
          </TRPCProvider>
        </QueryClientProvider>
      </ModalsProvider>
      <Notifications />
    </MantineProvider>
  )
}
