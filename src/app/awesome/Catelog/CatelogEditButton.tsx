import {
  Button,
  ButtonProps,
  ElementProps,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { pick } from 'lodash-es'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useEffect, useState } from 'react'

import { useTRPC } from '@/lib/trpc-client'
import { AwesomeCatelog } from '@/prisma/client'
import { awesomeCatelogZod } from '@/zod/awesome'

export interface CatelogEditButtonProps
  extends ButtonProps,
    ElementProps<'button', keyof ButtonProps> {
  catelog?: AwesomeCatelog
  parent?: AwesomeCatelog
}

export default function CatelogEditButton(props: CatelogEditButtonProps) {
  const { catelog, parent, children, onClick, ...buttonRest } = props
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => void setLoading(false), [opened])

  const initialValues = {
    ...pick(catelog, ['id', 'parentId', 'name', 'desc']),
    parentId: parent ? parent.id : undefined,
  }
  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    validate: zod4Resolver(awesomeCatelogZod),
  })

  const mutation = useMutation(
    catelog
      ? trpc.awesome.catelogs.update.mutationOptions()
      : trpc.awesome.catelogs.add.mutationOptions()
  )

  const submitHandler = form.onSubmit(async value => {
    setLoading(true)
    await mutation.mutateAsync(value as any, {
      async onSuccess(res) {
        notifications.show({
          color: 'green',
          title: `操作成功`,
          message: catelog ? `已更新类别 “${res.name}”` : `已添加类别 “${res.name}”`,
        })
        await Promise.all([
          queryClient.invalidateQueries(trpc.awesome.catelogs.pathFilter()),
          queryClient.invalidateQueries(trpc.awesome.items.pathFilter()),
        ])
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
        title={catelog ? `编辑类别` : `添加类别`}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <form onSubmit={submitHandler} onReset={form.onReset}>
          <Stack pos="relative">
            {parent ? (
              <Stack className="rounded-md" bg="yellow.2" px={12} py={8} gap={4}>
                <Text c="gray.8" size="sm">
                  所属父类别：
                </Text>
                <Text size="sm" className="font-bold">
                  {parent.name}
                </Text>
              </Stack>
            ) : null}

            <TextInput
              label="类别名"
              placeholder="输入类别名称"
              withAsterisk
              data-autofocus
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <Textarea
              label="描述"
              placeholder="输入描述文本，可留空"
              classNames={{ input: 'py-1' }}
              key={form.key('desc')}
              {...form.getInputProps('desc')}
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
