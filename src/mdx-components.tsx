import { Blockquote, Code, Divider, Stack, StackProps } from '@mantine/core'
import clsx from 'clsx'
import type { MDXComponents } from 'mdx/types'

import GradientTitle from './components/labels/GradientTitle'

export type MDXWrapperProps = StackProps

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ gap, children, className, style }) => (
      <Stack gap={gap || 16} component="article" style={style} className={clsx('mdx', className)}>
        {children}
      </Stack>
    ),
    a: ({ children, href }) => (
      <a className="text-lb hover:underline" href={href} target="_blank">
        {children}
      </a>
    ),
    blockquote: ({ children, className, style }) => (
      <Blockquote px={18} py={12} className={clsx('text-[0.9em]', className)} style={style}>
        <Stack gap={16}>{children}</Stack>
      </Blockquote>
    ),
    pre: ({ children, className, style }) => {
      return (
        <Code className={clsx('mdx__code-block px-4 text-[1em]', className)} style={style} block>
          {children}
        </Code>
      )
    },
    code: ({ children, className, style }) => {
      if (className) {
        return children
      }

      return (
        <Code
          className={clsx(
            'mdx__code bg-lb-100 text-[1em] [-webkit-text-fill-color:currentColor]',
            className
          )}
          style={style}
        >
          {children}
        </Code>
      )
    },
    h1: ({ children, className, style }) => (
      <GradientTitle size="lg" className={clsx(className, 'mt-3')} style={style}>
        {children}
      </GradientTitle>
    ),
    h2: ({ children, className, style }) => (
      <GradientTitle size="md" className={clsx(className, 'mt-3')} style={style}>
        {children}
      </GradientTitle>
    ),
    h3: ({ children, className, style }) => (
      <GradientTitle size="sm" className={clsx(className, 'mt-3')} style={style}>
        {children}
      </GradientTitle>
    ),
    hr: () => <Divider />,
    ...components,
  }
}
