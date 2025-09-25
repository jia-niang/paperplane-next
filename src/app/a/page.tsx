import { Group, Stack } from '@mantine/core'

import GradientTitle from '@/components/labels/GradientTitle'
import {
  DifyAITag,
  HexoTag,
  ITToolsTag,
  MemosTag,
  OpenWebUITag,
  QuickReferenceTag,
  ShieldsIOTag,
} from '@/components/tags/TechTag'

import AItem from './AItem'

export default function AlphabetPage() {
  return (
    <Group align="start" gap={48}>
      <Stack gap={32}>
        <GradientTitle>创作</GradientTitle>

        <AItem
          title="PaperPlane Blog 博客"
          icon={require('@/assets/alphabet-icons/blog.png').default}
          href="https://paperplane.cc"
          desc="技术博客"
          tech={[HexoTag]}
          repo="paperplane-blog"
        />

        <AItem
          title="TimeLine 时间线"
          icon={require('@/assets/alphabet-icons/activity.png').default}
          href="https://tl.paperplane.cc"
          hrefHighlight="tl."
          desc="我的动态"
          tech={MemosTag}
        />
      </Stack>

      <Stack gap={32}>
        <GradientTitle>技术主页</GradientTitle>

        <AItem
          title="GitHub"
          icon={require('@/assets/alphabet-icons/github.svg').default}
          href="https://github.com/jia-niang"
          hrefHighlight="/jia-niang"
          desc="我的 GitHub 主页"
        />

        <AItem
          title="npm"
          icon={require('@/assets/alphabet-icons/npm.svg').default}
          href="https://npmjs.com/~jia-niang"
          hrefHighlight="/~jia-niang"
          desc="我的 npm 主页"
        />

        <AItem
          title="Docker Hub"
          icon={require('@/assets/alphabet-icons/docker.svg').default}
          href="https://hub.docker.com/r/paperplanecc"
          hrefHighlight="/paperplanecc"
          desc="我的 Docker Hub 主页"
        />

        <AItem
          title="Drone CI"
          icon={require('@/assets/alphabet-icons/drone.svg').default}
          href="https://drone.paperplane.cc"
          hrefHighlight="drone."
          desc="自部署 CI/CD 工具"
        />

        <AItem
          title="Gitea"
          icon={require('@/assets/alphabet-icons/gitea.svg').default}
          href="https://git.paperplane.cc"
          hrefHighlight="git."
          desc="自部署且与 GitHub 同步"
        />
      </Stack>

      <Stack gap={32}>
        <GradientTitle>工具</GradientTitle>

        <AItem
          title="OpenWebUI"
          icon={require('@/assets/alphabet-icons/openwebui.png').default}
          href="https://gpt.paperplane.cc"
          hrefHighlight="gpt."
          desc="自部署 AI 对话与知识库"
          tech={OpenWebUITag}
        />

        <AItem
          title="开发工具合集"
          icon={require('@/assets/alphabet-icons/tools.png').default}
          href="https://tools.paperplane.cc"
          hrefHighlight="tools."
          desc="自部署常用工具合集"
          tech={ITToolsTag}
        />

        <AItem
          title="代码速查"
          icon={require('@/assets/alphabet-icons/code-reference.svg').default}
          href="https://code.paperplane.cc"
          hrefHighlight="code."
          desc="自部署代码速查工具"
          tech={QuickReferenceTag}
        />

        <AItem
          title="Shields 徽标服务"
          icon={require('@/assets/alphabet-icons/shieldsio.png').default}
          href="https://shields.paperplane.cc/"
          hrefHighlight="shields."
          desc="自部署，可联系我添加 CORS"
          tech={ShieldsIOTag}
        />

        <AItem
          title="DifyAI 工作流"
          icon={require('@/assets/alphabet-icons/dify.jpg').default}
          href="https://ai.paperplane.cc"
          hrefHighlight="ai."
          desc="自部署 AI 工作流，暂不开放"
          tech={DifyAITag}
        />
      </Stack>
    </Group>
  )
}
