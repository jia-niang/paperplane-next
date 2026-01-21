import { Skeleton, SkeletonProps, Stack } from '@mantine/core'
import { twMerge } from 'tailwind-merge'

export interface LoadingProps {
  h?: number[]
  w?: number[]
  className?: string
}

const defaultH = [12, 12, 12, 12, 12, 12]
const defaultW = [0, 0, 0.8, 0, 0, 0.75]

export default function Loading(props: LoadingProps) {
  const { h = defaultH, w = defaultW, className } = props

  const count =
    props.h && props.w
      ? Math.max(props.h.length, props.w.length)
      : props.h
        ? props.h.length
        : props.w
          ? props.w.length
          : defaultH.length

  const list = Array.from(
    new Array(count),
    (_value, idx) =>
      ({
        height: h[idx] || 12,
        width: w[idx] ? `${w[idx] * 100}%` : undefined,
      }) satisfies SkeletonProps
  )

  return (
    <Stack className={twMerge(className)}>
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
