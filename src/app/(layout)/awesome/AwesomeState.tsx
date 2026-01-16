'use client'

import mitt from 'mitt'
import { PropsWithChildren, useEffect } from 'react'
import { create, ExtractState } from 'zustand'

import { useSession } from '@/lib/auth-client'

export const useAwesome = create(() => ({
  edit: null as null | 'edit' | 'sort',
  catelogExpand: false,
  search: '',
}))

export type UseAwesome = ExtractState<typeof useAwesome>

export const awesomeScrollIntoViewEmitter = mitt<{ selectId: string }>()

export default function AwesomeState({ children }: PropsWithChildren) {
  const { user } = useSession()
  const edit = useAwesome(s => s.edit)

  useEffect(() => {
    if (!user && edit) {
      useAwesome.setState({ edit: null })
    }
  }, [edit, user])

  return children
}
