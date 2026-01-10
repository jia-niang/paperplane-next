'use client'

import { Modal } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import ShortDetail from '@/app/(layout)/short/_short-info/ShortDetail'
import { useTRPC } from '@/lib/trpc-client'

export default function ShortInfoModal(props: PageProps<'/short/[key]'>) {
  const { key } = use(props.params)
  const router = useRouter()
  const trpc = useTRPC()

  const [opened, setOpened] = useState(false)
  const { data: short, isPending } = useQuery(trpc.short.items.get.queryOptions({ key }))

  useEffect(() => {
    if (!isPending) {
      setTimeout(() => void setOpened(true), 0)
    }
  }, [isPending])

  const closeHandler = () => {
    setOpened(false)
    setTimeout(() => void router.back(), 200)
  }

  return (
    <Modal
      title="关于此短链接"
      opened={opened}
      overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      transitionProps={{ duration: 200 }}
      onClose={closeHandler}
    >
      {short ? <ShortDetail short={short} onDelete={closeHandler} /> : null}
    </Modal>
  )
}
