'use client'

import { Stack, Text, Image, Group, ScrollArea, SimpleGrid } from '@mantine/core'
import { IconCaretDownFilled } from '@tabler/icons-react'
import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

import { groups, SnippetCatelog, SnippetCatelogGroup } from './list'

const defaultIcon = require('@/assets/snippet-icons/default.svg').default

const headerTop = 130 + 16
const headerHeight = 0

const listTop = headerTop + headerHeight + 16
const listHeight = `calc(100vh - ${listTop + 32}px)`

export default function SnippetCatelogList() {
  return (
    <ScrollArea pos="sticky" top={headerTop} left={0} h={listHeight} scrollbars="y" type="never">
      <Stack gap={24} component="aside">
        {groups.map(item => (
          <ItemCatelogGroup group={item} key={item.key} />
        ))}
      </Stack>
    </ScrollArea>
  )
}

function ItemCatelogGroup(props: { group: SnippetCatelogGroup }) {
  const { title, children } = props.group

  return (
    <Stack component="section" gap={8}>
      <Text className="cursor-default" c="#aaa" size="16px">
        <IconCaretDownFilled className="mr-1" stroke={1} />
        {title}
      </Text>

      <SimpleGrid spacing={4} verticalSpacing={0} cols={2}>
        {children.map(item => (
          <ItemCatelog catelog={item} key={item.key} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}

function ItemCatelog(props: { catelog: SnippetCatelog }) {
  const { name, key, icon } = props.catelog

  const pathname = usePathname()
  const href = `/${key}`
  const current = pathname.match(/^\/snippet(\/[^/]+)\/?/)?.[1] === href

  return (
    <nav>
      <Link
        className={twMerge(
          'inline-flex cursor-pointer rounded-md px-2 py-[2px] text-[16px] leading-[1.4] text-[#555] hover:underline',
          current ? 'from-lb-100 to-lb-50 bg-gradient-to-r' : ''
        )}
        href={`/snippet${href}`}
      >
        <Group className="flex-nowrap align-middle" align="center" gap={4}>
          <Image
            src={icon || defaultIcon}
            component={NextImage}
            className="h-[16px] w-[16px]"
            fit="contain"
            alt="logo"
          />

          <Text lineClamp={1} inherit>
            {name}
          </Text>
        </Group>
      </Link>
    </nav>
  )
}
