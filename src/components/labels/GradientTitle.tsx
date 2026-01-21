import { MantineGradient, Text, TextProps } from '@mantine/core'
import { CSSProperties, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface GradientTitleProps extends TextProps {
  children: ReactNode
  size?: TextProps['size']
  gradient?: MantineGradient
  className?: string
  style?: CSSProperties
}

export default function GradientTitle(props: GradientTitleProps) {
  const {
    size = 'lg',
    gradient = { from: 'ma', to: 'lb' },
    children,
    className,
    ...restProps
  } = props

  return (
    <Text
      {...restProps}
      variant="gradient"
      gradient={gradient}
      size={size}
      className={twMerge('cursor-default font-serif', className)}
    >
      {children}
    </Text>
  )
}
