import { SnippetCatelog } from '../../list'

export const vscode: SnippetCatelog = {
  name: 'VSCode',
  key: 'vscode',
  icon: require('@/assets/snippet-icons/vscode.svg').default,
  article: [
    { key: 'global', title: '全局设置', component: require('./global.mdx').default },
    { key: 'project', title: '项目设置', component: require('./project.mdx').default },
  ],
}
