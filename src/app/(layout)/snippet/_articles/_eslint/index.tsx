import { SnippetArticleCatelog } from '../../list'
import intro from './intro.mdx'
import monorepo from './monorepo.mdx'
import react from './react.mdx'
import typescript from './typescript.mdx'
import v8 from './v8.mdx'

export const eslint: SnippetArticleCatelog[] = [
  { key: 'intro', title: '配置说明', component: intro },
  { key: 'react', title: 'React + TS', component: react },
  { key: 'typescript', title: 'TypeScript', component: typescript },
  { key: 'monorepo', title: 'Monorepo 示例', component: monorepo },
  { key: 'v8', title: '旧版 v8', component: v8 },
]
