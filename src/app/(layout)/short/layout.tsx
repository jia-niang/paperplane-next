import { prefetchSession } from '@daveyplate/better-auth-tanstack/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { PropsWithChildren } from 'react'

import { auth } from '@/lib/auth'
import { getQueryClient } from '@/lib/query-client'
import { trpcServer } from '@/lib/trpc-server'

export default async function ShortLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()

  await prefetchSession(auth, queryClient, { headers: await headers() })

  await Promise.all([queryClient.prefetchQuery(trpcServer.short.items.list.queryOptions())])

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
