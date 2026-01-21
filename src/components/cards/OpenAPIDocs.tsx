'use client'

import { Button, Stack, Tabs, TabsList, TabsPanel, TabsTab, Text } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { CSSProperties, FC, ReactNode, useState } from 'react'

import { useSession } from '@/lib/auth-client'
import { useTRPC } from '@/lib/trpc-client'
import { MDXWrapperProps } from '@/mdx-components'

import GradientTitle from '../labels/GradientTitle'
import { KVTable, KVTableRow } from '../tables/KVTable'

export interface OpenAPIDocsProps {
  title?: ReactNode
  desc?: ReactNode

  endpoint: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS'
  contentType?: ReactNode
  protect: boolean

  inputDocs?: FC
  outputDocs?: FC

  className?: string
  style?: CSSProperties
}

export default function OpenAPIDocs(props: OpenAPIDocsProps) {
  const { title, desc, endpoint, method, contentType, protect, className, style } = props

  const InputDocs = props.inputDocs as FC<MDXWrapperProps> | undefined
  const OutputDocs = props.outputDocs as FC<MDXWrapperProps> | undefined

  const trpc = useTRPC()

  const { user, isPending: userPending } = useSession()
  const { data: apiKey, isPending: apiKeyPending } = useQuery({
    ...trpc.user.apiKey.ensure.queryOptions(),
    enabled: !!user,
  })

  const [showApiKey, setShowApiKey] = useState(false)

  return (
    <Stack className={clsx(className)} style={style}>
      {title ? <GradientTitle>{title}</GradientTitle> : null}

      {desc ? <Text className="text-[18px] whitespace-pre-wrap text-[#333]">{desc}</Text> : null}

      {InputDocs || OutputDocs ? (
        <Tabs defaultValue="meta">
          <TabsList>
            <TabsTab value="meta">元数据</TabsTab>
            {InputDocs ? <TabsTab value="input">入参格式</TabsTab> : null}
            {OutputDocs ? <TabsTab value="output">返回格式</TabsTab> : null}
          </TabsList>

          <TabsPanel value="meta" py={12}>
            <KVTable>
              <KVTableRow label="接口 URL" classNames={{ label: 'align-top', field: 'break-all' }}>
                <Text ff="monospace" inherit>
                  {process.env.NEXT_PUBLIC_BASE_URL + endpoint}
                </Text>
              </KVTableRow>

              <KVTableRow label="请求方法">
                <Text ff="monospace" inherit>
                  {method}
                </Text>
              </KVTableRow>

              <KVTableRow label="Content-Type">
                <Text ff="monospace" inherit>
                  {contentType || `application/json`}
                </Text>
              </KVTableRow>

              <KVTableRow label="是否需鉴权">{protect ? `需使用 API Key` : `开放`}</KVTableRow>

              {protect ? (
                <>
                  <KVTableRow label="鉴权 Header 键">
                    <Text ff="monospace" inherit>
                      X-API-KEY
                    </Text>
                  </KVTableRow>

                  <KVTableRow label="鉴权 Header 值">
                    {!userPending && user ? (
                      <>
                        <Text ff="monospace" component="span" inherit>
                          {apiKeyPending ? '加载中…' : showApiKey ? apiKey?.key : '******'}
                        </Text>

                        <Button
                          onClick={() => void setShowApiKey(t => !t)}
                          size="compact-xs"
                          variant="light"
                          ml={8}
                        >
                          {showApiKey ? '隐藏' : '显示'}
                        </Button>
                      </>
                    ) : (
                      <Text inherit>登录后可用</Text>
                    )}
                  </KVTableRow>
                </>
              ) : null}
            </KVTable>
          </TabsPanel>

          {InputDocs ? (
            <TabsPanel value="input" py={12}>
              <InputDocs gap={12} />
            </TabsPanel>
          ) : null}
          {OutputDocs ? (
            <TabsPanel value="output" py={12}>
              <OutputDocs gap={12} />
            </TabsPanel>
          ) : null}
        </Tabs>
      ) : null}
    </Stack>
  )
}
