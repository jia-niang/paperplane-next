import { SnippetCatelog } from '../../list'

export const eslint: SnippetCatelog = {
  name: 'ESLint',
  key: 'eslint',
  icon: require('@/assets/snippet-icons/eslint.svg').default,
  article: [
    { key: 'intro', title: '配置说明', component: require('./intro.mdx').default },
    { key: 'react', title: 'React + TS', component: require('./react.mdx').default },
    { key: 'typescript', title: 'TypeScript', component: require('./typescript.mdx').default },
    { key: 'monorepo', title: 'Monorepo 示例', component: require('./monorepo.mdx').default },
    { key: 'v8', title: '旧版 v8', component: require('./v8.mdx').default },
  ],
}
