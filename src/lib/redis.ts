import 'server-only'

import { Redis } from 'ioredis'

export const redis = (globalThis.redis as Redis) || new Redis(process.env.REDIS_URL!)

if (process.env.NODE_ENV !== 'production') {
  globalThis.redis = redis
}
