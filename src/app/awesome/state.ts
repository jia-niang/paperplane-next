import { create } from 'zustand'

interface UseAwesome {
  edit: boolean
  setEdit(edit: boolean): void

  tags: string[]
  setTags(tags: string[]): void
  selectTag(tagId: string): void
  cancelTag(tagId: string): void

  search: string
  setSearch(search: string): void
}

export const useAwesome = create<UseAwesome>()((set, get) => ({
  edit: false,
  setEdit: edit => void set({ edit }),

  tags: [],
  setTags: tags => void set({ tags }),
  selectTag: tagId => void set({ tags: [...get().tags, tagId] }),
  cancelTag: tagId => void set({ tags: get().tags.filter(item => item !== tagId) }),

  search: '',
  setSearch: (search: string) => void set({ search }),
}))
