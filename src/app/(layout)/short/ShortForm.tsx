'use client'

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Group,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
} from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import GradientTitle from '@/components/labels/GradientTitle'
import Loading from '@/components/layouts/Loading'
import NeedLoginTips from '@/components/user/NeedLoginTips'
import { useSession } from '@/lib/auth-client'
import { useTRPC } from '@/lib/trpc-client'
import { Short, ShortRedirectType } from '@/prisma/browser'
import { addShortItemZod, shortItemZod } from '@/zod/short'

const redirectTypeOptions = [
  { value: ShortRedirectType.PERMANENTLY, label: '永久重定向 (301)' },
  { value: ShortRedirectType.TEMPORARY, label: '临时重定向 (302)' },
  { value: ShortRedirectType.JAVASCRIPT, label: '通过 JavaScript 跳转' },
]

const preferURLPrefix =
  process.env.NEXT_PUBLIC_EXTERNAL_SHORT_URL_PREFIX || `${process.env.NEXT_PUBLIC_BASE_URL}/s/`

export default function ShortForm() {
  const trpc = useTRPC()
  const queryClient = useQueryClient()
  const router = useRouter()

  const { user, isPending: userPending } = useSession()

  const mutation = useMutation(trpc.short.items.add.mutationOptions())

  const [loading, setLoading] = useState(false)
  const [now] = useState(() => new Date())

  const [hasKey, setHasKey] = useState(false)
  const [hasExpiration, setHasExpiration] = useState(false)

  const form = useForm<Partial<Short>>({
    mode: 'uncontrolled',
    validate: zod4Resolver(
      addShortItemZod
        .extend(hasKey ? { key: shortItemZod.shape.key.unwrap() } : {})
        .extend(hasExpiration ? { expiredAt: shortItemZod.shape.expiredAt.unwrap().unwrap() } : {})
    ),
    onValuesChange: values => {
      setCurrent({ ...values })
      if (values.redirectType === ShortRedirectType.PERMANENTLY) {
        setHasExpiration(false)
        form.setFieldValue('expiredAt', null)
      }
    },
    initialValues: {
      redirectType: ShortRedirectType.PERMANENTLY,
      expiredAt: null,
    },
  })

  const [current, setCurrent] = useState<Partial<Short>>(() => form.getInitialValues())
  const duration = useMemo(
    () =>
      hasExpiration && current.expiredAt
        ? dayjs.duration(dayjs(current.expiredAt).diff()).humanize()
        : '',
    [current.expiredAt, hasExpiration]
  )

  const submitHandler = form.onSubmit(async value => {
    await mutation.mutateAsync(value as any, {
      async onSuccess(res) {
        notifications.show({
          color: 'green',
          title: `操作成功`,
          message: `已${res.$reuse ? '复用' : '创建新的'}短链接，链接码为 “${res.key}”`,
        })
        router.push(`/short/${res.key}`)
        queryClient.invalidateQueries(trpc.short.items.list.pathFilter())
        setHasKey(false)
        setHasExpiration(false)

        form.reset()
        reset()
      },
      onError() {
        setLoading(false)
      },
    })
  })

  const reset = () => {
    setHasKey(false)
    setHasExpiration(false)
  }

  if (userPending) {
    return <Loading />
  }

  return (
    <form
      onSubmit={submitHandler}
      onReset={e => {
        form.onReset(e)
        reset()
      }}
    >
      <Stack pos="relative" gap={16}>
        <GradientTitle>获取短链接</GradientTitle>

        <TextInput
          label="目标 URL"
          placeholder="输入短链接的目标地址"
          withAsterisk
          key={form.key('url')}
          {...form.getInputProps('url')}
        />

        <Box>
          <Checkbox
            label="指定自定义短链接"
            checked={hasKey}
            onChange={e => {
              const checked = e.currentTarget.checked
              setHasKey(checked)

              if (!checked) {
                form.setFieldValue('key', undefined as any)
              }
            }}
          />

          <Collapse in={hasKey} pl={32} keepMounted>
            <TextInput
              label="自定义短链接"
              placeholder="输入自定义短链接，可由大小写字母和数字组成"
              description={`${preferURLPrefix}${current.key || ''}`}
              withAsterisk
              key={form.key('key')}
              {...form.getInputProps('key')}
            />
          </Collapse>
        </Box>

        <TextInput
          label="标签"
          placeholder="输入标签文本"
          key={form.key('tag')}
          {...form.getInputProps('tag')}
        />

        <Select
          label="跳转方式"
          placeholder="选择一种跳转方式"
          data={redirectTypeOptions}
          allowDeselect={false}
          key={form.key('redirectType')}
          {...form.getInputProps('redirectType')}
        />

        <Box>
          <Checkbox
            label="指定过期时间"
            description="注：永久重定向不能指定过期时间"
            checked={hasExpiration}
            disabled={current.redirectType === ShortRedirectType.PERMANENTLY}
            onChange={e => {
              const checked = e.currentTarget.checked
              setHasExpiration(checked)
              form.setFieldValue('expiredAt', checked ? dayjs().add(1, 'day').toDate() : null)
            }}
          />

          <Collapse in={hasExpiration} pl={32} keepMounted>
            <DateTimePicker
              label="过期时间"
              placeholder="仅在此有效期前短链接有效"
              description={`有效期：${duration}`}
              valueFormat="YYYY-MM-DD HH:mm"
              minDate={now}
              highlightToday
              withAsterisk
              key={form.key('expiredAt')}
              {...form.getInputProps('expiredAt')}
            />
          </Collapse>
        </Box>

        <Checkbox
          label="在列表中公开展示"
          description="非公开的短链接只对已登录用户可见"
          key={form.key('public')}
          {...form.getInputProps('public')}
        />

        <Checkbox
          label="允许复用现有短链接"
          description="如果有匹配所有参数的短链接，则直接复用"
          key={form.key('reuse')}
          {...form.getInputProps('reuse')}
        />

        {user ? (
          <Group justify="end">
            <Button type="reset" variant="outline">
              重置
            </Button>
            <Button type="submit">提交</Button>
          </Group>
        ) : (
          <NeedLoginTips title="登录后可获取短链接" />
        )}

        <LoadingOverlay zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} visible={loading} />
      </Stack>
    </form>
  )
}
