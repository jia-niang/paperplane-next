import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Group, Text, Tooltip } from '@mantine/core'
import { IconGripVertical, IconMichelinStar, IconPointFilled } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { CSSProperties } from 'react'

import { AwesomeItemResult } from '@/app/api/awesome/items'
import ConfirmButton from '@/components/buttons/ConfirmButton'
import { DraggableWrapperProps } from '@/components/layouts/Draggable'
import { useTRPC } from '@/lib/trpc-client'
import { AwesomeCatelog } from '@/prisma/client'

import BadgeSites from './BadgeSites'
import BadgeTags from './BadgeTags'
import ListItemEditButton from './ListItemEditButton'

export interface ListItemsProps {
  awesome: AwesomeItemResult
  catelog: AwesomeCatelog
  edit?: boolean
  className?: string
  style?: CSSProperties
}

export default function ListItem(props: ListItemsProps & DraggableWrapperProps) {
  const { awesome, catelog, edit, className, style, attributes, listeners, ref } = props
  const displayUrl = awesome.homepage
    ?.replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')

  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const deleteAwesomeItem = useMutation(trpc.awesome.items.delete.mutationOptions())

  const deleteHandler = () => {
    deleteAwesomeItem.mutateAsync(awesome, {
      async onSuccess() {
        await queryClient.invalidateQueries(trpc.awesome.items.pathFilter())
      },
    })
  }

  const stars = awesome.stars || 0
  const starMarkTooltip =
    stars >= 5
      ? `5星 · 不可错过 & 强烈推荐！`
      : stars >= 4
        ? `4星 · 推荐尝试！`
        : stars >= 1
          ? `${stars}星`
          : '未分级'

  return (
    <Group
      className={clsx(
        'flex-nowrap rounded-md bg-white/60 backdrop-blur-lg hover:bg-gray-100',
        className
      )}
      gap={8}
      px={8}
      py={2}
      style={style}
      ref={ref}
      {...attributes}
    >
      {edit ? (
        <IconGripVertical
          size="1em"
          className="raw shrink-0 cursor-move text-gray-500"
          {...listeners}
        />
      ) : null}

      <Tooltip label={starMarkTooltip}>
        {stars >= 5 ? (
          <IconMichelinStar size="0.7em" className="raw text-ma cursor-pointer" />
        ) : stars >= 4 ? (
          <IconMichelinStar size="0.7em" className="raw cursor-pointer text-gray-500" />
        ) : (
          <IconPointFilled size="0.7em" className="raw cursor-pointer text-gray-500" />
        )}
      </Tooltip>

      <Tooltip label={awesome.desc} disabled={!awesome.desc}>
        <Text c="gray.9" className="shrink-0 cursor-pointer text-[18px] leading-[1.3]">
          {awesome.label}
        </Text>
      </Tooltip>

      <Text c="gray.5" className="shrink-0 cursor-default text-[18px] leading-[1.3] select-none">
        ·
      </Text>

      <Text
        className="text-lb shrink grow-0 text-[18px] leading-[1.3] hover:underline"
        component="a"
        truncate="end"
        href={awesome.homepage}
        target="_blank"
      >
        {displayUrl}
      </Text>

      <BadgeSites className="shrink-0" awesome={awesome} />

      <Group ml="auto" className="shrink-0" gap={8} pl={24}>
        <BadgeTags className="shrink-0" awesome={awesome} />

        {edit ? (
          <>
            <ListItemEditButton
              catelog={catelog}
              awesome={awesome}
              variant="light"
              size="compact-xs"
            >
              编辑
            </ListItemEditButton>

            <ConfirmButton
              confirm={`确认要删除 “${awesome.label}” 吗？`}
              confirmButtonText="确认删除"
              confirmButtonProps={{ color: 'red' }}
              onConfirm={() => void deleteHandler()}
              size="compact-xs"
              variant="light"
              color="red"
            >
              删除
            </ConfirmButton>
          </>
        ) : null}
      </Group>
    </Group>
  )
}

export function DraggableListItem(props: ListItemsProps) {
  const sortableProps = useSortable({ id: props.awesome.id })
  const { transform, transition, isDragging, setNodeRef } = sortableProps

  return (
    <ListItem
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
