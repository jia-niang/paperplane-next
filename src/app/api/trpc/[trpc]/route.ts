import 'server-only'

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { createTRPCContext } from '@/lib/trpc'

import { appRouter } from '../../appRouter'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })

export { handler as GET, handler as POST }
