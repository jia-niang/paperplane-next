import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { WebpackTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../OpenDetailTable'
import Desc from './Desc.mdx'

const name = 'use-upgrade-webpack-plugin'
const repo = 'jia-niang/use-upgrade'

export default function UseUpgradeWebpackPluginPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable type="npm" name={name} repo={repo} tech={[WebpackTag]} />
      <Divider />
      <Desc />
    </Stack>
  )
}
