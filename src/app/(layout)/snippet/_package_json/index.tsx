import { SnippetArticleCatelog } from '../list'
import project from './project.mdx'
import publish from './publish.mdx'

export const package_json: SnippetArticleCatelog[] = [
  { key: 'project', title: '通常项目', component: project },
  { key: 'publish', title: '发布 npm 包', component: publish },
]
