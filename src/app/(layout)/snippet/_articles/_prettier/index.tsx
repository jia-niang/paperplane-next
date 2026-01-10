import { SnippetArticleCatelog } from '../../list'
import prettierignore from './prettierignore.mdx'
import prettierrc from './prettierrc.mdx'
import sort from './sort.mdx'

export const prettier: SnippetArticleCatelog[] = [
  { key: 'prettierrc', title: '.prettierrc', component: prettierrc },
  { key: 'sort', title: 'import 排序插件', component: sort },
  { key: 'prettierignore', title: '.prettierignore', component: prettierignore },
]
