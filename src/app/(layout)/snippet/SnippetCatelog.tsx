'use client'

import { Flex, Stack, Text, Image } from '@mantine/core'
import NextImage from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twJoin } from 'tailwind-merge'

import { BlurPopupCard } from '@/components/cards/BlurPopupCard'

export interface SnippetCatelogProps {
  name: string
  href: string
  desc?: string
  icon?: string
}

const defaultIcon = require('@/assets/snippet-icons/default.svg').default

export function SnippetCatelog(props: SnippetCatelogProps) {
  const { name, href, desc, icon } = props

  const pathname = usePathname()
  const current = pathname.match(/^\/snippet(\/[^/]+)\/?/)?.[1] === href

  const popup = (
    <Stack mt={6} ml={32}>
      <Text lh={1.2} c="gray.6" size="sm">
        {desc}
      </Text>
    </Stack>
  )

  return (
    <BlurPopupCard
      className={twJoin('rounded-md', current ? `from-lb-100 bg-gradient-to-r to-transparent` : '')}
      popupClassName={twJoin(
        current ? `from-lb-200 bg-gradient-to-r via-lb-100 to-transparent` : ''
      )}
      px={6}
      py={6}
      popupPx={6}
      popupPy={6}
      popupChildren={desc ? popup : null}
    >
      <Link className="cursor-pointer" href={`/snippet${href}`}>
        <Flex>
          <Image
            src={icon || defaultIcon}
            component={NextImage}
            className="mr-2 h-5 w-5"
            fit="contain"
            alt="logo"
          />

          <Text className="font-serif" size="18px" lh={1.2}>
            {name}
          </Text>
        </Flex>
      </Link>
    </BlurPopupCard>
  )
}
