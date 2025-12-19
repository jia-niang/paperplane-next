'use client'

import { SegmentedControl, Stack, Text } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const nav = [
  { value: '/a', label: '导航', title: 'Alphabet · 导航索引' },
  { value: '/open', label: '开源', title: 'Open · 开源' },
  { value: '/demos', label: 'Demos', title: 'Demos' },
  { value: '/awesome', label: 'Awesome', title: 'Awesome · 发现' },
  { value: '/registry', label: '制品库', title: 'Registry · 制品库' },
  { value: '/res', label: '资源库', title: 'Resource · 资源库', disabled: true },
  { value: '/tool', label: '工具库', title: 'Tool · 工具库', disabled: true },
]

export default function HeaderSectionSelector(props: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const section = useMemo(
    () => nav.find(item => item.value === pathname.match(`^(/[^/]+)`)?.[1]) || nav[0],
    [pathname]
  )

  useEffect(() => void nav.forEach(item => void router.prefetch(item.value)), [router])

  return (
    <Stack className={clsx(props.className)} gap={8} align="start">
      <SegmentedControl
        color="lb"
        size="sm"
        radius="xl"
        value={section.value}
        onChange={router.push}
        withItemsBorders={false}
        className="font-serif"
        classNames={{
          label: 'px-4',
          indicator: 'bg-gradient-to-r from-ma to-lb',
        }}
        data={nav}
      />

      <Link href={section.value}>
        <Text
          className="font-serif"
          gradient={{ from: 'ma', to: 'lb' }}
          size="xl"
          component="span"
          variant="gradient"
        >
          PaperPlane / {section.title}
        </Text>
      </Link>
    </Stack>
  )
}
