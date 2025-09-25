import { Blockquote, Code, Divider, Stack } from '@mantine/core'
import clsx from 'clsx'
import type { MDXComponents } from 'mdx/types'

import GradientTitle from './components/labels/GradientTitle'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children, className, style }) => (
      <Stack gap={16} component="article" className={clsx('mdx', className)} style={style}>
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
        {children}
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
        <Code className={clsx('mdx__code bg-lb-100 text-[1em]', className)} style={style}>
          {children}
        </Code>
      )
    },
    h1: ({ children, className, style }) => (
      <GradientTitle size="lg" className={className} style={style}>
        {children}
      </GradientTitle>
    ),
    h2: ({ children, className, style }) => (
      <GradientTitle size="md" className={className} style={style}>
        {children}
      </GradientTitle>
    ),
    h3: ({ children, className, style }) => (
      <GradientTitle size="sm" className={className} style={style}>
        {children}
      </GradientTitle>
    ),
    hr: () => <Divider />,
    ...components,
  }
}
