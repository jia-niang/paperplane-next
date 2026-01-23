import { SnippetCatelog } from '../../list'

export const tailwindcss: SnippetCatelog = {
  name: 'TailwindCSS',
  key: 'tailwindcss',
  icon: require('@/assets/snippet-icons/tailwindcss.svg').default,
  article: [
    { key: 'config', title: 'tailwind.config.js', component: require('./config.mdx').default },
  ],
}
