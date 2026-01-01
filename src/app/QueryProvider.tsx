'use client'

import { AuthQueryProvider } from '@daveyplate/better-auth-tanstack'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient } from '@trpc/client'
import { ReactNode, useState } from 'react'

import { getQueryClient } from '@/lib/query-client'
import { replaceEqualDeep } from '@/lib/structural-sharing'

import { trpcClientConfig, TRPCProvider } from '../lib/trpc-client'
import type { AppRouter } from './api/appRouter'

export function QueryProvider(props: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => getQueryClient())
  const [trpcClient] = useState(() => createTRPCClient<AppRouter>(trpcClientConfig))

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <AuthQueryProvider queryOptions={{ structuralSharing: replaceEqualDeep }}>
          {props.children}
        </AuthQueryProvider>
      </TRPCProvider>
    </QueryClientProvider>
  )
}
