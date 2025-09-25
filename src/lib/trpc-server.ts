import 'server-only'

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'

import { getQueryClient } from '@/lib/query-client'

import { appRouter } from '../app/api/appRouter'
import { createContext } from './trpc'

export const trpcServer = createTRPCOptionsProxy({
  ctx: await createContext(null),
  router: appRouter,
  queryClient: getQueryClient,
})
