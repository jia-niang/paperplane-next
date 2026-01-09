import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import { getQueryClient } from '@/lib/query-client'
import { trpcServer } from '@/lib/trpc-server'

export default async function ShortInfoLayout(props: LayoutProps<'/short/[key]'>) {
  const { key } = await props.params
  const queryClient = getQueryClient()

  await queryClient.prefetchQuery(trpcServer.short.items.get.queryOptions({ key }))

  return <HydrationBoundary state={dehydrate(queryClient)}>{props.children}</HydrationBoundary>
}
