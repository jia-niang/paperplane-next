import 'server-only'

import { router } from '../../lib/trpc'
import { awesome } from './_awesome'
import { short } from './_short'
import { user } from './_user'

export type AppRouter = typeof appRouter

export const appRouter = router({
  user,
  awesome,
  short,
})
