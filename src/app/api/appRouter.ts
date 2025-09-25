import 'server-only'

import { router } from '../../lib/trpc'
import { awesome } from './awesome'

export type AppRouter = typeof appRouter

export const appRouter = router({
  awesome,
})
