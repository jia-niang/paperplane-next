import { SnippetArticleCatelog } from '../list'
import basic from './basic.mdx'
import cdn from './cdn.mdx'
import image from './image.mdx'
import markdown from './markdown.mdx'

export const next_js: SnippetArticleCatelog[] = [
  { key: 'basic', title: '基础配置', component: basic },
  { key: 'cdn', title: '静态资源 CDN', component: cdn },
  { key: 'image', title: '图片资源 CDN', component: image },
  { key: 'markdown', title: 'Markdown 渲染', component: markdown },
]
