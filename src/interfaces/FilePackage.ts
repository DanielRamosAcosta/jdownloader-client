import { Priority } from '../enums/Priority'

export interface IFilePackage {
  activeTask: string
  bytesLoaded: number
  bytesTotal: number
  childCount: number
  comment: string
  downloadPassword: string
  enabled: boolean
  eta: number
  finished: boolean
  hosts: string[]
  name: string
  priority: Priority
  running: boolean
  saveTo: string
  speed: number
  status: string
  statusIconKey: string
  uuid: number
}
