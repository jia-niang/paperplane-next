import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { AntDTag, CRATag, ReactTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = '@paperplane/cra-template-antd'
const repo = 'paperplane-npm/cra-template-antd'
const giteaRepo = 'project-templates/cra-template-antd'

export default function CraTemplateAntdPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable
        type="npm"
        name={name}
        repo={repo}
        giteaRepo={giteaRepo}
        tech={[ReactTag, CRATag, AntDTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
