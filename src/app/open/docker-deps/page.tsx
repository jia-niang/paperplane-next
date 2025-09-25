import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { DockerTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = 'docker-deps'
const repo = 'jia-niang/docker-deps'

export default function DockerDepsPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable type="npm" name={name} repo={repo} tech={[DockerTag]} />
      <Divider />
      <Desc />
    </Stack>
  )
}
