import { BackgroundImage } from '@mantine/core'

export default function OpenPage() {
  return (
    <BackgroundImage
      w="100%"
      h="100%"
      src={require('@/assets/pattern/ax.jpg').default.src}
      radius="md"
      className="bg-auto bg-repeat shadow"
      px={24}
      py={16}
    ></BackgroundImage>
  )
}
