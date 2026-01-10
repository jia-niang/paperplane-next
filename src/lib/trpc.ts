import 'server-only'

import { initTRPC, TRPCError } from '@trpc/server'
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'
import { cache } from 'react'
import superjson from 'superjson'
import { OpenApiMeta } from 'trpc-to-openapi'

import { auth } from './auth'

export const createTRPCContext = cache(
  async (opts: Partial<FetchCreateContextFnOptions> | null) => ({
    async getSession() {
      return opts?.req ? await auth.api.getSession(opts.req) : null
    },

    async getHeaders() {
      return opts?.req?.headers
    },
  })
)
export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>

const t = initTRPC.meta<OpenApiMeta>().context<TRPCContext>().create({ transformer: superjson })

export const { router, createCallerFactory, procedure: baseProcedure } = t

export const publicProcedure = baseProcedure

export const loginProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await ctx.getSession()
  if (!session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({ ctx: { ...ctx, user: session.user, session } })
})
