import { SnippetCatelog } from '../../list'

export const editorconfig: SnippetCatelog = {
  name: 'EditorConfig',
  key: 'editorconfig',
  icon: require('@/assets/snippet-icons/editorconfig.svg').default,
  article: [
    {
      key: 'editorconfig',
      title: '.editorconfig',
      component: require('./editorconfig.mdx').default,
    },
  ],
}
