import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { VueTag } from '@/components/tags/TechTag'

import { DemosDetailTable } from '../details'
import Desc from './Desc.mdx'

export default function KinyPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>凯尼科技</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://kiny.paperplane.cc"
        hrefHighlight="kiny."
        repo="jia-niang/kiny-tech"
        tech={[VueTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
