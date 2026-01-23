import { SnippetCatelog } from '../../list'

export const package_json: SnippetCatelog = {
  name: 'package.json',
  key: 'package_json',
  icon: require('@/assets/snippet-icons/nodejs.svg').default,
  article: [
    { key: 'project', title: '通常项目', component: require('./project.mdx').default },
    { key: 'publish', title: '发布 npm 包', component: require('./publish.mdx').default },
  ],
}
