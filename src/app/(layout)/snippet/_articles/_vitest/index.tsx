import { SnippetCatelog } from '../../list'

export const vitest: SnippetCatelog = {
  name: 'Vitest',
  key: 'vitest',
  icon: require('@/assets/snippet-icons/vitest.svg').default,
  article: [
    { key: 'basic', title: '基础配置', component: require('./basic.mdx').default },
    { key: 'msw', title: '模拟 HTTP 服务器', component: require('./msw.mdx').default },
    { key: 'server', title: 'Node.js 服务端', component: require('./server.mdx').default },
    { key: 'browser', title: '浏览器', component: require('./browser.mdx').default },
  ],
}
