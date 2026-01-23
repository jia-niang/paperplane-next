import { SnippetCatelog } from '../../list'

export const npm: SnippetCatelog = {
  name: 'npm',
  key: 'npm',
  icon: require('@/assets/snippet-icons/npm.svg').default,
  article: [{ key: 'npmrc', title: '.npmrc', component: require('./npmrc.mdx').default }],
}
