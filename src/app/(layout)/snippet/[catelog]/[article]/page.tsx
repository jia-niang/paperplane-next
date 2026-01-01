import { Stack } from '@mantine/core'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'

import { catelogs } from '../../list'

export async function generateStaticParams(param: { catelog: string }) {
  return (
    catelogs
      .find(item => item.key === param.catelog)
      ?.article?.map(item => ({ article: item.key })) ?? []
  )
}

export default async function SnippetArticlePage(props: {
  params: Promise<{ catelog: string; article: string }>
  children: ReactNode
}) {
  const { catelog: catelogKey, article: articleKey } = await props.params

  const catelog = catelogs.find(item => item.key === catelogKey)!
  const article = catelog.article?.find(item => item.key === articleKey)

  if (!article) {
    return notFound()
  }

  return <Stack mt={16}>{article.component({})}</Stack>
}
