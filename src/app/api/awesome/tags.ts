import 'server-only'

import { createId } from '@paralleldrive/cuid2'
import { AwesomeTag, Prisma } from '@prisma/client'
import { parse } from 'superjson'

import { awesomeTagDeleteZod } from '@/app/zod/awesome'
import { resortZod } from '@/app/zod/common'
import { prisma } from '@/lib/prisma'
import { publicUpload } from '@/lib/s3-public'
import { loginProcedure, publicProcedure, router } from '@/lib/trpc'

async function uploadTagIcon(file: File): Promise<string> {
  return publicUpload(`/awesome/tags/icon/${createId()}`, Buffer.from(await file.arrayBuffer()), {
    mime: file.type,
  }).then(res => res.fileUrl)
}

export const tags = router({
  list: publicProcedure.query(() => prisma.awesomeTag.findMany({ orderBy: { index: 'asc' } })),

  add: loginProcedure
    .input(t => t as FormData)
    .mutation(async ({ input }) => {
      const data = parse(input.get('rest') as string) as AwesomeTag
      if (input.get('iconFile')) {
        const iconFile = input.get('iconFile')
        data.icon = await uploadTagIcon(iconFile as File)
      }

      return prisma.awesomeTag.create({
        data: { ...(data as any), index: await prisma.awesomeTag.count() },
      })
    }),

  update: loginProcedure
    .input(t => t as FormData)
    .mutation(async ({ input }) => {
      const data = parse(input.get('rest') as string) as AwesomeTag
      if (input.get('iconFile')) {
        const iconFile = input.get('iconFile')
        data.icon = await uploadTagIcon(iconFile as File)
      }

      return prisma.awesomeTag.update({ where: { id: data.id }, data })
    }),

  delete: loginProcedure.input(awesomeTagDeleteZod).mutation(async ({ input }) => {
    const item = await prisma.awesomeTag.findFirstOrThrow({ where: { id: input.id } })

    await Promise.all([
      prisma.awesomeTag.delete({ where: { id: item.id } }),
      prisma.awesomeTag.updateMany({
        where: { index: { gt: item.index! } },
        data: { index: { decrement: 1 } },
      }),
    ])
  }),

  resort: loginProcedure.input(resortZod).mutation(async ({ input }) => {
    const caseSql = Prisma.join(
      input.map(item => Prisma.sql`WHEN ${item.id} THEN ${item.index}`),
      ' '
    )
    await prisma.$executeRaw`
        UPDATE "awesome_tag"
        SET "index" = (CASE "id"
          ${caseSql}
        END)
        WHERE "id" IN (${Prisma.join(input.map(item => item.id))})
      `
  }),
})
