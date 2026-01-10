'use client'

import { Stack } from '@mantine/core'

import OpenAPIDocs from '@/components/cards/OpenAPIDocs'

import ShortApiInputDocs from './ShortApiInputDocs.mdx'
import ShortApiOutputDocs from './ShortApiOutputDocs.mdx'

export default function ShortApi() {
  return (
    <Stack gap={16}>
      <OpenAPIDocs
        title="PaperPlane Short API"
        desc="通过 API 以程序化的方式获取短链接。"
        endpoint="/api/short"
        method="POST"
        inputDocs={ShortApiInputDocs}
        outputDocs={ShortApiOutputDocs}
        protect
      />
    </Stack>
  )
}
