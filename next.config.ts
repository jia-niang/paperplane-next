import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  assetPrefix:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_CDN_BASE_URL || undefined
      : undefined,
  productionBrowserSourceMaps: process.env.NODE_ENV === 'development',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_SHIELDS_HOST! }],
    loader:
      process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_CDN_BASE_URL
        ? 'custom'
        : undefined,
    loaderFile:
      process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_CDN_BASE_URL
        ? './misc/image-loader.js'
        : undefined,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  redirects() {
    return [{ source: '/alphabet', destination: '/a', statusCode: 302 }]
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: ['remark-prism' as any],
  },
})

export default withMDX(nextConfig)
