import { Table, TableProps, TableTbody, TableTd, TableTr } from '@mantine/core'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export interface KVTableProps {
  tableProps?: TableProps
  children?: ReactNode
  className?: string
}

export function KVTable(props: KVTableProps) {
  const { tableProps, children, className } = props

  return (
    <Table
      className={className}
      withRowBorders={false}
      horizontalSpacing={0}
      verticalSpacing={6}
      {...tableProps}
    >
      <TableTbody>{children}</TableTbody>
    </Table>
  )
}

export interface KVTableRowProps {
  label: ReactNode
  icon?: ReactNode
  classNames?: {
    label?: string
    field?: string
  }
  children?: ReactNode
  className?: string
}

export function KVTableRow(props: KVTableRowProps) {
  const { label, icon, children, classNames, className } = props

  return (
    <TableTr className={className}>
      <TableTd
        className={twMerge(
          'w-0 cursor-default pr-2 align-top leading-[1.6] text-nowrap text-gray-900',
          classNames?.label
        )}
      >
        {icon} {label}：
      </TableTd>

      <TableTd
        className={twMerge('align-top font-sans leading-[1.6] text-gray-600', classNames?.field)}
      >
        {children}
      </TableTd>
    </TableTr>
  )
}
