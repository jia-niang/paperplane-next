import { SnippetCatelog } from '../../list'

export const rollup: SnippetCatelog = {
  name: 'Rollup',
  key: 'rollup',
  icon: require('@/assets/snippet-icons/rollup.svg').default,
  article: [
    { key: 'typescript', title: 'TypeScript 包', component: require('./typescript.mdx').default },
    { key: 'external', title: '外部依赖', component: require('./external.mdx').default },
    { key: 'node', title: 'Node.js 包', component: require('./node.mdx').default },
  ],
}
