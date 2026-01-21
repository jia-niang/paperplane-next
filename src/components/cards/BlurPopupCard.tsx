import { Box } from '@mantine/core'
import { CSSProperties, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import './BlurPopupCard.css'

export interface BlurPopupCardProps {
  px?: number
  py?: number
  popupPx?: number
  popupPy?: number
  right?: number
  className?: string
  popupClassName?: string
  children?: ReactNode
  popupChildren?: ReactNode
  style?: CSSProperties
}

export const BlurPopupCard = forwardRef<any, BlurPopupCardProps>(
  function BlurPopupCardWithoutRef(props, ref) {
    const {
      px = 0,
      py = 0,
      popupPx = 12,
      popupPy = 12,
      right = 0,
      className,
      popupClassName,
      children,
      popupChildren,
      style,
    } = props

    return (
      <Box
        px={px}
        py={py}
        pos="relative"
        className={twMerge('blur-popup-card', className)}
        style={style}
        ref={ref}
      >
        {children}

        <Box
          px={popupPx}
          py={popupPy}
          left={px - popupPx}
          top={py - popupPy}
          right={0 - px - popupPx + right}
          pos="absolute"
          className={twMerge(
            'blur-popup-card__popup z-10 rounded-md bg-white/60 shadow-[0_0_5px_0_rgba(0,0,0,0.45)] backdrop-blur-lg',
            popupClassName
          )}
        >
          {children}

          {popupChildren}
        </Box>
      </Box>
    )
  }
)
