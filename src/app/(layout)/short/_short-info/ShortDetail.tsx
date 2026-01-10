'use client'

import { Button, CopyButton, Divider, Highlight, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import Link from 'next/link'
import { CSSProperties } from 'react'

import ConfirmButton from '@/components/buttons/ConfirmButton'
import { KVTable, KVTableRow } from '@/components/tables/KVTable'
import { useSession } from '@/lib/auth-client'
import { useTRPC } from '@/lib/trpc-client'
import { ShortRedirectType } from '@/prisma/browser'
import { Short, User } from '@/prisma/client'

export interface DetailProps {
  short: Short & { author?: User }
  onDelete(): void
  className?: string
  style?: CSSProperties
}

const preferURLPrefix =
  process.env.NEXT_PUBLIC_EXTERNAL_SHORT_URL_PREFIX || `${process.env.NEXT_PUBLIC_BASE_URL}/s/`

export default function ShortDetail(props: DetailProps) {
  const { short, onDelete, className, style } = props

  const { user } = useSession()
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const deleteShort = useMutation(trpc.short.items.delete.mutationOptions())

  const deleteHandler = async () => {
    await deleteShort.mutateAsync(
      { id: short.id },
      {
        onSuccess() {
          notifications.show({
            color: 'green',
            title: `删除成功`,
            message: `已删除链接码为 “${short.key}” 的短链接`,
          })
          queryClient.invalidateQueries(trpc.short.items.list.pathFilter())
          onDelete?.()
        },
      }
    )
  }

  return (
    <Stack className={className} style={style}>
      <KVTable>
        <KVTableRow label="链接指向" labelClassName="align-top">
          <Text inherit className="text-ma hover:underline">
            <Link className="break-all" href={short.url} target="_blank">
              {short.url}
            </Link>
          </Text>
        </KVTableRow>

        <KVTableRow label="短链" labelClassName="align-top">
          <Highlight
            highlight={short.key}
            highlightStyles={{ padding: '0 4px', margin: '0 3px', borderRadius: '4px' }}
            component="span"
            inherit
          >
            {preferURLPrefix + short.key}
          </Highlight>

          <CopyButton value={preferURLPrefix + short.key}>
            {({ copied, copy }) => (
              <Button ml={4} variant="subtle" size="compact-sm" onClick={copy}>
                {copied ? '已复制' : '复制'}
              </Button>
            )}
          </CopyButton>
        </KVTableRow>

        <KVTableRow label="跳转类型">
          {short.redirectType === ShortRedirectType.PERMANENTLY ? (
            <Text inherit>永久重定向 (301)</Text>
          ) : short.redirectType === ShortRedirectType.TEMPORARY ? (
            <Text inherit>临时重定向 (302)</Text>
          ) : (
            <Text inherit>JavaScript 代码重定向</Text>
          )}
        </KVTableRow>

        <KVTableRow label="过期时间">
          {short.expiredAt
            ? `${dayjs(short.expiredAt).format('YYYY年 M月 D日 HH:mm')} (${dayjs(short.expiredAt).fromNow(true)})`
            : `永久有效`}
        </KVTableRow>

        <KVTableRow label="标签" labelClassName="align-top">
          {short.tag || '-'}
        </KVTableRow>

        <KVTableRow label="是否公开">{short.public ? '公开' : '私有'}</KVTableRow>

        <KVTableRow label="创建于">
          {dayjs(short.createdAt).format('YYYY年 M月 D日 HH:mm')} ({dayjs(short.createdAt).toNow()})
        </KVTableRow>
      </KVTable>

      {user ? (
        <>
          <Divider />

          <KVTable>
            <KVTableRow label="创建者" labelClassName="align-top">
              {short.author?.name || short.author?.email}
            </KVTableRow>

            <KVTableRow label="创建者 ID">{short.author?.id}</KVTableRow>

            <KVTableRow label="可用操作">
              <ConfirmButton
                confirm="删除后不可恢复，确定删除吗？"
                confirmButtonProps={{ color: 'red' }}
                onConfirm={deleteHandler}
                variant="light"
                color="red"
                size="compact-sm"
              >
                删除
              </ConfirmButton>
            </KVTableRow>
          </KVTable>
        </>
      ) : null}
    </Stack>
  )
}
