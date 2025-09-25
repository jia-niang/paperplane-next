'use client'

import {
  createTRPCProxyClient,
  httpBatchLink,
  httpLink,
  isNonJsonSerializable,
  splitLink,
} from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import superjson from 'superjson'

import type { AppRouter } from '../app/api/appRouter'

function getUrl() {
  return typeof window === 'undefined'
    ? `/api/trpc`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/api/trpc`
}

export const trpcClientConfig: Parameters<typeof createTRPCProxyClient>[0] = {
  links: [
    splitLink({
      condition: op => isNonJsonSerializable(op.input),
      true: httpLink({
        url: getUrl(),
        transformer: { serialize: data => data, deserialize: superjson.deserialize },
      }),
      false: httpBatchLink({
        transformer: superjson,
        url: getUrl(),
      }),
    }),
  ],
}

export const { TRPCProvider, useTRPC, useTRPCClient } = createTRPCContext<AppRouter>()
