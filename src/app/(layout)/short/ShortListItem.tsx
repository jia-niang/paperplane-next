'use client'

import { Group, Highlight, Stack, Text, Tooltip } from '@mantine/core'
import {
  IconArrowRight,
  IconAsterisk,
  IconCircleDashed,
  IconClockHour9,
  IconHash,
  IconProps,
} from '@tabler/icons-react'
import { trimEnd } from 'lodash-es'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { BlurPopupCard } from '@/components/cards/BlurPopupCard'
import { Short, ShortRedirectType } from '@/prisma/browser'

export interface ShortListItemProps {
  short: Short
}

const preferURLPrefix =
  process.env.NEXT_PUBLIC_EXTERNAL_SHORT_URL_PREFIX || `${process.env.NEXT_PUBLIC_BASE_URL}/s/`

const shortStatusIconProps: IconProps = {
  size: 16,
  stroke: 2,
  className: 'raw',
}

export default function ShortListItem(props: ShortListItemProps) {
  const { short } = props
  const router = useRouter()

  const keyURL = new URL(preferURLPrefix + short.key)
  const targetURL = new URL(short.url)

  const clickHandler = () => {
    router.push(`/short/${short.key}`)
  }

  return (
    <BlurPopupCard
      py={12}
      px={16}
      className="from-lb-50 hover:from-lb-100 cursor-pointer rounded-md bg-gradient-to-r to-transparent"
      popupClassName="from-lb-100 bg-gradient-to-r via-lb-100 to-transparent"
      popupPx={16}
      popupPy={12}
      right={32}
    >
      <Stack onClick={clickHandler} gap={4}>
        <Group gap={8} className="text-[16px] text-[#777]">
          <Highlight
            highlight={short.key}
            highlightStyles={{ padding: '0 4px', margin: '0 3px', borderRadius: '4px' }}
            inherit
          >
            {keyURL.host + keyURL.pathname}
          </Highlight>

          <Group ml="auto" className="text-[14px] text-[#999]" gap={8}>
            {short.redirectType === ShortRedirectType.PERMANENTLY ? (
              <Tooltip label="永久重定向 (301)">
                <Text inherit>301</Text>
              </Tooltip>
            ) : short.redirectType === ShortRedirectType.TEMPORARY ? (
              <Tooltip label="临时重定向 (302)">
                <Text inherit>302</Text>
              </Tooltip>
            ) : (
              <Tooltip label="JavaScript 代码重定向">
                <Text inherit>JS</Text>
              </Tooltip>
            )}

            {short.tag ? (
              <Tooltip label="已添加标签文本">
                <IconHash {...shortStatusIconProps} />
              </Tooltip>
            ) : null}

            {short.expiredAt ? (
              <Tooltip label="已设置有效期限">
                <IconClockHour9 {...shortStatusIconProps} />
              </Tooltip>
            ) : null}

            {short.public ? (
              <Tooltip label="公开">
                <IconCircleDashed {...shortStatusIconProps} />
              </Tooltip>
            ) : (
              <Tooltip label="私有">
                <IconAsterisk {...shortStatusIconProps} />
              </Tooltip>
            )}
          </Group>
        </Group>

        <Group gap={4} className="flex-nowrap">
          <IconArrowRight size="18px" className="raw text-ma shrink-0" />

          <Link onClick={e => void e.stopPropagation()} href={short.url} target="_blank">
            <Text
              className="text-ma cursor-pointer font-serif hover:underline"
              lineClamp={1}
              size="18px"
              lh={1.2}
            >
              {trimEnd(targetURL.host + targetURL.pathname + targetURL.search, '/')}
            </Text>
          </Link>
        </Group>
      </Stack>
    </BlurPopupCard>
  )
}
