import { SnippetArticleCatelog } from '../../list'
import decorator from './decorator.mdx'
import publish from './publish.mdx'
import react from './react.mdx'

export const typescript: SnippetArticleCatelog[] = [
  { key: 'react', title: 'React 前端', component: react },
  { key: 'publish', title: '发布 npm 包', component: publish },
  { key: 'decorator', title: '“@” 修饰符', component: decorator },
]
