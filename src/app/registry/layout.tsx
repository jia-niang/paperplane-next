'use client'

import { Flex, Group, Image, SegmentedControl, Stack, Text } from '@mantine/core'
import NextImage from 'next/image'
import { redirect, usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo } from 'react'

const vendorOptions = [
  {
    label: (
      <Image
        src={require('@/assets/alphabet-icons/docker.svg').default}
        component={NextImage}
        className="h-6 w-6"
        fit="contain"
        alt="docker"
      />
    ),
    value: 'docker',
  },
  {
    label: (
      <Image
        src={require('@/assets/alphabet-icons/npm.svg').default}
        component={NextImage}
        className="h-6 w-6"
        fit="contain"
        alt="docker"
      />
    ),
    value: 'npm',
  },
]

const registryTypeOptions = [
  { label: '镜像', value: 'mirror' },
  { label: '私有制品库', value: 'registry' },
]

export default function OpenLayout(props: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const vendor = useMemo(() => pathname.match(/\/registry\/([^-]+)-/)?.[1] || 'docker', [pathname])
  const registryType = useMemo(
    () => pathname.match(/\/registry\/[^-]+-([^/]+)/)?.[1] || 'mirror',
    [pathname]
  )

  useEffect(() => {
    router.prefetch('/registry/docker-mirror')
    router.prefetch('/registry/docker-registry')
    router.prefetch('/registry/npm-mirror')
    router.prefetch('/registry/npm-registry')
  }, [router])

  return (
    <Stack gap={24}>
      <Group>
        <Stack gap={4}>
          <Text className="font-serif">类型：</Text>
          <SegmentedControl
            value={vendor}
            onChange={item => void redirect(`/registry/${item}-${registryType}`)}
            data={vendorOptions}
          />
        </Stack>
        <Stack gap={4}>
          <Text className="font-serif">仓库：</Text>
          <SegmentedControl
            value={registryType}
            onChange={item => void redirect(`/registry/${vendor}-${item}`)}
            data={registryTypeOptions}
          />
        </Stack>
      </Group>

      <Flex>{props.children}</Flex>
    </Stack>
  )
}
