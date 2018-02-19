/**
 * [Official docs](https://my.jdownloader.org/developers/#tag_265)
 */
export interface ICrawledLinkQuery {
  availability?: boolean
  bytesTotal?: boolean
  comment?: boolean
  enabled?: boolean
  host?: boolean
  jobUUIDs?: number[]
  maxResults?: number
  packageUUIDs?: number[]
  password?: boolean
  priority?: boolean
  startAt?: number
  status?: boolean
  url?: boolean
  variantID?: boolean
  variantIcon?: boolean
  variantName?: boolean
  variants?: boolean
}
