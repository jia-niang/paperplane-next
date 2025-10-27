import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { DockerTag, NodejsTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = 'paperplanecc/baseline-node'
const repo = 'paperplane-docker/baseline-node'
const shieldName = name + '20'

export default function PaperPlaneApiBasePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable
        type="docker"
        name={name}
        repo={repo}
        tech={[NodejsTag, DockerTag]}
        overrideNameInLink={shieldName}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
