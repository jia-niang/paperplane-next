import { SnippetCatelog } from '../../list'

export const git: SnippetCatelog = {
  name: 'Git',
  key: 'git',
  icon: require('@/assets/snippet-icons/git.svg').default,
  article: [
    { key: 'gitignore', title: '.gitignore', component: require('./gitignore.mdx').default },
    {
      key: 'gitattributes',
      title: '.gitattributes',
      component: require('./gitattributes.mdx').default,
    },
  ],
}
