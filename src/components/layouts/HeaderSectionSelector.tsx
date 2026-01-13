'use client'

import {
  Grid,
  GridCol,
  GridColProps,
  Group,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  SegmentedControl,
  Stack,
  Text,
} from '@mantine/core'
import {
  IconCaretDownFilled,
  IconMapPinFilled,
  IconGridDots,
  IconExternalLink,
  IconChevronRight,
} from '@tabler/icons-react'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useMemo } from 'react'

const fixedNav = [
  { value: '/a', label: '导航', title: 'Alphabet · 导航索引' },
  { value: '/open', label: '开源', title: 'Open · 开源' },
  { value: '/demos', label: 'Demos', title: 'Demos' },
  { value: '/awesome', label: 'Awesome', title: 'Awesome · 发现' },
  { value: '/registry', label: '制品库', title: 'Registry · 制品库' },
]

const foldNav = [
  { value: '/snippet', label: '样板与配置', title: 'Snippet · 样板与配置' },
  { value: '/short', label: '短链接', title: 'Short · 短链接服务' },
]

const allNav = [...fixedNav, ...foldNav]

function DynamicNavLink(props: { href: string; span?: GridColProps['span']; children: ReactNode }) {
  const { href, span, children } = props
  const router = useRouter()
  const pathname = usePathname()

  const isActive = href === pathname.match(`^(/[^/]+)`)?.[1]
  const isExternal = /^https?:\/\//.test(href)

  return (
    <GridCol span={span || 6}>
      <Group
        className={clsx(
          'cursor-pointer flex-nowrap items-center rounded-sm border-2 border-solid px-3 py-2 font-sans',
          isActive
            ? 'border-ma bg-gray-50 text-gray-800'
            : 'border-gray-50 bg-gray-50 shadow hover:border-gray-100 hover:bg-gray-100'
        )}
        onClick={() => {
          router.push(href)
          document
            .querySelector('.layout-header__popup-target')
            ?.dispatchEvent(new MouseEvent('click', { bubbles: true }))
        }}
      >
        <Text inherit>{children}</Text>
        {isExternal ? (
          <IconExternalLink size={20} className="raw ml-auto" />
        ) : isActive ? (
          <IconMapPinFilled size={18} className="raw text-ma ml-auto" />
        ) : (
          <IconChevronRight size={20} className="raw ml-auto" />
        )}
      </Group>
    </GridCol>
  )
}

function DynamicNavBlock(props: { title: ReactNode; children: ReactNode }) {
  return (
    <Stack gap={4}>
      <Text className="cursor-default" inherit>
        {props.title}
      </Text>

      <Grid gutter="sm" p={4}>
        {props.children}
      </Grid>
    </Stack>
  )
}

function DynamicNav(props: { section?: (typeof fixedNav)[0] }) {
  const { section } = props

  const isDynamic = useMemo(() => !fixedNav.find(item => item === section), [section])

  return (
    <Popover width={400} shadow="md" arrowSize={10} withArrow>
      <PopoverTarget>
        <Text className="layout-header__popup-target" inherit>
          {isDynamic && section ? section.label : <IconGridDots size={18} className="mx-1" />}
          {isDynamic && section ? <IconCaretDownFilled size={18} className="ml-1" /> : null}
        </Text>
      </PopoverTarget>

      <PopoverDropdown className="rounded-md font-serif text-sm text-gray-700">
        <Stack gap={36}>
          <DynamicNavBlock title="更多页面">
            {foldNav.map(item => (
              <DynamicNavLink key={item.value} href={item.value}>
                {item.label}
              </DynamicNavLink>
            ))}
          </DynamicNavBlock>

          <DynamicNavBlock title="PaperPlane 在线服务">
            <DynamicNavLink href="https://console.paperplane.cc/gpt">GPT 5</DynamicNavLink>
            <DynamicNavLink href="https://console.paperplane.cc/robot">OA 机器人</DynamicNavLink>
          </DynamicNavBlock>
        </Stack>
      </PopoverDropdown>
    </Popover>
  )
}

export default function HeaderSectionSelector(props: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()

  const section = useMemo(() => {
    return allNav.find(item => item.value === pathname.match(`^(/[^/]+)`)?.[1]) || fixedNav[0]
  }, [pathname])

  const navs = useMemo(
    () => [...fixedNav, { label: <DynamicNav section={section} />, value: '#' }],
    [section]
  )

  const value = useMemo(
    () => (fixedNav.find(item => item === section) ? section.value : '#'),
    [section]
  )

  useEffect(() => void allNav.forEach(item => void router.prefetch(item.value)), [router])

  return (
    <Stack className={clsx(props.className)} gap={8} align="start">
      <SegmentedControl
        color="lb"
        size="sm"
        radius="xl"
        value={value}
        onChange={newValue => {
          if (newValue !== '#') {
            router.push(newValue)
          }
        }}
        withItemsBorders={false}
        classNames={{
          label: 'px-4',
          indicator: 'bg-gradient-to-r from-ma to-lb',
        }}
        data={navs}
      />

      <Link href={section.value}>
        <Text
          className="font-serif"
          gradient={{ from: 'ma', to: 'lb' }}
          size="xl"
          component="span"
          variant="gradient"
        >
          PaperPlane {section.title}
        </Text>
      </Link>
    </Stack>
  )
}
