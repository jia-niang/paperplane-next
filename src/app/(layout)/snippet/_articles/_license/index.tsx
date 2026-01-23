import { SnippetCatelog } from '../../list'

export const license: SnippetCatelog = {
  name: 'LICENSE 许可',
  key: 'license',
  icon: require('@/assets/snippet-icons/license.svg').default,
  article: [
    { key: 'intro', title: '什么是开源许可', component: require('./intro.mdx').default },
    { key: 'mit', title: 'MIT 许可', component: require('./mit.mdx').default },
  ],
}
