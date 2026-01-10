import { SnippetArticleCatelog } from '../list'
import intro from './intro.mdx'
import mit from './mit.mdx'

export const license: SnippetArticleCatelog[] = [
  { key: 'intro', title: '什么是开源许可', component: intro },
  { key: 'mit', title: 'MIT 许可', component: mit },
]
