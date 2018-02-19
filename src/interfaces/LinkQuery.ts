/**
 * [Official docs](https://my.jdownloader.org/developers/#tag_98)
 */
export interface ILinkQuery {
  addedDate?: boolean
  bytesLoaded?: boolean
  bytesTotal?: boolean
  comment?: boolean
  enabled?: boolean
  eta?: boolean
  extractionStatus?: boolean
  finished?: boolean
  finishedDate?: boolean
  host?: boolean
  jobUUIDs?: number[]
  maxResults?: number
  packageUUIDs?: number[]
  password?: boolean
  priority?: boolean
  running?: boolean
  skipped?: boolean
  speed?: boolean
  startAt?: number
  status?: boolean
  url?: boolean
}
