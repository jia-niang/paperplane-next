import { Table, TableProps, TableTbody, TableTd, TableTr } from '@mantine/core'
import clsx from 'clsx'
import { ReactNode } from 'react'

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
  labelClassName?: string
  fieldClassName?: string
  children?: ReactNode
  className?: string
}

export function KVTableRow(props: KVTableRowProps) {
  const { label, icon, children, labelClassName, fieldClassName, className } = props

  return (
    <TableTr className={className}>
      <TableTd
        c="gray.9"
        ff="sans-serif"
        w={0}
        pr={8}
        lh={1.2}
        className={clsx(labelClassName, 'cursor-default text-nowrap')}
      >
        {icon} {label}：
      </TableTd>

      <TableTd c="gray.6" ff="sans-serif" lh={1.2} className={clsx(fieldClassName, '')}>
        {children}
      </TableTd>
    </TableTr>
  )
}
