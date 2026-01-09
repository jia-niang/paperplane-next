import { Group, Stack, Text } from '@mantine/core'
import { IconCircleKey } from '@tabler/icons-react'
import clsx from 'clsx'
import { CSSProperties, ReactNode } from 'react'

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
      className={clsx(className, 'cursor-default flex-nowrap rounded-md bg-yellow-200')}
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
