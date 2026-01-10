import { SnippetArticleCatelog } from '../list'
import git from './git.mdx'
import macos from './macos.mdx'
import npm from './npm.mdx'
import windows from './windows.mdx'

export const command: SnippetArticleCatelog[] = [
  { key: 'npm', title: '配置 npm/yarn/pnpm', component: npm },
  { key: 'git', title: 'Git 相关', component: git },
  { key: 'macos', title: 'macOS 常用命令', component: macos },
  { key: 'windows', title: 'Windows 常用命令', component: windows },
]
