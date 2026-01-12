import { Skeleton, SkeletonProps, Stack } from '@mantine/core'
import clsx from 'clsx'

export interface LoadingProps {
  h?: number[]
  w?: number[]
  className?: string
}

export default function Loading(props: LoadingProps) {
  const { h: _h, w: _w, className } = props

  const h = _h || [12, 12, 12, 12, 12, 12]
  const w = _w || [0, 0, 0.8, 0, 0, 0.75]

  const list = Array.from(
    new Array(Math.max((_h || []).length, (_w || []).length)),
    (_value, idx) =>
      ({
        height: h[idx] || 12,
        width: w[idx] ? `${w[idx] * 100}%` : undefined,
      }) satisfies SkeletonProps
  )

  return (
    <Stack className={clsx(className)}>
      {list.map((item, idx) => (
        <Skeleton key={idx} height={item.height} width={item.width} radius="xl" />
      ))}
    </Stack>
  )
}

export function loading(props?: LoadingProps) {
  return function LoadingPlaceholder() {
    return <Loading {...props} />
  }
}
