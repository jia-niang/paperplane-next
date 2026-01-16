'use client'

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, verticalListSortingStrategy, SortableContext } from '@dnd-kit/sortable'
import { ScrollArea, Stack } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useId, useState } from 'react'

import { AwesomeCatelogNode } from '@/app/api/_awesome/catelogs'
import { useTRPC } from '@/lib/trpc-client'

import CatelogItem, { DraggableCatelogItem } from './CatelogItem'

export default function Catelog(props: { scrollHeight: string | number; className?: string }) {
  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const { data: catelogs } = useQuery({
    ...trpc.awesome.catelogs.tree.queryOptions(),
    initialData: [],
  })
  const resort = useMutation(trpc.awesome.catelogs.resort.mutationOptions())

  const [dragging, setDragging] = useState<AwesomeCatelogNode | null>(null)
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const newArray = arrayMove(
        catelogs,
        catelogs.findIndex(item => item.id === active.id),
        catelogs.findIndex(item => item.id === over?.id)
      )
      queryClient.setQueryData(trpc.awesome.catelogs.tree.queryKey(), newArray)
      resort.mutateAsync(
        newArray.map((item, index) => ({ id: item.id, index })),
        {
          async onSuccess() {
            await Promise.all([
              queryClient.invalidateQueries(trpc.awesome.catelogs.pathFilter()),
              queryClient.invalidateQueries(trpc.awesome.items.pathFilter()),
            ])
          },
        }
      )
    }
    setDragging(null)
  }

  return (
    <ScrollArea h={props.scrollHeight} offsetScrollbars="y">
      <Stack gap={0} className={clsx(props.className)}>
        <DndContext
          id={useId()}
          onDragStart={e => void setDragging(catelogs.find(item => item.id === e.active.id)!)}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext
            items={catelogs.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            {catelogs.map(item => (
              <DraggableCatelogItem key={item.id} catelog={item} />
            ))}
          </SortableContext>
          <DragOverlay>{dragging ? <CatelogItem catelog={dragging} /> : null}</DragOverlay>
        </DndContext>
      </Stack>
    </ScrollArea>
  )
}
