import { SnippetCatelog } from '../../list'

export const cra: SnippetCatelog = {
  name: 'CreateReactApp',
  key: 'cra',
  icon: require('@/assets/snippet-icons/cra.svg').default,
  article: [
    { key: 'intro', title: '配置说明', component: require('./intro.mdx').default },
    { key: 'babel', title: 'Babel', component: require('./babel.mdx').default },
    { key: 'webpack', title: 'Webpack', component: require('./webpack.mdx').default },
    { key: 'css', title: 'CSS 预处理器', component: require('./css.mdx').default },
  ],
}
