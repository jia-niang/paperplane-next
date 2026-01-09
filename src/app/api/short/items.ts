import 'server-only'

import { TRPCError } from '@trpc/server'
import z from 'zod'

import { prisma } from '@/lib/prisma'
import { loginProcedure, publicProcedure, router } from '@/lib/trpc'
import { Short } from '@/prisma/client'
import { ShortRedirectType } from '@/prisma/enums'
import { ShortFindFirstArgs, ShortWhereInput } from '@/prisma/models'
import { deleteZod, paginationZod } from '@/zod/common'
import { shortItemZod } from '@/zod/short'

import { generateShortKeyByRecord, ShortKeyRecord } from './generateShortKey'

async function findValidShortItemByKey(key: string, mergeOptions: ShortFindFirstArgs = {}) {
  return await prisma.short.findFirst({
    where: { key, OR: [{ expiredAt: { gt: new Date() } }, { expiredAt: null }] },
    include: { author: true },
    ...mergeOptions,
  })
}

export const items = router({
  list: publicProcedure
    .input(
      paginationZod
        .extend({ keyword: z.string().optional() })
        .optional()
        .default({ page: 1, pageSize: 10 })
    )
    .query(async ({ ctx, input }) => {
      const session = await ctx.getSession()
      const { page, pageSize, keyword } = input

      const where: ShortWhereInput = {}
      if (!session?.user) {
        where.public = true
      }
      if (keyword) {
        where.OR = [
          { key: { contains: keyword, mode: 'insensitive' } },
          { url: { contains: keyword, mode: 'insensitive' } },
          { tag: { contains: keyword, mode: 'insensitive' } },
        ]
      }

      const queryOptions: ShortFindFirstArgs = {
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        where,
      }
      const [list, total] = await prisma.$transaction([
        prisma.short.findMany(queryOptions),
        prisma.short.count({ where }),
      ])

      const result: Pagination<Short> = {
        list,
        page: page,
        pageSize,
        total,
        totalPage: Math.ceil(total / pageSize),
      }

      return result
    }),

  add: loginProcedure.input(shortItemZod).mutation(async ({ input, ctx }) => {
    const session = await ctx.getSession()
    const userId = session!.user.id

    if (input.expiredAt && input.redirectType === ShortRedirectType.PERMANENTLY) {
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: '指定了过期时间的短链接不能使用 “永久重定向” 的跳转方式',
      })
    }

    if (input.key) {
      const exist = await findValidShortItemByKey(input.key)

      if (exist) {
        if (
          exist.url === input.url &&
          exist.redirectType === input.redirectType &&
          exist.expiredAt === input.expiredAt
        ) {
          return exist
        }

        throw new TRPCError({
          code: 'CONFLICT',
          message: `此短链接码 “${exist.key}” 与现有的有效项目 “${exist.url}” 的短链接码重复，请更换短链接码后重试`,
        })
      }

      return await prisma.short.create({ data: { ...input, key: input.key, userId } })
    }

    let keyRecord: ShortKeyRecord | undefined = undefined
    let exist: Short | null = null

    do {
      keyRecord = generateShortKeyByRecord(4, keyRecord)
      exist = await findValidShortItemByKey(keyRecord.key)
    } while (exist)

    return await prisma.short.create({ data: { ...input, key: keyRecord.key, userId } })
  }),

  get: publicProcedure
    .input(z.object({ key: shortItemZod.shape.key.unwrap() }))
    .query(async ({ input }) => {
      const key = input.key
      const item = await findValidShortItemByKey(key)

      if (!item) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `此短链接码 “${key}” 无效，请确保曾创建过它，且只在其有效期内使用`,
        })
      }

      return item
    }),

  delete: loginProcedure.input(deleteZod).mutation(async ({ input }) => {
    const id = input.id
    await prisma.short.delete({ where: { id } })
  }),
})
