import { Group, Image, ScrollArea, Stack } from '@mantine/core'
import NextImage from 'next/image'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import GradientTitle from '@/components/labels/GradientTitle'

import { catelogs } from '../list'
import { ArticleToggler } from './ArticleToggler'

const defaultIcon = require('@/assets/snippet-icons/default.svg').default

const headerTop = 130 + 16
const headerHeight = 0

const listTop = headerTop + headerHeight + 16
const listHeight = `calc(100vh - ${listTop + 32}px)`

export async function generateStaticParams() {
  return catelogs.map(item => ({ catelog: item.key }))
}

export default async function SnippetCatelogLayout(props: {
  params: Promise<{ catelog: string }>
  children: ReactNode
}) {
  const { catelog: catelogKey } = await props.params
  const catelog = catelogs.find(item => item.key === catelogKey)

  if (!catelog || !catelog.article) {
    return notFound()
  }

  const { name, icon = defaultIcon, article: articleList } = catelog

  return (
    <Stack h={listHeight} gap={16}>
      <Stack gap={8}>
        <Group gap={8} align="center">
          <Image fit="contain" h={32} w={32} component={NextImage} src={icon} alt="icon" />
          <GradientTitle>{name}</GradientTitle>
        </Group>

        <Group gap={8}>
          <ArticleToggler
            catelog={catelogKey}
            data={(articleList || []).map(item => ({ value: item.key, label: item.title }))}
            size="md"
            className="font-serif"
            withItemsBorders={false}
          />
        </Group>
      </Stack>

      <ScrollArea scrollbars="y" className="pr-6">
        {props.children}
      </ScrollArea>
    </Stack>
  )
}
