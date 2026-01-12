import { Grid, GridCol, Stack } from '@mantine/core'

import { SnippetCatelog } from './SnippetCatelog'
import { catelogs } from './list'

export default function SnippetLayout(props: LayoutProps<'/snippet'>) {
  return (
    <Grid gutter={48}>
      <GridCol pos="relative" span={3}>
        <Stack pos="sticky" top={130 + 16} left={0} gap={2}>
          {catelogs.map(item => (
            <SnippetCatelog
              name={item.name}
              href={`/${item.key}`}
              icon={item.icon}
              key={item.key}
            />
          ))}
        </Stack>
      </GridCol>

      <GridCol span={9}>{props.children}</GridCol>
    </Grid>
  )
}
