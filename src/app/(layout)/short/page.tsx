'use client'

import { Grid, GridCol } from '@mantine/core'

import NeedLoginTips from '@/components/user/NeedLoginTips'
import { useSession } from '@/lib/auth-client'

import ShortForm from './ShortForm'
import ShortList from './ShortList'

export default function ShortPage() {
  const { user } = useSession()

  return (
    <Grid gutter={32}>
      <GridCol span={4}>
        <ShortList />
      </GridCol>

      <GridCol span={4}>
        {user ? <ShortForm /> : <NeedLoginTips title="登录后可创建短链接" />}
      </GridCol>
    </Grid>
  )
}
