import { SnippetCatelog } from '../../list'

export const prettier: SnippetCatelog = {
  name: 'Prettier',
  key: 'prettier',
  icon: require('@/assets/snippet-icons/prettier.svg').default,
  article: [
    { key: 'prettierrc', title: '.prettierrc', component: require('./prettierrc.mdx').default },
    { key: 'sort', title: 'import 排序插件', component: require('./sort.mdx').default },
    {
      key: 'prettierignore',
      title: '.prettierignore',
      component: require('./prettierignore.mdx').default,
    },
  ],
}
