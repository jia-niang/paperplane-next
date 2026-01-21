import { Group, Highlight, Stack, Text } from '@mantine/core'
import {
  IconAppWindow,
  IconBallBasketball,
  IconCalendarMonth,
  IconDeviceDesktopCode,
  IconProps,
  IconServer,
  IconStack2Filled,
} from '@tabler/icons-react'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'

import GradientTitle from '@/components/labels/GradientTitle'
import { KVTable, KVTableRow } from '@/components/tables/KVTable'

import WrapperForItem from './WrapperForItem'

export interface DemosItemProps {
  name: string
  subpath: string
  devState?: string
  techType?: 'front' | 'server' | 'full'
  projectType?: 'Demo' | 'Joker'
  tags?: FC | FC[]
  href: string
  hrefHighlight?: string | string[]
}

export default function DemosItem(props: DemosItemProps) {
  const { name, subpath, href, hrefHighlight, devState, techType, projectType, tags } = props

  const tagList = useMemo(() => (Array.isArray(tags) ? tags : tags ? [tags] : []), [tags])

  const popup = useMemo(
    () => (
      <Stack mt={8} gap={8}>
        <KVTable>
          <KVTableRow label="地址" classNames={{ label: 'leading-[1.6]' }} className="align-top">
            <Link href={href} target="_blank">
              <Highlight
                component="span"
                highlightStyles={{ padding: '0 3px', margin: '0 3px', borderRadius: '4px' }}
                highlight={hrefHighlight || []}
                c="gray.6"
                ff="sans-serif"
                className="cursor-default text-sm hover:cursor-pointer hover:underline"
                lh={1.6}
                inherit
              >
                {href.replace('https://', '')}
              </Highlight>
            </Link>
          </KVTableRow>

          <KVTableRow label="技术栈">
            <Group gap={12}>
              {tagList.map(Item => (
                <Item key={Item.name} />
              ))}
            </Group>
          </KVTableRow>
        </KVTable>
      </Stack>
    ),
    [href, hrefHighlight, tagList]
  )

  return (
    <WrapperForItem popup={popup} subpath={subpath}>
      <Stack gap={2}>
        <Link href={`/demos${subpath}`}>
          <GradientTitle
            className="cursor-pointer"
            gradient={{ from: 'grape', to: 'lb' }}
            lh={1.2}
            size="md"
          >
            {name}
          </GradientTitle>
        </Link>

        <Link href={`/demos${subpath}`}>
          <Group gap={12}>
            {techType === 'server' ? (
              <DemosTag label="后端" icon={IconServer} />
            ) : techType === 'front' ? (
              <DemosTag label="前端" icon={IconAppWindow} />
            ) : techType === 'full' ? (
              <DemosTag label="Node.js 全栈" icon={IconStack2Filled} />
            ) : null}

            {devState ? <DemosTag label={devState} icon={IconCalendarMonth} /> : null}

            {projectType === 'Demo' ? (
              <DemosTag label="Demo" icon={IconDeviceDesktopCode} />
            ) : projectType === 'Joker' ? (
              <DemosTag label="仅供娱乐" icon={IconBallBasketball} />
            ) : null}
          </Group>
        </Link>
      </Stack>
    </WrapperForItem>
  )
}

function DemosTag(props: { label: string; icon: FC<IconProps>; className?: string }) {
  const { label, icon: Icon, className } = props
  return (
    <Text
      className={twMerge('flex pb-1 align-middle', className)}
      component="span"
      size="sm"
      c="gray.6"
      ff="sans-serif"
      lh={1.2}
      inert
    >
      <Icon className="raw mt-0.5 mr-[2px]" height="1em" width="1em" />
      {label}
    </Text>
  )
}
