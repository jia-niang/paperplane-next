import { Group, Image, Text, Tooltip } from '@mantine/core'
import { IconCode, IconPackage } from '@tabler/icons-react'
import NextImage from 'next/image'
import { ReactNode, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import { AwesomeItemResult } from '@/app/api/_awesome/items'

export interface BadgeProps {
  awesome: AwesomeItemResult
  className?: string
}

export default function BadgeSites(props: BadgeProps) {
  const { awesome, className } = props

  const sitesItems = useMemo(() => {
    const result: ReactNode[] = []

    if (awesome.source) {
      if (awesome.source.startsWith('https://github.com')) {
        result.push(
          <Tooltip label={`GitHub`} key="source">
            <a href={awesome.source} target="_blank">
              <Image
                src={require('@/assets/alphabet-icons/github.svg').default}
                alt="GitHub"
                component={NextImage}
                className="h-[0.8em] w-[0.8em]"
                fit="contain"
              />
            </a>
          </Tooltip>
        )
      } else {
        result.push(
          <Tooltip label={`源代码`} key="source">
            <a key="source" href={awesome.source} target="_blank">
              <IconCode className="h-[0.8em] w-[0.8em]" />
            </a>
          </Tooltip>
        )
      }
    }

    if (awesome.registry) {
      if (awesome.registry.startsWith('https://www.npmjs.com')) {
        result.push(
          <Tooltip label={`npm`} key="registry">
            <a href={awesome.registry} target="_blank">
              <Image
                src={require('@/assets/alphabet-icons/npm-flat.svg').default}
                alt="npm"
                component={NextImage}
                className="h-[0.8em] w-[0.8em] text-gray-700"
                fit="contain"
              />
            </a>
          </Tooltip>
        )
      } else if (awesome.registry.startsWith('https://hub.docker.com')) {
        result.push(
          <Tooltip label={`Docker Hub`} key="registry">
            <a href={awesome.registry} target="_blank">
              <Image
                src={require('@/assets/alphabet-icons/docker.svg').default}
                alt="Docker Hub"
                component={NextImage}
                className="h-[0.8em] w-[0.8em]"
                fit="contain"
              />
            </a>
          </Tooltip>
        )
      } else {
        result.push(
          <Tooltip label={`软件包`} key="registry">
            <a href={awesome.registry} target="_blank">
              <IconPackage className="h-[0.8em] w-[0.8em] text-gray-700" />
            </a>
          </Tooltip>
        )
      }
    }

    if (result.length <= 0) {
      return null
    }

    return (
      <>
        <Text c="gray.5" className="shrink-0 cursor-default text-[20px] leading-[1.3] select-none">
          ·
        </Text>
        <Group className={twMerge('shrink-0', className)} gap={8}>
          {result}
        </Group>
      </>
    )
  }, [awesome.registry, awesome.source, className])

  return sitesItems
}
