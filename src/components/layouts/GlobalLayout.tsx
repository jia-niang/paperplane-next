import { AppShell, AppShellHeader, AppShellMain, Container, Flex } from '@mantine/core'
import { type ReactNode } from 'react'

import UserStatus from '../user/UserStatus'
import HeaderSectionSelector from './HeaderSectionSelector'

export default function GlobalLayout(props: { children: ReactNode }) {
  return (
    <AppShell padding="md" header={{ height: 130 }} offsetScrollbars={false}>
      <AppShellHeader
        py={16}
        zIndex={100}
        style={{
          background: `rgba(255, 255, 255, 0.7)`,
          backgroundColor: 'transparent',
          backgroundImage: 'radial-gradient(transparent 1px, #fff 1px)',
          backgroundSize: '4px 4px',
          backdropFilter: 'blur(3px)',
          mask: 'linear-gradient(rgb(0, 0, 0) 80%, rgba(0, 0, 0, 0) 100%)',
          opacity: 1,
          transition: 'all 0.2s ease-out',
          paddingLeft: 'calc(100vw - 100%)',
        }}
      >
        <Container size="responsive">
          <Flex>
            <HeaderSectionSelector />
            <UserStatus className="ml-auto" />
          </Flex>
        </Container>
      </AppShellHeader>

      <AppShellMain>
        <Container size="responsive">{props.children}</Container>
      </AppShellMain>
    </AppShell>
  )
}
