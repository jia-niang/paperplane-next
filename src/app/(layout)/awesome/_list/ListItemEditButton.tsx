import {
  Button,
  ButtonProps,
  ElementProps,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Rating,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCode, IconHome, IconPackage } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { pick } from 'lodash-es'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useEffect, useMemo, useState } from 'react'

import { AwesomeItemResult } from '@/app/api/_awesome/items'
import { useTRPC } from '@/lib/trpc-client'
import { AwesomeCatelog } from '@/prisma/client'
import { awesomeItemZod } from '@/zod/awesome'

export interface ListItemEditButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  catelog?: AwesomeCatelog
  awesome?: AwesomeItemResult
}

export default function ListItemEditButton(props: ListItemEditButtonProps) {
  const { catelog, awesome, children, onClick, ...buttonRest } = props
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => void setLoading(false), [opened])

  const initialValues = useMemo(
    () => ({
      ...pick(awesome, ['id', 'label', 'homepage', 'source', 'registry', 'desc', 'stars']),
      catelogId: catelog && catelog.id !== '__no-id' ? catelog.id : undefined,
      tags: awesome?.tags?.map(item => item.id),
    }),
    [awesome, catelog]
  )
  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: zod4Resolver(awesomeItemZod),
  })

  const mutation = useMutation(
    awesome ? trpc.awesome.items.update.mutationOptions() : trpc.awesome.items.add.mutationOptions()
  )

  const { data: catelogOptions } = useQuery({
    ...trpc.awesome.catelogs.list.queryOptions(),
    select: data =>
      data?.map(item => ({
        label: item.parent ? `${item.parent.name} / ${item.name}` : item.name,
        value: item.id,
      })) || [],
    placeholderData: [],
  })
  const { data: tagOptions } = useQuery({
    ...trpc.awesome.tags.list.queryOptions(),
    select: data => data?.map(item => ({ label: item.label, value: item.id })) || [],
    placeholderData: [],
  })

  const submitHandler = form.onSubmit(async value => {
    setLoading(true)
    await mutation.mutateAsync(value as any, {
      async onSuccess(res) {
        notifications.show({
          color: 'green',
          title: `操作成功`,
          message: awesome
            ? `已更新 Awesome 条目 “${res.label}”`
            : `已创建 Awesome 条目 “${res.label}”`,
        })
        await queryClient.invalidateQueries(trpc.awesome.items.pathFilter())
        setOpened(false)
      },
      onError() {
        setLoading(false)
      },
    })
  })

  const openModal = (e: any) => {
    form.setInitialValues(initialValues)
    form.reset()
    setOpened(true)
    onClick?.(e)
  }

  return (
    <>
      <Button {...buttonRest} onClick={openModal}>
        {children}
      </Button>
      <Modal
        opened={opened}
        onClose={() => void setOpened(false)}
        title={catelog ? `编辑 Awesome` : `添加 Awesome`}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <form onSubmit={submitHandler} onReset={form.onReset}>
          <Stack pos="relative">
            <Select
              label="类别"
              placeholder="选择类别，不建议留空"
              data={catelogOptions}
              data-autofocus
              key={form.key('catelogId')}
              {...form.getInputProps('catelogId')}
            />

            <TextInput
              label="Awesome 名称"
              placeholder="输入名称"
              withAsterisk
              key={form.key('label')}
              {...form.getInputProps('label')}
            />

            <TextInput
              label="官网"
              leftSection={<IconHome className="raw" />}
              placeholder="输入官网网址"
              withAsterisk
              key={form.key('homepage')}
              {...form.getInputProps('homepage')}
            />

            <TextInput
              label="源代码"
              leftSection={<IconCode className="raw" />}
              placeholder="输入源码仓库网址，可留空"
              key={form.key('source')}
              {...form.getInputProps('source')}
            />

            <TextInput
              label="包"
              leftSection={<IconPackage className="raw" />}
              placeholder="例如 npm、Docker Hub 的网址，可留空"
              key={form.key('registry')}
              {...form.getInputProps('registry')}
            />

            <Textarea
              label="描述"
              placeholder="输入描述文本，可留空"
              classNames={{ input: 'py-1' }}
              key={form.key('desc')}
              {...form.getInputProps('desc')}
            />

            <Stack gap={4}>
              <Text size="sm" fw={500}>
                推荐级别
              </Text>
              <Group gap={8}>
                <Rating key={form.key('stars')} {...form.getInputProps('stars')} />
                <Button
                  onClick={() => void form.setFieldValue('stars', null)}
                  className="self-start"
                  size="compact-sm"
                  variant="subtle"
                >
                  清空
                </Button>
              </Group>
            </Stack>

            <MultiSelect
              label="标签"
              placeholder="选择若干个标签，可留空"
              data={tagOptions}
              hidePickedOptions
              clearable
              key={form.key('tags')}
              {...form.getInputProps('tags')}
            />

            <Group justify="end">
              <Button onClick={() => void setOpened(false)} variant="transparent">
                取消
              </Button>
              <Button type="submit">提交</Button>
            </Group>

            <LoadingOverlay
              zIndex={1000}
              overlayProps={{ radius: 'sm', blur: 2 }}
              visible={loading}
            />
          </Stack>
        </form>
      </Modal>
    </>
  )
}
