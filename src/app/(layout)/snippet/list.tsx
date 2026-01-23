import { FC, ReactNode } from 'react'

import { babel } from './_articles/_babel'
import { command } from './_articles/_command'
import { cra } from './_articles/_cra'
import { editorconfig } from './_articles/_editorconfig'
import { eslint } from './_articles/_eslint'
import { git } from './_articles/_git'
import { license } from './_articles/_license'
import { monorepo } from './_articles/_monorepo'
import { next_js } from './_articles/_next_js'
import { npm } from './_articles/_npm'
import { package_json } from './_articles/_package_json'
import { prettier } from './_articles/_prettier'
import { rollup } from './_articles/_rollup'
import { typescript } from './_articles/_typescript'
import { vite } from './_articles/_vite'
import { vitest } from './_articles/_vitest'
import { vscode } from './_articles/_vscode'
import { webpack } from './_articles/_webpack'

import { postcss } from './_articles/_postcss'
import { tailwindcss } from './_articles/_tailwindcss'

// 图标来源： https://github.com/material-extensions/vscode-material-icon-theme

export const groups: SnippetCatelogGroup[] = [
  { title: '系统', key: 'system', children: [command, vscode] },
  { title: '通用', key: 'common', children: [license, editorconfig, git, typescript] },
  {
    title: '开发配置',
    key: 'devtool',
    children: [next_js, vite, vitest, postcss, rollup, eslint, prettier, tailwindcss],
  },
  { title: '包管理', key: 'publish', children: [npm, package_json] },
  // { title: 'CI/CD', key: 'cicd', children: [] },
  { title: '传统', key: 'legacy', children: [webpack, babel, cra] },
  { title: '其它', key: 'misc', children: [monorepo] },
]

export const catelogs: SnippetCatelog[] = groups.map(item => item.children).flat()

export interface SnippetCatelogGroup {
  title: ReactNode
  key: string
  children: SnippetCatelog[]
}

export interface SnippetCatelog {
  name: string
  key: string
  icon?: string
  desc?: string
  article?: SnippetArticle[]
}

export interface SnippetArticle {
  key: string
  title: string
  desc?: string
  component: FC
}
