import 'server-only'

import { fetchRequestHandler } from '@trpc/server/adapters/fetch'

import { createContext } from '@/lib/trpc'

import { appRouter } from '../../appRouter'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext,
  })

export { handler as GET, handler as POST }
