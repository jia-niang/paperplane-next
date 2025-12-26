import z, { ZodAny } from 'zod'

import { transformerFormDataInput } from '@/lib/form-data-transformer'

export const resortZod = z.array(z.object({ id: z.string(), index: z.number() }))

export const deleteZod = z.object({ id: z.string() })

export function compatFormData<T>(inputZod: T): T {
  return z.transform(transformerFormDataInput).pipe(inputZod as ZodAny) as T
}
