import { Divider, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import { CRATag, MuiTag, ReactTag } from '@/components/tags/TechTag'

import { OpenDetailTable } from '../details'
import Desc from './Desc.mdx'

const name = '@paperplane/cra-template-mui'
const repo = 'paperplane-npm/cra-template-mui'
const giteaRepo = 'project-templates/cra-template-mui'

export default function CraTemplateMuiPage() {
  return (
    <Stack gap={12}>
      <GradientTitle>{name}</GradientTitle>
      <Divider />
      <OpenDetailTable
        type="npm"
        name={name}
        repo={repo}
        giteaRepo={giteaRepo}
        tech={[ReactTag, CRATag, MuiTag]}
      />
      <Divider />
      <Desc />
    </Stack>
  )
}
