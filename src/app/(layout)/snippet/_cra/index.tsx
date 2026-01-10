import { SnippetArticleCatelog } from '../list'
import babel from './babel.mdx'
import css from './css.mdx'
import intro from './intro.mdx'
import webpack from './webpack.mdx'

export const cra: SnippetArticleCatelog[] = [
  { key: 'intro', title: '配置说明', component: intro },
  { key: 'babel', title: 'Babel', component: babel },
  { key: 'webpack', title: 'Webpack', component: webpack },
  { key: 'css', title: 'CSS 预处理器', component: css },
]
