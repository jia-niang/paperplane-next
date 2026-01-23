import { SnippetCatelog } from '../../list'

export const typescript: SnippetCatelog = {
  name: 'TypeScript',
  key: 'typeScript',
  icon: require('@/assets/snippet-icons/typescript.svg').default,
  article: [
    { key: 'react', title: 'React 前端', component: require('./react.mdx').default },
    { key: 'publish', title: '发布 npm 包', component: require('./publish.mdx').default },
    { key: 'decorator', title: '“@” 修饰符', component: require('./decorator.mdx').default },
  ],
}
