import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Divider, Group, Stack, Text } from '@mantine/core'
import { AwesomeCatelog } from '@prisma/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { CSSProperties, useId, useMemo, useState } from 'react'

import { AwesomeItemResult } from '@/app/api/awesome'
import { useTRPC } from '@/lib/trpc-client'

import { useAwesome } from '../state'
import ListItem, { DraggableListItem } from './ListItem'
import ListItemEditButton from './ListItemEditButton'

interface CatelogInput extends AwesomeCatelog {
  parent?: CatelogInput
  underAwesomes: AwesomeItemResult[]
}

export interface ListItemGroupProps {
  catelog: CatelogInput
  edit?: boolean
  className?: string
  style?: CSSProperties
}

export default function ListItemGroup(props: ListItemGroupProps) {
  const { catelog, edit, className, style } = props

  const { search } = useAwesome()
  const list = useMemo(
    () =>
      catelog.underAwesomes.filter(
        item =>
          item.label.includes(search) ||
          item.desc?.includes(search) ||
          item.homepage.includes(search)
      ),
    [catelog.underAwesomes, search]
  )

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const resort = useMutation(trpc.awesome.items.resort.mutationOptions())

  const dndContextId = useId()
  const [dragging, setDragging] = useState<AwesomeItemResult | null>(null)
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const newArray = arrayMove(
        list,
        list.findIndex(item => item.id === active.id),
        list.findIndex(item => item.id === over?.id)
      )
      queryClient.setQueryData(trpc.awesome.items.tree.queryKey(), tree => {
        const group = tree!.find(item => item.id === (catelog?.id || null))!
        group.underAwesomes = newArray as any

        return tree
      })
      resort.mutateAsync(
        newArray.map((item, index) => ({ id: item.id, index })),
        {
          async onSuccess() {
            await queryClient.invalidateQueries(trpc.awesome.items.pathFilter())
          },
        }
      )
    }
    setDragging(null)
  }

  if (!edit && list.length <= 0) {
    return null
  }

  return (
    <Stack className={clsx(className)} pos="relative" style={style} pr={24} gap={4} pb={12}>
      <Group className="z-10 rounded-md bg-white" pos="sticky" top={0} py={4} left={0} gap={6}>
        {catelog.parent ? (
          <Text c="gray.4" size="sm">
            {catelog.parent.name} /
          </Text>
        ) : null}

        <Text c="gray.6" size="sm">
          {catelog.name}
        </Text>

        <Divider className="grow" />

        {edit ? (
          <ListItemEditButton ml="auto" variant="light" size="compact-xs" catelog={catelog}>
            添加 Awesome
          </ListItemEditButton>
        ) : null}
      </Group>

      <Stack gap={4}>
        <DndContext
          id={dndContextId}
          onDragStart={e => void setDragging(list.find(item => item.id === e.active.id)!)}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={list.map(item => item.id)} strategy={verticalListSortingStrategy}>
            {list.map(item => (
              <DraggableListItem key={item.id} awesome={item} catelog={catelog} edit={edit} />
            ))}
          </SortableContext>
          <DragOverlay>
            {dragging ? <ListItem awesome={dragging} catelog={catelog} edit={edit} /> : null}
          </DragOverlay>
        </DndContext>
      </Stack>
    </Stack>
  )
}
