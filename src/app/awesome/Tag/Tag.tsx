'use client'

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Flex, ScrollArea } from '@mantine/core'
import { AwesomeTag } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useId, useState } from 'react'

import { useTRPC } from '@/lib/trpc-client'

import { useAwesome } from '../state'
import TagItem, { DraggableTagItem } from './TagItem'

export default function Tag(props: { scrollHeight: string | number; className?: string }) {
  const queryClient = useQueryClient()
  const trpc = useTRPC()
  const { edit, tags: selected, selectTag, cancelTag } = useAwesome()

  const { data: tags } = useQuery({
    ...trpc.awesome.tags.list.queryOptions(),
    initialData: [],
  })
  const resort = useMutation(trpc.awesome.tags.resort.mutationOptions())

  const [dragging, setDragging] = useState<AwesomeTag | null>(null)
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const newArray = arrayMove(
        tags,
        tags.findIndex(item => item.id === active.id),
        tags.findIndex(item => item.id === over?.id)
      )
      queryClient.setQueryData(trpc.awesome.tags.list.queryKey(), newArray)
      resort.mutateAsync(
        newArray.map((item, index) => ({ id: item.id, index })),
        {
          async onSuccess() {
            await queryClient.invalidateQueries(trpc.awesome.tags.pathFilter())
          },
        }
      )
    }
    setDragging(null)
  }

  return (
    <ScrollArea h={props.scrollHeight} offsetScrollbars="y">
      <Flex gap={12} className={clsx('grow-0 flex-wrap justify-start', props.className)}>
        <DndContext
          id={useId()}
          onDragStart={e => void setDragging(tags.find(item => item.id === e.active.id)!)}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext items={tags.map(item => item.id)} strategy={verticalListSortingStrategy}>
            {tags.map(item => (
              <DraggableTagItem
                key={item.id}
                checked={selected.includes(item.id)}
                onCheckedChange={checked => {
                  if (checked) {
                    selectTag(item.id)
                  } else {
                    cancelTag(item.id)
                  }
                }}
                tag={item}
                edit={edit}
              />
            ))}
          </SortableContext>
          <DragOverlay>{dragging ? <TagItem tag={dragging} edit={edit} /> : null}</DragOverlay>
        </DndContext>
      </Flex>
    </ScrollArea>
  )
}
