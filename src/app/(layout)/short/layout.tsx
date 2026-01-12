import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/lib/query-client'
import { trpcServer } from '@/lib/trpc-server'

export default async function ShortLayout({ children }: LayoutProps<'/short'>) {
  const queryClient = getQueryClient()

  await Promise.all([queryClient.prefetchQuery(trpcServer.short.items.list.queryOptions())])

  return <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
}
