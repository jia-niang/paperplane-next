import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { ElementTag, MongoDBTag, RestifyTag, VueTag } from '@/components/tags/TechTag'

import { DemosDetailTable } from '../DemosDetailTable'
import Desc from './Desc.mdx'

export default function CFDAPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>食药监局监管平台</GradientTitle>
      <Divider />
      <DemosDetailTable
        href="https://cfda.paperplane.cc"
        hrefHighlight="cfda."
        repo="chiskat/cfda-app"
        backendRepo="chiskat/cfda-api"
        tech={[VueTag, ElementTag, RestifyTag, MongoDBTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
