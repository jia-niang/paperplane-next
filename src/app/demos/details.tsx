import { Group, Highlight } from '@mantine/core'
import { IconCpu, IconFileCode, IconHome, IconServer } from '@tabler/icons-react'
import Link from 'next/link'
import { FC } from 'react'

import { KVTable, KVTableRow } from '@/components/tables/KVTable'
import { GiteaLink, GitHubLink } from '@/components/tags/TechLink'

export interface DemosDetailTableProps {
  href: string
  hrefHighlight?: string
  repo: string
  backendRepo?: string
  tech?: FC | FC[]
}

export function DemosDetailTable(props: DemosDetailTableProps) {
  const { href, hrefHighlight, repo, backendRepo, tech } = props

  return (
    <KVTable>
      <KVTableRow label="地址" icon={<IconHome />}>
        <Link href={href}>
          <Highlight
            component="span"
            highlightStyles={{ padding: '0 3px', margin: '0 3px', borderRadius: '4px' }}
            highlight={hrefHighlight || []}
            c="gray.6"
            ff="sans-serif"
            className="-ml-1 cursor-default text-sm hover:cursor-pointer hover:underline"
            lh={1.2}
            inherit
          >
            {href.replace('https://', '')}
          </Highlight>
        </Link>
      </KVTableRow>

      <KVTableRow label={backendRepo ? '前端源码' : '源码'} icon={<IconFileCode />}>
        <Group gap={16}>
          <GitHubLink repo={repo} />
          <GiteaLink repo={repo} />
          <a href={`https://drone.paperplane.cc/${repo}`} target="_blank">
            <img
              className="h-[20px]"
              src={`https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/drone/build/${repo}?server=https%3A%2F%2Fdrone.paperplane.cc&style=flat&logo=drone`}
              alt="CI/CD status"
            />
          </a>
        </Group>
      </KVTableRow>

      {backendRepo ? (
        <KVTableRow label="后端源码" icon={<IconServer />}>
          <Group gap={16}>
            <GitHubLink repo={backendRepo} />
            <GiteaLink repo={backendRepo} />
            <a href={`https://drone.paperplane.cc/${backendRepo}`} target="_blank">
              <img
                className="h-[20px]"
                src={`https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/drone/build/${backendRepo}?server=https%3A%2F%2Fdrone.paperplane.cc&style=flat&logo=drone`}
                alt="CI/CD status"
              />
            </a>
          </Group>
        </KVTableRow>
      ) : null}

      {tech ? (
        <KVTableRow
          label="技术栈"
          icon={<IconCpu />}
          labelClassName="align-top"
          fieldClassName="align-top"
        >
          <Group gap={12} mt={-2}>
            {(Array.isArray(tech) ? tech : [tech]).map(Item => (
              <Item key={Item.name} />
            ))}
          </Group>
        </KVTableRow>
      ) : null}
    </KVTable>
  )
}
