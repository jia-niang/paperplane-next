import { createAuthHooks } from '@daveyplate/better-auth-tanstack'
import { genericOAuthClient } from 'better-auth/client/plugins'
import { createAuthClient } from 'better-auth/react'
import { omit } from 'lodash-es'

import { User } from '@/prisma/client'

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  basePath: '/api/auth',
  plugins: [genericOAuthClient()],
})

export const {
  useSession,
  usePrefetchSession,
  useToken,
  useListAccounts,
  useListSessions,
  useListDeviceSessions,
  useListPasskeys,
  useUpdateUser,
  useUnlinkAccount,
  useRevokeOtherSessions,
  useRevokeSession,
  useRevokeSessions,
  useSetActiveSession,
  useRevokeDeviceSession,
  useDeletePasskey,
  useAuthQuery,
  useAuthMutation,
} = createAuthHooks(authClient)

export function useLoginUser() {
  return omit(
    useSession({
      select: session => session?.user || null,
    }),
    ['user', 'session']
  ) as ReturnType<typeof useSession> & { data?: User | null }
}
