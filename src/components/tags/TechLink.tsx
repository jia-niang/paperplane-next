import { Image } from '@mantine/core'
import NextImage from 'next/image'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface BaseLinkProps {
  href: string
  icon?: string
  className?: string
  children?: ReactNode
}

function BaseLink(props: BaseLinkProps) {
  const { href, icon, className, children } = props

  return (
    <a href={href} target="_blank" className={twMerge('text-lb hover:underline', className)}>
      {icon ? (
        <Image
          w="1em"
          h="1em"
          fit="contain"
          mb="0.2em"
          className="mr-1 inline-block"
          component={NextImage}
          src={icon}
          alt=""
        />
      ) : null}
      {children}
    </a>
  )
}

export interface WebsiteLinkProps {
  repo: string
  className?: string
  children?: ReactNode
}

export function GitHubLink(props: WebsiteLinkProps) {
  return (
    <BaseLink
      href={`https://github.com/${props.repo}`}
      icon={require('@/assets/alphabet-icons/github.svg').default}
      className={props.className}
    >
      {props.children || 'GitHub'}
    </BaseLink>
  )
}

export function GiteaLink(props: WebsiteLinkProps) {
  return (
    <BaseLink
      href={`https://git.paperplane.cc/${props.repo}`}
      icon={require('@/assets/alphabet-icons/gitea.svg').default}
      className={props.className}
    >
      {props.children || 'Gitea'}
    </BaseLink>
  )
}

export function DroneLink(props: WebsiteLinkProps) {
  return (
    <BaseLink
      href={`https://drone.paperplane.cc/${props.repo}`}
      icon={require('@/assets/alphabet-icons/drone.svg').default}
      className={props.className}
    >
      {props.children || 'CI/CD'}
    </BaseLink>
  )
}

export function NpmLink(props: WebsiteLinkProps) {
  return (
    <BaseLink
      href={`https://npmjs.com/package/${props.repo}`}
      icon={require('@/assets/alphabet-icons/npm.svg').default}
      className={props.className}
    >
      {props.children || 'npm'}
    </BaseLink>
  )
}

export function DockerHubLink(props: WebsiteLinkProps) {
  return (
    <BaseLink
      href={`https://hub.docker.com/r/${props.repo}`}
      icon={require('@/assets/alphabet-icons/docker.svg').default}
      className={props.className}
    >
      {props.children || 'Docker Hub'}
    </BaseLink>
  )
}
