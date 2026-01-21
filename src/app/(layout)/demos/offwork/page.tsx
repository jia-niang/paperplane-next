import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { AntDTag, ReactTag } from '@/components/tags/TechTag'

import { DemosDetailTable } from '../DemosDetailTable'
import Desc from './Desc.mdx'

export default function CITechSharePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>下班倒计时创意工具</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://offwork.paperplane.cc"
        hrefHighlight="offwork."
        repo="chiskat/offwork-time"
        tech={[ReactTag, AntDTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
