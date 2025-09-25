import { Grid, GridCol, Stack } from '@mantine/core'
import { ReactNode } from 'react'

import OpenItem from './OpenItem'

export default async function OpenLayout(props: { children: ReactNode }) {
  return (
    <Grid gutter={48}>
      <GridCol pos="relative" span={4}>
        <Stack pos="sticky" top={130 + 16} left={0} gap={4}>
          <OpenItem
            name="use-upgrade"
            repo="jia-niang/use-upgrade"
            type="npm"
            subpath="/use-upgrade"
            desc="可在网站发布新版本时提醒用户，开箱即用，零配置适配 React/Vue/Angular 等网站。"
          />
          <OpenItem
            name="use-upgrade-webpack-plugin"
            repo="jia-niang/use-upgrade-webpack-plugin"
            type="npm"
            subpath="/use-upgrade-webpack-plugin"
            desc='和 "use-upgrade" 配套的工具，可通过 CI/CD 命令来控制其行为，避免过度打扰用户。'
          />
          <OpenItem
            name="docker-deps"
            repo="jia-niang/docker-deps"
            type="npm"
            subpath="/docker-deps"
            desc="从项目中提取最小化的构建 Docker 镜像必须的依赖，使得构建步骤更容易命中缓存。"
          />
          <OpenItem
            name="mp-websocket-polyfill"
            repo="jia-niang/mp-websocket-polyfill"
            type="npm"
            subpath="/mp-websocket-polyfill"
            desc="使微信小程序的 WebSocket 兼容 Stomp 等协议。"
          />
          <OpenItem
            name="@paperplane/cra-template-antd"
            repo="paperplane-npm/cra-template-antd"
            giteaRepo="project-templates/cra-template-antd"
            type="npm"
            subpath="/cra-template-antd"
            desc="用于创建完善 AntD 项目的 Create React App 模板。"
          />
          <OpenItem
            name="@paperplane/cra-template-mui"
            repo="paperplane-npm/cra-template-mui"
            giteaRepo="project-templates/cra-template-mui"
            type="npm"
            subpath="/cra-template-mui"
            desc="用于创建完善 MUI 项目的 Create React App 模板。"
          />
          <OpenItem
            name="paperplanecc/docker-api"
            repo="paperplane-docker/docker-api"
            type="docker"
            subpath="/docker-api"
            desc="通过简单的挂载目录，使得可以通过 HTTP 访问 Docker Engine API。"
          />
          <OpenItem
            name="paperplanecc/baseline-node20"
            repo="paperplane-docker/baseline-node20"
            type="docker"
            subpath="/baseline-node20"
            desc="预装 Node.js 20 和 pnpm，并为 canvas 预装依赖项的 Docker 镜像，开箱即用。"
          />
          <OpenItem
            name="paperplanecc/baseline-node20-puppeteer"
            repo="paperplane-docker/baseline-node20-puppeteer"
            type="docker"
            subpath="/baseline-node20-puppeteer"
            desc="基于上面的 paperplanecc/baseline-node20，额外为 Puppeteer (Chromium) 做了预安装预配置的 Docker 镜像，开箱即用。"
          />
        </Stack>
      </GridCol>

      <GridCol span={8}>{props.children}</GridCol>
    </Grid>
  )
}
