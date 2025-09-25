'use client'

import {
  Button,
  ButtonProps,
  ElementProps,
  Group,
  Popover,
  PopoverDropdown,
  PopoverDropdownProps,
  PopoverProps,
  PopoverTarget,
  PopoverTargetProps,
  Stack,
  Text,
} from '@mantine/core'
import { ReactNode, useState } from 'react'

export interface ConfirmButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  confirm: ReactNode

  confirmButtonText?: ReactNode
  confirmButtonProps?: ButtonProps & ElementProps<'button', keyof ButtonProps>
  onConfirm?(): void

  cancelButtonText?: ReactNode
  cancelButtonProps?: ButtonProps & ElementProps<'button', keyof ButtonProps>
  onCancel?(): void

  popoverProps?: PopoverProps
  popoverTargetProps?: PopoverTargetProps
  popoverDropdownProps?: PopoverDropdownProps
}

export default function ConfirmButton(props: ConfirmButtonProps) {
  const {
    confirm,
    confirmButtonText,
    confirmButtonProps,
    onConfirm,
    cancelButtonText,
    cancelButtonProps,
    onCancel,
    popoverProps,
    popoverTargetProps,
    popoverDropdownProps,
    onClick,
    ...buttonProps
  } = props

  const [opened, setOpened] = useState(false)

  return (
    <Popover
      opened={opened}
      onDismiss={() => void setOpened(false)}
      position="bottom"
      withArrow
      shadow="md"
      {...popoverProps}
    >
      <PopoverTarget {...popoverTargetProps}>
        <Button
          onClick={e => {
            setOpened(t => !t)
            onClick?.(e)
          }}
          {...buttonProps}
        />
      </PopoverTarget>

      <PopoverDropdown {...popoverDropdownProps}>
        <Stack>
          <Text size="sm" className="whitespace-pre-wrap">
            {confirm}
          </Text>
          <Group gap={8} justify="end">
            <Button
              onClick={() => {
                setOpened(false)
                onCancel?.()
              }}
              size="compact-sm"
              variant="transparent"
              {...cancelButtonProps}
            >
              {cancelButtonText || `取消`}
            </Button>
            <Button
              onClick={() => {
                setOpened(false)
                onConfirm?.()
              }}
              size="compact-sm"
              variant="light"
              {...confirmButtonProps}
            >
              {confirmButtonText || `确认`}
            </Button>
          </Group>
        </Stack>
      </PopoverDropdown>
    </Popover>
  )
}
