import { Priority } from '../enums/Priority'

/**
 * [Official docs](https://my.jdownloader.org/developers/#tag_115)
 */
export interface IDownloadLink {
  name: string
  packageUUID: number
  uuid: number
  addedDate?: number
  bytesLoaded?: number
  bytesTotal?: number
  comment?: string
  downloadPassword?: string
  enabled?: boolean
  eta?: number
  extractionStatus?: string
  finished?: boolean
  finishedDate?: number
  host?: string
  priority?: Priority
  running?: boolean
  skipped?: boolean
  speed?: number
  status?: string
  statusIconKey?: string
  url?: string
}
