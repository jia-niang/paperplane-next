'use client'

import { Grid, GridCol } from '@mantine/core'

import ShortApi from './ShortApi'
import ShortForm from './ShortForm'
import ShortList from './ShortList'

export default function ShortPage() {
  return (
    <Grid gutter={32}>
      <GridCol span={4}>
        <ShortList />
      </GridCol>

      <GridCol span={4}>
        <ShortForm />
      </GridCol>

      <GridCol span={4}>
        <ShortApi />
      </GridCol>
    </Grid>
  )
}
