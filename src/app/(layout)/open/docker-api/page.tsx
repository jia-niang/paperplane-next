import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { DockerTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../OpenDetailTable'
import Desc from './Desc.mdx'

const name = 'paperplanecc/docker-api'
const repo = 'paperplane-docker/docker-api'

export default function DockerApiPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable type="docker" name={name} repo={repo} tech={[DockerTag]} />
      <Divider />
      <Desc />
    </Stack>
  )
}
