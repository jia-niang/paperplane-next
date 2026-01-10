import { Group, Tooltip } from '@mantine/core'
import clsx from 'clsx'
import { CSSProperties, ReactNode, useMemo } from 'react'

import { AwesomeItemResult } from '@/app/api/_awesome/items'

export interface BadgeTagsProps {
  awesome: AwesomeItemResult
  className?: string
  style?: CSSProperties
}

export default function BadgeTags(props: BadgeTagsProps) {
  const { awesome, className, style } = props

  const tagsItems = useMemo(() => {
    const result: ReactNode[] = []
    if (!awesome.tags || awesome.tags.length <= 0) {
      return null
    }

    const colorTag = awesome.tags.filter(tag => tag.color && tag.color !== '#ffffff')
    const textTag = awesome.tags.filter(tag => !tag.color || tag.color === '#ffffff')
    ;[...colorTag, ...textTag].forEach(tag => {
      let tagDisplay: ReactNode = null

      if (tag.icon) {
        tagDisplay = (
          <img
            src={tag.icon}
            alt={'tag ' + tag.label}
            className="h-[20px] w-[20px] cursor-pointer"
          />
        )
      } else if (tag.color) {
        tagDisplay = (
          <span
            className="h-[20px] w-[12px] cursor-pointer rounded-xs"
            style={{ backgroundColor: tag.color, border: `1px solid ${tag.color}` }}
          ></span>
        )
      } else {
        tagDisplay = (
          <span
            className="h-[20px] cursor-pointer rounded-xs px-1 text-center text-[14px] leading-[1.2] text-gray-600"
            style={{ border: `1px solid currentColor` }}
          >
            {tag.label.slice(0, 1)}
          </span>
        )
      }

      result.push(
        <Tooltip key={tag.id} label={tag.desc} withArrow multiline>
          {tagDisplay}
        </Tooltip>
      )
    })

    return (
      <Group className={clsx(className)} style={style} gap={4}>
        {result}
      </Group>
    )
  }, [awesome.tags, className, style])

  return tagsItems
}
