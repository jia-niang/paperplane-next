'use client'

import { DndContext, DragEndEvent, DragOverlay } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Group, Stack, Text } from '@mantine/core'
import { useMounted } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { IconGripVertical, IconPointFilled, IconSquareRotatedFilled } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { CSSProperties, useId, useState } from 'react'
import { createPortal } from 'react-dom'

import { AwesomeCatelogNode } from '@/app/api/_awesome/catelogs'
import ConfirmButton from '@/components/buttons/ConfirmButton'
import { DraggableWrapperProps } from '@/components/layouts/Draggable'
import { useTRPC } from '@/lib/trpc-client'

import { awesomeScrollIntoViewEmitter, useAwesome } from '../AwesomeState'
import CatelogEditButton from './CatelogEditButton'

export interface CatelogItemProps {
  catelog: AwesomeCatelogNode
  parent?: AwesomeCatelogNode
  className?: string
  style?: CSSProperties
}

export default function CatelogItem(props: CatelogItemProps & DraggableWrapperProps) {
  const { catelog, parent, className, style, attributes, listeners, ref } = props
  const { children } = catelog

  const edit = useAwesome(s => s.edit)
  const expand = useAwesome(s => s.catelogExpand)

  const mounted = useMounted()

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const deleteCatelog = useMutation(trpc.awesome.catelogs.delete.mutationOptions())
  const resort = useMutation(trpc.awesome.catelogs.resort.mutationOptions())

  const deleteHandler = () => {
    deleteCatelog.mutateAsync(catelog, {
      async onSuccess() {
        notifications.show({
          color: 'green',
          title: `操作成功`,
          message: `已删除类别 “${catelog.name}”`,
        })
        await Promise.all([
          queryClient.invalidateQueries(trpc.awesome.catelogs.pathFilter()),
          queryClient.invalidateQueries(trpc.awesome.items.pathFilter()),
        ])
      },
    })
  }

  const dndContextId = useId()
  const [dragging, setDragging] = useState<AwesomeCatelogNode | null>(null)

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      const newArray = arrayMove(
        children,
        children.findIndex(item => item.id === active.id),
        children.findIndex(item => item.id === over?.id)
      )
      queryClient.setQueryData(trpc.awesome.catelogs.tree.queryKey(), tree => {
        const node = tree?.find(item => item === catelog)
        node!.children = newArray

        return tree
      })
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

  const isChild = catelog.parentId
  const isExpand = edit || expand

  return (
    <Stack
      className={clsx('rounded-md bg-white/60 backdrop-blur-lg', className)}
      px={2}
      py={4}
      gap={0}
      ref={ref}
      style={style}
      {...attributes}
    >
      <Group gap={4}>
        {edit === 'sort' ? (
          <IconGripVertical size="1em" className="raw cursor-move text-gray-400" {...listeners} />
        ) : parent ? (
          <IconPointFilled size="0.5em" className="raw ml-1 cursor-default text-gray-300" />
        ) : (
          <IconSquareRotatedFilled size="0.5em" className="raw mr-1 cursor-default text-gray-400" />
        )}

        <Text
          style={{ fontSize: isChild ? '14px' : '16px' }}
          c={isChild ? 'gray.6' : 'gray.7'}
          lh={isChild ? 1.2 : 1.4}
          className="cursor-pointer underline-offset-2 hover:underline"
          onClick={() => awesomeScrollIntoViewEmitter.emit('selectId', catelog.id)}
        >
          {catelog.name}
        </Text>
      </Group>

      {edit === 'edit' ? (
        <Group mt={4} gap={8} pl={24}>
          {!isChild ? (
            <CatelogEditButton size="compact-xs" parent={catelog} variant="light">
              子类别
            </CatelogEditButton>
          ) : null}

          <CatelogEditButton size="compact-xs" parent={parent} catelog={catelog} variant="light">
            编辑
          </CatelogEditButton>

          <ConfirmButton
            confirm={`确认要删除类别 “${catelog.name}” 吗？\nAwesome 不会删除。${catelog.children.length > 0 ? `\n\n注意，${catelog.children.length} 个子类别将一同被删除！` : ''}`}
            confirmButtonText="确认删除"
            confirmButtonProps={{ color: 'red' }}
            onConfirm={() => void deleteHandler()}
            size="compact-xs"
            variant="light"
            color="red"
          >
            删除
          </ConfirmButton>
        </Group>
      ) : null}

      {children.length > 0 && isExpand ? (
        <Stack mt={4} gap={2} ml={12}>
          <DndContext
            id={dndContextId}
            onDragStart={e => void setDragging(children.find(item => item.id === e.active.id)!)}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToParentElement]}
          >
            <SortableContext
              items={children.map(item => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {catelog.children.map(item => (
                <DraggableCatelogItem key={item.id} parent={catelog} catelog={item} />
              ))}
            </SortableContext>

            {mounted
              ? createPortal(
                  <DragOverlay>
                    {dragging ? <CatelogItem parent={catelog} catelog={dragging} /> : null}
                  </DragOverlay>,
                  document.body
                )
              : null}
          </DndContext>
        </Stack>
      ) : null}
    </Stack>
  )
}

export function DraggableCatelogItem(props: CatelogItemProps) {
  const sortableProps = useSortable({ id: props.catelog.id })
  const { transform, transition, isDragging, setNodeRef } = sortableProps

  return (
    <CatelogItem
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        visibility: isDragging ? 'hidden' : undefined,
      }}
      ref={setNodeRef}
      {...props}
      {...sortableProps}
    />
  )
}
