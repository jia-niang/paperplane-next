'use client'

import { Button, Grid, GridCol, Group, SegmentedControl, Stack, TextInput } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconListTree, IconMenu2, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

import GradientTitle from '@/components/labels/GradientTitle'
import { useSession } from '@/lib/auth-client'

import { useAwesome } from './AwesomeState'
import Catelog from './_catelog/Catelog'
import CatelogEditButton from './_catelog/CatelogEditButton'
import List from './_list/List'
import ListItemEditButton from './_list/ListItemEditButton'
import TagPanelButton from './_tag/TagPanelButton'

const headerTop = 130 + 16
const headerHeight = 50

const listTop = headerTop + headerHeight + 16
const listHeight = `calc(100vh - ${listTop + 32}px)`

const foldTogglerData = [
  { label: <IconMenu2 />, value: 'fold' },
  { label: <IconListTree />, value: 'expand' },
]

export default function AwesomePage() {
  const [searchText, setSearchText] = useState('')
  const edit = useAwesome(s => s.edit)
  const catelogExpand = useAwesome(s => s.catelogExpand)

  const { user } = useSession()

  const debouncedSetSearch = useDebouncedCallback(
    search => void useAwesome.setState({ search }),
    200
  )
  const searchTextChangeHandler = (input: string) => {
    setSearchText(input)
    debouncedSetSearch(input)
  }

  return (
    <Stack pos="relative">
      <Grid pos="sticky" gutter="lg" top={headerTop} left={0} h={headerHeight}>
        <GridCol span={2}>
          <Group>
            <GradientTitle>类别：</GradientTitle>
            {edit === 'edit' ? (
              <CatelogEditButton size="compact" variant="light" className="ml-auto">
                添加类别
              </CatelogEditButton>
            ) : (
              <SegmentedControl
                value={catelogExpand ? 'expand' : 'fold'}
                onChange={value => void useAwesome.setState({ catelogExpand: value === 'expand' })}
                data={foldTogglerData}
                size="xs"
                className="ml-auto"
              />
            )}
          </Group>
        </GridCol>

        <GridCol span={10}>
          <Group gap={8} pr={20}>
            <TextInput
              leftSectionPointerEvents="none"
              leftSection={<IconSearch className="raw" size={16} />}
              placeholder="搜索 Awesome"
              className="grow"
              value={searchText}
              onChange={e => void searchTextChangeHandler(e.target.value)}
              disabled={!!edit}
            />

            {user ? (
              <Group gap={8} className="ml-auto">
                <ListItemEditButton size="compact" variant="light">
                  添加 Awesome
                </ListItemEditButton>

                <TagPanelButton size="compact" variant="light">
                  管理标签
                </TagPanelButton>

                {edit === 'sort' ? (
                  <Button
                    size="compact"
                    variant="light"
                    color="yellow"
                    onClick={() => void useAwesome.setState({ edit: null })}
                  >
                    退出排序模式
                  </Button>
                ) : (
                  <Button
                    size="compact"
                    variant="light"
                    onClick={() => void useAwesome.setState({ search: '', edit: 'sort' })}
                  >
                    排序模式
                  </Button>
                )}

                {edit === 'edit' ? (
                  <Button
                    size="compact"
                    variant="light"
                    color="yellow"
                    onClick={() => void useAwesome.setState({ edit: null })}
                  >
                    退出编辑模式
                  </Button>
                ) : (
                  <Button
                    size="compact"
                    variant="light"
                    onClick={() => void useAwesome.setState({ search: '', edit: 'edit' })}
                  >
                    编辑模式
                  </Button>
                )}
              </Group>
            ) : null}
          </Group>
        </GridCol>
      </Grid>

      <Grid pos="sticky" gutter="lg" top={listTop} left={0}>
        <GridCol span={2}>
          <Catelog scrollHeight={listHeight} />
        </GridCol>

        <GridCol span={10} pr={24} py={0}>
          <List scrollHeight={listHeight} />
        </GridCol>
      </Grid>
    </Stack>
  )
}
