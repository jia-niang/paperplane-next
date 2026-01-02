import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ReactNode } from 'react'

import { getQueryClient } from '@/lib/query-client'
import { trpcServer } from '@/lib/trpc-server'

export default async function AwesomeLayout({ children }: { children?: ReactNode }) {
  const queryClient = getQueryClient()

  await Promise.all([
    queryClient.prefetchQuery(trpcServer.awesome.items.tree.queryOptions()),
    queryClient.prefetchQuery(trpcServer.awesome.catelogs.tree.queryOptions()),
    queryClient.prefetchQuery(trpcServer.awesome.catelogs.list.queryOptions()),
    queryClient.prefetchQuery(trpcServer.awesome.tags.list.queryOptions()),
  ])

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
