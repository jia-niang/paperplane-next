import { Rating, Stack, StackProps, Text } from '@mantine/core'
import clsx from 'clsx'
import Link from 'next/link'

import { AwesomeItemResult } from '@/app/api/_awesome/items'
import { KVTable, KVTableRow } from '@/components/tables/KVTable'

import { awesomeStarLevel } from '../_list/ListItem'
import TagItem from '../_tag/TagItem'

export interface AwesomeItemDetailProps extends StackProps {
  awesome: AwesomeItemResult
}

export default function AwesomeItemDetail(props: AwesomeItemDetailProps) {
  const { awesome, className, ...restProps } = props

  return (
    <Stack {...restProps} className={clsx('', className)}>
      <KVTable>
        <KVTableRow label="官网" classNames={{ label: 'align-top', field: 'break-all' }}>
          <Link className="underline" href={awesome.homepage} target="_blank">
            {awesome.homepage}
          </Link>
        </KVTableRow>

        <KVTableRow label="源代码" classNames={{ label: 'align-top', field: 'break-all' }}>
          {awesome.source ? (
            <Link href={awesome.source} target="_blank">
              {awesome.source}
            </Link>
          ) : (
            '-'
          )}
        </KVTableRow>

        <KVTableRow label="包" classNames={{ label: 'align-top', field: 'break-all' }}>
          {awesome.registry ? (
            <Link href={awesome.registry} target="_blank">
              {awesome.registry}
            </Link>
          ) : (
            '-'
          )}
        </KVTableRow>

        <KVTableRow label="星级" classNames={{ label: 'align-top' }}>
          <Rating className="mr-2 inline-flex align-middle" value={awesome.stars || 0} readOnly />
          <Text component="span" className="align-middle" inherit>
            {awesomeStarLevel(awesome.stars || 0)}
          </Text>
        </KVTableRow>

        <KVTableRow label="标签" classNames={{ label: 'align-top' }}>
          {awesome.tags && awesome.tags.length >= 1
            ? awesome.tags.map(tag => <TagItem className="inline-flex" key={tag.id} tag={tag} />)
            : '-'}
        </KVTableRow>

        <KVTableRow
          label="介绍"
          classNames={{ label: 'align-top', field: 'break-all whitespace-pre-wrap' }}
        >
          {awesome.desc || '-'}
        </KVTableRow>
      </KVTable>
    </Stack>
  )
}
