'use client'

import { Button, Group, Stack } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use } from 'react'

import Loading from '@/components/layouts/Loading'
import { useTRPC } from '@/lib/trpc-client'

import ShortDetail from '../_short-info/ShortDetail'

export default function ShortInfoPage(props: PageProps<'/short/[key]'>) {
  const { key } = use(props.params)
  const router = useRouter()
  const trpc = useTRPC()

  const { data: short, isPending } = useQuery(trpc.short.items.get.queryOptions({ key }))

  return (
    <Stack>
      <Group>
        <Link href="/short">
          <Button leftSection={<IconChevronLeft className="raw" size={14} />} variant="light">
            返回短链接页面
          </Button>
        </Link>
      </Group>

      {!isPending && short ? (
        <ShortDetail onDelete={() => void router.replace('/short')} short={short} />
      ) : (
        <Loading />
      )}
    </Stack>
  )
}
