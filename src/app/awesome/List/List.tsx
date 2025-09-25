import { ScrollArea, Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { useTRPC } from '@/lib/trpc-client'

import { useAwesome } from '../state'
import ListItemGroup from './ListItemGroup'

export default function List(props: { scrollHeight: string | number; className?: string }) {
  const { edit } = useAwesome()
  const trpc = useTRPC()

  const { data: list } = useQuery({
    ...trpc.awesome.items.tree.queryOptions(),
    initialData: [],
  })

  return (
    <ScrollArea h={props.scrollHeight} offsetScrollbars="y">
      <Stack pos="relative" gap={0}>
        {list.map(item => (
          <ListItemGroup key={item.id} catelog={item} edit={edit} />
        ))}
      </Stack>
    </ScrollArea>
  )
}
