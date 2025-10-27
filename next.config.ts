import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import remarkPrism from 'remark-prism'

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix:
    process.env.NODE_ENV === 'production' ? 'https://cdn.paperplane.cc/paperplane-next' : undefined,
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_SHIELDS_HOST! }],
    loader: process.env.NODE_ENV === 'production' ? 'custom' : undefined,
    loaderFile: process.env.NODE_ENV === 'production' ? './misc/image-loader.js' : undefined,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkPrism as any],
  },
})

export default withMDX(nextConfig)
