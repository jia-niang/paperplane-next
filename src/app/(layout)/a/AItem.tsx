import { Divider, Group, Image, Stack, Text, Highlight } from '@mantine/core'
import { IconCpu, IconFileDescription, IconLink } from '@tabler/icons-react'
import NextImage from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { BlurPopupCard } from '@/components/cards/BlurPopupCard'
import { KVTable, KVTableRow } from '@/components/tables/KVTable'
import { DroneLink, GiteaLink, GitHubLink } from '@/components/tags/TechLink'

export interface AItemProps {
  title: string
  icon: string
  href: string
  hrefHighlight?: string | string[]
  desc?: string
  tech?: FC | FC[]
  repo?: string
  repoOrg?: string
}

export default function AItem(props: AItemProps) {
  const { title, icon, href, desc, hrefHighlight, tech, repo, repoOrg } = props

  const popup = (
    <Stack mt={12} gap={8}>
      <Divider />

      <KVTable>
        <KVTableRow label="地址" icon={<IconLink />}>
          <a href={href} target="_blank">
            <Highlight
              component="span"
              highlightStyles={{ padding: '0 3px', margin: '0 3px', borderRadius: '4px' }}
              highlight={hrefHighlight || []}
              className="underline"
              inherit
            >
              {href.replace('https://', '')}
            </Highlight>
          </a>
        </KVTableRow>

        {repo ? (
          <KVTableRow label="源码" icon={<IconFileDescription />}>
            <Group gap={16}>
              <GitHubLink repo={`${repoOrg || 'chiskat'}/${repo}`} />
              <GiteaLink repo={`${repoOrg || 'chiskat'}/${repo}`} />
              <DroneLink repo={`${repoOrg || 'chiskat'}/${repo}`} />
            </Group>
          </KVTableRow>
        ) : null}

        {tech ? (
          <KVTableRow label="技术栈" icon={<IconCpu />}>
            <Group gap={12}>
              {(Array.isArray(tech) ? tech : [tech]).map(Item => (
                <Item key={Item.name} />
              ))}
            </Group>
          </KVTableRow>
        ) : null}
      </KVTable>
    </Stack>
  )

  return (
    <BlurPopupCard right={-120} popupChildren={popup}>
      <Link href={href} target="_blank">
        <Group gap="sm" className="shrink-0 cursor-pointer flex-nowrap">
          <Image
            fit="contain"
            h={48}
            w={48}
            component={NextImage}
            src={icon}
            alt={`${title} icon`}
          />
          <Stack gap={0}>
            <Text lh="1.3" c="gray.7" className="font-serif">
              {title}
            </Text>
            <Group>
              {desc ? (
                <Text lh="1.3" ff="sans-serif" c="gray.6" size="sm">
                  {desc}
                </Text>
              ) : null}
            </Group>
          </Stack>
        </Group>
      </Link>
    </BlurPopupCard>
  )
}
