import z from 'zod'

export const resortZod = z.array(
  z.object({
    id: z.string(),
    index: z.number(),
  })
)
