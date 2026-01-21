import { Group, Image, Text } from '@mantine/core'
import NextImage from 'next/image'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BaseTechTagProps {
  title: ReactNode
  icon?: string
  href?: string
  className?: string
}

function BaseTechTag(props: BaseTechTagProps) {
  const { title, icon, href, className } = props

  const tag = (
    <Group
      className={twMerge(
        className,
        'rounded-sm border-1 border-solid border-gray-400 pb-2 text-[14px] shadow hover:bg-gray-100'
      )}
      px={8}
      py={4}
      gap={4}
      align="center"
    >
      {icon ? (
        <Image
          w="1em"
          h="1em"
          fit="contain"
          component={NextImage}
          src={icon}
          alt={`${title} logo`}
        />
      ) : null}
      <Text c="gray.8" lh={1} ff="sans-serif" inherit>
        {title}
      </Text>
    </Group>
  )

  return href ? (
    <a href={href} target="_blank">
      {tag}
    </a>
  ) : (
    tag
  )
}

export function HexoTag() {
  return (
    <BaseTechTag
      title="Hexo"
      href="https://hexo.io/zh-cn/"
      icon={require('@/assets/alphabet-deps/hexo.svg').default}
    />
  )
}

export function MemosTag() {
  return (
    <BaseTechTag
      title="Memos"
      href="https://www.usememos.com/"
      icon={require('@/assets/alphabet-deps/memos.png').default}
    />
  )
}

export function NextChatTag() {
  return (
    <BaseTechTag
      title="NextChat"
      href="https://nextchat.dev/"
      icon={require('@/assets/alphabet-icons/gpt.png').default}
    />
  )
}

export function OpenWebUITag() {
  return (
    <BaseTechTag
      title="OpenWebUI"
      href="https://openwebui.com/"
      icon={require('@/assets/alphabet-icons/openwebui.png').default}
    />
  )
}

export function ITToolsTag() {
  return (
    <BaseTechTag
      title="IT-Tools"
      href="https://github.com/CorentinTh/it-tools/"
      icon={require('@/assets/alphabet-icons/tools.png').default}
    />
  )
}

export function QuickReferenceTag() {
  return (
    <BaseTechTag
      title="Quick Reference"
      href="https://github.com/jaywcjlove/reference"
      icon={require('@/assets/alphabet-icons/code-reference.svg').default}
    />
  )
}

export function JoplinTag() {
  return (
    <BaseTechTag
      title="Joplin"
      href="https://joplinapp.org/"
      icon={require('@/assets/alphabet-icons/joplin.png').default}
    />
  )
}

export function ShieldsIOTag() {
  return (
    <BaseTechTag
      title="Shields.io"
      href="https://shields.io/"
      icon={require('@/assets/alphabet-icons/shieldsio.png').default}
    />
  )
}

export function ReactTag() {
  return (
    <BaseTechTag
      title="React"
      href="https://react.dev/"
      icon={require('@/assets/alphabet-deps/react.svg').default}
    />
  )
}

export function VueTag() {
  return (
    <BaseTechTag
      title="Vue"
      href="https://cn.vuejs.org/index.html"
      icon={require('@/assets/alphabet-deps/vue.svg').default}
    />
  )
}

export function CRATag() {
  return (
    <BaseTechTag
      title="Create React App"
      href="https://create-react-app.dev/"
      icon={require('@/assets/alphabet-deps/cra.svg').default}
    />
  )
}

export function WebpackTag() {
  return (
    <BaseTechTag
      title="Webpack"
      href="https://webpack.js.org/"
      icon={require('@/assets/alphabet-deps/webpack.svg').default}
    />
  )
}

export function AntDTag() {
  return (
    <BaseTechTag
      title="AntD"
      href="https://ant-design.antgroup.com/index-cn"
      icon={require('@/assets/alphabet-deps/antd.svg').default}
    />
  )
}

export function MuiTag() {
  return (
    <BaseTechTag
      title="MUI"
      href="https://mui.com/material-ui/"
      icon={require('@/assets/alphabet-deps/mui.svg').default}
    />
  )
}

export function DockerTag() {
  return (
    <BaseTechTag
      title="Docker"
      href="https://www.docker.com/"
      icon={require('@/assets/alphabet-icons/docker.svg').default}
    />
  )
}

export function NodejsTag() {
  return (
    <BaseTechTag
      title="Node.js"
      href="https://nodejs.org/"
      icon={require('@/assets/alphabet-deps/nodejs.svg').default}
    />
  )
}

export function TDesignTag() {
  return (
    <BaseTechTag
      title="TDesign"
      href="https://tdesign.tencent.com/react"
      icon={require('@/assets/alphabet-deps/tdesign.svg').default}
    />
  )
}

export function NestjsTag() {
  return (
    <BaseTechTag
      title="Nest.js"
      href="https://nestjs.com/"
      icon={require('@/assets/alphabet-deps/nestjs.svg').default}
    />
  )
}

export function PrismaTag() {
  return (
    <BaseTechTag
      title="Prisma"
      href="https://www.prisma.io/"
      icon={require('@/assets/alphabet-deps/prisma.svg').default}
    />
  )
}

export function PostgreSQLTag() {
  return (
    <BaseTechTag
      title="PostgreSQL"
      href="https://www.postgresql.org/"
      icon={require('@/assets/alphabet-deps/postgresql.svg').default}
    />
  )
}

export function RedisTag() {
  return (
    <BaseTechTag
      title="Redis"
      href="https://redis.io/"
      icon={require('@/assets/alphabet-deps/redis.svg').default}
    />
  )
}

export function NextjsTag() {
  return (
    <BaseTechTag
      title="Next.js"
      href="https://nextjs.org/"
      icon={require('@/assets/alphabet-deps/nextjs.svg').default}
    />
  )
}

export function DumiTag() {
  return (
    <BaseTechTag
      title="Dumi"
      href="https://d.umijs.org/zh-CN"
      icon={require('@/assets/alphabet-deps/dumi.png').default}
    />
  )
}

export function ElementTag() {
  return (
    <BaseTechTag
      title="Element"
      href="https://element.eleme.cn/#/zh-CN"
      icon={require('@/assets/alphabet-deps/element.svg').default}
    />
  )
}

export function RestifyTag() {
  return (
    <BaseTechTag
      title="Restify"
      href="http://restify.com/"
      icon={require('@/assets/alphabet-deps/restify.svg').default}
    />
  )
}

export function MongoDBTag() {
  return (
    <BaseTechTag
      title="MongoDB"
      href="https://www.mongodb.com/"
      icon={require('@/assets/alphabet-deps/mongodb.svg').default}
    />
  )
}

export function MantineTag() {
  return (
    <BaseTechTag
      title="MantineUI"
      href="https://mantine.dev/"
      icon={require('@/assets/alphabet-deps/mantine.svg').default}
    />
  )
}

export function TRPCTag() {
  return (
    <BaseTechTag
      title="tRPC"
      href="https://trpc.io/"
      icon={require('@/assets/alphabet-deps/trpc.svg').default}
    />
  )
}
