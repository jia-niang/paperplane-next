import { Group, Stack, Text } from '@mantine/core'
import { IconCircleKey } from '@tabler/icons-react'
import { CSSProperties, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface NeedLoginTipsProps {
  title?: ReactNode
  description?: ReactNode
  icon?: ReactNode

  className?: string
  style?: CSSProperties
}

export default function NeedLoginTips(props: NeedLoginTipsProps) {
  const { title, description, icon, className, style } = props

  return (
    <Group
      className={twMerge('cursor-default flex-nowrap rounded-md bg-yellow-200', className)}
      px={16}
      py={12}
      gap={12}
      style={style}
    >
      {icon || (
        <IconCircleKey size={36} stroke={1} color="#333" className="raw shrink-0 self-start pt-2" />
      )}

      <Stack gap={2}>
        <Text className="text-md text-[#333]">{title || '登录后解锁'}</Text>
        <Text className="text-sm text-[#666]">
          {description || '此功能需登录账号，点击右上角头像以登录'}
        </Text>
      </Stack>
    </Group>
  )
}
