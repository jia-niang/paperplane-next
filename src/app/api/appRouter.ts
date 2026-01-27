import 'server-only'

import { router } from '../../lib/trpc'
import { awesome } from './trpc/_awesome'
import { short } from './trpc/_short'
import { user } from './trpc/_user'

export type AppRouter = typeof appRouter

export const appRouter = router({
  user,
  awesome,
  short,
})
