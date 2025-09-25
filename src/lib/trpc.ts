import 'server-only'

import { initTRPC, TRPCError } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { cache } from 'react'
import superjson from 'superjson'

import { prisma } from '@/lib/prisma'

import { auth } from './auth'

export const createContext = cache(async (opts: FetchCreateContextFnOptions | null) => {
  async function getSession() {
    return opts ? await auth.api.getSession(opts?.req) : null
  }

  return { prisma, getSession }
})
export type TRPCContext = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<TRPCContext>().create({ transformer: superjson })

export const { router, createCallerFactory: trpcCaller, procedure: publicProcedure } = t

export const loginProcedure = t.procedure.use(async ({ ctx, next }) => {
  const session = await ctx.getSession()
  if (!session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({ ctx: { ...ctx, user: session.user, session } })
})
