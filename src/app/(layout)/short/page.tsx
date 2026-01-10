'use client'

import { Grid, GridCol } from '@mantine/core'

import ShortApi from './_short-api/ShortApi'
import ShortForm from './_short-info/ShortForm'
import ShortList from './_short-list/ShortList'

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
