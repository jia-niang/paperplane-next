import {
  Box,
  Button,
  ButtonProps,
  ColorInput,
  ElementProps,
  FileInput,
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
import { IconPhoto } from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { pick } from 'lodash-es'
import { zod4Resolver } from 'mantine-form-zod-resolver'
import { useEffect, useMemo, useState } from 'react'

import { useTRPC } from '@/lib/trpc-client'
import { AwesomeTag } from '@/prisma/client'
import { awesomeTagZod } from '@/zod/awesome'

import TagItem from './TagItem'

export interface TagEditButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  tag?: AwesomeTag
}

interface DraftAwesomeTag extends AwesomeTag {
  iconFile?: File
}

export default function TagEditButton(props: TagEditButtonProps) {
  const { tag, children, onClick, ...buttonRest } = props
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const [opened, setOpened] = useState(false)
  const [loading, setLoading] = useState(false)
  const [previewTag, setPreviewTag] = useState<DraftAwesomeTag>()

  useEffect(() => void setLoading(false), [opened])

  const initialValues = useMemo(() => {
    const result = pick(tag, ['id', 'label', 'desc', 'color', 'icon']) as DraftAwesomeTag
    if (!result.color) {
      result.color = ''
    }

    return result
  }, [tag])

  const form = useForm({
    mode: 'uncontrolled',
    initialValues,
    onValuesChange: values => void setPreviewTag({ ...values }),
    validate: zod4Resolver(awesomeTagZod) as any,
  })

  const mutation = useMutation(
    tag ? trpc.awesome.tags.update.mutationOptions() : trpc.awesome.tags.add.mutationOptions()
  )

  const submitHandler = form.onSubmit(async value => {
    setLoading(true)
    await mutation.mutateAsync(value, {
      async onSuccess(res) {
        notifications.show({
          color: 'green',
          title: `操作成功`,
          message: tag ? `已更新标签 “${res.label}”` : `已添加标签 “${res.label}”`,
        })
        await Promise.all([
          queryClient.invalidateQueries(trpc.awesome.tags.pathFilter()),
          queryClient.invalidateQueries(trpc.awesome.items.pathFilter()),
        ])
        setOpened(false)
      },
      onError() {
        setLoading(false)
      },
    })
  })

  const preview = useMemo(() => {
    const tag = { ...previewTag }
    if (tag.iconFile) {
      tag.icon = URL.createObjectURL(tag.iconFile)
    }
    if (!tag.label) {
      tag.label = '标签名'
    }

    return tag as DraftAwesomeTag
  }, [previewTag])

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
        title={tag ? `编辑标签` : `添加标签`}
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <form onSubmit={submitHandler} onReset={form.onReset}>
          <Stack pos="relative">
            <TextInput
              label="标签名"
              placeholder="输入标签名称"
              withAsterisk
              data-autofocus
              key={form.key('label')}
              {...form.getInputProps('label')}
            />

            <Textarea
              label="描述"
              placeholder="输入描述文本，可留空"
              classNames={{ input: 'py-1' }}
              key={form.key('desc')}
              {...form.getInputProps('desc')}
            />

            <ColorInput
              label="标签颜色"
              withEyeDropper={false}
              placeholder="点击选择或输入颜色，可留空"
              swatches={[
                '#2e2e2e',
                '#868e96',
                '#fa5252',
                '#e64980',
                '#be4bdb',
                '#7950f2',
                '#4c6ef5',
                '#228be6',
                '#15aabf',
                '#12b886',
                '#40c057',
                '#82c91e',
                '#fab005',
                '#fd7e14',
              ]}
              key={form.key('color')}
              {...form.getInputProps('color')}
              value={form.getInputProps('color').value}
            />

            <FileInput
              leftSection={<IconPhoto className="raw" />}
              label="图标"
              accept="image/*"
              placeholder="点击上传图标图片，可留空"
              clearable
              classNames={{ input: 'text-[16px] leading-[36px]' }}
              key={form.key('iconFile')}
              {...form.getInputProps('iconFile')}
            />

            <Stack gap={4}>
              <Text size="sm">预览标签：</Text>
              <Box p="sm" className="rounded-md bg-gray-100 text-center">
                <TagItem className="inline-flex" tag={preview} />
              </Box>
            </Stack>

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
