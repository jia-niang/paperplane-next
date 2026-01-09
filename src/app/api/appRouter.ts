import 'server-only'

import { router } from '../../lib/trpc'
import { awesome } from './awesome'
import { short } from './short'

export type AppRouter = typeof appRouter

export const appRouter = router({
  awesome,
  short,
})
