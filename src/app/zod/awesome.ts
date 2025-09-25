import { z } from 'zod'

export const awesomeItemZod = z.object({
  id: z.string(),
  label: z.string('Awesome 名称是必须的').min(2, '名称至少需要 2 个字符'),
  homepage: z.url('主页地址格式不正确'),
  source: z.url('源代码仓库地址格式不正确').optional().default(''),
  registry: z.url('制品地址格式不正确').optional().default(''),
  desc: z.string().optional().default(''),
  stars: z.number().optional(),
  catelogId: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export const awesomeCatelogZod = z.object({
  id: z.string(),
  name: z.string('类别名称是必须的').min(2, '类别名称至少需要 2 个字符'),
  desc: z.string().optional().default(''),
  parentId: z.string().optional(),
})

export const awesomeTagZod = z.object({
  id: z.string(),
  label: z.string('标签名称是必须的').min(2, '标签名称至少需要 2 个字符'),
  desc: z.string().optional().default(''),
  color: z
    .string()
    .regex(/^(#[0-9A-F]{6})?$/i, '颜色格式不正确')
    .default(''),
  icon: z.string().optional(),
})

export const awesomeItemAddZod = awesomeItemZod.omit({ id: true })
export const awesomeCatelogAddZod = awesomeCatelogZod.omit({ id: true })
export const awesomeTagAddZod = awesomeTagZod.omit({ id: true })

export const awesomeItemDeleteZod = awesomeItemZod.pick({ id: true })
export const awesomeCatelogDeleteZod = awesomeCatelogZod.pick({ id: true })
export const awesomeTagDeleteZod = awesomeTagZod.pick({ id: true })
