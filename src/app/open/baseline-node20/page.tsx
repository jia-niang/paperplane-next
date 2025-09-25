import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { DockerTag, NodejsTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = 'paperplanecc/baseline-node20'
const repo = 'paperplane-docker/baseline-node20'

export default function PaperPlaneApiBasePage() {
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
