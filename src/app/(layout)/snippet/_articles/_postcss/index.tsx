import { SnippetCatelog } from '../../list'

export const postcss: SnippetCatelog = {
  name: 'PostCSS',
  key: 'postcss',
  icon: require('@/assets/snippet-icons/postcss.svg').default,
  article: [
    { key: 'config', title: 'postcss.config.js', component: require('./config.mdx').default },
  ],
}
