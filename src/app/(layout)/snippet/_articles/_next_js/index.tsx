import { SnippetCatelog } from '../../list'

export const next_js: SnippetCatelog = {
  name: 'Next.js',
  key: 'next_js',
  icon: require('@/assets/snippet-icons/nextjs.svg').default,
  article: [
    { key: 'basic', title: '基础配置', component: require('./basic.mdx').default },
    { key: 'cdn', title: '静态资源 CDN', component: require('./cdn.mdx').default },
    { key: 'image', title: '图片资源 CDN', component: require('./image.mdx').default },
    { key: 'markdown', title: 'Markdown 渲染', component: require('./markdown.mdx').default },
  ],
}
