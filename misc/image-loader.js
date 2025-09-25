export default function cosLoader({ src, width, quality }) {
  return `${src}?thumbnail/${width}x/quality/${quality || 100}/ignore-error/1`
}
