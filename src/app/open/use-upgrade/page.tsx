import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { ReactTag, VueTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = 'use-upgrade'
const repo = 'jia-niang/use-upgrade'

export default function UseUpgradePage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable type="npm" name={name} repo={repo} tech={[ReactTag, VueTag]} />
      <Divider />
      <Desc />
    </Stack>
  )
}
