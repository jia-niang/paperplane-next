import { SnippetCatelog } from '../../list'

export const vite: SnippetCatelog = {
  name: 'Vite',
  key: 'vite',
  icon: require('@/assets/snippet-icons/vite.svg').default,
  article: [
    { key: 'react', title: 'React', component: require('./react.mdx').default },
    { key: 'cdn', title: '静态资源 CDN', component: require('./cdn.mdx').default },
    { key: 'css', title: 'CSS 预处理器', component: require('./css.mdx').default },
    { key: 'env', title: '环境变量', component: require('./env.mdx').default },
  ],
}
