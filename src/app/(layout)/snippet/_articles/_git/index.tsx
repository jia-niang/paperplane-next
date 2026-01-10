import { SnippetArticleCatelog } from '../../list'
import gitattributes from './gitattributes.mdx'
import gitignore from './gitignore.mdx'

export const git: SnippetArticleCatelog[] = [
  { key: 'gitignore', title: '.gitignore', component: gitignore },
  { key: 'gitattributes', title: '.gitattributes', component: gitattributes },
]
