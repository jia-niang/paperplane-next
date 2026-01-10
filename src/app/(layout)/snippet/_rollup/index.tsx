import { SnippetArticleCatelog } from '../list'
import external from './external.mdx'
import node from './node.mdx'
import typescript from './typescript.mdx'

export const rollup: SnippetArticleCatelog[] = [
  { key: 'typescript', title: 'TypeScript 包', component: typescript },
  { key: 'external', title: '外部依赖', component: external },
  { key: 'node', title: 'Node.js 包', component: node },
]
