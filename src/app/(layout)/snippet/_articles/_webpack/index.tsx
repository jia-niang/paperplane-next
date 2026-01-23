import { SnippetCatelog } from '../../list'

export const webpack: SnippetCatelog = {
  name: 'Webpack',
  key: 'webpack',
  icon: require('@/assets/snippet-icons/webpack.svg').default,
  article: [
    { key: 'common', title: '常用', component: require('./common.mdx').default },
    { key: 'cdn', title: '静态资源 CDN', component: require('./cdn.mdx').default },
    { key: 'sass', title: 'Sass', component: require('./sass.mdx').default },
    { key: 'less', title: 'Less', component: require('./less.mdx').default },
    { key: 'antdv4', title: 'antd@4', component: require('./antdv4.mdx').default },
  ],
}
