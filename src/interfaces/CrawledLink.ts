import { AvailableLinkState } from '../enums/AvailableLinkState'
import { Priority } from '../enums/Priority'
import { ILinkVariant } from './LinkVariant'

/**
 * [Official docs](https://my.jdownloader.org/developers/#tag_264)
 */
export interface ICrawledLink {
  name: string
  packageUUID: number
  uuid: number
  availability?: AvailableLinkState
  bytesTotal?: number
  comment?: string
  downloadPassword?: string
  enabled?: boolean
  host?: string
  priority?: Priority
  url?: string
  variant?: ILinkVariant
  variants?: boolean
}
