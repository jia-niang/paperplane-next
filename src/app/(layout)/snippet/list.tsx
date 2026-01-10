import { FC } from 'react'

import { babel } from './_babel'
import { command } from './_command'
import { cra } from './_cra'
import { editorconfig } from './_editorconfig'
import { eslint } from './_eslint'
import { git } from './_git'
import { license } from './_license'
import { monorepo } from './_monorepo'
import { next_js } from './_next_js'
import { npm } from './_npm'
import { package_json } from './_package_json'
import { prettier } from './_prettier'
import { rollup } from './_rollup'
import { typescript } from './_typescript'
import { vite } from './_vite'
import { vscode } from './_vscode'
import { webpack } from './_webpack'

import { postcss } from './_postcss'
import { tailwindcss } from './_tailwindcss'

export const catelogs: SnippetCatelog[] = [
  {
    name: '常用命令行',
    key: 'command',
    icon: require('@/assets/snippet-icons/terminal.svg').default,
    article: command,
  },
  {
    name: 'VSCode',
    key: 'vscode',
    icon: require('@/assets/snippet-icons/vscode.svg').default,
    article: vscode,
  },
  {
    name: 'LICENSE 开源许可',
    key: 'license',
    icon: require('@/assets/snippet-icons/license.svg').default,
    article: license,
  },
  {
    name: 'EditorConfig',
    key: 'editorconfig',
    icon: require('@/assets/snippet-icons/editorconfig.svg').default,
    article: editorconfig,
  },
  {
    name: 'Git',
    key: 'git',
    icon: require('@/assets/snippet-icons/git.svg').default,
    article: git,
  },
  {
    name: 'package.json',
    key: 'package_json',
    icon: require('@/assets/snippet-icons/nodejs.svg').default,
    article: package_json,
  },
  {
    name: 'npm',
    key: 'npm',
    icon: require('@/assets/snippet-icons/npm.svg').default,
    article: npm,
  },
  {
    name: 'TypeScript',
    key: 'typescript',
    icon: require('@/assets/snippet-icons/typescript.svg').default,
    article: typescript,
  },
  {
    name: 'Prettier',
    key: 'prettier',
    icon: require('@/assets/snippet-icons/prettier.svg').default,
    article: prettier,
  },
  {
    name: 'ESLint',
    key: 'eslint',
    icon: require('@/assets/snippet-icons/eslint.svg').default,
    article: eslint,
  },
  {
    name: 'Babel',
    key: 'babel',
    icon: require('@/assets/snippet-icons/babel.svg').default,
    article: babel,
  },
  {
    name: 'Next.js',
    key: 'next_js',
    icon: require('@/assets/snippet-icons/nextjs.svg').default,
    article: next_js,
  },
  {
    name: 'Vite',
    key: 'vite',
    icon: require('@/assets/snippet-icons/vite.svg').default,
    article: vite,
  },
  {
    name: 'Rollup',
    key: 'rollup',
    icon: require('@/assets/snippet-icons/rollup.svg').default,
    article: rollup,
  },
  {
    name: 'Webpack',
    key: 'webpack',
    icon: require('@/assets/snippet-icons/webpack.svg').default,
    article: webpack,
  },
  {
    name: 'Create React App',
    key: 'cra',
    icon: require('@/assets/snippet-icons/cra.svg').default,
    article: cra,
  },
  {
    name: 'TailwindCSS',
    key: 'tailwindcss',
    icon: require('@/assets/snippet-icons/tailwindcss.svg').default,
    article: tailwindcss,
  },
  {
    name: 'PostCSS',
    key: 'postcss',
    icon: require('@/assets/snippet-icons/postcss.svg').default,
    article: postcss,
  },
  {
    name: 'Monorepo',
    key: 'monorepo',
    icon: require('@/assets/snippet-icons/monorepo.svg').default,
    article: monorepo,
  },
]

export interface SnippetCatelog {
  name: string
  key: string
  icon?: string
  desc?: string
  article?: SnippetArticleCatelog[]
}

export interface SnippetArticleCatelog {
  key: string
  title: string
  desc?: string
  component: FC
}
