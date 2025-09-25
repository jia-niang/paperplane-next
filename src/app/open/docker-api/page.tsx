import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { DockerTag, NodejsTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = 'paperplanecc/docker-api'
const repo = 'paperplane-docker/docker-api'

export default function DockerApiPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable type="docker" name={name} repo={repo} tech={[NodejsTag, DockerTag]} />
      <Divider />
      <Desc />
    </Stack>
  )
}
