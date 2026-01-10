'use client'

import { Pagination, ScrollArea, Stack, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import GradientTitle from '@/components/labels/GradientTitle'
import Loading from '@/components/layouts/Loading'
import { useTRPC } from '@/lib/trpc-client'

import ShortListItem from './ShortListItem'

export default function ShortList() {
  const trpc = useTRPC()

  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [debouncedKeyword] = useDebouncedValue(keyword, 380)

  useEffect(() => void setPage(1), [debouncedKeyword])

  const { data: result, isPending } = useQuery(
    trpc.short.items.list.queryOptions({ keyword: debouncedKeyword, page, pageSize: 10 })
  )

  const renderOK = !isPending && !!result

  return (
    <Stack gap={16}>
      <Stack gap={16} mx={8}>
        <GradientTitle>短链接列表</GradientTitle>

        <TextInput
          label="搜索"
          placeholder="按短链接码、目标 URL 以及标签进行搜索"
          value={keyword}
          onChange={e => void setKeyword(e.currentTarget.value)}
        />

        {renderOK ? (
          <Pagination
            value={result.page}
            total={Math.max(1, result.totalPage)}
            onChange={newPage => void setPage(newPage)}
          />
        ) : (
          <Loading h={[12, 12]} />
        )}
      </Stack>

      <ScrollArea h="calc(100vh - 360px)" offsetScrollbars="y">
        {renderOK ? (
          <Stack pos="relative" gap={8} m={8}>
            {result.list.map(item => (
              <ShortListItem short={item} key={item.key} />
            ))}
          </Stack>
        ) : (
          <Loading />
        )}
      </ScrollArea>
    </Stack>
  )
}
