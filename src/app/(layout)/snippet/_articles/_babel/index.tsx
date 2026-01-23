import { SnippetCatelog } from '../../list'

export const babel: SnippetCatelog = {
  name: 'Babel',
  key: 'babel',
  icon: require('@/assets/snippet-icons/babel.svg').default,
  article: [
    { key: 'antd', title: 'antd@4', component: require('./antd.mdx').default },
    { key: 'mui', title: 'MUI', component: require('./mui.mdx').default },
    { key: 'cra', title: 'Create React App', component: require('./cra.mdx').default },
    { key: 'lib', title: '其它库', component: require('./lib.mdx').default },
  ],
}
