import { Group, Highlight } from '@mantine/core'
import { IconCpu, IconFileDescription, IconHome, IconVersions } from '@tabler/icons-react'
import { FC } from 'react'

import { KVTable, KVTableRow } from '@/components/tables/KVTable'
import { DockerHubLink, GiteaLink, GitHubLink, NpmLink } from '@/components/tags/TechLink'

export interface OpenDetailTableProps {
  type: 'docker' | 'npm'
  name: string
  repo: string
  giteaRepo?: string
  tech?: FC | FC[]
  overrideNameInLink?: string
}

export function OpenDetailTable(props: OpenDetailTableProps) {
  const { type, name, repo, giteaRepo = repo, tech, overrideNameInLink } = props

  const nameInLink = overrideNameInLink || name

  return (
    <KVTable>
      <KVTableRow label="主页" icon={<IconHome />}>
        {type === 'docker' ? (
          <DockerHubLink repo={nameInLink}>
            <Highlight
              highlight={`/` + nameInLink}
              component="span"
              highlightStyles={{ padding: '0 4px', margin: '0 3px', borderRadius: '4px' }}
              inherit
            >{`hub.docker.com/r/${nameInLink}`}</Highlight>
          </DockerHubLink>
        ) : (
          <NpmLink repo={nameInLink}>
            <Highlight
              highlight={`/` + nameInLink}
              component="span"
              highlightStyles={{ padding: '0 4px', margin: '0 3px', borderRadius: '4px' }}
              inherit
            >{`npmjs.com/package/${nameInLink}`}</Highlight>
          </NpmLink>
        )}
      </KVTableRow>

      <KVTableRow
        label="源码"
        icon={<IconFileDescription />}
        classNames={{ field: 'align-middle' }}
      >
        <Group gap={16}>
          <GitHubLink repo={repo} />
          <GiteaLink repo={giteaRepo} />
        </Group>
      </KVTableRow>

      <KVTableRow label="版本" icon={<IconVersions />} classNames={{ field: 'align-middle' }}>
        <Group gap={12}>
          {type === 'docker' ? (
            <a href={`https://hub.docker.com/r/${nameInLink}`} target="_blank">
              <img
                src={`https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/docker/v/${nameInLink}?logo=docker&sort=semver`}
                alt="image version on docker hub"
                className="h-[20px]"
              />
            </a>
          ) : (
            <a href={`https://npmjs.com/package/${nameInLink}`} target="_blank">
              <img
                src={`https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/npm/v/${nameInLink}?logo=npm`}
                alt="package version on npm"
                className="h-[20px]"
              />
            </a>
          )}

          <a href={`https://drone.paperplane.cc/${giteaRepo}`} target="_blank">
            <img
              className="h-[20px]"
              src={`https://${process.env.NEXT_PUBLIC_SHIELDS_HOST}/drone/build/${giteaRepo}?server=https%3A%2F%2Fdrone.paperplane.cc&style=flat&logo=drone`}
              alt="CI/CD status"
            />
          </a>
        </Group>
      </KVTableRow>

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
  )
}
