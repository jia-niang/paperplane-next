import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { DumiTag, ReactTag } from '@/components/tags/TechTag'

import { DemosDetailTable } from '../details'
import Desc from './Desc.mdx'

export default function CITechSharePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>Career Intl. Inc. 前端技术分享</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://careerintlinc-tech-share.paperplane.cc"
        hrefHighlight="careerintlinc-tech-share."
        repo="jia-niang/careerintlinc-tech-share"
        tech={[ReactTag, DumiTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
