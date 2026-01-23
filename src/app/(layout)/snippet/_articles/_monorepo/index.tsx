import { SnippetCatelog } from '../../list'

export const monorepo: SnippetCatelog = {
  name: 'Monorepo',
  key: 'monorepo',
  icon: require('@/assets/snippet-icons/monorepo.svg').default,
  article: [{ key: 'config', title: '配置', component: require('./config.mdx').default }],
}
