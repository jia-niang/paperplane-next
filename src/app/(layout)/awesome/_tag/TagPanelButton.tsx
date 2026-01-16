'use client'

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Button, ButtonProps, Drawer, ElementProps, Group, ScrollArea } from '@mantine/core'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useId, useState } from 'react'

import { useTRPC } from '@/lib/trpc-client'
import { AwesomeTag } from '@/prisma/client'

import TagEditButton from './TagEditButton'
import TagItem, { DraggableTagItem } from './TagItem'

export interface TagPanelButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {}

export default function TagPanelButton(props: TagPanelButtonProps) {
  const { onClick, children, ...buttonRest } = props

  const queryClient = useQueryClient()
  const trpc = useTRPC()

  const [opened, setOpened] = useState(false)

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
    <>
      <Button
        onClick={e => {
          onClick?.(e)
          setOpened(true)
        }}
        {...buttonRest}
      >
        {children}
      </Button>

      <Drawer
        opened={opened}
        onClose={() => void setOpened(false)}
        title="Awesome 标签管理"
        position="right"
      >
        <Group className="mb-6">
          <TagEditButton size="compact" variant="light">
            新增标签
          </TagEditButton>
        </Group>

        <ScrollArea h={`calc(100vh - ${160}px)`} offsetScrollbars="y">
          <DndContext
            id={useId()}
            onDragStart={e => void setDragging(tags.find(item => item.id === e.active.id)!)}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={tags.map(item => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {tags.map(item => (
                <DraggableTagItem className="my-2 basis-0" key={item.id} tag={item} edit />
              ))}
            </SortableContext>
            <DragOverlay>
              {dragging ? <TagItem className="my-2 basis-0" tag={dragging} edit /> : null}
            </DragOverlay>
          </DndContext>
        </ScrollArea>
      </Drawer>
    </>
  )
}
