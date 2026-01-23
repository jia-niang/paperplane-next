import { SnippetCatelog } from '../../list'

export const command: SnippetCatelog = {
  name: '常用命令行',
  key: 'command',
  icon: require('@/assets/snippet-icons/terminal.svg').default,
  article: [
    { key: 'npm', title: 'npm', component: require('./npm.mdx').default },
    { key: 'pnpm', title: 'pnpm', component: require('./pnpm.mdx').default },
    { key: 'yarn', title: 'yarn', component: require('./yarn.mdx').default },
    { key: 'git', title: 'Git', component: require('./git.mdx').default },
    { key: 'macos', title: 'macOS', component: require('./macos.mdx').default },
    { key: 'windows', title: 'Windows', component: require('./windows.mdx').default },
    { key: 'linux', title: 'Linux', component: require('./linux.mdx').default },
  ],
}
