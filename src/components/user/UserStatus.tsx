'use client'

import {
  Avatar,
  Button,
  Flex,
  Group,
  HoverCard,
  HoverCardDropdown,
  HoverCardTarget,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import clsx from 'clsx'
import { useState } from 'react'

import { authClient, useSession } from '@/lib/auth-client'

import LoginButton from './LoginButton'

export default function UserStatus(props: { className?: string }) {
  const { user, isPending, refetch } = useSession()

  const [logoutLoading, setLogoutLoading] = useState(false)

  const logoutHandler = () => {
    setLogoutLoading(true)
    authClient
      .signOut()
      .then(() => void refetch())
      .catch(() => void setLogoutLoading(false))
  }

  return (
    <HoverCard>
      <HoverCardTarget>
        <Flex className={clsx('cursor-pointer self-start', props.className)} align="center" gap={8}>
          {!isPending ? (
            <>
              <Text size="sm" ff="sans-serif">
                {user?.name || user?.email || '未登录'}
              </Text>
              <Avatar
                src={user?.image || null}
                alt="user avater"
                color="lb"
                radius="sm"
                size="sm"
              />
            </>
          ) : (
            <Group gap={8}>
              <Skeleton width={120} height={30} />
              <Skeleton width={30} height={30} />
            </Group>
          )}
        </Flex>
      </HoverCardTarget>

      <HoverCardDropdown>
        <Stack gap={8}>
          <Text size="sm" ff="sans-serif" c="gray.6">
            可用操作:
          </Text>

          {user ? (
            <>
              <Button loading={logoutLoading} variant="light" onClick={logoutHandler}>
                退出登录
              </Button>
            </>
          ) : (
            <Stack>
              <Text ff="sans-serif" size="sm" c="gray.7">
                通过 PaperPlane Gitea 账户登录。
              </Text>
              <LoginButton variant="light">Gitea 授权登录</LoginButton>
            </Stack>
          )}
        </Stack>
      </HoverCardDropdown>
    </HoverCard>
  )
}
