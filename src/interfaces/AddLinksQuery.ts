import { Priority } from '../enums/Priority'

export interface IAddLinksQuery {
  assignJobID?: boolean
  autoExtract?: boolean
  autostart?: boolean
  dataURLs?: string[]
  deepDecrypt?: boolean
  destinationFolder?: string
  downloadPassword?: string
  extractPassword?: string
  links: string[]
  overwritePackagizerRules?: boolean
  packageName?: string
  priority?: Priority
  sourceUrl?: string
}
