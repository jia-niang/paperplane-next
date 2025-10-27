'use client'

import { Flex, Group, Stack, Text } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { BlurPopupCard } from '@/components/cards/BlurPopupCard'
import GradientTitle from '@/components/labels/GradientTitle'
import {
  DockerHubLink,
  DroneLink,
  GiteaLink,
  GitHubLink,
  NpmLink,
} from '@/components/tags/TechLink'

export type OpenItemType = 'npm' | 'docker'

export interface OpenItemProps {
  name: string
  repo: string
  giteaRepo?: string
  type: OpenItemType
  subpath: string
  desc?: ReactNode
  overrideNameInLink?: string
  renderShield?: ReactNode
}

export default function OpenItem(props: OpenItemProps) {
  const { name, type, subpath, desc, repo, giteaRepo, overrideNameInLink, renderShield } = props

  const pathname = usePathname()
  const current = pathname.match(/^\/open(\/[^/]+)\/?/)?.[1] === subpath

  const nameInLink = overrideNameInLink || name

  const popup = (
    <Stack mt={12} gap={12}>
      <Group gap={16} ff="sans-serif" lh={1.2} className="text-sm">
        {type === 'docker' ? <DockerHubLink repo={nameInLink} /> : <NpmLink repo={nameInLink} />}
        <GitHubLink repo={repo} />
        <GiteaLink repo={giteaRepo || repo} />
        <DroneLink repo={giteaRepo || repo} />
      </Group>

      {desc ? (
        <Text ff="sans-serif" c="gray.6" size="sm">
          {desc}
        </Text>
      ) : null}
    </Stack>
  )

  return (
    <BlurPopupCard
      className={clsx('rounded-md', current ? `from-lb-100 bg-gradient-to-r to-transparent` : '')}
      popupClassName={clsx(
        current ? `from-lb-200 bg-gradient-to-br via-transparent to-transparent` : ''
      )}
      px={8}
      py={8}
      popupPx={12}
      popupPy={12}
      popupChildren={popup}
    >
      <Link href={`/open${subpath}`}>
        <Flex>
          <span className="inline-block min-w-[90px] leading-1">
            <span className="from-ma-100 to-grape-100 relative inline-block h-[26px] w-[80px] rounded-sm bg-gradient-to-r text-center">
              {renderShield !== undefined ? (
                renderShield
              ) : (
                <img
                  src={
                    type === 'npm'
                      ? `https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/npm/v/${nameInLink}?style=flat-square&logo=npm&label=%20&color=rgba(255,255,255,0)&logoColor=CB0000`
                      : `https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/docker/v/${nameInLink}?style=flat-square&logo=docker&label=%20&color=rgba(255,255,255,0)&sort=semver`
                  }
                  className="h-[26px]"
                  alt={type === 'npm' ? `package version on npm` : `image version on docker hub`}
                />
              )}
            </span>
          </span>
          <GradientTitle
            size="md"
            className="cursor-pointer"
            lh={1.2}
            gradient={{ from: 'grape', to: 'lb' }}
          >
            {name}
          </GradientTitle>
        </Flex>
      </Link>
    </BlurPopupCard>
  )
}
