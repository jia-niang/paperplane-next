'use client'

import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { BlurPopupCard } from '@/components/cards/BlurPopupCard'

export interface WrapperForItemProps {
  subpath?: string
  popup?: ReactNode
  children?: ReactNode
}

export default function WrapperForItem(props: WrapperForItemProps) {
  const { popup, children } = props

  const pathname = usePathname()
  const current = pathname.match(/^\/demos(\/[^/]+)\/?/)?.[1] === props.subpath

  return (
    <BlurPopupCard
      className={clsx('rounded-md', current ? `from-lb-100 bg-gradient-to-r to-transparent` : '')}
      popupClassName={clsx(
        current ? `from-lb-200 bg-gradient-to-br via-transparent to-transparent` : ''
      )}
      right={12}
      px={12}
      py={8}
      popupPx={16}
      popupPy={12}
      popupChildren={popup}
    >
      {children}
    </BlurPopupCard>
  )
}
