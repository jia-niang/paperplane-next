import { ScrollArea, Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'

import { useTRPC } from '@/lib/trpc-client'

import { awesomeScrollIntoViewEmitter } from '../AwesomeState'
import ListItemGroup from './ListItemGroup'

export default function List(props: { scrollHeight: string | number; className?: string }) {
  const trpc = useTRPC()

  const { data: list } = useQuery({
    ...trpc.awesome.items.tree.queryOptions(),
    initialData: [],
  })

  const viewportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    awesomeScrollIntoViewEmitter.on('selectId', selectId => {
      viewportRef.current
        ?.querySelector(`.awesome__catelog-group__id-${selectId}`)
        ?.scrollIntoView({ behavior: 'smooth' })
    })

    return () => void awesomeScrollIntoViewEmitter.off('selectId')
  }, [])

  return (
    <ScrollArea h={props.scrollHeight} viewportRef={viewportRef} offsetScrollbars="y">
      <Stack pos="relative" gap={0}>
        {list.map(item => (
          <ListItemGroup key={item.id} catelog={item} />
        ))}
      </Stack>
    </ScrollArea>
  )
}
