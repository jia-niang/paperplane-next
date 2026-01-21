import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import {
  NestjsTag,
  PostgreSQLTag,
  PrismaTag,
  ReactTag,
  RedisTag,
  TDesignTag,
} from '@/components/tags/TechTag'

import { DemosDetailTable } from '../DemosDetailTable'
import Desc from './Desc.mdx'

export default function CITechSharePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>PaperPlane Web Console</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://console.paperplane.cc"
        hrefHighlight="console."
        repo="chiskat/paperplane-web-console"
        tech={[ReactTag, TDesignTag, NestjsTag, PrismaTag, PostgreSQLTag, RedisTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
