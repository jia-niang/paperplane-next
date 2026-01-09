import { PropsWithChildren, ReactNode } from 'react'

import GlobalLayout from '@/components/layouts/GlobalLayout'

export default async function RootUILayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <GlobalLayout>
      {children}
      {modal}
    </GlobalLayout>
  )
}
