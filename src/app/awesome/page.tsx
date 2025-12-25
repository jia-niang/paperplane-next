'use client'

import { Button, Grid, GridCol, Group, SegmentedControl, Stack, TextInput } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconListTree, IconMenu2, IconSearch } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

import GradientTitle from '@/components/labels/GradientTitle'
import { useLoginUser } from '@/lib/auth-client'

import Catelog from './Catelog/Catelog'
import CatelogEditButton from './Catelog/CatelogEditButton'
import List from './List/List'
import ListItemEditButton from './List/ListItemEditButton'
import TagPanelButton from './Tag/TagPanelButton'
import { useAwesome } from './state'

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
  const { edit, catelogExpand, setEdit, setSearch, setCatelogExpand } = useAwesome()
  const { data: user } = useLoginUser()

  const debouncedSetSearch = useDebouncedCallback(setSearch, 200)
  const searchTextChangeHandler = (input: string) => {
    setSearchText(input)
    debouncedSetSearch(input)
  }

  useEffect(() => void useAwesome.getState().reset(), [user])

  return (
    <Stack pos="relative">
      <Grid pos="sticky" gutter="lg" top={headerTop} left={0} h={headerHeight}>
        <GridCol span={2}>
          <Group>
            <GradientTitle>类别：</GradientTitle>
            {edit ? (
              <CatelogEditButton size="compact" variant="light" className="ml-auto">
                添加类别
              </CatelogEditButton>
            ) : (
              <SegmentedControl
                value={catelogExpand ? 'expand' : 'fold'}
                onChange={value => void setCatelogExpand(value === 'expand')}
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
              disabled={edit}
            />

            {user ? (
              <Group gap={8} className="ml-auto">
                <ListItemEditButton size="compact" variant="light">
                  添加 Awesome
                </ListItemEditButton>

                {edit ? (
                  <TagPanelButton size="compact" variant="light">
                    管理标签
                  </TagPanelButton>
                ) : null}

                {edit ? (
                  <Button
                    size="compact"
                    variant="light"
                    color="yellow"
                    onClick={() => void setEdit(false)}
                  >
                    退出编辑模式
                  </Button>
                ) : (
                  <Button
                    size="compact"
                    variant="light"
                    onClick={() => {
                      setSearch('')
                      setEdit(true)
                    }}
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
