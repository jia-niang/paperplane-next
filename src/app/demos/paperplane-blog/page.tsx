import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { HexoTag, NodejsTag } from '@/components/tags/TechTag'

import { DemosDetailTable } from '../details'
import Desc from './Desc.mdx'

export default function CITechSharePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>纸飞机的信笺 技术博客</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://paperplane.cc"
        repo="jia-niang/paperplane-blog"
        tech={[HexoTag, NodejsTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
