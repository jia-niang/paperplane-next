'use client'

import { Button, Grid, GridCol, Group, Stack, TextInput } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'

import GradientTitle from '@/components/labels/GradientTitle'
import { useLoginUser } from '@/lib/auth-client'

import Catelog from './Catelog/Catelog'
import CatelogEditButton from './Catelog/CatelogEditButton'
import List from './List/List'
import ListItemEditButton from './List/ListItemEditButton'
import Tag from './Tag/Tag'
import TagEditButton from './Tag/TagEditButton'
import { useAwesome } from './state'

const headerTop = 130 + 16
const headerHeight = 50

const listTop = headerTop + headerHeight + 16
const listHeight = `calc(100vh - ${listTop + 32}px)`

export default function AwesomePage() {
  const [searchText, setSearchText] = useState('')
  const { edit, setEdit, setSearch, setTags } = useAwesome()
  const { data: user } = useLoginUser()

  const debouncedSetSearch = useDebouncedCallback(setSearch, 200)
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
            {edit ? (
              <CatelogEditButton size="compact" variant="light" className="ml-auto">
                添加类别
              </CatelogEditButton>
            ) : null}
          </Group>
        </GridCol>

        <GridCol span={8}>
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
                      setTags([])
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

        <GridCol span={2}>
          <Group>
            <GradientTitle>标签：</GradientTitle>
            {edit ? (
              <TagEditButton size="compact" variant="light" className="ml-auto">
                添加标签
              </TagEditButton>
            ) : null}
          </Group>
        </GridCol>
      </Grid>

      <Grid pos="sticky" gutter="lg" top={listTop} left={0}>
        <GridCol span={2}>
          <Catelog scrollHeight={listHeight} />
        </GridCol>

        <GridCol span={8} pr={24}>
          <List scrollHeight={listHeight} />
        </GridCol>

        <GridCol span={2}>
          <Tag scrollHeight={listHeight} />
        </GridCol>
      </Grid>
    </Stack>
  )
}
