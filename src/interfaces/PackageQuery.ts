/**
 * [Official docs](https://my.jdownloader.org/developers/#tag_144)
 */
export interface IPackageQuery {
  bytesLoaded?: boolean
  bytesTotal?: boolean
  childCount?: boolean
  comment?: boolean
  enabled?: boolean
  eta?: boolean
  finished?: boolean
  hosts?: boolean
  maxResults?: number
  packageUUIDs?: number[]
  priority?: boolean
  running?: boolean
  saveTo?: boolean
  speed?: boolean
  startAt?: number
  status?: boolean
}
