'use client'

import { Button, ButtonProps } from '@mantine/core'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { authClient } from '@/lib/auth-client'

export interface LoginButtonProps extends ButtonProps {
  loginSuccess?(): void | Promise<void>
}

export default function LoginButton(props: LoginButtonProps) {
  const { loginSuccess, ...restProps } = props
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)

  return (
    <Button
      {...restProps}
      loading={loading}
      onClick={() => {
        setLoading(true)
        authClient.signIn
          .oauth2({ providerId: 'gitea', callbackURL: pathname })
          .then(async () => {
            if (loginSuccess) {
              await loginSuccess()
              setLoading(false)
            }
          })
          .catch(() => {
            setLoading(false)
          })
      }}
    />
  )
}
