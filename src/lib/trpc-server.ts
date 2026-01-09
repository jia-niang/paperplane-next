import 'server-only'

import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'

import { getQueryClient } from '@/lib/query-client'

import { appRouter } from '../app/api/appRouter'
import { createCallerFactory, createTRPCContext } from './trpc'

export const trpcServer = createTRPCOptionsProxy({
  ctx: await createTRPCContext(null),
  router: appRouter,
  queryClient: getQueryClient,
})

export const createTRPCCaller = createCallerFactory(appRouter)
