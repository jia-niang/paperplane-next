import GlobalLayout from '@/components/layouts/GlobalLayout'

export default async function RootUILayout({ children, modal }: LayoutProps<'/'>) {
  return (
    <GlobalLayout>
      {children}
      {modal}
    </GlobalLayout>
  )
}
