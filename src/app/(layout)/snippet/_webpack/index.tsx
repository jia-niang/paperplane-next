import { SnippetArticleCatelog } from '../list'
import antdv4 from './antdv4.mdx'
import cdn from './cdn.mdx'
import common from './common.mdx'
import less from './less.mdx'
import sass from './sass.mdx'

export const webpack: SnippetArticleCatelog[] = [
  { key: 'common', title: '常用', component: common },
  { key: 'cdn', title: '静态资源 CDN', component: cdn },
  { key: 'sass', title: 'Sass', component: sass },
  { key: 'less', title: 'Less', component: less },
  { key: 'antdv4', title: 'antd@4', component: antdv4 },
]
