import { Grid, GridCol, Stack } from '@mantine/core'
import { ReactNode } from 'react'

import {
  AntDTag,
  DumiTag,
  ElementTag,
  HexoTag,
  MantineTag,
  MongoDBTag,
  MuiTag,
  NestjsTag,
  NextjsTag,
  NodejsTag,
  PostgreSQLTag,
  PrismaTag,
  ReactTag,
  RedisTag,
  RestifyTag,
  TDesignTag,
  TRPCTag,
  VueTag,
} from '@/components/tags/TechTag'

import DemosItem from './DemosItem'

export default function OpenLayout(props: { children: ReactNode }) {
  return (
    <Grid gutter={48}>
      <GridCol pos="relative" span={4}>
        <Stack pos="sticky" top={130 + 16} left={0} gap={8}>
          <DemosItem
            name="PaperPlane Next (本站)"
            subpath="/paperplane-next"
            href="https://paperplane.cc/a"
            hrefHighlight="/a"
            techType="full"
            devState="更新中"
            projectType="Demo"
            tags={[NextjsTag, MantineTag, TRPCTag, PrismaTag, PostgreSQLTag]}
          />
          <DemosItem
            name="纸飞机的信笺 技术博客"
            subpath="/paperplane-blog"
            href="https://paperplane.cc"
            techType="front"
            devState="更新中"
            projectType="Demo"
            tags={[HexoTag, NodejsTag]}
          />
          <DemosItem
            name="PaperPlane Web Console"
            subpath="/paperplane-web-console"
            href="https://console.paperplane.cc"
            hrefHighlight="console."
            techType="full"
            devState="2023"
            projectType="Demo"
            tags={[ReactTag, TDesignTag, NestjsTag, PrismaTag, PostgreSQLTag, RedisTag]}
          />
          <DemosItem
            name="Career Intl. Inc. 前端技术分享"
            subpath="/careerintlinc-tech-share"
            href="https://careerintlinc-tech-share.paperplane.cc"
            hrefHighlight="careerintlinc-tech-share."
            techType="front"
            devState="2023"
            projectType="Demo"
            tags={[ReactTag, DumiTag]}
          />
          <DemosItem
            name="食药监局监管平台"
            subpath="/cfda"
            href="https://cfda.paperplane.cc"
            hrefHighlight="cfda."
            techType="full"
            devState="2018 (实习)"
            projectType="Demo"
            tags={[VueTag, ElementTag, RestifyTag, MongoDBTag]}
          />
          <DemosItem
            name="核酸登记 Demo"
            subpath="/hospital"
            href="https://hospital.paperplane.cc"
            hrefHighlight="hospital."
            techType="full"
            devState="2022"
            projectType="Demo"
            tags={[ReactTag, MuiTag, RestifyTag, MongoDBTag]}
          />
          <DemosItem
            name="下班倒计时创意工具"
            subpath="/offwork"
            href="https://offwork.paperplane.cc"
            hrefHighlight="offwork."
            techType="front"
            devState="2021"
            projectType="Joker"
            tags={[ReactTag, AntDTag]}
          />
          <DemosItem
            name="凯尼科技"
            subpath="/kiny"
            href="https://kiny.paperplane.cc"
            hrefHighlight="kiny."
            techType="front"
            devState="2019"
            projectType="Joker"
            tags={[VueTag]}
          />
        </Stack>
      </GridCol>

      <GridCol span={8}>{props.children}</GridCol>
    </Grid>
  )
}
