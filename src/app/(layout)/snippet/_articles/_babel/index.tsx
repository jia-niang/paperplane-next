import { SnippetArticleCatelog } from '../../list'
import antd from './antd.mdx'
import cra from './cra.mdx'
import lib from './lib.mdx'
import mui from './mui.mdx'

export const babel: SnippetArticleCatelog[] = [
  { key: 'antd', title: 'antd', component: antd },
  { key: 'mui', title: 'MUI', component: mui },
  { key: 'cra', title: 'Create React App', component: cra },
  { key: 'lib', title: '其它库', component: lib },
]
