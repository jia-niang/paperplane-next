import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Group, luminance, Text, Tooltip } from '@mantine/core'
import { AwesomeTag } from '@prisma/client'
import { IconCircleCheckFilled, IconGripVertical } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { CSSProperties } from 'react'

import ConfirmButton from '@/components/buttons/ConfirmButton'
import { DraggableWrapperProps } from '@/components/layouts/Draggable'
import { useTRPC } from '@/lib/trpc-client'

import TagEditButton from './TagEditButton'

export interface TagItemProps {
  tag: AwesomeTag
  edit?: boolean
  checked?: boolean
  onCheckedChange?(checked: boolean): void
  className?: string
  style?: CSSProperties
}

export default function TagItem(props: TagItemProps & DraggableWrapperProps) {
  const { tag, edit, checked, onCheckedChange, className, style, attributes, listeners, ref } =
    props
  const { label, desc, icon, color } = tag
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const deleteTag = useMutation(trpc.awesome.tags.delete.mutationOptions())

  const deleteHandler = () => {
    deleteTag.mutateAsync(tag, {
      async onSuccess() {
        await Promise.all([
          queryClient.invalidateQueries(trpc.awesome.tags.pathFilter()),
          queryClient.invalidateQueries(trpc.awesome.items.pathFilter()),
        ])
      },
    })
  }

  const bg = color || '#FFFFFF'
  const lum = luminance(bg)

  return (
    <Group
      className={clsx(
        'relative cursor-pointer flex-nowrap rounded-full border-[1px] border-solid select-none',
        edit ? 'flex' : 'inline-flex',
        className
      )}
      gap={6}
      px={12}
      py={2}
      align="center"
      onClick={() => {
        if (!edit) {
          onCheckedChange?.(!checked)
        }
      }}
      ref={ref}
      style={{
        ...style,
        borderColor: checked ? `#0bae4a` : lum > 0.7 ? `#333` : bg,
        backgroundColor: bg,
      }}
      {...attributes}
    >
      {edit ? (
        <IconGripVertical
          size="1em"
          className="raw shrink-0 cursor-move text-gray-400"
          {...listeners}
        />
      ) : null}

      {icon ? <img className="h-[1em] w-[1em] shrink-0" src={icon} alt="awesome tag icon" /> : null}

      <Tooltip label={desc} disabled={!desc}>
        <Text
          c={lum > 0.6 ? `gray.9` : `white`}
          lh={1.4}
          className="shrink grow-0 text-[16px]"
          truncate="end"
        >
          {label}
        </Text>
      </Tooltip>

      {edit ? (
        <>
          <TagEditButton
            className="shrink-0"
            size="compact-xs"
            tag={tag}
            variant="filled"
            color="yellow"
          >
            编辑
          </TagEditButton>
          <ConfirmButton
            confirm={`确认要删除标签 “${tag.label}” 吗？`}
            confirmButtonText="确认删除"
            confirmButtonProps={{ color: 'red' }}
            onConfirm={() => void deleteHandler()}
            className="shrink-0"
            size="compact-xs"
            variant="filled"
            color="red"
          >
            删除
          </ConfirmButton>
        </>
      ) : null}
    </Group>
  )
}

export function DraggableTagItem(props: TagItemProps) {
  const sortableProps = useSortable({ id: props.tag.id })
  const { transform, transition, isDragging, setNodeRef } = sortableProps

  return (
    <TagItem
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
