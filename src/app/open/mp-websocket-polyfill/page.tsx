import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = 'mp-websocket-polyfill'
const repo = 'jia-niang/mp-websocket-polyfill'

export default function MpWebSocketPolyfillPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable type="npm" name={name} repo={repo} />
      <Divider />
      <Desc />
    </Stack>
  )
}
