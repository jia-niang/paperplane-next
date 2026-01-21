import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { MantineTag, NextjsTag, PostgreSQLTag, PrismaTag, TRPCTag } from '@/components/tags/TechTag'

import { DemosDetailTable } from '../DemosDetailTable'
import Desc from './Desc.mdx'

export default function CITechSharePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>PaperPlane Next (本站)</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://paperplane.cc/a"
        hrefHighlight="/a"
        repo="chiskat/paperplane-next"
        tech={[NextjsTag, MantineTag, TRPCTag, PrismaTag, PostgreSQLTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
